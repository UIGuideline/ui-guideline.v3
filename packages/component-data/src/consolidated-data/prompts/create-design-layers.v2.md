# Design Layers Generation Agent

## Context

The goal of this project is to aggregate, standardize, and compare the wisdom of the top 10 UI libraries (like Radix UI, Ark UI, Chakra UI, etc.). After extracting raw data from each library, we need to consolidate this information into a single, unified component definition that represents the "standard" or "best practice" across all systems.

This project aims to bridge the gap between code-based component specifications and visual design implementation in Figma. After consolidating component data into a unified `ui-guideline.yml`, we need to translate this technical specification into a `design-layers.yml` file that designers can use as a blueprint for building components in Figma.

The `design-layers.yml` represents the exact layer hierarchy a designer would see in Figma's left sidebar: frames, auto-layouts, components, variants, instances, text layers, and vectors.

## Your Objective

I will provide you with a consolidated `ui-guideline.yml` file for a component. Your task is to:

1. Analyze the `code` block to understand the component hierarchy and nesting relationships
2. Analyze the `anatomy` section to understand each sub-component's role and properties
3. Generate a `design-layers.yml` file that represents the Figma layer structure

## Non-Negotiable Acceptance Criteria

### 1. Code Block is the Source of Truth for Hierarchy

The `code` block defines **parent-child relationships** between components:

- **Read the JSX structure carefully**: Indentation and nesting in the code block directly maps to layer nesting in Figma
- **Parent components contain child components**: If `<MenuGroup>` wraps `<MenuItem>` in the code, then `MenuGroup` contains `MenuItem` in the layer structure
- **Siblings are at the same level**: Components at the same indentation level in JSX are siblings in the layer hierarchy

**Example**:

```jsx
<Menu>
  <MenuContent>
    <MenuGroup>
      <MenuLabel>...</MenuLabel>
      <MenuItem>...</MenuItem>
    </MenuGroup>
    <MenuSeparator />
  </MenuContent>
</Menu>
```

This tells us:

- `Menu` contains `MenuContent` (type: component)
- `MenuContent` contains `MenuGroup` and `MenuSeparator` (type: autoLayout)
- `MenuGroup` contains `MenuLabel` and `MenuItem` (type: autoLayout)
- `MenuSeparator` does NOT go inside `MenuGroup` (type: instance or frame)
- `MenuLabel` and `MenuItem` are instances of `MenuItem` (type: instance)

### 2. Anatomy Provides Component Details (Not Hierarchy)

The `anatomy` section provides:

- **Props that inform variants**: `disabled`, `checked`, `open` → become Figma variants
- **Props that inform structure**: `orientation` → affects auto-layout direction
- **Descriptions**: Help write meaningful layer descriptions
- **`is_essential`**: Helps determine if a component should always be visible or can be optional

**Do NOT use anatomy array order to determine nesting**. The anatomy is a flat list for documentation purposes.

### 3. Variant Generation Rules

**The anatomy props are your source of truth.** Read each component's props and determine which ones should become Figma variants based on their type and purpose.

#### How to Identify Variant-Generating Props

Look for these patterns in the prop types:

- **Boolean props** (`type: 'boolean'`) → Often represent states or toggles
- **Union/Enum props** (`type: '"a" | "b" | "c"'`) → Often represent visual or positional options
- **Props with "state-like" names**: `disabled`, `checked`, `open`, `selected`, `active`, `loading`, etc.

#### Example Mappings (for reference, not exhaustive)

Here are examples of how props typically translate to Figma variants:

```
Prop: disabled (boolean)
→ Figma: State=Default, State=Disabled

Prop: checked (boolean | 'indeterminate')
→ Figma: Checked=False, Checked=True, Checked=Indeterminate

Prop: orientation ('horizontal' | 'vertical')
→ Figma: Orientation=Horizontal, Orientation=Vertical

Prop: side ('top' | 'right' | 'bottom' | 'left')
→ Figma: Side=Top, Side=Right, Side=Bottom, Side=Left
```

**These are illustrative examples.** Always derive variants from the actual props defined in the component's anatomy.

#### ⚠️ NON-NEGOTIABLE: Respect Prop Names Exactly

**Always use the exact prop name from the anatomy table as the variant property name.**

- If the prop is called `side` → use `Side=Top`, NOT `Position=Top`
- If the prop is called `align` → use `Align=Start`, NOT `Alignment=Start`
- If the prop is called `checked` → use `Checked=True`, NOT `Selected=True`

**Why this matters**: The prop names in `ui-guideline.yml` have been standardized through analysis of 10+ design systems. Changing them breaks consistency between code and design specifications.

**Interactive components** (items, triggers) should include hover and focused states:

- `State=Default`, `State=Hover`, `State=Focused`, `State=Disabled`

**Combine variants** when multiple boolean props exist:

