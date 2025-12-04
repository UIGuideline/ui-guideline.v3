# Extract Web Props from Consolidated Data

## Context

After consolidating component data into `ui-guideline.yml`, we need to extract the props information for the web application.

## Your Objective

Extract props from `ui-guideline.yml` and create a `code-props.yml` file for web content.

## Task

Iterate through EVERY SINGLE item in the `anatomy` list. Do not skip any.

1. Take `library_name` as `component` name
2. Copy `description`
3. Copy all props

## Field Parsing Rules

1. **`type` Field**:
   - If the type string contains the pipe character `|` (indicating a union type), you MUST parse it into an array of strings.
   - Remove any surrounding quotes from the values.
   - **Example**: `' "a" | "b" '` -> `['a', 'b']`
   - **Example**: `' "start" | "end" '` -> `['start', 'end']`
   - If it is NOT a union type, keep it as a string.

## Output Structure

```yaml
- component: ComponentName
  description: Component description
  props:
    - name: 'propName'
      type: ['value1', 'value2']
      default: 'value'
      description: 'Description'

  - name: 'propName2'
      type: ['value1', 'value2']
      default: 'value'
      description: 'Description'
```

## Reference Example

```yaml
- component: Menu
  description: The root component that manages the open state and context of the menu.
  props:
    - name: 'open'
      type: 'boolean'
      default: 'false'
      description: 'The controlled open state of the menu.'

    - name: 'onOpenChange'
      type: '(open: boolean) => void'
      default: '-'
      description: 'Event handler called when the open state of the menu changes.'

- component: MenuTrigger
  description: The button that toggles the menu.
  props:
    - name: 'asChild'
      type: 'boolean'
      default: 'false'
      description: 'Change the default rendered element for the one passed as a child.'

    - name: 'disabled'
      type: 'boolean'
      default: 'false'
      description: 'Whether the trigger is disabled.'

    - name: 'variant'
      type: ['solid', 'outline']
      default: 'solid'
      description: 'The visual style of the trigger.'
```

## Non-Negotiable Acceptance Criteria

1. Extract ALL components from `anatomy`. If the input has 15 components, the output MUST have 15 components.
2. ZERO DATA LOSS: Do not summarize, do not truncate, do not use "...". Output the full list.
3. Keep prop order as-is
4. Copy field names exactly: `name`, `type`, `default`, `description`
5. Add a space between each prop

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "modal", "tooltip"]

**Consolidated Data Location**: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`

## Output

Create the props file at: `apps/web/src/content/components/[component-name]/code-props.yml`

---

**Best model**: Gemini Pro 3
**Platform**: Google Antigravity
