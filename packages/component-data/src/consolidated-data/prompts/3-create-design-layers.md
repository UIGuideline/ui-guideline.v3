# Create Design Layers Structure

## Context

The goal of this project is to aggregate, standardize, and compare the wisdom of the top 10 UI libraries (like Radix UI, Ark UI, Chakra UI, etc.). After extracting raw data from each library, we need to consolidate this information into a single, unified component definition that represents the "standard" or "best practice" across all systems.

## Your Objective

Transform the consolidated component data from `ui-guideline.yml` (code structure) into `design-layers.yml` (Figma design structure) to guide designers building design systems from scratch.

## Core Principle

**Not all code components translate directly to Figma layers.** Some components exist purely for semantic/programmatic reasons in code, while design focuses on visual hierarchy.

---

## Transformation Criteria

### 1. Component Type Analysis

Analyze each component in `ui-guideline.yml` by its `standard_role` and determine its design layer equivalent:

| Code Role     | Design Translation                              | Reasoning                                           |
| ------------- | ----------------------------------------------- | --------------------------------------------------- |
| `root`        | `component`                                     | Main component container                            |
| `trigger`     | `instance`                                      | Usually references another component (e.g., Button) |
| `content`     | `frame` or `autoLayout`                         | Container for items, typically floating             |
| `item`        | `component` (if variants exist) or `autoLayout` | Interactive element, check for variants             |
| `group`       | **Analyze context**                             | May be semantic-only in code                        |
| `label`       | `text`                                          | Non-interactive text layer                          |
| `separator`   | `component`                                     | Reusable divider component                          |
| `arrow`       | `component`                                     | Reusable arrow/pointer component                    |
| `sub-menu`    | `component`                                     | Nested menu structure                               |
| `sub-trigger` | `variant` of parent item                        | Triggers submenu                                    |
| `sub-content` | `frame` or `autoLayout`                         | Container for submenu items                         |

### 2. Semantic vs Visual Components

**Question to ask:** "Would a designer create this as a visible layer in Figma, or is it just a semantic grouping in code?"

#### Examples:

**Semantic-only (code concept, not a design layer):**

- `MenuGroup` - In code it groups items for HTML structure, but in design the items just sit in MenuContent with optional MenuLabel headers
- Event handlers (`onSelect`, `onOpenChange`) - Pure code logic
- State props (`open`, `checked`, `value`) - Programmatic state

**Visual (actual design layer):**

- `MenuItem` - You see and design this
- `MenuSeparator` - Visual divider you design
- `MenuContent` - The floating container you design

### 3. Variant Detection Rules

#### Rule 3.1: Identify Variant Families

Components that are **variants of the same base component** rather than separate components:

**Pattern to detect:**

- Multiple components with similar naming (e.g., `MenuItem`, `MenuCheckboxItem`, `MenuRadioItem`)
- Shared base functionality with different interaction modes
- Same visual structure with added/different indicators

**Action:** Nest as variants under the base component

```yaml
# ❌ WRONG - separate components
- MenuItem
- MenuCheckboxItem
- MenuRadioItem

# ✅ CORRECT - variants of MenuItem
- component: MenuItem
  variants:
    - Default
    - Checkbox
    - Radio
```

#### Rule 3.2: Remove Single Variants

If a component has only ONE variant (usually "Default"), remove the variant layer entirely.

```yaml
# ❌ WRONG - unnecessary variant layer
- component: Menu
  children:
    - variant: Default # Only one variant
      children: ...

# ✅ CORRECT - no variant layer needed
- component: Menu
  children: ...
```

### 4. Props Exclusion

**DO NOT represent these in design layers:**

- Event handlers (`onSelect`, `onOpenChange`, `onEscapeKeyDown`)
- State management (`open`, `defaultOpen`, `checked`, `value`)
- Render props (`asChild`, `forceMount`)
- Positioning logic (`side`, `sideOffset`, `align`, `alignOffset`)
- Interaction flags (`disabled`, `loop`)

