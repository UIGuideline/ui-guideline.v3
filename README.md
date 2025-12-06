---
title: 'Anatomy-First Specification v1'
subtitle: 'Build from the inside out'
description: 'The foundational principle of UI Guideline v3 — a unified contract between design, code, and documentation through structured component anatomy.'
version: 1.0
lastUpdated: 2025-10-27
---

# 🧩 Anatomy-First Specification v1

### _Build from the inside out_

---

## 1. Purpose

**Anatomy-first** is a design-engineering paradigm that establishes a unified foundation between **design, code, and documentation** through the explicit definition of a component’s _anatomy_ — its internal structure and functional parts.

Instead of starting from visual appearance or API design, this approach begins with the **semantic composition** of a component.  
From this single source of truth, all other artifacts are generated:

- Visual representation (Figma, diagrams)
- Code implementation (React, Vue, SwiftUI…)
- Documentation and props schemas

> **Goal:** Make the anatomy the universal contract for building, scaling, and communicating components across platforms.

---

## 2. Scope

This specification applies to any design system or component library that aims to:

- Synchronize design and code through shared definitions
- Generate visual or code assets automatically from structured data
- Maintain consistency and transparency in how components are composed

It is technology-agnostic and can be implemented using YAML, JSON, or Markdown front-matter.

---

## 3. Core Principles

### 3.1 The Anatomy is Semantic, not Visual

Each part defines _what it is_ and _why it exists_, not how it looks.  
Color, spacing, and typography belong to tokens or variants — not anatomy.

### 3.2 Every Component Declares its Anatomy

A component without anatomy cannot be generated, reused, or documented.  
Anatomy is the first artifact — the seed of all subsequent layers.

### 3.3 One File → Many Representations

A single anatomy file can generate:

- A diagram for documentation
- A base frame in Figma
- A composable React component
- A schema for AI or CLI generators

### 3.4 Changes Propagate Downstream

Any addition, removal, or rename in the anatomy updates all derived assets.  
The anatomy becomes a **versioned source of truth**.

### 3.5 Platform-Agnostic Composition

Anatomy describes relationships, not implementation details.  
The same structure can be interpreted in React, SwiftUI, Flutter, or Web Components.

---

## 4. Minimal Schema Example

```yaml
component: Button
description: Triggers actions or navigation.

parts:
  - id: root
    name: Button
    type: frame
    description: The wrapper containing label and optional icons.

  - id: icon-start
    name: Button.IconStart
    type: icon
    optional: true
    description: Optional icon displayed before the label.

  - id: label
    name: Button.Label
    type: text
    description: The visible text inside the button.

  - id: icon-end
    name: Button.IconEnd
    type: icon
    optional: true
    description: Optional icon displayed after the label.
```

---

---

# Figma vs. Code: The Translation Layer (2025 Edition)

This document serves as a translation layer between Designers (Figma Layers Panel) and Developers (Codebase/DOM). It maps visual concepts to their technical implementations.

## 1. UI Elements (The DOM)

**Where to look:** Left Sidebar (Layers Panel).  
**Goal:** Understanding how Figma layers translate to HTML structure.

### Icon (Visual) → Definitions

| Icon          | Figma Element          | Designer Definition                                                                                                         | Developer Analogy (HTML/CSS)      |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **# (Hash)**  | **Frame**              | The main container. It has dimensions, styling (fill, stroke), and can clip content. Used for screens, cards, and wrappers. | `<div>`, `<section>`, `<article>` |
| **II or =**   | **Auto Layout**        | A Frame with "Smart Layout" active. It automatically handles spacing, padding, and alignment of children.                   | `display: flex`                   |
| **↵ (Arrow)** | **Auto Layout (Wrap)** | An Auto Layout frame that pushes items to a new line.                                                                       | `flex-wrap: wrap`                 |
| **[ : ]**     | **Group**              | A folder used only for grouping; no layout.                                                                                 | Fragment (`<>`) or none           |
| **❖**         | **Main Component**     | The master definition of a reusable UI element.                                                                             | Component definition              |
| **◇**         | **Instance**           | A copy of a component.                                                                                                      | `<Button size="large" />`         |
| **T**         | **Text**               | A text layer.                                                                                                               | `<h1>`, `<p>`, `<span>`           |
| **☿**         | **Vector / Union**     | Custom shapes or icons.                                                                                                     | `<svg>`, `<path>`                 |
| **◲**         | **Section**            | Canvas organization area.                                                                                                   | Folder / Route                    |
| **[ ]**       | **Absolute Position**  | Ignores layout flow.                                                                                                        | `position: absolute`              |

