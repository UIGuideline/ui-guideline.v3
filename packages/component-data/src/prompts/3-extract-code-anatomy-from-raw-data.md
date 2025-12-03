# Code Anatomy Extraction Agent

## Context

The goal of this project is to aggregate, standardize, and compare the wisdom of the top 10 UI libraries. After extracting raw component data from each library (which includes anatomy, props, and code examples), we need to create a consolidated code anatomy file that displays side-by-side code comparisons across all systems.

This helps designers and developers understand the structural differences between libraries and choose the pattern that best fits their needs.

## Your Objective

I will provide you with a component name (e.g., "menu", "button", "modal"). Your task is to:

1. Locate ALL raw data files for this component in `packages/component-data/src/raw-data/components/[component-name]/`
2. Extract the `code` block from each raw data YAML file
3. Generate a single `code-anatomy.yml` file that contains all code examples with their corresponding system slugs

## Non-Negotiable Acceptance Criteria

1. **Extract All Libraries**: You MUST include code blocks from ALL raw data files found in the component directory (typically 10 libraries).
2. **Preserve Code Exactly**: Copy the code block EXACTLY as it appears in the raw data file. Do NOT modify, reformat, or optimize it.
3. **Use Correct Slugs**: The slug must match the library's identifier:
   - `ariakit` for Ariakit
   - `ark-ui` for Ark UI
   - `base-ui` for Base UI
   - `chakra-ui` for Chakra UI
   - `hero-ui` for HeroUI
   - `mantine-ui` for Mantine UI
   - `mui` for Material UI
   - `radix-ui` for Radix UI
   - `react-aria` for React Aria
   - `shadcn` for shadcn/ui
4. **Maintain Order**: Process files alphabetically by slug to ensure consistent ordering.
5. **Strict Output**: Return ONLY the valid YAML code. Do not include introductory or concluding text.
6. **No Empty Entries**: If a raw data file doesn't have a code block, skip that library (don't create an empty entry).

## YAML Schema Structure

```yaml
- slug: library-slug
  code: |
    <Component.Root>
      <Component.Trigger />
      <Component.Content>
        <Component.Item />
      </Component.Content>
    </Component.Root>

- slug: another-library-slug
  code: |
    <Component>
      <ComponentTrigger />
      <ComponentContent>
        <ComponentItem />
      </ComponentContent>
    </Component>
```

## Reference Example (Gold Standard)

Use this extracted YAML for the Button component as your style guide for quality and formatting:

```yaml
- slug: shadcn
  code: |
    <Button>
      <PlusIcon /> Add product
    </Button>

- slug: radix-ui
  code: |
    <Button.Root>
      <Button.Icon>
        <PlusIcon />
      </Button.Icon>
      <Button.Label>Add product</Button.Label>
    </Button.Root>

- slug: base-ui
  code: |
    <Button startEnhancer={<PlusIcon />}>
      Add product
    </Button>
```

## Step-by-Step Process

### Phase 1: Locate Raw Data Files

1. Navigate to `packages/component-data/src/raw-data/components/[component-name]/`
2. List all YAML files in the directory
3. Identify the library slug from each filename (e.g., `radix-ui.yml` → slug: `radix-ui`)

### Phase 2: Extract Code Blocks

For each raw data file:

1. Open the file and locate the `code:` field
2. Extract the entire code block (everything after `code: |`)
3. Preserve all indentation, formatting, and syntax exactly as written
4. Store the code block with its corresponding slug

### Phase 3: Generate Output File

1. Sort all extracted code blocks alphabetically by slug
2. Create the output YAML structure with each entry containing:
   - `slug`: The library identifier
   - `code`: The extracted code block (using the `|` literal block scalar)
3. Ensure proper YAML indentation (2 spaces per level)
4. Add a blank line between each library entry for readability

### Phase 4: Final Verification

1. Verify all raw data files were processed
2. Confirm no code blocks were modified
3. Check that YAML syntax is valid
4. Ensure file is created at the correct output path

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "button", "modal"]

**Raw Data Location**: `packages/component-data/src/raw-data/components/[component-name]/`

## Output

Create the result file at: `apps/web/src/content/components/[component-name]/code-anatomy.yml`

---

**Best model**: Gemini Pro 3 (High) or Claude 4.5 Sonnet Thinking  
**Platform**: Google Antigravity
