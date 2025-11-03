# UI Guideline v3 Project Scratchpad

## Background and Motivation

UI Guideline v3 is the next evolution of "The Design System of Design Systems" - a comprehensive platform that consolidates the wisdom of the world's top design systems and UI libraries. The project addresses the time-consuming challenge developers and designers face when researching, defining, and creating UI components by synthesizing patterns from 20+ leading systems (Material Design, Atlassian, shadcn, Radix, BaseUI, Polaris, Blueprint, etc.). Target users include design system creators, frontend developers, UI/UX designers, and product teams who need standardized, well-researched component definitions. Success is measured by reduced research time (from hours to minutes), increased component adoption consistency, and community engagement with the open-source platform.

## Key Challenges and Analysis

**Data Management & Scalability**: Managing 60+ components across 20+ design systems requires robust data architecture and efficient search/filtering capabilities. The current v2 likely has performance bottlenecks with large datasets.

**Content Accuracy & Maintenance**: Keeping component definitions synchronized with evolving design systems is critical. Need automated monitoring for changes in reference systems and community-driven validation.

**User Experience & Discovery**: Users need intuitive ways to browse, search, and compare components. The interface must handle complex filtering (by system, category, props, accessibility features) while remaining simple.

**Technical Architecture**: Using Astro with Content Collections for optimal performance, SEO, and community contributions. Content is the source of truth (MDX + YAML), with modular sections and global catalogs for reusability.

**Community & Open Source**: Transitioning to open source requires establishing contribution guidelines, review processes, and maintaining quality standards while enabling community participation.

## High-Level Task Breakdown

### Phase 1: Foundation & Architecture

1. **Project Setup & Monorepo Structure** - Establish Turborepo with Astro app and all packages
2. **Database & API Setup** - Configure Prisma with Supabase and tRPC API layer
3. **Content Collections Setup** - Configure Astro Content Collections with MDX + YAML structure
4. **Content Schemas & Validation** - Create Zod schemas for content validation and TypeScript types
5. **UI Component Library** - Build shared UI kit with base components (cards, tables, badges, etc.)

### Phase 2: Core Features

6. **Modular Section System** - Build plug-and-play sections (Overview, Anatomy, KPIs, DesignSystems, etc.)
7. **Content Loaders & Registry** - Create section registry and content loading utilities
8. **Search & Filtering System** - Build advanced search with filters for systems, categories, props, accessibility
9. **Component Comparison Tool** - Allow side-by-side comparison of components across different systems

### Phase 3: User Experience

10. **Astro Pages & Layouts** - Build responsive pages with BaseLayout and component templates
11. **Interactive Examples** - Add live code examples and interactive demos using Astro islands
12. **Authentication System** - Implement Supabase auth for community contributions
13. **Form Handling** - Create utilities for content submission and validation

### Phase 4: Community & Scale

14. **Open Source Infrastructure** - Set up contribution guidelines, CI/CD, and review processes
15. **Analytics & Monitoring** - Implement usage tracking and performance monitoring
16. **Content Management** - Build admin interface for content updates and moderation
17. **Performance Optimization** - Optimize for speed, SEO, and scalability

## Project Structure Overview

This monorepo uses Turborepo with PNPM workspaces for the UI Guideline v3 platform:

**Apps:**

- `apps/web/` - Main Astro application with Content Collections (MDX + YAML)

**Packages:**

- `packages/content-schemas/` - Zod schemas and TypeScript types for content validation
- `packages/ui-kit/` - Shared UI component library (cards, tables, badges, etc.)
- `packages/validators/` - Validators and types for YAML/JSON content validation
- `packages/db/` - Prisma database layer with schema and migrations (Supabase)
- `packages/api/` - tRPC API layer with controllers, services, and schemas

**Tooling:**

- `tooling/eslint-config/` - Shared ESLint configuration
- `tooling/tailwind-config/` - Shared Tailwind CSS configuration
- `tooling/typescript-config/` - Shared TypeScript configurations

**Astro App Structure:**

