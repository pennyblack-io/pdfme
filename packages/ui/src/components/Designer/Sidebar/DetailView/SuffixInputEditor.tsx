import React, { useContext } from 'react';
import { SchemaForUI } from '@pdfme/common';
import { I18nContext } from '../../../../contexts';
import { SidebarProps } from '..';

const SuffixInputEditor = (
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
          <label htmlFor="suffix-input">{i18n('suffixInputExample')}</label>
          <textarea
            id="suffix-input"
            name="suffix-input"
            rows={3}
            onChange={async (e) => {
              changeSchemas([{ key: 'suffix', value: e.target.value, schemaId: activeSchema.id }]);
            }}
            style={{
              width: '100%',
              border: '1px solid #767676',
              borderRadius: 2,
              color: '#333',
            }}
            value={activeSchema.suffix ?? ''}
          />
        </section>
      )}
    </>
  );
};

export default SuffixInputEditor;
