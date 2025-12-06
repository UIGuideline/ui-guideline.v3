# Inject Consolidated Code into Code Anatomy

## Context
We need to finalize the `code-anatomy.yml` file by injecting the official "UI Guideline" code block. This code comes from the consolidated data we've already generated and represents the "gold standard" usage for the component.

## Your Objective
I will provide you with a component name. Your task is to:
1. Read the consolidated data from `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`.
2. Extract the `code` block.
3. Inject this code block as the **FIRST** entry in `apps/web/src/content/components/[component-name]/code-anatomy.yml` with the slug `ui-guideline`.

## Non-Negotiable Acceptance Criteria
1. **Source of Truth**: You MUST use the `code` block exactly as it appears in `ui-guideline.yml`.
2. **First Position**: The `ui-guideline` entry MUST be the very first item in the `code-anatomy.yml` list.
3. **Preserve Existing Data**: Do NOT remove or modify any existing library entries (like `ariakit`, `radix-ui`, etc.) in `code-anatomy.yml`.
4. **Valid YAML**: The resulting file must be valid YAML.
5. **Slug Naming**: The slug for this entry must be exactly `ui-guideline`.

## Example Transformation

The following examples demonstrate exactly how the input files should be transformed into the output file.

### Input 1: Consolidated Data (Source)
File: `packages/component-data/src/consolidated-data/components/menu/ui-guideline.yml`

```yaml
name: 'Menu'
description: '...'
code: |
  <Menu>
    <Menu.Trigger>
      <Button>Open Menu</Button>
    </Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Item 1</Menu.Item>
    </Menu.Content>
  </Menu>
anatomy:
  - ...
```

### Input 2: Existing Code Anatomy (Target)
File: `apps/web/src/content/components/menu/code-anatomy.yml`

```yaml
- slug: ariakit
  code: |
    <MenuProvider>
      <MenuButton>Edit</MenuButton>
      <Menu>...</Menu>
    </MenuProvider>

- slug: radix-ui
  code: |
    <DropdownMenu.Root>
      <DropdownMenu.Trigger />
      ...
    </DropdownMenu.Root>
```

### Output: Final Code Anatomy
File: `apps/web/src/content/components/menu/code-anatomy.yml`

> **Note**: The `ui-guideline` block is inserted at the very top. All other entries (`ariakit`, `radix-ui`) remain unchanged below it.

```yaml
- slug: ui-guideline
  code: |
    <Menu>
      <Menu.Trigger>
        <Button>Open Menu</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Item 1</Menu.Item>
      </Menu.Content>
    </Menu>

- slug: ariakit
  code: |
    <MenuProvider>
      <MenuButton>Edit</MenuButton>
      <Menu>...</Menu>
    </MenuProvider>

- slug: radix-ui
  code: |
    <DropdownMenu.Root>
      <DropdownMenu.Trigger />
      ...
    </DropdownMenu.Root>
```

## Input Data
**Component Name**: [INSERT COMPONENT NAME]
**Consolidated Data**: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`
**Target File**: `apps/web/src/content/components/[component-name]/code-anatomy.yml`

---

**Best model**: Gemini 3 Pro
**Platform**: Google Gravity