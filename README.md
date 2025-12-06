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

# Figma vs. Code: The Translation Layer (2025 Edition)

This document serves as a translation layer between Designers (Figma Layers Panel) and Developers (Codebase/DOM). It maps visual concepts to their technical implementations.

---

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
