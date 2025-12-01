# Component Data Consolidation Agent

## Context

The goal of this project is to aggregate, standardize, and compare the wisdom of the top 10 UI libraries (like Radix UI, Ark UI, Chakra UI, etc.). After extracting raw data from each library, we need to consolidate this information into a single, unified component definition that represents the "standard" or "best practice" across all systems.

## Your Objective

I will provide you with a component name (e.g., "menu", "modal", "tooltip"). Your task is to:

1. Analyze ALL raw data files for this component located in `packages/component-data/src/raw-data/components/[component-name]/`
2. Apply the consolidation criteria defined below
3. Generate a single `ui-guideline.yml` file that represents the consolidated definition

## Non-Negotiable Acceptance Criteria

### 1. Majority Wins (Naming & Core Anatomy)

This rule applies to **all naming decisions** across the component:

- **Component Name**: Use the component name that appears in the majority of systems
  - Example: If 7/10 systems call it "Menu", use "Menu" (not "Dropdown" or "DropdownMenu")
- **Sub-Component Names**: Use the sub-component name that appears in the majority of systems
  - Example: If 8/10 systems call it "MenuTrigger", use "MenuTrigger" (not "MenuTarget" or "MenuButton")
  - Example: If 6/10 systems call it "MenuItem", use "MenuItem" (not "MenuOption")
- **Property Names**: Use the property name that appears in the majority of systems
  - Example: If 7/10 systems use `onOpenChange`, use `onOpenChange` (not `onToggle` or `onChange`)
  - Example: If 8/10 systems use `disabled`, use `disabled` (not `isDisabled`)
- **Core Anatomy**: Identify the essential sub-components that appear in the majority of systems

- **Structure Pattern**: Determine the most common code structure (e.g., Compound Component pattern)

### 2. Value Over Strict Majority (Tiebreaker for Props)

This criterion is **only applied when there's ambiguity or a tie** in prop inclusion:

- **Respect Majority First**: If 6+ systems (out of 10) have a prop, **include it**. If only 2-3 systems have a prop, **exclude it**.

- **Tiebreaker Situations**: When approximately **half of the systems** have a prop and half don't (e.g., 4/10 vs 6/10, or 5/10 vs 5/10), ask yourself:
  - Is this prop valuable for designers or developers?
  - Does it enhance accessibility, customization, or functionality?
  - Is it well-documented and descriptive?
  - Does it appear in high-quality systems (Radix, React Aria, Ark)?
