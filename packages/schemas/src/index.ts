import text from './text/index.js';
import image from './image/index.js';
import barcodes from './barcodes/index.js';
import line from './line/index.js';
import { convertForPdfLayoutProps, rotatePoint } from './renderUtils.js';
import { buildPlaceholder, substitutePlaceholdersInContent } from './text/dynamicTextHack.js';

const builtInPlugins = { Text: text };

export {
  text,
  image,
  barcodes,
  line,
  builtInPlugins,
  convertForPdfLayoutProps,
  rotatePoint,
  buildPlaceholder,
  substitutePlaceholdersInContent,
};
