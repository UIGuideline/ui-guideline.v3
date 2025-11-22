import { camelToKebab, camelToTitleCase } from '@common';

/**
 * Table of Contents item structure
 */
export interface TOCItem {
  id: string;
  label: string;
  level?: number;
}

/**
 * Extract headings from MDX body for Table of Contents
 * Skips h1 headings (usually the page title)
 *
 * @param body - MDX body content
 * @returns Array of TOC items with id and label
 */
export function extractHeadingsFromMDX(body: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(body)) !== null) {
    const level = match[1]!.length;

    // Skip h1 (usually the page title)
    if (level === 1) continue;

    const text = match[2]!.trim();

    // Generate slug from heading text
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({
      id,
      label: text,
      level,
    });
  }

  return headings;
}

/**
 * Generate TOC from section keys (for component detail pages)
 * Converts camelCase section keys to readable labels
 *
 * @param sections - Array of section keys in camelCase (e.g., ["overview", "anatomy", "props"])
 * @returns Array of TOC items
 */
export function generateTOCFromSections(sections: string[]): TOCItem[] {
  return sections.map((key) => ({
    id: camelToKebab(key),
    label: camelToTitleCase(key),
  }));
}
