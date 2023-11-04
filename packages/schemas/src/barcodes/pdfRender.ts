import { PDFRenderProps } from '@pdfme/common';
import { convertForPdfLayoutProps } from '../renderUtils';
import type { BarcodeSchema } from './types';
import { createBarCode, validateBarcodeInput } from './helper';

export const pdfRender = async (arg: PDFRenderProps<BarcodeSchema>) => {
  const { value, schema, pdfDoc, page, _cache, cacheKey } = arg;
  if (!validateBarcodeInput(schema.type, value)) return;

  let image = _cache.get(cacheKey);
  if (!image) {
    const imageBuf = await createBarCode(
      Object.assign(schema, { type: schema.type, input: value })
    );
    image = await pdfDoc.embedPng(imageBuf);
    _cache.set(cacheKey, image);
  }

  const pageHeight = page.getHeight();
  const {
    width,
    height,
    rotate,
    position: { x, y },
  } = convertForPdfLayoutProps({ schema, pageHeight });

  page.drawImage(image, { x, y, rotate, width, height });
};
