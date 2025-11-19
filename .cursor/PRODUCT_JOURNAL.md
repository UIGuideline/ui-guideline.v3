---
## Journal Entries
---

## Component Card Redesign and Bidirectional Systems-Components Infrastructure

**Date:** 2025-11-19

### Problem

1. **Component Card Design**: The original ComponentCard had a traditional layout with the thumbnail inside the card and content below it. This design didn't utilize the available space effectively and lacked visual impact. The cards appeared small and compressed, even with proper grid layouts.

2. **Redundant URLs**: Component documentation URLs were stored in multiple places (`code-anatomy.yml` with `sourceUrl` field and implicitly needed in system pages), creating maintenance burden and data inconsistency. There was no centralized way to manage these relationships.

3. **Slug Inconsistencies**: System slugs were inconsistent across the codebase (e.g., `baseui` vs `base-ui`, `radixui` vs `radix-ui`), causing mismatches between code-anatomy tabs and actual system data.

4. **Limited Reusability**: No infrastructure existed to query "which systems include component X" or "which components are in system Y" with their documentation URLs. This blocked implementation of features like a "Systems" section in component pages.

5. **astro:content Client-Side Error**: Initial implementation attempted to use `getCollection`/`getEntry` in helper modules that could be imported by client components, causing the error "The 'astro:content' module is only available server-side."

### Solution

**What:**

1. Redesigned ComponentCard with background image, responsive srcset (1x/2x), aspect ratio 4:3, and external label
2. Created bidirectional systems-components infrastructure with:
   - Updated `systemComponents` schema to include `docUrl` for each component
   - Created transformer pattern: pure functions that receive loaded data and transform it
   - Organized transformers by domain: `transformers/systems/` and `transformers/components/`
3. Eliminated redundant `sourceUrl` from `code-anatomy.yml` files
4. Fixed slug inconsistencies across systems and code-anatomy files
5. Made Table of Contents conditional in ComponentDetailLayout to free up space when not needed

**Where:**

- Component redesign: `apps/web/src/components/ui/component-card/component-card.tsx`
- Helper updates: `apps/web/src/common/helpers.ts` (getComponentThumbnailUrl returns object with srcset)
- Schema changes: `apps/web/src/content/config.ts` (systemComponents and codeAnatomy schemas)
- New transformers:
  - `apps/web/src/lib/transformers/systems/component-card.ts`
  - `apps/web/src/lib/transformers/components/systems-for-component.ts`
  - Type definitions in respective `types.ts` files
- Layout fixes: `apps/web/src/components/layouts/component-detail-layout.astro`
- Page integrations:
  - `apps/web/src/pages/systems/[slug].astro`
  - `apps/web/src/pages/components/[slug].astro`
- Component updates for props flow:
  - `apps/web/src/components/composed/client-section-wrapper.tsx`
  - `apps/web/src/components/sections/anatomy/Anatomy.tsx`
  - `apps/web/src/components/sections/anatomy/tabs/code-anatomy-tab.tsx`

**Why:**

- Background image design provides better visual impact and uses space more efficiently
- Responsive srcset ensures optimal image loading on different device resolutions
- Transformer pattern (pure functions receiving loaded data) follows Astro best practices and avoids client-side `astro:content` errors
- Centralized URLs in `systemComponents` provides single source of truth
- Bidirectional infrastructure enables both "systems for a component" and "components for a system" queries
- Organized transformer structure by domain makes code discoverable and maintainable
- Conditional TOC rendering eliminates wasted space on pages that don't need it

### Modified Files

- `apps/web/src/common/helpers.ts`
- `apps/web/src/components/ui/component-card/component-card.tsx`
- `apps/web/src/components/layouts/component-detail-layout.astro`
- `apps/web/src/components/composed/client-section-wrapper.tsx`
- `apps/web/src/components/sections/anatomy/Anatomy.tsx`
- `apps/web/src/components/sections/anatomy/tabs/code-anatomy-tab.tsx`
- `apps/web/src/content/config.ts`
- `apps/web/src/content/systems/types.ts`
- `apps/web/src/lib/transformers/systems/component-card.ts` (new)
- `apps/web/src/lib/transformers/systems/types.ts` (new)
- `apps/web/src/lib/transformers/systems/index.ts` (new)
- `apps/web/src/lib/transformers/components/systems-for-component.ts` (new)
- `apps/web/src/lib/transformers/components/types.ts` (new)
- `apps/web/src/lib/transformers/components/index.ts` (new)
- `apps/web/src/lib/transformers/index.ts` (new)
- `apps/web/src/pages/systems/[slug].astro`
- `apps/web/src/pages/components/[slug].astro`
- `apps/web/src/content/systems/mantine/components.yml`
- `apps/web/src/content/systems/radix-ui/components.yml`
- `apps/web/src/content/systems/base-ui/components.yml`
- All other `apps/web/src/content/systems/*/components.yml` files
- `apps/web/src/content/components/button/code-anatomy.yml`
- `apps/web/src/content/components/calendar/code-anatomy.yml`