---

## 2. Component Properties (The API)

**Where to look:** Right Sidebar (Properties Panel).  
**Goal:** Defining the “Props” (Arguments) of a component.

### Property Types

| Property Type     | Visual Control  | Functionality               | Code Equivalent                               |
| ----------------- | --------------- | --------------------------- | --------------------------------------------- |
| **Boolean**       | Toggle Switch   | Show/hide layers            | `{showIcon && <Icon />}`                      |
| **Text**          | Input Field     | Edit text                   | `<Card title="Dashboard" />`                  |
| **Instance Swap** | Dropdown        | Swap nested components      | `<Button icon={<DownloadIcon />} />`          |
| **Variant**       | Dropdown / Tabs | Style/size states           | `type="primary"`                              |
| **Nested Props**  | Nested List     | Expose child props          | `<Card buttonProps={{ isDisabled: true }} />` |
| **Slot**          | Purple Region   | Placeholder for any content | `<Modal>{children}</Modal>`                   |

---

## 🚨 Important "Missing" Types in Figma

- **Numbers:** Figma cannot create numeric props.
- **Functions:** Cannot pass `onClick` or code functions.

---

## 💡 Quick Vocabulary

- **“Expose this property”** = Make this a prop in code.
- **“Detach Instance”** = Hardcode / Eject.
- **“Variable”** = Design Token (`var(--color-primary)`).

---

---

# Black Box vs. Component Composition

In the modern frontend development ecosystem—led by React—a strong consensus has emerged around the composition pattern. Libraries like Radix UI, which serves as the foundation for Shadcn UI, and Headless UI have popularized the idea that a component should not be a monolithic “black box” configured through endless props, but rather a set of subcomponents that work together in harmony.

This approach, known as **“Compound Components”**, enables unprecedented flexibility. Instead of having a `<Menu />` component that receives a data array and internally decides how to render it, the developer maintains full control over the structure:

**Logic-First:** The parent component (`Menu.Root`) manages the state (open/closed) and shared context.

**Render-Agnostic:** The child components (`Menu.Item`, `Menu.Trigger`) handle the visual representation and can be placed freely within the render tree.

**Dot Notation:** The `Menu.Item` syntax is not merely aesthetic; it explicitly indicates that `Item` is a static property of the `Menu` class or function, encapsulating its dependency and direct hierarchical relationship.

This model promotes **Inversion of Control**, allowing the consumer of the design system to decide _what_ is rendered and _where_, while the system provides the _how it works_.

## 1.2 The Design Paradigm: Atomic Design and Variants

Historically, Figma and similar tools like Sketch have operated under a different mental model, heavily influenced by the metaphor of a visual canvas and a static layer hierarchy. The predominant methodology has been **Atomic Design**, where atoms combine to form molecules and organisms. However, the implementation of this methodology in Figma has crystallized around the use of **Variants**.

A variant in Figma is essentially a predefined configuration. If a designer needs a button with an icon on the right, they select the variant `Icon=Right`. If they need a modal with a footer, they toggle the boolean `Has Footer=True`. This model is inherently rigid and aligns with the “Configuration” pattern in programming—opposed to “Composition.”

