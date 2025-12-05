# Extract Figma Props from Consolidated Data

## Context

We need to provide designers with a "Props Table" that speaks their language (Figma), mapped from our code documentation. This helps align design and development.

## Your Objective

Extract properties from `ui-guideline.yml` that are relevant to design (where `context` is 'both' or 'figma') and translate them into Figma terminology.

## Task

For each component in the `anatomy` section:

1. **Filter**: Select only props where `context` is `'both'` or `'figma'`. Ignore `'code'` only props.
2. **Translate**: Map the code property to a Figma property type and name.
   - **Boolean** (`true/false`) -> **boolean** (e.g., "Show Icon")
   - **Enum** (`'sm' | 'md'`) -> **variant** (e.g., Size=Small, Medium).
   - **String** -> **text** (e.g., Label Text).
   - **Slot/Node** -> **instance** (e.g., Icon Instance).
3. **Format**: Create a YAML entry for each prop.

## Figma Property Types Reference

These are the ONLY valid property types you can use. Do not create custom types or deviate from this list:

### `variant`

**When to use**: For properties with 2+ predefined options that change the visual appearance or structure.
**Examples**:

- Size (Small, Medium, Large)
- Orientation (Horizontal, Vertical)
- Side (Top, Right, Bottom, Left)
- Alignment (Start, Center, End)
- State options that need multiple values (Checked, Unchecked, Indeterminate)

**Why**: Variants in Figma allow designers to swap between different versions of a component visually in the properties panel.

### `boolean`

**When to use**: For simple on/off toggles that control visibility or state.
**Examples**:

- Disabled (True/False)
- Show Icon (True/False)
- Has Label (True/False)

**Why**: Boolean properties in Figma appear as toggle switches, making them intuitive for binary states.

### `text`

**When to use**: For properties that accept free-form text input OR numeric values that designers should specify.
**Examples**:

- Label content
- Placeholder text
- Width/Height values (e.g., '10', '24')
- Offset values (e.g., '0', '8')

**Why**: Text properties allow designers to input custom content or values. Use this for numeric properties like spacing/sizing that aren't predefined variants.

### `instance`

**When to use**: For slots that accept swappable component instances.
**Examples**:

- Left Icon (swap different icon components)
- Avatar (swap different avatar variants)
- Custom content slot

**Why**: Instance Swap properties let designers replace one component with another from the library, maintaining the slot structure.

## Property Type Selection Rules

1. **Enum with 2+ options** → `variant` (ALWAYS include `values` array)
2. **Simple true/false** → `boolean`
3. **Strings or numbers** → `text`
4. **Component slots** → `instance`
5. **If unsure between variant and boolean**: Choose `boolean` for simple toggles, `variant` if you need more than 2 states or if the states have semantic meaning beyond on/off.

## Output Structure

```yaml
- component: ComponentName
  props:
    - name: 'Figma Property Name' # e.g., "State", "Show Icon", "Label"
      type: 'variant' | 'boolean' | 'text' | 'instance'
      usage: 'implementation' | 'documentation'
      values: ['Option1', 'Option2'] # Required for variant type
      defaultValue: 'Default Value'
      description: 'Description for the designer.'
      required: false/true
      codeProp: 'originalCodePropName' # Reference to the code prop
```

## Translation Guidelines

- **States**: If a prop represents a state (like `disabled`, `checked`, `error`), it should be a standalone boolean.
  - _Example_: `disabled` -> Name: "Disabled", Type: "boolean"
- **Naming**: Use Title Case for Figma property names (e.g., "Left Icon" instead of "leftIcon").
- **Defaults**: Ensure the default value matches the Figma type (e.g., `true` -> `True`, `"sm"` -> `"Small"` if renamed).
- **Usage**: Set to 'implementation' if it requires Figma setup (variants, booleans), or 'documentation' if it's informational only.
- **Values**: For variant types, list all possible options in lowercase matching FIGMA_TREE_ICONS naming.

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
```

**Output (Figma)**:

```yaml
- component: Button
  props:
    - name: 'Disabled'
      type: 'boolean'
      usage: 'implementation'
      defaultValue: 'False'
      description: 'Toggles the disabled state of the button.'
      required: false
      codeProp: 'disabled'

    - name: 'Size'
      type: 'variant'
      usage: 'implementation'
      values: ['Small', 'Medium', 'Large']
      defaultValue: 'Medium'
      description: 'Controls the size of the button.'
      required: false
      codeProp: 'size'

    - name: 'Label'
      type: 'text'
      usage: 'documentation'
      defaultValue: '-'
      description: 'The text content of the button.'
      required: false
      codeProp: 'label'
```

## Non-Negotiable Acceptance Criteria

1. Only include props with `context: 'both'` or `context: 'design'`.
2. Use the exact Output Structure provided.
3. Transform prop names to Title Case (human readable).
4. Map types correctly to Figma concepts using lowercase: variant, boolean, text, instance.
5. Set usage to 'implementation' or 'documentation' (lowercase).
6. Include values array for all variant types.

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "modal", "tooltip"]

**Location**: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`

## Output

Create the consolidated file at: `apps/web/src/content/components/[component-name]/figma-props.yml`

---

**Best model**: Claude Opus 4.5 (Thinking)
**Platform**: Claude.ai
