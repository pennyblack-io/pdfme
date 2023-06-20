import React, { useContext, forwardRef, Ref, useState, useEffect } from 'react';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_ALIGNMENT,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_CHARACTER_SPACING,
  DEFAULT_FONT_COLOR,
  TextSchema,
  calculateDynamicFontSize,
} from '@pdfme/common';
import { SchemaUIProps } from './SchemaUI';
import { ZOOM } from '../../constants';
import { FontContext, FeaturesContext } from '../../contexts';

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
    padding: 0,
    resize: 'none',
    display: 'inline',
    fontFamily: schema.fontName ? `'${schema.fontName}'` : 'inherit',
    height: schema.height * ZOOM,
    width: schema.width * ZOOM,
    textAlign: schema.alignment ?? DEFAULT_ALIGNMENT,
    fontSize: `${dynamicFontSize ?? schema.fontSize ?? DEFAULT_FONT_SIZE}pt`,
    letterSpacing: `${schema.characterSpacing ?? DEFAULT_CHARACTER_SPACING}pt`,
    lineHeight: `${schema.lineHeight ?? DEFAULT_LINE_HEIGHT}em`,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    border: 'none',
    color: schema.fontColor ? schema.fontColor : DEFAULT_FONT_COLOR,
    backgroundColor:
      schema.data && schema.backgroundColor ? schema.backgroundColor : 'rgb(242 244 255 / 75%)',
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

  return editable ? (
    <>
      {prefixingEnabled && (
        <div style={inputContainerStyle}>
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
          style={style}
          onChange={(e) => onChange(e.target.value)}
          value={schema.data}
        ></textarea>
      )}
    </>
  ) : (
    <>
      <div style={inputContainerStyle}>
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
    </>
  );
};

export default forwardRef<HTMLTextAreaElement, Props>(TextSchemaUI);
