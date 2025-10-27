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