- `State=Default, Checked=False`
- `State=Default, Checked=True`
- `State=Hover, Checked=False`
- `State=Hover, Checked=True`

### 4. Layer Type Mapping

Use these layer types to match Figma's layer panel:

| Type         | Figma Equivalent  | When to Use                                                                       |
| ------------ | ----------------- | --------------------------------------------------------------------------------- |
| `component`  | Component         | Main Figma Component                                                              |
| `variant`    | Variant           | Specific state/configuration of a "component"                                     |
| `instance`   | Instance          | Reference to another component, generally a inner component of a main "component" |
| `autoLayout` | Auto Layout Frame | Container with automatic child arrangement                                        |
| `frame`      | Frame             | Generic container without auto-layout                                             |
| `group`      | Group             | Non-structural grouping (rare, prefer frames)                                     |
| `text`       | Text              | Text layer                                                                        |

### 5. Structural Decisions

**When to use `autoLayout`**:

- Container has multiple children that stack (vertical or horizontal)
- Always specify `direction: 'vertical'` or `direction: 'horizontal'`

**When to use `frame`**:

- Fixed-size containers (like indicator slots)
- Containers where children are absolutely positioned

**When to use `instance`**:

- Referencing icons from an icon library
- Referencing other components (like Button inside MenuTrigger)
- Child components that are themselves full components

**When to mark `optional: true`**:

- Icons that may or may not be present (StartIcon, EndIcon)
- Decorative elements (Arrow)
- Props that have `default: '-'` or are conditionally rendered

### 6. Completeness Rule

The `design-layers.yml` must include **all components from the anatomy** that appear in the code block. If a component exists in anatomy but NOT in the code block:

1. **Check if it's a variant of another component** (e.g., `MenuCheckboxItem` is a variant pattern of `MenuItem`)
2. **Check if it's a structural wrapper** that may be implicit
3. **If genuinely missing from code**: Add it based on its `standard_role` and typical usage

### 7. Component Definition Order

**Define building blocks BEFORE containers.**

1. **Identify leaf components**: Components that don't contain other components (e.g., `MenuItem`, `MenuLabel`, `MenuSeparator`)
2. **Define them first**: These are the building blocks
3. **Then define containers**: Components that contain instances of building blocks (e.g., `MenuGroup`, `MenuContent`)

**Why this matters**: In Figma, you need to create a component before you can use an instance of it. The YAML should reflect this dependency order.

### 8. Nesting via Instances (NOT Component Definitions)

**When a component contains other components, use `instance` type, not nested `component` definitions.**

```yaml
# ✅ CORRECT: MenuGroup contains INSTANCES of MenuItem
- type: 'component'
  name: 'MenuGroup'
  children:
    - type: 'autoLayout'
      name: 'Container'
      children:
        - type: 'instance'
          name: 'MenuItem'
        - type: 'instance'
          name: 'MenuItem'

# ❌ WRONG: Don't nest component definitions
- type: 'component'
  name: 'MenuGroup'
  children:
    - type: 'component' # NO! This should be 'instance'
      name: 'MenuItem'
```

**The hierarchy from the code block determines which instances go inside which containers.**

### 9. Naming Conventions

- **Layer names**: Use PascalCase matching the component name (`MenuTrigger`, `MenuItem`)
- **Variant names**: Use `Property=Value` format (`State=Hover`, `Checked=True`)
- **Internal layers**: Use descriptive names (`Container`, `IconSlot`, `Label`)

## Generation Process (Step-by-Step)

### Phase 1: Hierarchy Extraction

1. Parse the `code` block as a tree structure
2. Identify all parent-child relationships
3. Create a hierarchy map: `{ parent: [children] }`
4. Validate that all anatomy components appear in the hierarchy

### Phase 2: Component Analysis

For each component in the anatomy:

1. Identify its `standard_role`
2. List props that affect variants (boolean states, enums)
3. List props that affect structure (orientation, alignment)
4. Determine if it's a leaf node or container

### Phase 3: Layer Structure Generation

For each component, generate:

1. **Component wrapper** with appropriate type (`component` or `componentSet`)
2. **Variants** based on state-related props
3. **Internal structure** (autoLayout, frames, instances, text)
4. **Child components** as instances or slots

### Phase 4: Validation

1. Verify all anatomy components are represented
2. Check that nesting matches the code block
3. Ensure variants cover all interactive states
4. Validate YAML syntax

## YAML Schema Structure (Output)

```yaml
layers:
  - type: 'componentSet'
    name: 'ComponentName'
    description: 'Brief description of the component set'
    children:
      - type: 'component'
        name: 'SubComponent'
        description: 'Description from anatomy'
        children:
          - type: 'variant'
            name: 'State=Default'
            children:
              - type: 'autoLayout'
                name: 'Container'
                direction: 'horizontal'
                children:
                  - type: 'instance'
                    name: 'Icon'
                    description: 'Icon instance'
                    optional: true

                  - type: 'text'
                    name: 'Label'
                    description: 'Text content'

          - type: 'variant'
            name: 'State=Hover'
            # ... similar structure
```

