import React, { useContext } from 'react';
import { SchemaForUI } from '@pdfme/common';
import { I18nContext } from '../../../../contexts';
import { SidebarProps } from '..';

const PrefixInputEditor = (
  props: Pick<SidebarProps, 'changeSchemas'> & { activeSchema: SchemaForUI }
) => {
  const { changeSchemas, activeSchema } = props;
  const i18n = useContext(I18nContext);

  return (
    <>
      {activeSchema.type === 'text' && (
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 8,
          }}
        >
          <label htmlFor="prefix-input">{i18n('prefixInputExample')}</label>
          <textarea
            id="prefix-input"
            name="prefix-input"
            rows={3}
            onChange={async (e) => {
              changeSchemas([{ key: 'prefix', value: e.target.value, schemaId: activeSchema.id }]);
            }}
            style={{
              width: '100%',
              border: '1px solid #767676',
              borderRadius: 2,
              color: '#333',
            }}
            value={activeSchema.prefix ?? ''}
          />
        </section>
      )}
    </>
  );
};

export default PrefixInputEditor;