- **Decision Rule**:
  - If the answer is **YES** → Include the prop (even if it's 4/10 or 5/10)
  - If the answer is **NO** → Exclude the prop

- **Examples**:
  - ✅ **Include**: `orientation` prop on `MenuSeparator` appears in 4/10 systems, but it's valuable and descriptive → **INCLUDE**
  - ❌ **Exclude**: `color` prop on `MenuItem` appears in 2/10 systems → **EXCLUDE** (not a tiebreaker, clear minority)
  - ✅ **Include**: `asChild` prop on `MenuLabel` appears in 5/10 systems and enables polymorphic rendering → **INCLUDE**

### 3. Code Block Analysis (Structural Patterns)

- **Analyze Code Examples**: Systematically review the `code` block in each raw data file
- **Identify Patterns**: Look for:
  - Wrapper components (e.g., `Portal`, `Positioner`, `Provider`)
  - Grouping components (e.g., `MenuGroup`, `RadioGroup`)
  - Common structural elements that may not be obvious from `anatomy` alone
- **Update Anatomy**: If a structural component appears frequently in code examples (5+ systems), add it to the consolidated anatomy

### 4. Standard Role Normalization (Comparison Guide)

The `standard_role` field is a **guide to help you identify and compare similar components** across different systems, even when they have different names.

**Purpose**:

- Facilitate finding components that serve the same function across systems
- Enable apples-to-apples comparison despite naming differences
- Make the consolidation process easier and more objective

**How to Use**:

1. **Look at the library name** (e.g., `Menu.Trigger` vs `Menu.Target`)
2. **Check the component's position in the anatomy and code block** - Are they in the same structural position?
3. **Analyze the props** - Do they share similar props (e.g., both have `disabled`, `onClick`)?
4. **Determine the function** - Do they serve the same purpose (e.g., both toggle the menu)?
5. **Assign the same `standard_role`** if they match (e.g., both get `standard_role: trigger`)

**Common Standard Roles** (these will vary by component type):

- `root` - The main container/provider
- `trigger` - Element that opens/toggles the component
- `content` - The main content area that appears
- `item` - Individual items within the component
- `separator` - Visual divider
- `label` - Text label for sections
- `group` - Container for grouping related items
- `arrow` - Pointing arrow decoration
- `positioner` - Positioning/portal wrapper

**Example**:

- Ark UI calls it `Menu.Target` → assign `standard_role: trigger`
- Radix calls it `Menu.Trigger` → assign `standard_role: trigger`
- Now you can easily see: "8 systems use `trigger` as the standard role, so the consolidated name should be `MenuTrigger`"

**Validation**: Use the **anatomy description** and **code block position** to confirm components truly serve the same function before assigning the same `standard_role`.

### 5. General Purpose Anatomy (The 80/20 Rule)

**Exclude specialized or niche components** from the consolidated anatomy, even if they appear in multiple systems. Use `essential: false` to consider not including them in the consolidated anatomy.

- **Focus on the Core**: Only include components that are used in **80-90% of standard implementations**.
- **Exclude Specialized Variants**: Do not include inner components that are specific to advanced or niche use cases unless they are absolutely essential.
  - **Example (Menu)**: Include `MenuItem`, `MenuSeparator`, `MenuLabel`.
  - **Exclude (Menu)**: `MenuCheckboxItem`, `MenuRadioGroup`, `MenuArrow`.
- **Goal**: Create a clean, general-purpose definition that developers can extend. Do not bloat the anatomy with every possible feature.

### 6. Prop Consolidation Rules

- **Type Normalization**: If multiple systems have the same prop with slightly different type definitions, choose the most comprehensive or common one
- **Default Values**: Use the most common default value. If there's a tie, prefer the value from high-quality systems (Radix, shadcn, React Aria)
- **Descriptions**: Write a clear, concise description that captures the essence from multiple systems. Prioritize descriptions from well-documented systems
- **Exclude Niche Props**: Apply the same 80/20 rule to props. If a prop is only for a specialized variant (that we excluded), exclude the prop too.

## Consolidation Process (Step-by-Step)

### Phase 1: Initial Analysis

1. List all raw data files for the component
2. Extract component names from each file
3. Determine the majority component name
4. Extract and compare code structures
5. Identify the consensus code pattern

### Phase 2: Anatomy Consolidation

1. List all `standard_role` values across all systems
2. For each role, count how many systems include it
3. Mark roles as `essential: true` if they appear in 7+ systems
4. Mark roles as `essential: false` if they appear in 3-6 systems
5. **Filter Specialized Components**: Remove any roles that are considered niche or specialized (e.g., checkbox items, submenus) per the "General Purpose Anatomy" rule.
6. Exclude roles that appear in fewer than 3 systems (unless valuable and core)

### Phase 3: Props Consolidation

For each sub-component:

1. Collect all props from all systems that have this `standard_role`
2. For each unique prop name:
   - Count occurrences
   - Compare types, defaults, and descriptions
   - Apply "Value Over Strict Majority" criterion
3. Include prop if it meets ANY of these conditions:
   - Appears in 5+ systems (Majority)
   - Appears in high-quality systems + provides significant value (Value)
   - Is essential for accessibility or core functionality (Essential)

### Phase 4: Code Block Refinement

1. Analyze all `code` blocks from raw data
2. Identify structural components visible in code but not in anatomy
3. Update anatomy to include frequently-used structural components
4. Create a consolidated code example that:
   - Uses the majority component names
   - Demonstrates the common structure
   - Shows grouping patterns (if applicable)
   - Includes essential sub-components

### Phase 5: Final Verification

1. Ensure all anatomy items have correct `standard_role`, `description`, and `is_essential`
2. Verify prop types are valid and consistent
3. Check that the code example is syntactically correct
4. Confirm the YAML is valid

## YAML Schema Structure (Output)

```yaml
name: 'ComponentName'
description: 'A brief description of what this component does.'
code: |
  <Component>
    <ComponentTrigger>
      <Button>Open</Button>
    </ComponentTrigger>
    <ComponentContent>
      <ComponentGroup>
        <ComponentLabel>Section</ComponentLabel>
        <ComponentItem>Item 1</ComponentItem>
        <ComponentItem>Item 2</ComponentItem>
      </ComponentGroup>
    </ComponentContent>
  </Component>

anatomy:
  - library_name: 'Component'
    standard_role: 'root'
    description: 'The root component that manages state.'
    is_essential: true
    props:
      - name: 'open'
        type: 'boolean'
        default: 'false'
        description: 'Whether the component is open.'

      - name: 'onOpenChange'
        type: '(open: boolean) => void'
        default: '-'
        description: 'Event handler called when the open state changes.'

  - library_name: 'ComponentTrigger'
    standard_role: 'trigger'
    description: 'The button that toggles the component.'
    is_essential: true
    props:
      - name: 'asChild'
        type: 'boolean'
        default: 'false'
        description: 'Change the default rendered element for the one passed as a child.'

  - library_name: 'ComponentContent'
    standard_role: 'content'
    description: 'The component that contains the main content.'
    is_essential: true
    props:
      - name: 'align'
        type: '"start" | "center" | "end"'
        default: '"center"'
        description: 'The alignment of the content.'
```

## Reference Example (Gold Standard)

Use this consolidated YAML for the Menu component as your style guide:

```yaml
name: 'Menu'
description: 'A menu displays a list of actions or options that a user can choose.'
code: |
  <Menu>
    <MenuTrigger>
      <Button>Open Menu</Button>
    </MenuTrigger>
    <MenuContent>
      <MenuGroup>
        <MenuLabel>My Account</MenuLabel>
        <MenuSeparator />
        <MenuItem>Profile</MenuItem>
        <MenuItem>Billing</MenuItem>
      </MenuGroup>
    </MenuContent>
  </Menu>

anatomy:
  - library_name: 'Menu'
    standard_role: 'root'
    description: 'The root component that manages the open state of the menu.'
    is_essential: true
    props:
      - name: 'open'
        type: 'boolean'
        default: 'false'
        description: 'The controlled open state of the menu.'

      - name: 'defaultOpen'
        type: 'boolean'
        default: 'false'
        description: 'The default open state when initially rendered.'

      - name: 'onOpenChange'
        type: '(open: boolean) => void'
        default: '-'
        description: 'Event handler called when the open state changes.'

  - library_name: 'MenuTrigger'
    standard_role: 'trigger'
    description: 'The button that toggles the menu.'
    is_essential: true
    props:
      - name: 'asChild'
        type: 'boolean'
        default: 'false'
        description: 'Change the default rendered element for the one passed as a child.'
```

## Input Data

**Component Name**: [INSERT COMPONENT NAME HERE, e.g., "menu", "modal", "tooltip"]

**Raw Data Location**: `packages/component-data/src/raw-data/components/[component-name]/`

## Output

Create the consolidated file at: `packages/component-data/src/consolidated-data/components/[component-name]/ui-guideline.yml`

---

**Best model**: Gemini Pro 3 (High)  
**Platform**: Google Antigravity