### Code Snippets

**Responsive Thumbnail Helper:**

```typescript
export const getComponentThumbnailUrl = (slug: string): { src: string; srcset: string } => {
  const basePath = `/${ASSET_PATHS.ROOT}/components/${slug}/${ASSET_PATHS.COMPONENT_THUMBNAIL}`;
  const src = `${basePath}/dark.png`;
  const srcset = `${basePath}/dark.png 1x, ${basePath}/dark@2x.png 2x`;
  
  return { src, srcset };
};
```

**Updated systemComponents Schema:**

```typescript
const systemComponentSchema = z.object({
  slug: z.string(),
  docUrl: z.string().url(),
});

const systemComponents = defineCollection({
  loader: glob({ pattern: '**/components.yml', base: './src/content/systems' }),
  schema: z.object({
    components: z.array(systemComponentSchema),
  }),
});

export type SystemComponent = z.infer<typeof systemComponentSchema>;
```

**Bidirectional Transformer:**

```typescript
export function getSystemsForComponent(
  componentSlug: string,
  allSystems: CollectionEntry<'systemList'>[],
  allSystemComponents: CollectionEntry<'systemComponents'>[],
): SystemReference[] {
  const systemMap = new Map(allSystems.map((sys) => [sys.data.slug, sys.data.name]));
  
  return allSystemComponents
    .filter(entry => 
      entry.data.components.some(comp => comp.slug === componentSlug)
    )
    .map(entry => {
      const systemSlug = entry.id.split('/')[0];
      const component = entry.data.components.find(c => c.slug === componentSlug);
      return {
        slug: systemSlug,
        name: systemMap.get(systemSlug),
        docUrl: component.docUrl
      };
    });
}
```

**Redesigned ComponentCard:**

```tsx
<div className={classes.componentCard}>
  <a href={`${ROUTES.COMPONENTS}/${slug}`}>
    <div className={classes.thumbnailContainer}>
      <img
        src={thumbnailData.src}
        srcSet={thumbnailData.srcset}
        alt={`${title} component preview`}
        className="transition-transform duration-200 group-hover:scale-105"
      />
    </div>
  </a>
  
  <div className="flex flex-col gap-1.5 ml-1">
    <a href={`${ROUTES.COMPONENTS}/${slug}`}>
      {title}
    </a>
    {externalUrl && (
      <a href={externalUrl} target="_blank" rel="noopener noreferrer">
        {externalLabel ?? 'View docs'}
        <span>↗</span>
      </a>
    )}
  </div>
</div>
```

**CodeAnatomyTab URL Resolution:**

```tsx
const activeLibrarySourceUrl = useMemo(
  () => systemsForComponent?.find((sys) => sys.slug === activeLibrary)?.docUrl,
  [activeLibrary, systemsForComponent],
);
```

### Evidence

- ComponentCard now displays component thumbnails as full background images with 4:3 aspect ratio
- Cards properly expand to fill available grid space (1→2→3 columns responsive)
- External documentation links appear below component names in system detail pages with "View in {System}" labels
- Code Anatomy tabs dynamically show "Doc reference" button with correct URL based on active tab
- Single source of truth for component URLs in `systemComponents` collection
- No linter errors or TypeScript compilation errors
- Transformer pattern successfully avoids `astro:content` client-side errors
- Infrastructure ready for future "Systems" section in component pages
- Slug inconsistencies resolved across all systems and code-anatomy files

---

## Systems Section Redesign and Contributors Type Extraction

**Date:** 2025-11-19

### Problem

1. **Type Reusability**: The `contributors` schema was defined inline within the `systemList` collection schema, making it impossible to reuse the `Contributors` and `FeaturedContributor` types across the application. This led to inconsistent typing when working with contributor data in different components.

2. **System Details Page Layout**: The system details page (`[slug].astro`) lacked a proper overview section. The page needed a redesigned layout with a dedicated overview component that displays system information, logo, and contributors in a structured way.

3. **Component Organization**: Missing reusable components for displaying system avatars and contributor information in a consistent manner across the application.

### Solution

**What:**

- Extracted `contributors` schema into reusable Zod schemas (`featuredContributorSchema` and `contributorsSchema`) and exported their TypeScript types
- Created `SystemOverview` component as the first section of the system details page
- Created `SystemAvatar` and `ContributorAvatar` components for consistent avatar display
- Redesigned the system details page layout to use the new `SystemOverview` component
- Added type exports following the existing pattern used in `components/types.ts`

**Where:**

- Schema extraction and type exports: `apps/web/src/content/config.ts` and `apps/web/src/content/systems/types.ts`
- New components: `apps/web/src/components/composed/system-overview.tsx`, `apps/web/src/components/composed/system-avatar.tsx`
- Page redesign: `apps/web/src/pages/systems/[slug].astro`
- Component exports: `apps/web/src/components/composed/index.ts`

**Why:**

