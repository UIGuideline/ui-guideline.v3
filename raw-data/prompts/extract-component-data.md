# Component Data Extraction Agent

## Context

The goal of this project is to aggregate, standardize, and compare the wisdom of the top 10 UI libraries (like Radix UI, Ark UI, Chakra UI, etc.). We analyze components based on the "Composition Components" methodology to extract their anatomy and props.

## Your Objective

I will provide you with the URL documentation of a specific UI Component. Your task is to analyze the documentation and generate a YAML file that maps the component's anatomy and API reference.

## Non-Negotiable Acceptance Criteria

1. **Empty Props**: If the documentation does not have a Props table (after a thorough search), leave the props key empty.
2. **Respect Prop Order**: You MUST maintain the EXACT order of props as they appear in the documentation. **DO NOT** re-sort them alphabetically or otherwise.
3. **Source Fidelity**: Copy descriptions EXACTLY from the documentation. Do NOT paraphrase, summarize, or translate.
4. **No Guessing Props**: If a prop is not explicitly stated, do not add it.
5. **No Remove Props**: Include ALL props from each Props table.
6. **No Guessing Defaults**: If a default value is not explicitly stated, use `-`.
7. **Anatomy Code Example**: Search for a code example in the documentation that demonstrates the component's structure/anatomy. This is typically found in sections like "Usage", "Example", "Anatomy", or "Composition". Extract this code block EXACTLY as shown and include it in the `code` field.
8. **Strict Output**: Return ONLY the valid YAML code inside a code block. Do not include introductory or concluding text.

## Anatomy Mapping Rules

Identify every sub-component (part) of the anatomy.

- **library_name**: The specific name used by the library (e.g., PopoverAnchor, Trigger, ItemGroup, etc).
- **standard_role**: You must assign a canonical name to normalize the component across libraries. (Examples: root, trigger, content, item, separator, arrow, positioner). Use your best judgment to standardize this.
  - e.g.
    - This is your "absolute truth" field. In Ark UI for example, the component that opens the menu is called `Menu.Trigger`. You assign it `standard_role: trigger`. In Mantine UI, that same component is called `Menu.Target`. You will also assign it `standard_role: trigger`. Result: When you analyze all the Reference UI Libraries, you will filter by `standard_role: trigger` and see that 8 libraries call it "Trigger" and 2 call it "Target". Bingo!
- **is_essential**: Set to true if the component is required for the basic functionality. Set to false if it is optional (like a separator or icon).

## YAML Schema Structure

```yaml
meta:
  library_name: "Name of the Library"
  website_url: "URL of the documentation"
  component_url: "URL of the specific component"
  last_updated: "YYYY-MM-DD"

component:
  name: "Component Name"
  type: "Generic Category (e.g., Dropdown, Modal, Inputs)"

code: |
  <Component.Root>
    <Component.Trigger />
    <Component.Content>
      <Component.Item />
    </Component.Content>
  </Component.Root>

anatomy:
  - library_name: "ExactName.FromLibrary"
    standard_role: "canonical_role_lowercase"
    description: "Exact description from docs."
    is_essential: true/false
    props:
      - name: "propName"
        type: "propType"
        default: "value" or "-"
        description: "Exact description from docs."
```

## Reference Example (Gold Standard)

Use this extracted YAML for the Ark UI Menu component as your style guide for quality and formatting:

```yaml
code: |
  <Menu.Root>
    <Menu.Trigger>Open Menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="new">New File</Menu.Item>
        <Menu.Item value="open">Open File</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>

anatomy:
  - library_name: 'Menu.Root'
    standard_role: 'root'
    description: 'The top-level element that manages the menu state and context.'
    is_essential: true
    props:
      - name: 'closeOnSelect'
        type: 'boolean'
        default: 'true'
        description: 'Whether the menu should close when an item is selected.'
      - name: 'dir'
        type: "'ltr' | 'rtl'"
        default: '-'
        description: "The document's text/writing direction."
```

## Input Data

[INSERT URL OR PASTE DOCUMENTATION TEXT HERE]

## Output

Create the result YAML file on /raw-data/components/[component-name]/[system-name].yml
