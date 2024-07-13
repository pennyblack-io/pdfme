import React, {useEffect, useContext, ReactNode, useRef } from 'react';
import { Dict, ZOOM, UIRenderProps, SchemaForUI, BasePdf, Schema, Plugin } from '@pdfme/common';
import { theme as antdTheme } from 'antd';
import { SELECTABLE_CLASSNAME } from '../constants';
import { PluginsRegistry, OptionsContext, I18nContext } from '../contexts';
import * as pdfJs from 'pdfjs-dist/legacy/build/pdf.js';

type RendererProps = Omit<
  UIRenderProps<Schema>,
  'schema' | 'rootElement' | 'options' | 'theme' | 'i18n' | 'pdfJs' | '_cache'
> & {
  basePdf: BasePdf;
  schema: SchemaForUI;
  value: string;
  outline: string;
  onChangeHoveringSchemaId?: (id: string | null) => void;
  scale: number;
};

const Wrapper = ({
  children,
  outline,
  onChangeHoveringSchemaId,
  schema,
}: RendererProps & { children: ReactNode }) => (
  <div
    title={schema.key}
    onMouseEnter={() => onChangeHoveringSchemaId && onChangeHoveringSchemaId(schema.id)}
    onMouseLeave={() => onChangeHoveringSchemaId && onChangeHoveringSchemaId(null)}
    className={SELECTABLE_CLASSNAME}
    id={schema.id}
    style={{
      position: 'absolute',
      cursor: schema.readOnly ? 'initial' : 'pointer',
      height: schema.height * ZOOM,
      width: schema.width * ZOOM,
      top: schema.position.y * ZOOM,
      left: schema.position.x * ZOOM,
      transform: `rotate(${schema.rotate ?? 0}deg)`,
      opacity: schema.opacity ?? 1,
      outline,
    }}
  >
    {children}
  </div>
);

const Renderer = (props: RendererProps) => {
  const pluginsRegistry = useContext(PluginsRegistry);
  const options = useContext(OptionsContext);
  const i18n = useContext(I18nContext) as (key: keyof Dict | string) => string;
  const { token: theme } = antdTheme.useToken();

  const { schema, basePdf, value, mode, onChange, stopEditing, tabIndex, placeholder, scale } =
    props;

  const ref = useRef<HTMLDivElement>(null);
  const _cache = useRef<Map<any, any>>(new Map());
  const plugin = Object.values(pluginsRegistry).find(
    (plugin) => plugin?.propPanel.defaultSchema.type === schema.type
  ) as Plugin<any>;

  if (!plugin || !plugin.ui) {
    console.error(`[@pdfme/ui] Renderer for type ${schema.type} not found. 
Check this document: https://pdfme.com/docs/custom-schemas`);
    return <></>;
  }

  useEffect(() => {
    if (ref.current && schema.type) {
      ref.current.innerHTML = '';
      const render = plugin.ui;

      void render({
        key: schema.key,
        value,
        schema,
        basePdf,
        rootElement: ref.current,
        mode,
        onChange,
        stopEditing,
        tabIndex,
        placeholder,
        options,
        theme,
        i18n,
        pdfJs,
        _cache: _cache.current,
      });
    }
    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, plugin.shouldRerenderVars ?
    plugin.shouldRerenderVars({value, mode, scale, schema, options}) :
    [value, mode, scale, JSON.stringify(schema), JSON.stringify(options)]
  );

  return (
    <Wrapper {...props}>
      <div style={{ height: '100%', width: '100%' }} ref={ref} />
    </Wrapper>
  );
};
export default Renderer;