```
apps/ui-guideline/
├── src/
│   ├── content/           # Content Collections (MDX + YAML)
│   │   └── components/
│   │       └── calendar/
│   │           ├── index.mdx
│   │           ├── anatomy.mdx
│   │           ├── kpis.yml
│   │           ├── design-systems.yml
│   │           ├── ui-libs.yml
│   │           ├── props.mdx
│   │           └── accessibility.mdx
│   ├── data/             # Global catalogs (reusable & validated)
│   │   ├── design-systems.yml
│   │   └── ui-libs.yml
│   ├── components/
│   │   ├── sections/     # Plug-and-play sections (islands when needed)
│   │   └── ui/           # Base UI components
│   ├── lib/
│   │   ├── section-registry.ts  # Section orchestrator
│   │   ├── loaders.ts           # YAML/MDX helpers
│   │   ├── auth.ts              # Supabase auth
│   │   └── forms.ts             # Form utilities
│   └── pages/
│       ├── index.astro
│       ├── components/[slug].astro
│       └── auth/
└── layouts/BaseLayout.astro
```

**Key Scripts:**

- `pnpm dev` - Start Astro development server
- `pnpm build` - Build all applications and packages
- `pnpm --filter @ui-guideline/ui-guideline dev` - Run specific package

**Configuration Strategy:** All packages extend configurations from `/tooling` to maintain consistency. Internal dependencies use `workspace:*` protocol.

## Project Status Board

**[DONE] Initialize UI Guideline v3 Project Structure** - Set up Turborepo monorepo with PNPM workspaces - Create apps/web (Astro) directory - Create packages/content-schemas, packages/ui-kit, packages/validators, packages/db, packages/api - Configure tooling packages (eslint, tailwind, typescript) - Set up basic package.json files with workspace dependencies - _Success Criteria:_ `pnpm install` runs successfully, all packages are linked, and `pnpm dev` starts the Astro development environment

**[DONE] Setup Database & API Infrastructure** - Configure Prisma with Supabase database connection - Set up tRPC API layer with Express server - Create basic database schema for users, authentication, and analytics - Implement authentication endpoints and middleware - Set up environment variables and configuration - _Success Criteria:_ Database connection works, tRPC endpoints are functional, and authentication flow is operational

**[DONE] Setup Astro Integration** - Install Astro and configure it alongside existing React setup - Update package.json with Astro dependencies and scripts - Create astro.config.mjs configuration file - Update vite.config.ts to work with Astro - Create basic Astro pages and layouts (BaseLayout, index, components, [slug]) - Create React section components (Overview, Anatomy, Props, Systems, Kpis, Accessibility) - Test the integration and ensure both React and Astro work together - _Success Criteria:_ Astro development server runs successfully, pages load correctly, React components work as Astro islands, and no linting errors

**[DONE] Setup Astro Content Collections Structure** - Configure Astro Content Collections with config.ts - Create content directory structure for components (MDX + YAML) - Set up global data catalogs (design-systems.yml, ui-libs.yml) - Create example component structure (calendar example) - _Success Criteria:_ Content Collections are configured, example content loads correctly, and Astro can read MDX/YAML files

**[DONE] Create Content Schemas & Validation** - Design Zod schemas for component content validation - Create TypeScript types for content structure - Build validators for YAML/JSON content - Set up content validation pipeline - _Success Criteria:_ Content schemas validate correctly, TypeScript types are generated, and validation pipeline catches errors

**[DONE] Fix dynamic sections rendering on `components/[slug]` page** – https://linear.app/ui-guideline/ISSUE-SR-102 - Updated `apps/web/src/lib/section-registry.tsx` to return component factories instead of instantiated elements - Changed `apps/web/src/pages/components/[slug].astro` to render with `<Section />` instead of printing objects - Verified no linter errors and that MDX sections render correctly - _Success Criteria:_ Visiting `/components/calendar` shows real section content (Overview, Anatomy, etc.) without `[object Object]` output

