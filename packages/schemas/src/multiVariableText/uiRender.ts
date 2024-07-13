import {SchemaForUI, UIOptions, UIRenderProps, Mode, RerenderCheckProps, getDefaultFont} from '@pdfme/common';
import { MultiVariableTextSchema } from './types';
import { uiRender as parentUiRender } from '../text/uiRender';
import { isEditable } from '../utils';
import { substituteVariables } from './helper';
import type * as CSS from "csstype";
import {
  DEFAULT_ALIGNMENT,
  DEFAULT_CHARACTER_SPACING,
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT, DEFAULT_VERTICAL_ALIGNMENT, VERTICAL_ALIGN_BOTTOM, VERTICAL_ALIGN_MIDDLE, VERTICAL_ALIGN_TOP
} from "../text/constants";
import {calculateDynamicFontSize, getBrowserVerticalFontAdjustments, getFontKitFont} from "../text/helper";
import type {TextSchema} from "../text/types";

export const uiRender = async (arg: UIRenderProps<MultiVariableTextSchema>) => {
  const { value, schema, rootElement, mode, onChange, ...rest } = arg;

  // TODO: Rewrite comment
  // This plugin currently does not support editing in form view, setting as read-only.
  const mvtMode = mode == 'form' ? 'viewer' : mode;

  let text = schema.text;
  let numVariables = schema.variables.length;

  if (mode === 'form' && numVariables > 0) {
    await doFormUiRender(arg);
  } else {
    const parentRenderArgs = {
      value: isEditable(mode, schema) ? text : substituteVariables(text, value),
      schema,
      mode: mvtMode,
      rootElement,
      onChange: (arg: { key: string; value: any; } | { key: string; value: any; }[]) => {
        if (!Array.isArray(arg)) {
          onChange && onChange({key: 'text', value: arg.value});
        } else {
          console.error('onChange is not an array, the parent text plugin has changed...');
        }
      },
      ...rest,
    };

    await parentUiRender(parentRenderArgs);

    const textBlock = rootElement.querySelector('#text-' + schema.id) as HTMLDivElement;
    if (textBlock) {
      if (mode === 'form') {
        console.log('got here for doing the form (now will replace the contents)');
      } else if (mode === 'designer') {
        textBlock.addEventListener('keyup', (event: KeyboardEvent) => {
          text = textBlock.textContent || '';
          if (keyPressShouldBeChecked(event)) {
            const newNumVariables = countUniqueVariableNames(text);
            if (numVariables !== newNumVariables) {
              // If variables were modified during this keypress, we trigger a change
              if (onChange) {
                onChange({key: 'text', value: text});
              }
              numVariables = newNumVariables;
            }
          }
        });
      }
    } else {
      throw new Error('Text block not found. Ensure the text block has an id of "text-" + schema.id');
    }
  }
};

