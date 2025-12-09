# Extract Figma Props from Consolidated Data

## Context

We need to provide designers with a "Props Table" that speaks their language (Figma), mapped from our code documentation. This helps align design and development.

## Your Objective

Extract properties from `ui-guideline.yml` that are relevant to design (where `context` is 'both' or 'figma') and translate them into Figma terminology.

---

## ⚠️ IMPORTANT: Figma Taxonomy

There are TWO distinct taxonomies in Figma. Do NOT confuse them:

### Table 1: Figma Elements (UI Elements) - The Layers Panel

These are the visual nodes/layers in the Figma canvas. Use this table to determine the **component's `figmaType`** field.

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

These are the configurable properties exposed to designers. Use this table to determine each **prop's `figmaType`** field.

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
| Callbacks, Offsets, and code-only props that designers should know about but cannot implement in Figma (`onClick`, `onSubmit`, `sideOffset`, `alignOffset`) | `documentationOnly` |

### Step 4: Format Output
Create a YAML entry for each prop following the Output Structure.

---

## Output Structure

```yaml
- component: ComponentName
  description: 'Description'
  figmaType: 'instance' | 'component' | 'frame' | 'autoLayout' | 'group' | 'text' | 'vector'  # From Table 1
  props:
    - name: 'originalPropName'  # Keep original camelCase name from code
      type: 'string' | 'number' | 'boolean' | ['option1', 'option2', 'option3']  # The natural code type
      figmaType: 'variant' | 'boolean' | 'text' | 'instanceSwap' | 'slot' | 'documentationOnly'  # From Table 2
      default: 'Default Value'
      description: 'Description'
      required: false
```

---

## Translation Guidelines

- **Naming**: Keep original prop name in camelCase (e.g., `sideOffset`, `leftIcon`)
- **Type**: Copy the natural code type exactly from the source (`number`, `string`, `boolean`, `ReactNode`, etc.)
- **FigmaType**: Map the code type to the appropriate Figma field type
- **Defaults**: Keep default values as-is from source
- **Description**: Copy the description from the source
- **Required**: Copy the required flag from the source

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
  type: ["sm", "md", "lg"]
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
  description: 'A button component that can be used to trigger actions or navigate to different pages.'
  figmaType: 'component'
  props:
    - name: 'disabled'
      type: 'boolean'
      figmaType: 'boolean'
      default: 'false'
      description: 'Toggles the disabled state of the button.'
      required: false

    - name: 'size'
      type: ["sm", "md", "lg"]
      figmaType: 'variant'
      default: 'md'
      description: 'Controls the size of the button.'
      required: false

    - name: 'label'
      type: 'string'
      figmaType: 'text'
      default: '-'
      description: 'The text content of the button.'
      required: false

    - name: 'leftIcon'
      type: 'ReactNode'
      figmaType: 'instanceSwap'
      default: '-'
      description: 'Slot for the left icon component.'
      required: false

    - name: 'onClick'
      type: '() => void'
      figmaType: 'documentationOnly'
      default: '-'
      description: 'Handler called when the button is clicked.'
      required: false
```

---

## Non-Negotiable Acceptance Criteria

1. Only include props with `context: 'both'` or `context: 'figma'`.
2. Use the exact Output Structure provided.
3. Keep original prop names in camelCase.
4. Include both `type` (code type) and `figmaType` (Figma field type) for each prop.
5. Component `figmaType` MUST come from **Table 1** (Figma Elements).
6. Prop `figmaType` MUST come from **Table 2** (Figma Component Properties).
7. Use `documentationOnly` for callbacks, offsets, and code-only props that designers should know about but cannot implement in Figma.

---

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "modal", "tooltip"]

**Location**: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`

## Output

Create the consolidated file at: `apps/web/src/content/components/[component-name]/figma-props.yml`

---

**Best model**: Claude Opus 4.5 (Thinking)
**Platform**: Claude.ai