When a user attempts to bring the flexibility of `Menu.Item` into Figma, they quickly find that Figma does not naturally support concepts like “arbitrary children” or dynamic “slots” in its core architecture. As a result, designers are forced to create **variant monsters** with hundreds of permutations to cover every possible use case.

## 1.3 The Need for Unification

Friction arises when a designer hands off a Figma file structured around rigid variants to a developer who expects composable pieces. The developer sees a monolithic “Modal” and must mentally deconstruct it into `Dialog.Root`, `Dialog.Overlay`, and `Dialog.Content`. This manual translation is prone to errors, loss of context, and technical debt.

Unification requires Figma to adopt—or at least faithfully emulate—the code’s composition structure, allowing visual hierarchy and naming to serve as an accurate technical specification rather than merely a visual suggestion.

## 2. Naming Standards in Figma for Compound Components

The central question about standards and best practices for naming compound components (like `Menu.Item`) in Figma has a nuanced answer that depends on the context of use: asset-panel organization versus semantics within the layer tree.

### 2.1 Asset Organization: The Hegemony of the Slash (/)

Despite the ubiquity of dot notation in code, the absolute and undisputed standard for organizing and naming **Main Components** in Figma’s Assets Panel is the **Slash Naming Convention**.

Figma interprets the `/` character as a hierarchy delimiter, automatically transforming flat names into a navigable folder structure. This is crucial for the design system’s usability from the designer’s perspective.

**Folder Structure:** A component named `Menu / Item` will appear inside a folder called “Menu,” alongside `Menu / Trigger` and `Menu / Content`.

**Search & Discovery:** This grouping ensures that when a designer searches for “Menu,” they see all the available pieces of the compositional puzzle, making it easier to mentally assemble the compound component.

### Why Dot Notation (.) Is Problematic for Component Names

If a designer attempted to literally replicate code syntax by naming components `Menu.Item`, `Menu.Trigger`, etc., they would encounter two fundamental issues:

**Lack of Grouping:**
Figma treats these names as flat text strings. Instead of a “Menu” folder, the designer would see a scattered alphabetical list where `Menu.Item` might be separated from `Menu.Trigger` if other items fall in between—breaking the visual cohesion of the system.

**Private Components:**
In Figma, using a dot (`.`) or underscore (`_`) at the _beginning_ of a component name (e.g., `.Menu`, `_BaseButton`) has a reserved meaning: it marks the component as **Private**.
Private components are not published to the team library and are invisible to consumers in other files. Although `Menu.Item` (with the dot in the middle) does _not_ trigger this privacy rule, dot notation in Figma naming is commonly associated with metadata or internal states—not with structural hierarchy.

### Expert Recommendation

To maintain mental parity with Shadcn/Radix without sacrificing Figma’s usability, you should follow a systematic syntactic translation:

### React Concept → Figma Naming Translation (Markdown Table)

```md
| React Concept    | Figma Naming (Assets) | Result in Figma UI              |
| ---------------- | --------------------- | ------------------------------- |
| `<Card.Root>`    | Card / Root           | Card folder → Root component    |
| `<Card.Header>`  | Card / Header         | Card folder → Header component  |
| `<Card.Title>`   | Card / Title          | Card folder → Title component   |
| `<Card.Content>` | Card / Content        | Card folder → Content component |
| `<Card.Footer>`  | Card / Footer         | Card folder → Footer component  |
```

This convention is used by the most respected UI kits in the industry, including **Ant Design System for Figma**, community replicas of **Shadcn UI**, and **Material Design 3**.

## 2.2 Layer Semantics: The Bridge to Code

While slash notation dominates file organization, **Layer Semantics**—that is, how instances are named within a design’s layer tree—is where dot notation and PascalCase become vitally important for unification with development.

When a developer inspects a design using Figma’s Dev Mode, they are not browsing the assets panel; they are navigating the design’s **actual layer tree**. Here, the layer name becomes the primary signal of intent.

### The Standard for Layers in Dev Mode

To achieve a _frictionless handoff_, experts recommend renaming instance layers to match the component syntax in React.

