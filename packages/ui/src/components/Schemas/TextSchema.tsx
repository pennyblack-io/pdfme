import React, { useContext, forwardRef, Ref, useState, useEffect } from 'react';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_ALIGNMENT,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_CHARACTER_SPACING,
  DEFAULT_FONT_COLOR,
  DEFAULT_PT_TO_PX_RATIO,
  TextSchema,
  calculateDynamicFontSize,
} from '@pdfme/common';
import { SchemaUIProps } from './SchemaUI';
import { ZOOM } from '../../constants';
import { FontContext, FeaturesContext } from '../../contexts';
import * as fontkit from 'fontkit';
import { Buffer } from 'buffer/';

type PrefixingProps = {
  prefixRef?: Ref<HTMLSpanElement>;
  suffixRef?: Ref<HTMLSpanElement>;
};

type Props = SchemaUIProps & { schema: TextSchema } & PrefixingProps;

type ActiveInputRef = React.Ref<HTMLSpanElement> | React.Ref<HTMLTextAreaElement> | undefined;

const TextSchemaUI = (
  { schema, editable, placeholder, tabIndex, onChange, prefixRef, suffixRef }: Props,
  ref: Ref<HTMLTextAreaElement>
) => {
  const font = useContext(FontContext);
  const { prefixingEnabled } = useContext(FeaturesContext);
  const [dynamicFontSize, setDynamicFontSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (schema.dynamicFontSize && schema.data) {
      let textInput;

      if (prefixingEnabled) {
        const prefixText = schema.prefix || '';
        const suffixText = schema.suffix || '';
        textInput = `${prefixText}${schema.data}${suffixText}`;
      } else {
        textInput = schema.data;
      }

      calculateDynamicFontSize({ textSchema: schema, font, input: textInput }).then(
        setDynamicFontSize
      );
    } else {
      setDynamicFontSize(undefined);
    }
  }, [
    schema.data,
    schema.prefix,
    schema.suffix,
    schema.width,
    schema.fontName,
    schema.dynamicFontSize,
    schema.dynamicFontSize?.max,
    schema.dynamicFontSize?.min,
    schema.characterSpacing,
    font,
  ]);

  const handleInputChange = (activeInput: ActiveInputRef, schemaKey: string) => {
    if (activeInput && 'current' in activeInput && activeInput.current) {
      onChange(activeInput.current.innerText, schemaKey);
    }
  };

  const handleInputClick = (event: React.MouseEvent, activeInput: ActiveInputRef) => {
    event.stopPropagation();

    if (activeInput && 'current' in activeInput && activeInput.current) {
      activeInput.current.focus();
    }
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    padding: 0,
    height: schema.height * ZOOM,
    width: schema.width * ZOOM,
    resize: 'none',
    fontFamily: schema.fontName ? `'${schema.fontName}'` : 'inherit',
    color: schema.fontColor ? schema.fontColor : DEFAULT_FONT_COLOR,
    fontSize: `${dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE}pt`,
    letterSpacing: `${schema.characterSpacing ?? DEFAULT_CHARACTER_SPACING}pt`,
    lineHeight: `${schema.lineHeight ?? DEFAULT_LINE_HEIGHT}em`,
    textAlign: schema.alignment ?? DEFAULT_ALIGNMENT,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    backgroundColor:
      schema.data && schema.backgroundColor ? schema.backgroundColor : 'rgb(242 244 255 / 75%)',
    border: 'none',
  };

  const inputContainerStyle: React.CSSProperties = {
    height: schema.height * ZOOM,
    width: schema.width * ZOOM,
    textAlign: schema.alignment ?? DEFAULT_ALIGNMENT,
    backgroundColor:
      schema.data && schema.backgroundColor ? schema.backgroundColor : 'rgb(242 244 255 / 75%)',
  };

  const inputStyle: React.CSSProperties = {
    ...style,
    position: 'relative',
    display: 'inline-block',
    width: 'auto',
    height: 'auto',
    whiteSpace: 'break-spaces',
    backgroundColor: 'transparent',
  };

  const inputPrefixingStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: '#aad8ff',
  };

  const inputSpanStyle: React.CSSProperties = {
    display: 'inline-block',
    width: 'auto',
    whiteSpace: 'break-spaces',
  };

  const inputPrefixingSpanStyle: React.CSSProperties = {
    ...inputSpanStyle,
    backgroundColor: '#aad8ff',
  };

  const schemaFontSize = dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE;
  let fontAlignmentValue = 0;

  if (schema.fontName) {
    // @ts-ignore
    const currentFont = fontkit.create(Buffer.from(font[schema.fontName].data as ArrayBuffer));

    // Ascent and descent values obtained from Fontkit in font units
    const ascentInFontUnits = currentFont.ascent;
    const descentInFontUnits = currentFont.descent;
    const fontSizeInPx = schemaFontSize * DEFAULT_PT_TO_PX_RATIO;

    // Get the scaling factor for the font
    const scalingFactor = currentFont.unitsPerEm;

    // Convert ascent and descent to px values
    const ascentInPixels = (ascentInFontUnits / scalingFactor) * fontSizeInPx;
    const descentInPixels = (descentInFontUnits / scalingFactor) * fontSizeInPx;

    // Calculate the single line height in px
    const singleLineHeight = (ascentInPixels + Math.abs(descentInPixels)) / fontSizeInPx;

    // Calculate the top margin/padding in px
    fontAlignmentValue = (singleLineHeight * fontSizeInPx - fontSizeInPx) / 2;
  }

  return editable ? (
    <>
      {prefixingEnabled && (
        <div
          style={{
            ...inputContainerStyle,
            height:
              fontAlignmentValue < 0
                ? `${schema.height * ZOOM + Math.abs(fontAlignmentValue)}px`
                : `${schema.height * ZOOM}px`,
            marginTop: fontAlignmentValue < 0 ? `${fontAlignmentValue}px` : '0',
            paddingTop: fontAlignmentValue >= 0 ? `${fontAlignmentValue}px` : '0',
          }}
        >
          <span
            style={inputPrefixingStyle}
            contentEditable={true}
            ref={prefixRef}
            onClick={(event) => handleInputClick(event, prefixRef)}
            onBlur={() => handleInputChange(prefixRef, 'prefix')}
          >
            {schema.prefix}
          </span>

          <span
            style={inputStyle}
            contentEditable={true}
            ref={ref}
            onClick={(event) => handleInputClick(event, ref)}
            onBlur={() => handleInputChange(ref, 'data')}
          >
            {schema.data}
          </span>

          <span
            style={inputPrefixingStyle}
            contentEditable={true}
            ref={suffixRef}
            onClick={(event) => handleInputClick(event, suffixRef)}
            onBlur={() => handleInputChange(suffixRef, 'suffix')}
          >
            {schema.suffix}
          </span>
        </div>
      )}

      {!prefixingEnabled && (
        <textarea
          ref={ref}
          placeholder={placeholder}
          tabIndex={tabIndex}
          style={{
            ...style,
            height:
              fontAlignmentValue < 0
                ? `${schema.height * ZOOM + Math.abs(fontAlignmentValue)}px`
                : `${schema.height * ZOOM}px`,
            marginTop: fontAlignmentValue < 0 ? `${fontAlignmentValue}px` : '0',
            paddingTop: fontAlignmentValue >= 0 ? `${fontAlignmentValue}px` : '0',
          }}
          onChange={(e) => onChange(e.target.value)}
          value={schema.data}
        ></textarea>
      )}
    </>
  ) : (
    <div style={inputContainerStyle}>
      <div
        style={{
          marginTop: fontAlignmentValue < 0 ? `${fontAlignmentValue}px` : '0',
          paddingTop: fontAlignmentValue >= 0 ? `${fontAlignmentValue}px` : '0',
        }}
      >
        {prefixingEnabled && schema.prefix && schema.prefix.length > 0 && (
          <div style={inputStyle}>
            {/*  Set the letterSpacing of the last character to 0. */}
            {schema.prefix.split('').map((l, i) => (
              <span
                key={`prefix-${i}`}
                style={{
                  letterSpacing: String(schema.prefix).length === i + 1 ? 0 : 'inherit',
                  ...inputPrefixingSpanStyle,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        )}

        {schema.data && schema.data.length > 0 && (
          <div style={inputStyle}>
            {/*  Set the letterSpacing of the last character to 0. */}
            {schema.data.split('').map((l, i) => (
              <span
                key={i}
                style={{
                  letterSpacing: String(schema.data).length === i + 1 ? 0 : 'inherit',
                  ...inputSpanStyle,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        )}

        {prefixingEnabled && schema.suffix && schema.suffix.length > 0 && (
          <div style={inputStyle}>
            {/*  Set the letterSpacing of the last character to 0. */}
            {schema.suffix.split('').map((l, i) => (
              <span
                key={`suffix-${i}`}
                style={{
                  letterSpacing: String(schema.suffix).length === i + 1 ? 0 : 'inherit',
                  ...inputPrefixingSpanStyle,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default forwardRef<HTMLTextAreaElement, Props>(TextSchemaUI);
