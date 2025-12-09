# Design Layers Generation Agent

## Context
The goal is to bridge the gap between Code Anatomy (how developers implement) and Figma Design (how designers structure layers). We need to generate a `design-layers.yml` that represents the "Design Layers" structure of a component, mimicking the left-hand Layers panel in Figma.

## Your Objective
You will receive two inputs:
1. **Code Anatomy**: A YAML snippet showing the component's hierarchical usage in code.
2. **Figma Props**: A YAML file defining the `figmaType` and props for each sub-component.

Your task is to synthesize these into a `design-layers.yml` that accurately rebuilds the component structure in Figma terms, applying strict rules for descriptions and layer types.

## Non-Negotiable Acceptance Criteria

1. **Hierarchy Integrity**: The nesting in `design-layers.yml` MUST reflect the provided Code Anatomy. If specific items are nested in code, they must be nested in layers.
   - *Exception*: You may flatten or group items (like 'Group') if the Figma Props dictate a specific wrapper behavior, but generally, trust the Code Anatomy for parent-child relationships.
2. **Figma Type Fidelity**: You MUST use the exact `figmaType` defined in the provided `figma-props.yml`. Do not guess.
   - Valid types: `component`, `instance`, `frame`, `autoLayout`, `group`, `text`, `vector`, `variant`.
   - CamelCase rule: ensure you use `autoLayout` or `auto-layout` consistently as per your project configuration (preferred: `autoLayout` matches the schema type often, but check reference).
3. **Description Rules**: Do NOT use generic functional descriptions. You must follow the [Description Blueprint](#description-blueprint) below.
4. **Strict Output**: Return ONLY valid YAML.

## Description Blueprint (The 4 Pillars)

The `description` field is a technical specification for reconstructing the layer in Figma. It must cover these 4 pillars in order:

1.  **Layout Construction**:
    *   Keywords: `Auto Layout (Vertical)`, `Auto Layout (Horizontal)`, `Frame`, `Group`, `Absolute Position`.
2.  **Sizing Constraints**:
    *   Keywords: `Hug contents`, `Fill container`, `Fixed width/height`.
3.  **Styling Intent**:
    *   Keywords: `Background fill`, `Stroke/Border`, `Drop shadow`, `Rounded corners`, `Opacity`, `Ghost`.
4.  **Content/Slots**:
    *   Keywords: `Slot for [X]`, `Text container`, `Wrapper`.

**Examples**:
- ✅ *Correct*: "Auto Layout (Vertical). Sizing: Hug contents. Styling: Surface background + 1px Border. Position: Absolute."
- ❌ *Incorrect*: "This is the content panel that shows options."

## Input Data Format

```yaml
# code-anatomy.yml
code: |
  <Menu>
    <Menu.Trigger />
    <Menu.Content>
       <Menu.Item />
    </Menu.Content>
  </Menu>

# figma-props.yml
- component: Menu.Content
  figmaType: 'autoLayout'
```

## Output Schema Structure

```yaml
layers:
  - figmaType: 'component' # Root typically 'component'
    name: 'Menu'
    description: 'Root container. Component Set. Groups Trigger + Content.'
    children:
      - figmaType: 'instance' # Retrieved from figma-props.yml
        name: 'Trigger' # Shortened name (remove 'Menu.' prefix)
        description: 'Interactive wrapper slot. Auto Layout (Hug contents). Contains the actionable element.'
        
      - figmaType: 'autoLayout'
        name: 'Content'
        description: 'Overlay panel surface. Auto Layout (Vertical). Sizing: Hug contents.'
        children:
          # If code anatomy has children, list them here
          - figmaType: 'instance'
            name: 'Item'
            description: 'Interactive row component. Auto Layout (Horizontal). Sizing: Fill container.'
```

## Process Steps

1.  **Analyze Code Anatomy**: detailed look at nesting.
2.  **Look up Properties**: For each node in code, find its match in `figma-props.yml`.
3.  **Determine Figma Type**: Extract `figmaType` from the props file.
4.  **Write Description**: Apply the 4 Pillars rule based on the type and context.
5.  **Compose Hierarchy**: If the component is a container in code (like `Menu.Content`), map it as a parent `children` array in YAML.
6.  **Strip Prefixes**: Convert `Menu.Item` -> `Item` for the `name` field, but use the full name for lookups.

## Output

Save the result to `apps/web/src/content/components/[component]/design-layers.yml`.

---

**Best model**: Gemini 3 Pro
**Platform**: Google Gravity