**[DONE] Implement Section Registry Architecture with Dynamic Content Loading** - Created modular section registry system with individual resolvers for each section type (Overview, Anatomy, Props, KPIs, Systems, FigmaKits) - Built content loaders (`findData`, `findMdx`) for YAML and MDX file discovery and loading - Implemented catalog manager with global data loading (`systems.yml`, `figma-kits.yml`) - Created utility functions (`joinBySlug`, `mergeBySlug`) for combining local component data with global catalogs - Set up TypeScript types and interfaces for section modules and component factories - _Success Criteria:_ Section registry dynamically loads and renders content based on available files, global catalogs merge correctly with local component data

**[DONE] Refactor Data Architecture for Consistency** - Standardized both `systems.yml` and `figma-kits.yml` to use `slug` as primary identifier instead of separate `id` fields - Removed parent wrapper objects (`systems:`, `figma-kits:`) to create direct list structures - Updated `mergeBySlug` function to properly combine global catalog data with component-specific references - Implemented consistent data merging for both Design Systems and Figma Kits sections - Updated TypeScript types and resolvers to handle new data structure - _Success Criteria:_ Both global catalogs have consistent structure, mergeBySlug works for all section types, and components receive complete data (global + local)

**[DONE] Centralize Content Schema Validation with Astro Content Collections** - Leverage `content.config.mjs` to define centralized Zod schemas for all content types (components, systems, figma-kits, props, kpis, anatomy) - Create unified TypeScript types generated from Zod schemas to ensure type safety across the entire application - Implement content validation pipeline that validates all YAML and MDX files against defined schemas - Update section resolvers and catalog managers to use centralized types instead of inline type definitions - Set up build-time validation to catch content errors before deployment - _Success Criteria:_ All content files are validated against centralized schemas, TypeScript types are auto-generated and consistent, and validation errors are caught at build time

**[DONE] Build Component Detail Page Structure** - https://linear.app/ui-guideline/ISSUE-SR-106 - Install `@side-ui/table-of-contents` package (`pnpm add @side-ui/table-of-contents`) - Create `ComponentDetailLayout.astro` layout that integrates Sidebar, main content area, and optional TOC - Refactor `[slug].astro` to use the new layout with proper semantic HTML structure - Create `ComponentHeader` component for displaying component title, status, tags, and quick actions - Create `Breadcrumbs` component for contextual navigation (Home > Components > {slug}) - Populate `SideNav` dynamically from content collections to show all available components - Add SEO metadata tags and structured data for better search engine optimization - Integrate `@side-ui/table-of-contents` component with scroll spy functionality for intra-page navigation - _Success Criteria:_ Component detail pages have proper semantic structure, Sidebar/SideNav integration works correctly, navigation is functional, SEO metadata is present, TableOfContents from @side-ui works correctly, and responsive design works on mobile/tablet/desktop

**[DONE] POC: Copy Image and Text Button (SR-118)** - https://linear.app/lol-assistant/issue/SR-118 - Completar investigación de Clipboard API y evaluar alternativas (API nativa con fallbacks graduales elegida) - Crear estructura completa del componente `CopyWithImage` con tipos TypeScript, hook `useCopyWithImage`, y componente UI con tailwind-variants - Implementar estrategia de fallback gradual (imagen+texto → solo imagen → solo texto → error) - Integrar componente en sección `Anatomy` con botones en cada tab (base, code, design) - Crear documentación completa: `CLIPBOARD_API_RESEARCH.md`, `TESTING_GUIDE.md`, y `README.md` del componente - _Success Criteria:_ Componente implementado y funcional, integrado en Anatomy, documentación completa, guía de testing creada para validación manual en diferentes navegadores, funcionalidad viable usando API nativa en Chrome/Edge

## Planner Analysis: Component Detail Page Structure

## Executor Comments or Assistance Requests

**Project Initialization**

- Ready to begin Phase 1 implementation with Astro architecture
- Architecture decision: Astro with Content Collections (MDX + YAML) for optimal performance and community contributions
- Backend: tRPC + Prisma + Supabase for authentication, analytics, and dynamic features
- Content is the source of truth with modular sections and global catalogs
- Need clarification on: Supabase setup details, preferred design system tokens, and initial component examples to migrate