**Subcomponent Instances:**
If a main component like `Card` contains an internal instance of `Card / Header`, that layer should be explicitly renamed to `Card.Header` (or `CardHeader` if strict PascalCase is preferred).

**Reason:**
When the developer clicks the layer, they immediately see `Card.Header` in the inspection panel. This removes ambiguity compared to generic names like “Frame 142” or “Auto Layout Vertical.”

**Parity:**
This directly communicates: _“This is where the `<Card.Header>` subcomponent should be rendered.”_

### Slots and Props

Layers that serve as empty containers for dynamic content (**slots**) should be named using descriptive camelCase that matches the component’s props in code—such as `children`, `content`, `leftIcon`, or `headerAction`.

**Reason:**
This aligns with React’s prop syntax (e.g., `<Button iconLeft={...} />`) and facilitates configuration for automation tools like **Code Connect**.

The table below summarizes the best naming practices depending on the context:

```md
| Element             | Context: Assets Panel (Designer) | Context: Layer Name (Developer) |
| ------------------- | -------------------------------- | ------------------------------- |
| Main Component      | Dialog / Root                    | Dialog.Root or Dialog           |
| Subcomponent        | Dialog / Title                   | Dialog.Title                    |
| Content Container   | N/A (Part of the structure)      | children or content             |
| Interactive Element | Button / Primary                 | SubmitButton (Semantic)         |
```

## 3. Analogous Naming: Expert Taxonomy

The second part of your question refers to the _“analogous naming in Figma for main components, instances, and layers.”_
To unify both worlds, it is essential to establish a shared dictionary that maps Figma’s technical terminology to its equivalents in React’s component architecture.
Below is a detailed taxonomy based on the analysis of advanced design systems and Figma’s developer-focused documentation.

## 3.1 Main Component (❖) = Component Definition

In Figma, the **Main Component** (identified by a four-diamond icon ❖) is the single source of truth. It defines the component’s properties, structure, style, and variants.

**Development Analogy:**
It corresponds to the _component definition_ in code — the class or function that implements the component
(e.g., `const Button = (props) => { ... }`).

**Implication:**
Any change applied to the Main Component in Figma (such as modifying padding or background color) is analogous to changing the source code of the component, which then propagates to all instances in the application after recompilation (or after publishing the library in Figma).

## 3.2 Instance (◇) = React Element / Instantiation

An **Instance** in Figma (identified by a hollow diamond ◇) is a linked copy of the Main Component placed on the design canvas.

**Development Analogy:**
It corresponds to a **React element** — the usage of a component in JSX
(e.g., `<Button variant="primary" />`).

**Implication:**
Instances inherit updates from the master but can include **overrides**.
In code, these overrides are **props**.

- If you change the text in a Figma instance from “Button” to “Send,” this is analogous to passing `label="Send"`.
- If you replace a nested instance within a larger component, this is analogous to **composition** or **dependency injection**.

## 3.3 Layer = DOM Node / Child Component

Layers inside a frame or component in Figma represent the hierarchical visual structure.

**Development Analogy:**
They correspond to **DOM nodes** (HTML tags like `<div>`, `<span>`) or subcomponents rendered within a component’s `return` statement.

**Important Nuance:**
Not all layers in Figma translate to code. Designers often create extra layers as layout “hacks” (such as transparent rectangles for spacing).

A best practice for unification is to use **Auto Layout**, which maps directly to **CSS Flexbox**, eliminating unnecessary spacing layers and aligning the Figma layer tree with the resulting DOM structure.

## 3.4 Component Properties = Component Props / Component API

Figma has introduced explicit component properties that map directly to component APIs in code.

