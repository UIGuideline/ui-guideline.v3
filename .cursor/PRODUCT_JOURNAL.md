---
## Journal Entries
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