**Recent Implementation Achievements**

**Section Registry & Dynamic Content Loading:**

- Successfully implemented modular section registry with individual resolvers for each content type
- Built robust content loading system that discovers and loads YAML/MDX files dynamically
- Created catalog manager that loads global data catalogs and merges them with component-specific data
- Implemented `mergeBySlug` utility for combining global catalog data with local component references
- All sections now render correctly with proper data merging (Design Systems + Figma Kits)

**Data Architecture Standardization:**

- Refactored both `systems.yml` and `figma-kits.yml` to use consistent structure with `slug` as primary identifier
- Removed redundant `id` fields and parent wrapper objects for cleaner, more maintainable data structure
- Updated all resolvers and utilities to work with the new standardized data format
- Successfully converted JSON objects to YAML format for calendar component (props, anatomy, kpis, systems, figma-kits)

**Content Management:**

- Established working content structure with proper YAML/MDX file organization
- Created example content for calendar component demonstrating all section types
- Implemented proper data merging so components receive both global catalog info and component-specific data

**POC: Copy Image and Text Button (SR-118) - COMPLETADO:**

- ✅ **Investigación Completada**: Clipboard API nativa ES VIABLE para copiar imagen + texto simultáneamente
- ✅ **Navegadores con soporte completo**: Chrome 76+, Edge 90+ (Chromium)
- ✅ **Navegadores con soporte parcial**: Firefox 87+ (requiere permisos), Safari 13.1+ (restricciones de seguridad)
- ✅ **Estrategia implementada**: API nativa con fallbacks graduales (imagen+texto → solo imagen → solo texto → error)
- ✅ **Librerías evaluadas**: clipboard.js (solo texto, no viable), clipboard-polyfill (limitada para imágenes)
- ✅ **Decisión ejecutada**: Implementado con API nativa pura, sin dependencias externas
- ✅ **Componente creado**: `CopyWithImage` en `apps/web/src/components/ui/CopyWithImage/`
  - `types.ts`: Enums y tipos TypeScript (CopyStatus, CopyMode, CopyResult, CopyOptions)
  - `hooks/useCopyWithImage.ts`: Hook con lógica de copiado y fallbacks
  - `CopyWithImage.tsx`: Componente UI con tailwind-variants, estados visuales e iconos de lucide-react
  - `index.ts`: Exports del módulo
- ✅ **Integración**: Agregado en `Anatomy.tsx` con botones en cada tab (base, code, design)
- ✅ **Documentación creada**:
  - `CLIPBOARD_API_RESEARCH.md`: Investigación completa y decisiones técnicas
  - `TESTING_GUIDE.md`: Guía completa de testing para validación manual
  - `CopyWithImage/README.md`: Documentación de API, ejemplos, limitaciones, y best practices
- ✅ **Exportación**: Agregado al `@ui` index para uso en toda la aplicación
- 📝 **Pendiente validación manual**: Testing en navegadores reales (guía provista en TESTING_GUIDE.md)

## Lessons

**Monorepo Best Practices:**

- Always use `workspace:*` for internal package dependencies to ensure version consistency
- Extend configurations from `/tooling` packages to avoid duplication
- Use Turborepo for efficient build caching and parallel execution

**UI Guideline Specific:**

- Content Collections with MDX + YAML provide the perfect balance of flexibility and structure
- Modular sections allow adding/removing content sections without touching page templates
- Global catalogs (design-systems.yml, ui-libs.yml) prevent duplication and ensure consistency
- Section registry pattern enables dynamic content composition based on available files
- Astro islands provide interactivity where needed while maintaining optimal performance
- Backend (tRPC + Prisma + Supabase) handles authentication, analytics, and dynamic features
- Hybrid approach: static content for components, dynamic backend for user features

**Rendering with Astro + React/MDX:**

- When composing dynamic sections, return component factories (not instantiated elements) from registries and render with `<Section />` in Astro to avoid `[object Object]` stringification.

**Data Architecture & Content Management:**

