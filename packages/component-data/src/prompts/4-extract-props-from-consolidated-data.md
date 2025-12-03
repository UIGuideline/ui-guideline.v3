# Extract Web Props from Consolidated Data

## Context

After consolidating component data into `ui-guideline.yml`, we need to extract the props information for the web application.

## Your Objective

Extract props from `ui-guideline.yml` and create a `props.yml` file for web content.

## Task

For each component in the `anatomy` section:

1. Take `library_name` as `component` name
2. Copy `description`
3. Copy all props

## Output Structure

```yaml
- component: ComponentName
  description: Component description
  props:
    - name: 'propName'
      type: 'type'
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
```

## Non-Negotiable Acceptance Criteria

1. Extract ALL components from `anatomy`
2. Keep prop order as-is
3. Copy field names exactly: `name`, `type`, `default`, `description`

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "modal", "tooltip"]

**Consolidated Data Location**: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`

## Output

Create the props file at: `apps/web/src/content/components/[component-name]/props.yml`

---

**Best model**: Gemini Pro 3
**Platform**: Google Antigravity
