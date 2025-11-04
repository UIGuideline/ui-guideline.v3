# Contributing to UI Guideline

Thank you for your interest in contributing to UI Guideline! This guide will help you understand how to contribute Design Layers documentation for components.

## Table of Contents

- [Design Layers Overview](#design-layers-overview)
- [What is `design-layers.yml`?](#what-is-design-layersyml)
- [Why Design Layers Matter](#why-design-layers-matter)
- [File Structure](#file-structure)
- [YAML Schema Reference](#yaml-schema-reference)
- [Step-by-Step Guide](#step-by-step-guide)
- [Available Element Types](#available-element-types)
- [Adding New Element Types](#adding-new-element-types)
- [Validation & Build](#validation--build)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## Design Layers Overview

**Design Layers** represent the Figma layer structure of a component in a hierarchical, tree-like format. This allows developers, designers, and AI tools to understand how components are structured in design tools.

### What is `design-layers.yml`?

The `design-layers.yml` file is a YAML document that describes the layer hierarchy of a component as it appears in Figma (or similar design tools). It maps each layer to its type, name, and relationships, creating a visual tree structure that can be rendered in the documentation.

**Location**: Each component has its own `design-layers.yml` file at:

```
apps/web/src/content/components/[component-name]/design-layers.yml
```

### Why Design Layers Matter

1. **Visual Documentation**: Provides a clear, interactive tree view of component structure
2. **Design-Code Alignment**: Bridges the gap between design tools and code implementation
3. **AI Context**: Gives LLMs (like ChatGPT, Claude) clear context about component structure
4. **Developer Onboarding**: Helps developers quickly understand component anatomy
5. **Design System Consistency**: Ensures all team members understand the same structure

---

## File Structure

Each component directory should contain:

```
apps/web/src/content/components/[component-name]/
├── _meta.yml
├── anatomy.yml
├── design-layers.yml    ← Your contribution here!
├── props.yml
├── overview.yml
└── ... (other files)
```

---

## YAML Schema Reference

### Root Structure

```yaml
layers:
  - type: 'component' # Required: Element type
    name: 'Button' # Required: Display name
    description: '...' # Optional: Context for LLMs
    defaultOpen: true # Optional: Initial state (default: false)
    children: # Optional: Child nodes (recursive)
      - type: '...'
        name: '...'
        # ... more nodes
```

### Field Definitions

| Field         | Type      | Required | Default | Description                                                                        |
| ------------- | --------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| `type`        | `string`  | ✅ Yes   | -       | Element type (see [Available Element Types](#available-element-types))             |
| `name`        | `string`  | ✅ Yes   | -       | Display name shown in the tree                                                     |
| `description` | `string`  | ❌ No    | -       | Additional context for documentation and AI tools                                  |
| `defaultOpen` | `boolean` | ❌ No    | `false` | Whether the node should be expanded by default (only applies if `children` exists) |
| `children`    | `array`   | ❌ No    | -       | Array of child nodes (recursive structure)                                         |

### Node Behavior

- **Nodes with `children`**: Rendered as **folders** (collapsible) with a chevron indicator
- **Nodes without `children`**: Rendered as **files** (non-collapsible, leaf nodes)

---

## Step-by-Step Guide

### 1. Choose a Component

Identify the component you want to document. Check if it already has a `design-layers.yml` file:

```bash
apps/web/src/content/components/[component-name]/design-layers.yml
```

If it exists, you can update it. If not, create a new file.

### 2. Analyze the Figma Structure

Open the component in Figma and identify:

- The root component/main frame
- All nested layers (frames, groups, text, instances, etc.)
- The hierarchy of parent-child relationships
- Boolean properties or variants

### 3. Create or Edit the YAML File

Create `design-layers.yml` in the component's directory:

```yaml
# Design Layers for [Component Name]
# This file describes the Figma layer structure

layers:
  - type: 'component'
    name: '[Component Name]'
    description: 'Main component container'
    defaultOpen: true
    children:
      # Add your layer structure here
```

### 4. Document the Hierarchy

Start from the root and work down:

```yaml
layers:
  - type: 'component'
    name: 'Button'
    description: 'Main component container'
    defaultOpen: true
    children:
      - type: 'auto-layout'
        name: 'Container'
        description: 'Auto-layout frame containing label and icon'
        children:
          - type: 'text'
            name: 'Label'
            description: 'Button label text'

          - type: 'instance'
            name: 'Icon'
            description: 'Optional icon component'

      - type: 'boolean'
        name: 'hasIcon'
        description: 'Toggle icon visibility'
```

### 5. Validate Your YAML

Run the build to validate your structure:

```bash
pnpm --filter @ui-guideline/web build
```

If there are errors, the build will fail with clear messages indicating:

- Which file has the issue
- Which field is invalid
- What was expected vs. what was found

### 6. Test Locally

Start the dev server to see your changes:

```bash
pnpm --filter @ui-guideline/web dev
```

Navigate to the component page and check the "Design Anatomy" tab to see your tree structure.

### 7. Submit Your Contribution

1. Commit your changes:

   ```bash
   git add apps/web/src/content/components/[component]/design-layers.yml
   git commit -m "docs: add design layers for [component]"
   ```

2. Push and create a Pull Request

---

## Available Element Types

The following element types are currently supported:

| Type          | Description        | Icon                   |
| ------------- | ------------------ | ---------------------- |
| `component`   | Main Component     | Component icon         |
| `instance`    | Component Instance | Box icon               |
| `variant`     | Component Variant  | Square with mouse icon |
| `frame`       | Frame container    | Frame icon             |
| `group`       | Group of elements  | Group icon             |
| `auto-layout` | Auto-layout frame  | Layers icon            |
| `text`        | Text layer         | Type icon              |
| `boolean`     | Boolean property   | Toggle icon            |
| `vector`      | Vector/shape layer | Shapes icon            |

These types are **flexible** - you can use any string as a type. However, if you use a type not in this list, it will use the default icon (circle) until an icon is added for it.

---

## Adding New Element Types

If Figma introduces a new element type, you can easily add support:

### Step 1: Use the New Type in YAML

```yaml
layers:
  - type: 'new-figma-element'
    name: 'My New Element'
    # ... rest of structure
```

### Step 2: Add Icon Mapping

Edit `apps/web/src/components/ui/Tree/figmaIcons.ts`:

```typescript
import { YourNewIcon } from 'lucide-react';

export const FIGMA_ICONS: Record<string, LucideIcon> = {
  // ... existing types
  'new-figma-element': YourNewIcon,
};
```

That's it! The Tree component will automatically use the new icon.

---

## Validation & Build

### Automatic Validation

The YAML structure is validated automatically during build using Zod schemas. The build will fail if:

- Required fields are missing (`type`, `name`)
- Field types are incorrect (e.g., `defaultOpen` is not a boolean)
- Structure is invalid (e.g., missing closing brackets)

### Build Errors

If you see build errors, they will look like:

```
[content] Error: Invalid design-layers.yml
  - Expected 'type' to be a string, got undefined at layers[0]
  - Expected 'name' to be a string, got undefined at layers[1]
```

These messages indicate:

- **File**: Which file has the issue
- **Field**: Which field is problematic
- **Expected vs Got**: What was expected vs what was found

### Best Practices

1. **Always validate locally** before submitting a PR
2. **Use descriptive names** for better clarity
3. **Add descriptions** to help LLMs understand context
4. **Keep hierarchy logical** (parent-child relationships should make sense)
5. **Test the visual tree** in the browser before finalizing

---

## Examples

### Simple Component (Button)

```yaml
layers:
  - type: 'component'
    name: 'Button'
    description: 'Main button component'
    defaultOpen: true
    children:
      - type: 'text'
        name: 'Label'
        description: 'Button label text'

      - type: 'instance'
        name: 'Icon'
        description: 'Optional icon'
```

### Complex Component (Card with Nested Elements)

```yaml
layers:
  - type: 'component'
    name: 'Card'
    description: 'Card component with header, content, and footer'
    defaultOpen: true
    children:
      - type: 'frame'
        name: 'Header'
        description: 'Card header section'
        children:
          - type: 'text'
            name: 'Title'

          - type: 'instance'
            name: 'ActionIcon'

      - type: 'auto-layout'
        name: 'Content'
        description: 'Main content area'
        children:
          - type: 'text'
            name: 'Body'

          - type: 'group'
            name: 'Media'
            children:
              - type: 'vector'
                name: 'Image'

      - type: 'frame'
        name: 'Footer'
        description: 'Card footer with actions'
        children:
          - type: 'instance'
            name: 'PrimaryButton'

          - type: 'instance'
            name: 'SecondaryButton'

      - type: 'boolean'
        name: 'hasFooter'
        description: 'Toggle footer visibility'
```

---

## Troubleshooting

### Build Fails with "type cannot be empty"

**Problem**: The `type` field is missing or empty.

**Solution**: Ensure every node has a `type` field with a non-empty string value.

```yaml
# ❌ Wrong
- name: 'Button'

# ✅ Correct
- type: 'component'
  name: 'Button'
```

### Build Fails with "name cannot be empty"

**Problem**: The `name` field is missing or empty.

**Solution**: Ensure every node has a `name` field with a non-empty string value.

### Tree Doesn't Show in Browser

**Problem**: The design-layers.yml file exists but the tree doesn't render.

**Possible Causes**:

1. File is not in the correct location: `apps/web/src/content/components/[component]/design-layers.yml`
2. File name must be exactly `design-layers.yml` (case-sensitive)
3. The component page might need a refresh
4. Check browser console for errors

### Icon Doesn't Match Element Type

**Problem**: The icon shown doesn't match the element type.

**Solution**:

1. Check if the type is in the supported list
2. If it's a new type, add the icon mapping (see [Adding New Element Types](#adding-new-element-types))
3. Unknown types will use the default circle icon

### Node Doesn't Collapse/Expand

**Problem**: Clicking a node doesn't toggle its children.

**Solution**: Only nodes with `children` are collapsible. Nodes without children are always "expanded" (they're leaf nodes).

---

## Need Help?

- **Issues**: Open an issue on GitHub with your question
- **Discussions**: Check existing discussions or start a new one
- **PR Review**: Request a review if you're unsure about your structure

---

## Quick Reference

```yaml
# Minimal valid node
- type: 'text'
  name: 'Label'

# Node with all optional fields
- type: 'component'
  name: 'Button'
  description: 'Main component'
  defaultOpen: true
  children:
    - type: 'text'
      name: 'Label'
```

**Remember**: Keep it simple, descriptive, and well-structured.
