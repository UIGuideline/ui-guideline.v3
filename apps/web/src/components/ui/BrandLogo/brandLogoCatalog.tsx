import * as React from 'react';

export enum BrandLogoCatalog {
  figma = 'figma',
}

export type BrandLogoCatalogItem = keyof typeof BrandLogoCatalog;

/**
 * SVG content for each brand logo
 * Each entry contains the complete SVG markup for the logo
 */
export const BrandLogoSVGContent: Record<BrandLogoCatalog, React.ReactNode> = {
  [BrandLogoCatalog.figma]: (
    <>
      <path
        d="M21.2664 78.7334C21.2664 70.8154 27.6853 64.3965 35.6033 64.3965H49.9403V78.7334C49.9403 86.6514 43.5214 93.0703 35.6033 93.0703C27.6853 93.0703 21.2664 86.6514 21.2664 78.7334Z"
        fill="#24CB71"
      />
      <path
        d="M49.9403 7.04883V35.7227H64.2772C72.1952 35.7227 78.6141 29.3038 78.6141 21.3857C78.6141 13.4677 72.1952 7.04883 64.2772 7.04883H49.9403Z"
        fill="#FF7237"
      />
      <path
        d="M64.1577 64.3965C72.0758 64.3965 78.4946 57.9776 78.4946 50.0596C78.4946 42.1415 72.0758 35.7227 64.1577 35.7227C56.2396 35.7227 49.8208 42.1415 49.8208 50.0596C49.8208 57.9776 56.2396 64.3965 64.1577 64.3965Z"
        fill="#00B6FF"
      />
      <path
        d="M21.2664 21.3857C21.2664 29.3038 27.6853 35.7227 35.6033 35.7227H49.9403V7.04883H35.6033C27.6853 7.04883 21.2664 13.4677 21.2664 21.3857Z"
        fill="#FF3737"
      />
      <path
        d="M21.2664 50.0596C21.2664 57.9776 27.6853 64.3965 35.6033 64.3965H49.9403V35.7227H35.6033C27.6853 35.7227 21.2664 42.1415 21.2664 50.0596Z"
        fill="#874FFF"
      />
    </>
  ),
};