## Layer Properties Reference

```yaml
# Common properties for all layer types
type: 'component' # Required: layer type
name: 'LayerName' # Required: layer name
description: 'Description' # Optional: explains purpose

# Container-specific properties
children: [] # Child layers
direction: 'horizontal' # For autoLayout: 'horizontal' | 'vertical'

# State properties
optional: true # Layer may not always be present
visible: false # Layer is hidden by default in this variant
```

## Reference Example (Gold Standard)

Input `ui-guideline.yml`:

```yaml
name: 'Menu'
code: |
  <Menu>
    <MenuTrigger>
      <Button>Open</Button>
    </MenuTrigger>
    <MenuContent>
      <MenuGroup>
        <MenuLabel>Section</MenuLabel>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </MenuGroup>
      <MenuSeparator />
    </MenuContent>
  </Menu>

anatomy:
  - library_name: 'MenuTrigger'
    standard_role: 'trigger'
    props:
      - name: 'disabled'
        type: 'boolean'

  - library_name: 'MenuItem'
    standard_role: 'item'
    props:
      - name: 'disabled'
        type: 'boolean'
```

Output `design-layers.yml`:

⚠️ **IMPORTANT**: The output follows the hierarchy from the `code` block. Components that contain other components use `instance` references inside `autoLayout` containers.

```yaml
layers:
  # ============================================
  # BUILDING BLOCKS (leaf components)
  # These are the smallest reusable pieces
  # ============================================

  - type: 'component'
    name: 'MenuItem'
    description: 'Individual menu action'
    children:
      - type: 'variant'
        name: 'State=Default'
        children:
          - type: 'autoLayout'
            name: 'Container'
            direction: 'horizontal'
            children:
              - type: 'instance'
                name: 'StartIcon'
                optional: true

              - type: 'text'
                name: 'Label'

      - type: 'variant'
        name: 'State=Hover'

      - type: 'variant'
        name: 'State=Focused'

      - type: 'variant'
        name: 'State=Disabled'

  - type: 'component'
    name: 'MenuLabel'
    description: 'Non-interactive heading for a group'
    children:
      - type: 'autoLayout'
        name: 'Container'
        direction: 'horizontal'
        children:
          - type: 'text'
            name: 'Label'

  - type: 'component'
    name: 'MenuSeparator'
    description: 'Visual divider between sections'
    children:
      - type: 'frame'
        name: 'Line'

  # ============================================
  # CONTAINER COMPONENTS
  # These contain instances of building blocks
  # ============================================

  - type: 'component'
    name: 'MenuGroup'
    description: 'Groups related menu items with optional label'
    children:
      - type: 'autoLayout'
        name: 'Container'
        direction: 'vertical'
        description: 'Vertical stack containing label and items'
        children:
          # MenuLabel is INSIDE MenuGroup (from code block)
          - type: 'instance'
            name: 'MenuLabel'
            optional: true

          # MenuItems are INSIDE MenuGroup (from code block)
          - type: 'instance'
            name: 'MenuItem'

          - type: 'instance'
            name: 'MenuItem'

  - type: 'component'
    name: 'MenuContent'
    description: 'Popover container that holds all menu items'
    children:
      - type: 'autoLayout'
        name: 'Container'
        direction: 'vertical'
        description: 'Vertical stack containing groups and separators'
        children:
          # MenuGroup is INSIDE MenuContent (from code block)
          - type: 'instance'
            name: 'MenuGroup'

          # MenuSeparator is INSIDE MenuContent, sibling of MenuGroup (from code block)
          - type: 'instance'
            name: 'MenuSeparator'

  - type: 'component'
    name: 'MenuTrigger'
    description: 'Button that toggles the menu'
    children:
      - type: 'variant'
        name: 'State=Default'
        children:
          - type: 'instance'
            name: 'Button'

      - type: 'variant'
        name: 'State=Disabled'
        children:
          - type: 'instance'
            name: 'Button'
```

### Key Principles Demonstrated:

1. **Building blocks first**: Define leaf components (`MenuItem`, `MenuLabel`, `MenuSeparator`) before containers
2. **Containers use instances**: `MenuGroup` contains `instance` of `MenuItem`, not the component definition
3. **Hierarchy matches code**: `MenuGroup` is inside `MenuContent`, `MenuItem` is inside `MenuGroup`
4. **AutoLayout for stacking**: Use `autoLayout` when a container stacks multiple children

## Input

**Consolidated File**: `ui-guideline.yml` (provided below or at path)

## Output

Generate: `design-layers.yml`

---

**Best model**: Claude Opus 4.5 (Thinking)
**Platform**: Claude.ai