- Following the existing pattern (similar to `Layer` and `DesignLayers` types) ensures consistency across the codebase
- Extracting types allows for type-safe usage of `Contributors` and `FeaturedContributor` anywhere in the application
- The `SystemOverview` component provides a clean, reusable way to display system information
- Centralizing type exports in `systems/types.ts` makes it easy to import types from a single location

### Modified Files

- `apps/web/src/content/config.ts`
- `apps/web/src/content/systems/types.ts`
- `apps/web/src/pages/systems/[slug].astro`
- `apps/web/src/components/composed/system-overview.tsx`
- `apps/web/src/components/composed/system-avatar.tsx`
- `apps/web/src/components/composed/index.ts`

### Code Snippets

**Type Extraction in config.ts:**

```typescript
/**
 * Featured Contributor Schema
 */
const featuredContributorSchema = z.object({
  name: z.string(),
  siteUrl: z.string().url(),
  avatarUrl: z.string().url(),
});

/**
 * Contributors Schema
 */
const contributorsSchema = z.object({
  featured: z.array(featuredContributorSchema),
  totalCount: z.number().optional(),
});

export type FeaturedContributor = z.infer<typeof featuredContributorSchema>;
export type Contributors = z.infer<typeof contributorsSchema>;

// Used in systemList schema
const systemList = defineCollection({
  // ...
  schema: z.object({
    // ...
    contributors: contributorsSchema,
    // ...
  }),
});
```

**Type Exports in systems/types.ts:**

```typescript
import type { CollectionEntry } from 'astro:content';

// Re-export types from config.ts
export type { Contributors, FeaturedContributor } from '../config';

// Types derived from Astro Collections
export type SystemListEntry = CollectionEntry<'systemList'>;
export type SystemComponentsEntry = CollectionEntry<'systemComponents'>;

// Extracted data types for easier use in components
export type SystemListData = SystemListEntry['data'];
export type SystemComponentsData = SystemComponentsEntry['data'];

// Alias for backward compatibility
export type SystemsData = SystemListData;
```

**SystemOverview Component:**

```typescript
import type { Contributors } from '@content';

export interface SystemOverviewProps {
  slug: string;
  name: string;
  description: string;
  contributors: Contributors;
}

export const SystemOverview = ({ slug, name, description, contributors }: SystemOverviewProps) => {
  const thumbnailUrl = getSystemThumbnailUrl(slug, 'ghost');

  return (
    <section className={classes.container}>
      <div className="flex items-center gap-4">
        {thumbnailUrl && <SystemAvatar src={thumbnailUrl} alt={name} fallback={name.charAt(0)} />}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Contributors display */}
          </div>
        </div>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
    </section>
  );
};
```

**Updated System Details Page:**

```astro
<SystemsLayout
  title={`${entry.data.name} | UI Guideline`}
  description={`${entry.data.description}`}
  currentSlug={entry.data.slug}
>
  <div class="flex flex-col gap-16">
    <SystemOverview
      client:load
      slug={entry.data.slug}
      name={entry.data.name}
      description={entry.data.description}
      contributors={entry.data.contributors}
    />

    <!-- System Components -->
    <section class="flex flex-col gap-3">
      {/* ... */}
    </section>
  </div>
</SystemsLayout>
```

### Evidence

- Types can now be imported and used throughout the application:
  ```typescript
  import type { Contributors, FeaturedContributor, SystemListData } from '@/content/systems/types';
  ```
- The `SystemOverview` component is successfully integrated as the first section of the system details page
- TypeScript compilation passes without errors related to the new types
- The component follows the existing design patterns and uses TailwindCSS classes for styling
- All components are properly exported and accessible through the `@composed` alias

---

# Product Journal TEMPLATE

This journal tracks problems encountered during development and their solutions. It serves as a knowledge base to inform future development decisions and avoid repeating past mistakes.

## Important Instructions

**CRITICAL: New entries MUST be added at the TOP of the "Journal Entries" section below, immediately after this header section. Entries are ordered chronologically with the most recent first.**

When adding a new entry:

1. Place it at the very top of the "Journal Entries" section
2. Follow the exact format shown in the template below
3. Include all required sections: Date, Feature Name, Problem, Solution, Modified Files, Code Snippets, and Evidence

## Entry Template

````markdown
---

## [Feature Name - Descriptive Title]

**Date:** YYYY-MM-DD

### Problem

[Detailed description of the problem encountered, including context and why it was an issue]

### Solution

**What:** [What was done to solve the problem]
**Where:** [Where in the codebase the changes were made]
**Why:** [Why this solution was chosen and how it addresses the problem]

### Modified Files

- `path/to/file1.ts`
- `path/to/file2.tsx`
- `path/to/file3.ts`

### Code Snippets

[Relevant code blocks showing key changes, not the complete code, just references]

```typescript
// Example of key change
export const example = () => {
  // Solution implementation
};
```
````

### Evidence

[Proof that the problem was resolved - could be test results, screenshots descriptions, or verification steps]