**Instead:** Mention them in the `description` field to inform designers/LLMs how they work in code.

### 5. Layer Type Selection

Choose the appropriate Figma layer type:

| Design Layer Type | When to use                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| `component`       | Reusable design component with potential variants                       |
| `variant`         | Different states/types of the same component (ONLY when multiple exist) |
| `instance`        | Reference to another component (e.g., Button, Icon)                     |
| `frame`           | Container/wrapper without specific layout                               |
| `autoLayout`      | Container with auto-layout properties (stacking, spacing)               |
| `text`            | Text layer (labels, item text)                                          |
| `group`           | Logical grouping of layers (use sparingly)                              |

---

## Step-by-Step Process

### Step 1: Pre-Analysis of ui-guideline.yml

Before creating design-layers.yml, answer these questions:

1.  **Identify the root component** - This becomes the main component node
2.  **List all anatomy items** - All components in the `anatomy` array
3.  **Detect variant families** - Find components that should be variants (similar names, similar structure)
4.  **Identify semantic-only components** - Components that don't need design layers (pure wrappers/grouping)
5.  **Map visual hierarchy** - How components nest in the actual UI (based on the `code` example)

### Step 2: Create Core Structure

Start with the root component and work outward:

```yaml
layers:
  - type: 'component'
    name: '[RootComponentName]'
    description: '[Component purpose. Note: props X, Y, Z are programmatic]'
    children:
      # Build from here
```

### Step 3: Build Visual Hierarchy

Follow the nesting from the `code` example in ui-guideline.yml, but:

