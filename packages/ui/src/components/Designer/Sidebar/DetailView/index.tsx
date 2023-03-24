import React, { useContext } from 'react';
import { SchemaForUI } from '@pdfme/common';
import { I18nContext } from '../../../../contexts';
import Divider from '../../../Divider';
import { SidebarProps } from '../index';
import TextPropEditor from './TextPropEditor';
import ExampleInputEditor from './ExampleInputEditor';
import PositionAndSizeEditor from './PositionAndSizeEditor';
import TypeAndKeyEditor from './TypeAndKeyEditor';

const DetailView = (
  props: Pick<SidebarProps, 'schemas' | 'pageSize' | 'changeSchemas' | 'activeElements'> & {
    activeSchema: SchemaForUI;
  }
) => {
  const { activeSchema } = props;
  const i18n = useContext(I18nContext);

  return (
    <section className="artwork-edit-field">
      <div
        className="artwork-edit-field-header"
        style={{ height: 40, display: 'flex', alignItems: 'center' }}
      >
        <h2
          className="artwork-edit-field-title"
          style={{ textAlign: 'center', width: '100%', fontWeight: 'bold' }}
        >
          {i18n('editField')}
        </h2>
      </div>

      <Divider />

      <div className="artwork-edit-field-container" style={{ fontSize: '0.9rem' }}>
        <TypeAndKeyEditor {...props} />
        <Divider />
        <PositionAndSizeEditor {...props} />
        <Divider />
        {activeSchema.type === 'text' && (
          <>
            <TextPropEditor {...props} />
            <Divider />
          </>
        )}
        <ExampleInputEditor {...props} />
      </div>
    </section>
  );
};

export default DetailView;
