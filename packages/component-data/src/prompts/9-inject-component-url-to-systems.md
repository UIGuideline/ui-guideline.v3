# Inject Component URL to Systems

## Context
The goal of this project is to aggregate, standardize, and compare the wisdom of the top 10 UI libraries (like Radix UI, Base UI, shadncn/ui, Chakra UI, etc.). We analyze components based on the "Composition Components" methodology to extract their anatomy and props.

Each design system maintains a `components.yml` file that lists all components available in that system. For each component, we store the `docUrl` which links to the official documentation page for that component within the design system.

This information is extracted from the raw data files where it's stored as `component_url` in the metadata section.

## Your Objective
I will provide you with a component name. Your task is to:
1. Read ALL raw data files from `packages/component-data/src/raw-data/components/[component-name]/` to extract each system's `component_url`.
2. For each system, add or update the entry in `apps/web/src/content/systems/[system-slug]/components.yml` with the component slug and docUrl.

## System Mapping

The raw data files correspond to the following system folders:

| Raw Data File | System Folder |
|---------------|---------------|
| `ariakit.yml` | `ariakit` |
| `ark-ui.yml` | `ark-ui` |
| `base-ui.yml` | `base-ui` |
| `chakra-ui.yml` | `chakra-ui` |
| `hero-ui.yml` | `hero-ui` |
| `mantine-ui.yml` | `mantine` |
| `mui.yml` | `mui` |
| `radix-ui.yml` | `radix-ui` |
| `react-aria.yml` | `react-aria` |
| `shadcn.yml` | `shadcn` |

## Non-Negotiable Acceptance Criteria
1. **Source of Truth**: You MUST use the `component_url` exactly as it appears in the raw data file's metadata section.
2. **Preserve Existing Data**: Do NOT remove or modify any existing component entries in `components.yml`. Only ADD the new component entry if it doesn't exist.
3. **Skip If Exists**: If the component already exists in a system's `components.yml`, skip it (do not duplicate).
4. **Valid YAML**: The resulting files must be valid YAML.
5. **All Systems**: You MUST process ALL 10 systems.
6. **Slug Naming**: Use the component name (lowercase, hyphenated) as the slug (e.g., `menu`, `date-picker`).

## Example Transformation

The following examples demonstrate exactly how the input files should be transformed into the output file.

### Input 1: Raw Data (Source)
File: `packages/component-data/src/raw-data/components/menu/ariakit.yml`

```yaml
metadata:
  system_name: 'Ariakit'
  component_name: 'Menu'
  component_url: 'https://ariakit.org/components/menu'
# ... rest of file
```

### Input 2: Existing Components (Target)
File: `apps/web/src/content/systems/ariakit/components.yml`

```yaml
components:
  - slug: 'button'
    docUrl: 'https://ariakit.org/components/button'
```

### Output: Updated Components
File: `apps/web/src/content/systems/ariakit/components.yml`

```yaml
components:
  - slug: 'button'
    docUrl: 'https://ariakit.org/components/button'
  - slug: 'menu'
    docUrl: 'https://ariakit.org/components/menu'
```

## Input Data
**Component Name**: [INSERT COMPONENT NAME]
**Raw Data Directory**: `packages/component-data/src/raw-data/components/[component-name]/`
**Target Directory**: `apps/web/src/content/systems/`

---

**Best model**: Claude Opus 4.5
**Platform**: Google Gravity