| Figma Property   | Code Analogy (React/TS) | Description & Usage                                                                      |
| ---------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| Variant Property | Enum Prop / State       | Defines predefined visual variations. Example: Type: Primary → `variant="primary"`.      |
| Boolean Property | Boolean Prop            | Toggles the visibility of a layer. Example: Show Icon → `hasIcon={true}`.                |
| Instance Swap    | Render Prop / Slot      | Allows replacing one subcomponent with another. Fundamental for the composition pattern. |
| Text Property    | String Prop             | Maps text content directly to a prop. Example: Label → `children` or `label`.            |

## 4. Composition Architecture: From “Instance Swaps” to “Native Slots”

True unification does not happen only in naming—it happens in **structure**.
How do you build a component in Figma that behaves like a Shadcn-style compound component?
Here we examine the technical evolution of this architecture.

## 4.1 The Era of “Instance Swaps” (The Current Standard)

Until now, the most robust way to emulate composition (`Menu.Root > Menu.Item`) has been through the **Instance Swap** property.

### Pattern Architecture:

**1. Atom Definition:**
Create the atomic components: `Menu / Item`, `Menu / Divider`, `Menu / Header`.

**2. Container Component:**
Create `Menu / Root`.

**3. The Artificial “Slot”:**
Inside `Menu / Root`, the designer places an instance of a generic component (often named `_Slot` or `Placeholder`).

**4. Property Exposure:**
Assign an **Instance Swap** property to this slot.

**5. Usage:**
When a designer uses `Menu / Root`, they select the slot and swap it for `Menu / Item`.

### Limitations

While functional, this method is **imperfect**:

- Everything you want to inject into the component must first be turned into a component.
- You **cannot** simply type text or draw an ad-hoc rectangle inside the menu without first converting it into a component.

This differs significantly from React’s full flexibility, where `{children}` accepts _anything_.

## 4.2 The Revolution: Native Slots (Schema 2025)

Figma has announced—and begun rolling out—a native **Slots** feature, designed specifically to close this gap and achieve full parity with development.

### How Native Slots Work

This new capability allows designers to designate a container (a Frame or Group) inside a Main Component as a **Slot**.

### Direct Parity

Just like in React, where:

```jsx
<Container>{children}</Container>
```

allows any element to be injected, **Native Slots** in Figma let designers drag and drop **any layer, frame, or instance** directly into the slot inside a component instance—without needing to detach the component.

### Impact on Naming

It is recommended to name these slot containers explicitly as:

- `Slot`
- `Children`
- or the corresponding prop name from code (e.g., `headerContent`)

so the intent is clear both visually and for code-generation tools.

### Preferred Instances

Design-system creators can define **Preferred Instances** for these slots, guiding users toward the correct subcomponents (e.g., `Menu.Item`) while still preserving full architectural flexibility.

Aquí tienes la **traducción al inglés** y la **tabla convertida correctamente a Markdown (.md)**, con tono técnico y completamente alineado con tu documentación:

## 7. Implementation Guide: The Definitive Strategy

To address your request in a prescriptive and actionable way, below is the definitive strategy for unifying design and development using composition patterns.

## 7.1 Recommended Naming Matrix

```md
| Entity             | Figma Standard (Design) | Code Standard (Development) | Unified Strategy                                                                                          |
| ------------------ | ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------- |
| Compound Component | Menu / Root             | Menu.Root                   | Use `/` in Figma to create the folder. Developers map **Menu / Root** to **Menu.Root**.                   |
| Subcomponent       | Menu / Item             | Menu.Item                   | Keep `/` in Figma for organization.                                                                       |
| Instance Layer     | Menu.Item               | <Menu.Item />               | Rename the instance layer in the Main Component to **Menu.Item** for clarity in Dev Mode.                 |
| Slot (Container)   | children or slotContent | {children}                  | Name the slot layer in **camelCase** to indicate dynamic content (e.g., `children`, `slotContent`).       |
| State Variant      | State=Hover             | :hover / data-state="hover" | Use standard variant properties to represent UI states.                                                   |
| Base Component     | .\_BaseMenu             | N/A (Abstract)              | Use `.` or `_` in Figma to hide structural components that do not exist as public API components in code. |
```
