import { z } from 'zod';
import type { PDFPage, PDFDocument } from '@pdfme/pdf-lib';
import type { WidgetProps as _PropPanelWidgetProps, Schema as _PropPanelSchema } from 'form-render';
// prettier-ignore
import {Lang, Size, Schema, Font, SchemaForUI, BasePdf, Template, GeneratorOptions, GenerateProps, UIOptions, UIProps, PreviewProps, DesignerProps} from './schema.js';

export type PropPanelSchema = _PropPanelSchema;
export type ChangeSchemas = (objs: { key: string; value: any; schemaId: string }[]) => void;

/**
 * Properties used for PDF rendering.
 * @template T Type of the extended Schema object.
 * @property {string} value The string used for PDF rendering.
 * @property {T} schema Extended Schema object for rendering.
 * @property {typeof import('@pdfme/pdf-lib')} pdfLib The pdf-lib library used for rendering.
 * @property {PDFDocument} pdfDoc PDFDocument object from pdf-lib.
 * @property {PDFPage} page PDFPage object from pdf-lib.
 * @property {GeneratorOptions} options Options object passed from the generator.
 * @property {Map<string, any>} _cache Cache shared only during the execution of the generate function (useful for caching images, etc. if needed).
 * @property {string} cacheKey The unique cache key for this combination of value and schema
 */
export interface PDFRenderProps<T extends Schema> {
  value: string;
  schema: T;
  pdfLib: typeof import('@pdfme/pdf-lib');
  pdfDoc: PDFDocument;
  page: PDFPage;
  options: GeneratorOptions;
  _cache: Map<string, any>;
  cacheKey: string;
}

/**
 * Type for properties used in UI rendering.
 *
 * @template T - Type of the extended Schema object.
 * @property {T} schema - Extended Schema object for rendering.
 * @property {'viewer' | 'form' | 'designer'} mode - String indicating the rendering state. 'designer' is only used when the field is in edit mode in the Designer.
 * @property {number} [tabIndex] - Tab index for Form.
 * @property {string} [placeholder] - Placeholder text for Form.
 * @property {() => void} [stopEditing] - Stops editing mode, can be used when the mode is 'designer'.
 * @property {string} value - The string used for UI rendering.
 * @property {(value: string) => void} [onChange] - Used to change the value. Only applicable when the mode is 'form' or 'designer'.
 * @property {HTMLDivElement} rootElement - The root HTMLDivElement for the UI.
 * @property {UIOptions} options - Options object passed from the Viewer, Form, or Designer.
 */
export type UIRenderProps<T extends Schema> = {
  schema: T;
  mode: 'viewer' | 'form' | 'designer';
  tabIndex?: number;
  placeholder?: string;
  stopEditing?: () => void;
  value: string;
  onChange?: (value: string) => void;
  rootElement: HTMLDivElement;
  options: UIOptions;
};

type PropPanelProps = {
  rootElement: HTMLDivElement;
  activeSchema: SchemaForUI;
  activeElements: HTMLElement[];
  changeSchemas: ChangeSchemas;
  schemas: SchemaForUI[];
  pageSize: Size;
  options: UIOptions;
};
export type PropPanelWidgetProps = _PropPanelWidgetProps & PropPanelProps;

/**
 * Used for customizing the property panel.
 * @template T - Type of the extended Schema object.
 * @property {Record<string, PropPanelSchema> | ((propPanelProps: Omit<PropPanelProps, 'rootElement'>) => Record<string, PropPanelSchema>)} schema - A function returning a form-render schema object or the schema object itself. When a function, it takes properties passed from the designer as arguments.
 * @property {Record<string, (props: PropPanelWidgetProps) => void>} [widgets] - An object of functions returning form-render widgets. The functions take, as arguments, both form-render's WidgetProps and properties passed from the designer.
 * @property {string} defaultValue - The default input value set when adding the schema.
 * @property {T} defaultSchema - The default schema set when adding the schema.
 */
export interface PropPanel<T extends Schema> {
  schema:
    | ((propPanelProps: Omit<PropPanelProps, 'rootElement'>) => Record<string, PropPanelSchema>)
    | Record<string, PropPanelSchema>;

  widgets?: Record<string, (props: PropPanelWidgetProps) => void>;
  defaultValue: string;
  defaultSchema: T;
}

/**
 * The Plugin interface is used for PDF and UI rendering, as well as defining the property panel.
 * The 'pdf' is used in the generator package, 'ui' is used in the viewer, form, and designer packages, and 'propPanel' is used in the designer package.
 * Objects defined as Plugins using this interface can be used with a consistent interface across all packages.
 * @template T Type of the extended Schema object.
 * @property {function} pdf Function for rendering PDFs.
 * @property {function} ui Function for rendering UI.
 * @property {PropPanel} propPanel Object for defining the property panel.
 */
export type Plugin<T extends Schema & { [key: string]: any }> = {
  pdf: (arg: PDFRenderProps<T>) => Promise<void>;
  ui: (arg: UIRenderProps<T>) => Promise<void>;
  propPanel: PropPanel<T>;
};

export type Plugins = { [key: string]: Plugin<any> | undefined };

export type Lang = z.infer<typeof Lang>;
export type Size = z.infer<typeof Size>;
export type Schema = z.infer<typeof Schema>;
export type SchemaForUI = z.infer<typeof SchemaForUI>;

/**
 * Represents the Font type definition.
 * @property {Object} [x: string] - Object key is the font name.
 * @property {(string | ArrayBuffer | Uint8Array)} data - The font data.
 * @property {boolean} [fallback] - Please set to true for the fallback font when no font is specified. Only one value within the given Font object needs to be set to true.
 * @property {boolean} [subset] - The default is true (use subset font). So if you don't want to use a subset font, please set it to false.
 */
export type Font = z.infer<typeof Font>;
export type BasePdf = z.infer<typeof BasePdf>;
export type Template = z.infer<typeof Template>;
export type GeneratorOptions = z.infer<typeof GeneratorOptions>;
export type GenerateProps = z.infer<typeof GenerateProps> & { plugins?: Plugins };
export type UIOptions = z.infer<typeof UIOptions>;
export type UIProps = z.infer<typeof UIProps> & { plugins?: Plugins };
export type PreviewProps = z.infer<typeof PreviewProps> & { plugins?: Plugins };
export type DesignerProps = z.infer<typeof DesignerProps> & { plugins?: Plugins };