- **Skip semantic-only wrappers** (like MenuGroup if it's just for HTML structure)
- **Nest variants** under their base component when multiple related components exist
- **Use instances** for components from other parts of the design system (Button, Icon)

### Step 4: Add Descriptions

Each layer should have a description that:

1.  **Explains its visual purpose** (what designers see/create)
2.  **References code props if relevant** (but doesn't represent them as layers)
3.  **Clarifies variant relationships** (e.g., "use Radio variant of MenuItem within RadioGroup")

### Step 5: Validation Checklist

Before finalizing, verify:

- [ ] All components from `ui-guideline.yml` are either:
  - Represented as design layers, OR
  - Explained in descriptions (if semantic-only)
- [ ] No single-variant components (remove unnecessary `variant:` Default layers)
- [ ] Variant families are nested correctly (CheckboxItem is variant of Item, not separate)
- [ ] Layer types match Figma reality (component, instance, frame, autoLayout, text)
- [ ] No props are represented as layers (only in descriptions)
- [ ] The visual hierarchy matches the `code` example structure

---

## Special Cases

### Group Components

**Question:** Is this group visible in design, or just semantic in code?

**If semantic-only (common):**

```yaml
# DON'T create MenuGroup as a layer
# Instead, items sit directly in MenuContent with optional MenuLabel headers
```

**If visual/has variants (less common):**

```yaml
# Create as component with variants
- type: 'component'
  name: 'MenuGroup'
  children:
    - variant: Default
    - variant: RadioGroup
```

**Decision criteria:**

- Does it have visual styling in the design?
- Does it have variants (Default, RadioGroup, etc.)?
- Or is it just grouping `<div>` wrapper in code?

### Indicator Components

Components like `MenuItemIndicator` that conditionally render checkmarks/radio dots:

**DON'T create as separate components**

Instead, include them as instances within their parent variant:

```yaml
- variant: Checkbox
  children:
    - type: instance
      name: CheckboxIndicator
      description: 'Visibility controlled by MenuItemIndicator in code'
```

### Sub-components

SubTriggers should be **variants** of the main item, not separate components:

```yaml
# MenuItem component
- variant: Default # Regular item
- variant: SubTrigger # Opens submenu
```

---

## Output Format

```yaml
layers:
  - type: 'component'
    name: 'ComponentName'
    description: 'Clear description of purpose and visual role. Mention programmatic props if relevant but not represented in layers.'
    children:
      - type: 'instance|frame|autoLayout|text|component'
        name: 'ChildName'
        description: 'Description...'
        children: # If applicable
          - type: 'variant' # ONLY if multiple variants exist
            name: 'VariantName'
            description: 'Description...'
            children: ...
```

---

## Examples Reference

- **Button**: `/apps/web/src/content/components/button/design-layers.yml`
- **Menu**: `/apps/web/src/content/components/menu/design-layers.yml` (after refinement)

---

## Non-Negotiable Acceptance Criteria

The transformation is considered successful if and only if all the following criteria are met:

1. **Design layers accurately reflect Figma structure, not code semantics.**
   - Visual components are represented as layers
   - Semantic/programmatic components are excluded or explained in descriptions

2. **Variant families are correctly nested.**
   - for example,Components like `MenuCheckboxItem`, `MenuRadioItem` are variants of `MenuItem`
   - Group variants like `RadioGroup` are variants of `MenuGroup`

3. **No single-variant components are present.**
   - If a component has only one variant ("Default"), remove the variant layer entirely
   - Keep components flat without unnecessary nesting

4. **Semantic-only components are explicitly excluded or explained.**
   - Components that exist purely for HTML structure (like `MenuGroup` in most cases) should not be design layers
   - If excluded, their purpose should be explained in parent component descriptions

5. **Code props are mentioned in descriptions, never as layers.**
   - Props like `open`, `onSelect`, `disabled`, `asChild` are referenced in descriptions
   - No props should appear as separate design layer nodes

6. **All layer types match Figma primitives.**
   - `component`, `variant`, `instance`, `frame`, `autoLayout`, `text`, `group` are used correctly
   - Each type corresponds to its actual Figma usage

7. **Visual hierarchy matches the code example structure.**
   - Nesting in `design-layers.yml` reflects nesting in the `code` block from `ui-guideline.yml`
   - After applying semantic filtering rules

8. **Designers can use this to create the component in Figma.**
   - Clear layer names and types
   - Descriptive explanations of each layer's purpose
   - Obvious variant relationships

9. **LLMs can understand both visual and code relationships.**
   - Descriptions bridge the gap between design layers and code props
   - Clear explanations of what's design vs what's code

10. **🔍 REVERSE ENGINEERING TEST (Critical Validation)**
    - **Test**: Starting from the resulting `design-layers.yml` structure, perform reverse engineering to reconstruct the component's code anatomy
    - **Success Criteria**: The reconstructed anatomy should match the original `ui-guideline.yml` anatomy with ~98% accuracy
    - **What this means**:
      - All essential components from `ui-guideline.yml` can be identified in `design-layers.yml` (either as layers or mentioned in descriptions)
      - The hierarchy/nesting is clear enough to understand parent-child relationships
      - Variant relationships are obvious (e.g., Checkbox variant → MenuCheckboxItem component)
      - The transformation is bidirectional and lossless
    - **If reverse engineering is difficult or ambiguous**, something was done wrong in the transformation
    - This is the ultimate test of clarity and correctness

**Example of Reverse Engineering Test**:

```yaml
# design-layers.yml has:
- component: MenuItem
  variants:
    - Default
    - Checkbox
    - Radio

# Should reverse engineer to:
anatomy:
  - library_name: MenuItem          # From variant: Default
  - library_name: MenuCheckboxItem  # From variant: Checkbox
  - library_name: MenuRadioItem     # From variant: Radio
```

If you can't confidently map design layers back to code anatomy, the structure needs refinement.

---

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "modal", "tooltip"]

**Consolidated Data Location**: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`

## Output

Create the design layers file at: `apps/web/src/content/components/[component-name]/design-layers.yml`

---

**Best model**: Claude Opus 4.5 (Thinking)
**Platform**: Google Antigravity
