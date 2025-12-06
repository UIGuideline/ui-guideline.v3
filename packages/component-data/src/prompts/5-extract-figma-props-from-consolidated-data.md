# Extract Figma Props from Consolidated Data

## Context

We need to provide designers with a "Props Table" that speaks their language (Figma), mapped from our code documentation. This helps align design and development.

## Your Objective

Extract properties from `ui-guideline.yml` that are relevant to design (where `context` is 'both' or 'figma') and translate them into Figma terminology.

---

## ⚠️ IMPORTANT: Figma Taxonomy

There are TWO distinct taxonomies in Figma. Do NOT confuse them:

### Table 1: Figma Elements (UI Elements) - The Layers Panel

These are the visual nodes/layers in the Figma canvas. Use this table to determine the **component's `type`** field.

| Type | Figma Element | Description | Code Equivalent |
|------|---------------|-------------|-----------------|
| `frame` | Frame | Main container with dimensions, styling, and can clip content | `<div>`, `<section>` |
| `autoLayout` | Auto Layout | Frame with smart layout (spacing, padding, alignment) | `display: flex` |
| `group` | Group | Folder to move items together, no styling | Fragment `<>`, avoid in code |
| `component` | Main Component | Master definition of a reusable UI element | `export const Button = ()` |
| `instance` | Instance | A copy of a component, inherits from Main Component | `<Button size="lg" />` |
| `text` | Text | Text layer | `<h1>`, `<p>`, `<span>` |
| `vector` | Vector/Union | Custom icons or shapes | `<svg>`, `<path>` |

### Table 2: Figma Component Properties (Props) - The Properties Panel

These are the configurable properties exposed to designers. Use this table to determine each **prop's `type`** field.

| Type | Description | Code Equivalent |
|------|-------------|-----------------|
| `boolean` | Shows/hides a layer (on/off toggle) | `{showIcon && <Icon />}` or `isDisabled={true}` |
| `text` | Free-form text content or numeric values | `label="Enviar"` or `width={24}` |
| `instanceSwap` | Swap a nested component for another from the library | `icon={<DownloadIcon />}` |
| `variant` | Distinct visual states or styles (enums) | `variant="primary"` or `size="lg"` |
| `slot` | Placeholder area for children content | `<Modal>{customContent}</Modal>` or `<div>{children}</div>` |
| `documentationOnly` | Props that exist only in documentation (callbacks, handlers, offsets, etc.) | `onClick` or `sideOffset` |

### 🚨 Limitations

- **Numbers**: Figma has no native "Number Property". Use `text` as workaround.

---

## Task

For each component in the `anatomy` section:

### Step 1: Filter
Select only props where `context` is `'both'` or `'figma'`. Ignore `'code'` only props.

### Step 2: Determine Component Type
Using **Table 1 (Figma Elements)**, determine what type of Figma element this component represents:
- Is it the main component? → `component`
- Could it be a reusable component? → `instance`
- Is it a container? → `frame` or `autoLayout` 
- Is it text content? → `text`
- Is it a shape? → `vector`

### Step 3: Map Each Prop Type
For each prop, using **Table 2 (Figma Component Properties)**, determine the correct type:

| If Code Is... | Then Figma Prop Type Is... |
|-------------|---------------------------|
| `boolean` (simple true/false toggle) | `boolean` |
| Enum/Union (`'sm' \| 'md' \| 'lg'`) | `variant` (include `values` array) |
| `string` or `number` | `text` |
| `ReactNode` | `instanceSwap` |
| `children` | `slot` |
| Callbacks, Offsets, or none of the above props (`onClick`, `onSubmit`, `sideOffset`, `alignOffset`) | `documentationOnly` |

### Step 4: Format Output
Create a YAML entry for each prop following the Output Structure.

---

## Output Structure

```yaml
- component: ComponentName
  type: 'instance' | 'component' | 'frame' | 'autoLayout' | 'group' | 'text' | 'vector'  # From Table 1
  props:
    - name: 'Figma Property Name'  # Title Case (e.g., "Show Icon", "Size")
      type: 'variant' | 'boolean' | 'text' | 'instanceSwap' | 'slot' | 'documentationOnly'  # From Table 2
      values: ['Option1', 'Option2']  # Required ONLY for variant type
      defaultValue: 'Default Value'
      description: 'Description for the designer.'
      required: false
      codeProp: 'originalCodePropName'  # Reference to the code prop
```

---

## Translation Guidelines

- **Naming**: Use Title Case for property names ("Left Icon" not "leftIcon")
- **Defaults**: Humanize values (`true` → `True`, `"sm"` → `"Small"`)
- **Values**: For `variant` types, list ALL possible options with Title Case
- **documentationOnly**: Use for callbacks, handlers, and code-only props that designers should know about but cannot implement

---

## Reference Example

**Input (Code)**:

```yaml
- name: 'disabled'
  type: 'boolean'
  default: 'false'
  required: false
  context: 'both'

- name: 'size'
  type: '"sm" | "md" | "lg"'
  default: '"md"'
  required: false
  context: 'both'

- name: 'label'
  type: 'string'
  default: '-'
  required: false
  context: 'both'

- name: 'leftIcon'
  type: 'ReactNode'
  default: '-'
  required: false
  context: 'both'

- name: 'onClick'
  type: '() => void'
  default: '-'
  required: false
  context: 'both'
```

**Output (Figma)**:

```yaml
- component: Button
  type: 'component'
  props:
    - name: 'Disabled'
      type: 'boolean'
      defaultValue: 'False'
      description: 'Toggles the disabled state of the button.'
      required: false
      codeProp: 'disabled'

    - name: 'Size'
      type: 'variant'
      values: ['Small', 'Medium', 'Large']
      defaultValue: 'Medium'
      description: 'Controls the size of the button.'
      required: false
      codeProp: 'size'

    - name: 'Label'
      type: 'text'
      defaultValue: '-'
      description: 'The text content of the button.'
      required: false
      codeProp: 'label'

    - name: 'Left Icon'
      type: 'instanceSwap'
      defaultValue: '-'
      description: 'Slot for the left icon component.'
      required: false
      codeProp: 'leftIcon'

    - name: 'On Click'
      type: 'documentationOnly'
      defaultValue: '-'
      description: 'Handler called when the button is clicked.'
      required: false
      codeProp: 'onClick'
```

---

## Non-Negotiable Acceptance Criteria

1. Only include props with `context: 'both'` or `context: 'figma'`.
2. Use the exact Output Structure provided.
3. Transform prop names to Title Case (human readable).
4. Component `type` MUST come from **Table 1** (Figma Elements).
5. Prop `type` MUST come from **Table 2** (Figma Component Properties).
6. Include `values` array for ALL `variant` types.
7. Use `documentationOnly` for callbacks and handlers (onClick, onSubmit, etc.).

---

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "modal", "tooltip"]

**Location**: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`

## Output

Create the consolidated file at: `apps/web/src/content/components/[component-name]/figma-props.yml`

---

**Best model**: Claude Opus 4.5 (Thinking)
**Platform**: Claude.ai
