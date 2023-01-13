import React from 'react';
import { createRoot } from 'react-dom/client';
import { Template, DesignerProps, checkDesignerProps, checkTemplate } from '@pdfme/common';
import { BaseUIClass } from './class.js';
import { DESTROYED_ERR_MSG } from './constants.js';
import { I18nContext, FontContext } from './contexts.js';
import DesignerComponent from './components/Designer/index.js';
import { cloneDeep } from './helper.js';

class Designer extends BaseUIClass {
  private onSaveTemplateCallback?: (template: Template) => void;
  private onChangeTemplateCallback?: (template: Template) => void;

  constructor(props: DesignerProps) {
    super(props);
    checkDesignerProps(props);

    this.render();
  }

  public saveTemplate() {
    if (!this.domContainer) throw Error(DESTROYED_ERR_MSG);
    if (this.onSaveTemplateCallback) {
      this.onSaveTemplateCallback(this.template);
    }
  }

  public updateTemplate(template: Template) {
    checkTemplate(template);
    if (!this.domContainer) throw Error(DESTROYED_ERR_MSG);
    this.template = cloneDeep(template);
    if (this.onChangeTemplateCallback) {
      this.onChangeTemplateCallback(template);
    }
    this.render();
  }

  public onSaveTemplate(cb: (template: Template) => void) {
    this.onSaveTemplateCallback = cb;
  }

  public onChangeTemplate(cb: (template: Template) => void) {
    this.onChangeTemplateCallback = cb;
  }

  protected render() {
    if (!this.domContainer) throw Error(DESTROYED_ERR_MSG);
    const root = createRoot(this.domContainer);
    root.render(
      <I18nContext.Provider value={this.getI18n()}>
        <FontContext.Provider value={this.getFont()}>
          <DesignerComponent
            template={this.template}
            onSaveTemplate={(template) => {
              this.template = template;
              if (this.onSaveTemplateCallback) {
                this.onSaveTemplateCallback(template);
              }
            }}
            onChangeTemplate={(template) => {
              this.template = template;
              if (this.onChangeTemplateCallback) {
                this.onChangeTemplateCallback(template);
              }
            }}
            size={this.size}
          />
        </FontContext.Provider>
      </I18nContext.Provider>
    );
  }
}

export default Designer;