// TODO: WIP
const doFormUiRender = async (arg: UIRenderProps<MultiVariableTextSchema>) => {
  const {
    value,
    schema,
    rootElement,
    mode,
    onChange,
    stopEditing,
    tabIndex,
    placeholder,
    options,
    _cache,
  } = arg;
  // const { value, schema, rootElement, mode, onChange, ...rest } = arg;
  const font = options?.font || getDefaultFont();

  let text = schema.text;

  const variables: Record<string, string> = JSON.parse(value) || {}
  const variableIndices = getVariableIndices(text);

  let content = '';
  let inVarString = false;

  for (let i = 0; i < text.length; i++) {
    if (variableIndices[i]) {
      console.log('variable found at index', i);
      inVarString = true;
      content += '<span contenteditable="true" style="outline: rgb(37, 194, 160) dashed 1px;">' + variables[variableIndices[i]] + '</span>';
    } else if (inVarString) {
      if (text[i] === '}') {
        inVarString = false;
      }
    } else {
      content += `<span style="letter-spacing:${text.length === i + 1 ? 0 : 'inherit'};">${text[i]}</span>`
    }
  }

  // ------------------------------- COPY PASTE FROM UI CODE

  let dynamicFontSize: undefined | number = undefined;
  const getCdfArg = (v: string) => ({
    textSchema: schema,
    font,
    value: v,
    startingFontSize: dynamicFontSize,
    _cache,
  });
  if (schema.dynamicFontSize && value) {
    dynamicFontSize = await calculateDynamicFontSize(getCdfArg(value));
  }

  const fontKitFont = await getFontKitFont(schema.fontName, font, _cache);
  // Depending on vertical alignment, we need to move the top or bottom of the font to keep
  // it within it's defined box and align it with the generated pdf.
  const { topAdj, bottomAdj } = getBrowserVerticalFontAdjustments(
      fontKitFont,
      dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE,
      schema.lineHeight ?? DEFAULT_LINE_HEIGHT,
      schema.verticalAlignment ?? DEFAULT_VERTICAL_ALIGNMENT
  );


  const topAdjustment = topAdj.toString();
  const bottomAdjustment = bottomAdj.toString();

  const container = document.createElement('div');

  const containerStyle: CSS.Properties = {
    padding: 0,
    resize: 'none',
    backgroundColor: getBackgroundColor(value, schema),
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: mapVerticalAlignToFlex(schema.verticalAlignment),
    width: '100%',
    height: '100%',
    cursor: isEditable(mode, schema) ? 'text' : 'default',
  };
  Object.assign(container.style, containerStyle);
  rootElement.innerHTML = '';
  rootElement.appendChild(container);

  const textBlockStyle: CSS.Properties = {
    // Font formatting styles
    fontFamily: schema.fontName ? `'${schema.fontName}'` : 'inherit',
    color: schema.fontColor ? schema.fontColor : DEFAULT_FONT_COLOR,
    fontSize: `${dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE}pt`,
    letterSpacing: `${schema.characterSpacing ?? DEFAULT_CHARACTER_SPACING}pt`,
    lineHeight: `${schema.lineHeight ?? DEFAULT_LINE_HEIGHT}em`,
    textAlign: schema.alignment ?? DEFAULT_ALIGNMENT,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    // Block layout styles
    resize: 'none',
    border: 'none',
    outline: 'none',
    marginBottom: `${bottomAdjustment}px`,
    paddingTop: `${topAdjustment}px`,
    backgroundColor: 'transparent',
  };
  const textBlock = document.createElement('div');
  textBlock.id = 'text-' + schema.id;
  Object.assign(textBlock.style, textBlockStyle);

  textBlock.innerHTML = content;
  container.appendChild(textBlock);
}

const getVariableIndices = (content: string) => {
  const regex = /\{([^}]+)}/g;

  let match;
  const indices = [];

  while ((match = regex.exec(content)) !== null) {
    indices[match.index] = match[1];
  }

  return indices;
};

const mapVerticalAlignToFlex = (verticalAlignmentValue: string | undefined) => {
  switch (verticalAlignmentValue) {
    case VERTICAL_ALIGN_TOP:
      return 'flex-start';
    case VERTICAL_ALIGN_MIDDLE:
      return 'center';
    case VERTICAL_ALIGN_BOTTOM:
      return 'flex-end';
  }
  return 'flex-start';
};

const getBackgroundColor = (value: string, schema: TextSchema) => {
  if (!value || !schema.backgroundColor) return 'transparent';
  return schema.backgroundColor as string;
};

const countUniqueVariableNames = (content: string) => {
  const regex = /\{([^}]+)}/g;

  const uniqueMatchesSet = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) {
    uniqueMatchesSet.add(match[1]);
  }

  return uniqueMatchesSet.size;
};

/**
 * An optimisation to try to minimise jank while typing.
 * Only check whether variables were modified based on certain key presses.
 * Regex would otherwise be performed on every key press (which isn't terrible, but this code helps).
 */
const keyPressShouldBeChecked = (event: KeyboardEvent) => {
  if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowLeft" || event.key == "ArrowRight") {
    return false;
  }

  const selection = window.getSelection();
  const contenteditable = event.target as HTMLDivElement;

  const isCursorAtEnd = selection?.focusOffset === contenteditable?.textContent?.length;
  if (isCursorAtEnd) {
    return event.key === '}' || event.key === 'Backspace' || event.key === 'Delete';
  }

  const isCursorAtStart = selection?.anchorOffset === 0;
  if (isCursorAtStart) {
    return event.key === '{' || event.key === 'Backspace' || event.key === 'Delete';
  }

  return true;
}

export const shouldRerenderVars = (args: RerenderCheckProps) => {
  const {value, mode, scale, schema, options} = args;

  if (mode === 'form' || mode === 'designer') {
    // If this schema is actively being edited (e.g. typing into a field)
    // then we don't want changes to that schema made elsewhere to trigger a re-render and lose focus.
    return [mode, scale, '', JSON.stringify(options)]
  }
  return [mode, scale, JSON.stringify(schema), JSON.stringify(options)];
}