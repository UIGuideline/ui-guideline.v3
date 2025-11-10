import * as React from 'react';

export enum BrandLogoCatalog {
  figma = 'figma',
  radixui = 'radixui',
  baseui = 'baseui',
  shadcn = 'shadcn',
  yaml = 'yaml',
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
  [BrandLogoCatalog.radixui]: (
    <>
      <path
        d="M48.3477 90.0004C34.9009 90.0004 24 78.3211 24 63.9135C24 49.5059 34.9009 37.8267 48.3477 37.8267V90.0004Z"
        fill="currentColor"
      />
      <path d="M48.3477 10H24V34.3477H48.3477V10Z" fill="currentColor" />
      <path
        d="M63.9999 34.3477C70.7233 34.3477 76.1737 28.8973 76.1737 22.1739C76.1737 15.4504 70.7233 10 63.9999 10C57.2765 10 51.826 15.4504 51.826 22.1739C51.826 28.8973 57.2765 34.3477 63.9999 34.3477Z"
        fill="currentColor"
      />
    </>
  ),
  [BrandLogoCatalog.baseui]: (
    <>
      <path
        d="M53.5454 31.8749C52.5433 31.813 51.7269 32.633 51.7269 33.6371V90.0001C67.7933 90.0001 80.8175 76.9759 80.8175 60.9095C80.8175 45.4541 68.7645 32.8135 53.5454 31.8749Z"
        fill="currentColor"
      />
      <path
        d="M48.0906 41.9996V49.9995V89.9991C32.0243 89.9991 19 75.6723 19 57.9994V49.9995V10C35.0663 10 48.0906 24.3267 48.0906 41.9996Z"
        fill="currentColor"
      />
    </>
  ),
  [BrandLogoCatalog.shadcn]: (
    <>
      <path
        d="M81 51.4761L51.4762 80.9999"
        stroke="currentColor"
        stroke-width="11.8095"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M75.0952 19L19 75.0952"
        stroke="currentColor"
        stroke-width="11.8095"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  ),
  [BrandLogoCatalog.yaml]: (
    <>
      <path d="M66.3333 13H82.7778L33.4444 87H17L41.6667 50L17 13H33.4444L49.8889 37.6667L66.3333 13Z" fill="#CB161E" />
    </>
  ),
};
