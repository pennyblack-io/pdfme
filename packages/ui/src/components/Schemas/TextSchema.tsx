import React, { useContext, forwardRef, Ref, useState, useEffect, useRef } from 'react';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_ALIGNMENT,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_CHARACTER_SPACING,
  DEFAULT_FONT_COLOR,
  TextSchema,
  calculateDynamicFontSize,
} from '@pdfme/common';
import { getVerticalAlignment } from '../../helper';
import { SchemaUIProps } from './SchemaUI';
import { ZOOM } from '../../constants';
import { FontContext } from '../../contexts';

type Props = SchemaUIProps & { schema: TextSchema };

const TextSchemaUI = (
  { schema, editable, placeholder, tabIndex, onChange }: Props,
  ref: Ref<HTMLTextAreaElement>,
) => {
  const font = useContext(FontContext);
  const [dynamicFontSize, setDynamicFontSize] = useState<number | undefined>(undefined);
  const [textContentHeight, setTextContentHeight] = useState(0);
  const textContentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (schema.dynamicFontSize && schema.data) {
      calculateDynamicFontSize({ textSchema: schema, font, input: schema.data }).then(setDynamicFontSize)
    } else {
      setDynamicFontSize(undefined);
    }
  }, [schema.data, schema.width, schema.fontName, schema.dynamicFontSize, schema.dynamicFontSize?.max, schema.dynamicFontSize?.min, schema.characterSpacing, font]);

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

  useEffect(() => {
    if (textContentRef.current) {
      setTextContentHeight(textContentRef.current.clientHeight);
    }

    if (ref && 'current' in ref) {
      const textarea = ref.current;

      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }    
  }, [schema.verticalAlignment, schema.fontSize, schema.fontName, schema.characterSpacing, editable, schema.data]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + (textarea.scrollHeight - textContentHeight)}px`;
  };

  return editable ? (
    <div style={{
      ...style,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: getVerticalAlignment(schema.verticalAlignment),
    }}>
      <textarea
        ref={ref}
        placeholder={placeholder}
        tabIndex={tabIndex}
        rows={1}
        style={{
          ...style,
          position: 'relative',
          display: 'block',
          width: '100%',
          resize: 'none',
          overflow: 'hidden',
          height: 'auto',
        }}
        onChange={(e) => onChange(e.target.value)}
        onInput={handleInput}
        value={schema.data}
      ></textarea>
    </div>
  ) : (
    <div style={{
      ...style,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: getVerticalAlignment(schema.verticalAlignment),
    }}>
      <div
        ref={textContentRef}
        style={{ 
          height: 'auto',
          width: schema.width * ZOOM,
        }}
       >
        {/*  Set the letterSpacing of the last character to 0. */}
        {schema.data.split('').map((l, i) => (
          <span
            key={i}
            style={{
              letterSpacing: String(schema.data).length === i + 1 ? 0 : 'inherit',
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

export default forwardRef<HTMLTextAreaElement, Props>(TextSchemaUI);