- Use `slug` as the primary identifier for all content types to maintain consistency across global catalogs and component-specific data
- Implement `mergeBySlug` pattern for combining global catalog data with local component references, ensuring components receive complete information
- Structure YAML files as direct lists without parent wrapper objects for cleaner, more maintainable data architecture
- Always validate data structure consistency when adding new content types or modifying existing schemas
- Leverage Astro Content Collections with centralized Zod schemas for type safety and validation across the entire application

**Clipboard API & Browser Compatibility (POC SR-118):**

- Clipboard API con `ClipboardItem` ES VIABLE para copiar imagen + texto en navegadores modernos (Chrome 76+, Edge 90+)
- Implementar estrategia de fallbacks graduales es CRÍTICO para buena UX: intentar imagen+texto → solo imagen → solo texto → error
- No se necesitan librerías externas para funcionalidad básica; API nativa suficiente para POC
- Firefox y Safari tienen soporte parcial; requiere testing manual para validar comportamiento real
- Importantes consideraciones: CORS para imágenes, permisos del navegador, y detección de capacidades
- Para POC, priorizar funcionalidad en navegador objetivo principal (Chrome/Cursor) sobre compatibilidad universal
- Testing manual es esencial; comportamiento varía significativamente entre navegadores y aplicaciones de destino

### Plan B: CopyGroup Component - Dos Botones Separados (SR-118) ✅

**Fecha**: 2025-10-31  
**Estado**: Completado

**Problema**: Después del testing manual del POC, se descubrió que copiar imagen + texto juntos funciona técnicamente, pero tiene comportamiento inconsistente entre aplicaciones:

- ChatGPT y Slack: ✅ Reciben ambos
- Cursor: ⚠️ Solo imagen (pierde texto)
- Figma: ❌ No acepta del clipboard

**Solución**: Implementar dos botones separados con mensaje educativo

```
[📷 Copy Image]  [📝 Copy Prompt]
💡 Copy both for better AI context
```

**Archivos Modificados/Creados**:

1. ✅ `apps/web/src/components/ui/CopyWithImage/types.ts` - Agregado tipo `CopyStrategy`
2. ✅ `apps/web/src/components/ui/CopyWithImage/CopyWithImage.tsx` - Agregada prop `mode?: 'both' | 'imageOnly' | 'textOnly'`
3. ✅ `apps/web/src/components/ui/CopyGroup/CopyGroup.tsx` - Nuevo componente wrapper (~170 líneas)
4. ✅ `apps/web/src/components/ui/CopyGroup/README.md` - Documentación completa (~400 líneas)
5. ✅ `apps/web/src/components/ui/CopyGroup/index.ts` - Exports
6. ✅ `apps/web/src/components/ui/index.ts` - Export de CopyGroup agregado
7. ✅ `apps/web/src/components/sections/Anatomy.tsx` - Integrado CopyGroup (reemplaza CopyWithImage)
8. ✅ `apps/web/POC_SUMMARY.md` - Actualizado con Plan B y resultados
9. ✅ `apps/web/CLIPBOARD_API_RESEARCH.md` - Agregada sección Plan B con decisión
10. ✅ `apps/web/src/components/ui/CopyWithImage/README.md` - Documentada prop `mode`

**Testing**: ✅ Build exitoso sin errores, bundle size +~1.5KB (aceptable)

**Razón de la Decisión**:

- Honestidad > Magia: No prometer lo que no podemos garantizar
- Claridad > Conveniencia: Usuario sabe exactamente qué está copiando
- Funciona siempre > Funciona a veces: Compatible con TODAS las apps
- Predecible > Sorpresivo: Sin comportamientos inesperados

**Preparado para el Futuro**: El componente `CopyWithImage` con `mode="both"` sigue disponible para cuando apps mejoren su soporte. Solo requiere cambiar `<CopyGroup />` por `<CopyWithImage mode="both" />` en Anatomy.tsx.

**Lecciones Aprendidas**:

- Testing real ≠ Testing teórico: La API funciona, pero las apps no cooperan
- UX over Tech: A veces la solución "técnicamente inferior" es mejor UX
- Diseñar para la realidad actual, no para el mundo ideal
