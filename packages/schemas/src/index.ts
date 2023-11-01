import text from './text';
import image from './image';
import barcodes from './barcodes';
import { convertForPdfLayoutProps, rotatePoint } from './renderUtils';
import { buildPlaceholder, substitutePlaceholdersInContent } from './text/dynamicTextHack';

const builtInPlugins = { Text: text };

export {
  text,
  image,
  barcodes,
  builtInPlugins,
  convertForPdfLayoutProps,
  rotatePoint,
  buildPlaceholder,
  substitutePlaceholdersInContent,
};
