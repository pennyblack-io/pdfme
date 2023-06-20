import React, { useContext } from 'react';
import { SchemaForUI } from '@pdfme/common';
import { I18nContext, FeaturesContext } from '../../../../contexts';
import Divider from '../../../Divider';
import { SidebarProps } from '../index';
import TextPropEditor from './TextPropEditor';
import ExampleInputEditor from './ExampleInputEditor';
import PositionAndSizeEditor from './PositionAndSizeEditor';
import TypeAndKeyEditor from './TypeAndKeyEditor';
import PrefixInputEditor from './PrefixInputEditor';
import SuffixInputEditor from './SuffixInputEditor';

const DetailView = (
  props: Pick<SidebarProps, 'schemas' | 'pageSize' | 'changeSchemas' | 'activeElements'> & {
    activeSchema: SchemaForUI;
  }
) => {
  const { activeSchema } = props;
  const i18n = useContext(I18nContext);
  const { prefixingEnabled } = useContext(FeaturesContext);

  return (
    <section style={{ fontSize: '0.9rem' }}>
      <h2
        style={{
          display: 'flex',
          alignContent: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '0',
          height: '40px',
          width: '100%',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {i18n('editField')}
      </h2>
      <Divider />

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

      {prefixingEnabled && activeSchema.type === 'text' && <PrefixInputEditor {...props} />}

      <ExampleInputEditor {...props} />

      {prefixingEnabled && activeSchema.type === 'text' && <SuffixInputEditor {...props} />}
    </section>
  );
};

export default DetailView;
