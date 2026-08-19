---
name: dev-front
description: "Create, update, and review frontend features in this React and TypeScript Vite project. Use for components, pages, routes, forms, cart flows, styling, responsive behavior, accessibility, and frontend bug fixes. Follow the project's React Router, state, and existing CSS patterns."
argument-hint: "Describe the frontend feature, page, component, or bug to implement"
user-invocable: true
disable-model-invocation: false
---

# Frontend Development

## Purpose

Implement and maintain frontend features for this React 18 and TypeScript application while preserving its existing architecture, visual language, and user workflows.

## Project Conventions

- Use functional React components and TypeScript types consistent with nearby files.
- Keep pages in `eCommApp/src/components` and shared state in `eCommApp/src/context` when the feature matches those boundaries.
- Use React Router for navigation and preserve the routes registered in `App.tsx`.
- Reuse existing components such as `Header`, `Footer`, and `Modal` patterns before creating alternatives.
- Use the existing CSS files and class naming conventions. Avoid introducing a new styling framework or dependency unless explicitly requested.
- Prefer accessible HTML elements, meaningful labels, headings, button names, and links.

## Scope and Safety

- Inspect the closest component, route, context, and stylesheet before editing.
- Keep changes focused on the requested frontend behavior. Do not refactor unrelated code.
- Do not change dependencies, build configuration, or shared infrastructure unless the requested feature genuinely requires it.
- Preserve existing public behavior and data contracts unless the request explicitly changes them.
- Never hide errors with broad type casts or silent error handling.

## Procedure

1. Identify the user-visible behavior, affected route or component, state boundary, and acceptance criteria.
2. Inspect the nearest implementation and related components to learn local markup, state, routing, CSS, and naming patterns.
3. Form a small implementation hypothesis and identify one focused check that could disconfirm it.
4. Implement the smallest coherent change in the owning component or context. Keep state close to where it is used; promote it only when multiple components need the same state.
5. For forms and interactions, define labels, input states, validation, loading, success, error, empty, and disabled behavior as applicable.
6. For collections such as products or cart items, provide stable keys, meaningful empty states, and controls that remain usable on narrow screens.
7. Run the project's lint command and production build when practical. Verify the changed route and user flow manually when the feature is interactive.
8. Review the diff for unrelated changes, dead code, broken routes, missing imports, accessibility regressions, and responsive layout problems.
9. Report the files changed, behavior implemented, validation commands, and any remaining limitation.

## Implementation Pattern

Use the project's existing component style. A small presentational component should look like this:

```tsx
type ProductSummaryProps = {
    name: string;
    price: number;
    onAdd: () => void;
};

const ProductSummary = ({ name, price, onAdd }: ProductSummaryProps) => {
    return (
        <article className="product-card">
            <h2>{name}</h2>
            <p aria-label={`Price: $${price.toFixed(2)}`}>${price.toFixed(2)}</p>
            <button type="button" onClick={onAdd}>
                Add to cart
            </button>
        </article>
    );
};

export default ProductSummary;
```

Adapt the example to the actual component API and nearby CSS. Keep component state local unless it is shared by multiple parts of the application.

## Completion Checklist

- The requested behavior works through the intended route and user flow.
- Components use the existing React, TypeScript, routing, state, and CSS patterns.
- Loading, error, empty, disabled, and responsive states are handled where relevant.
- Markup is keyboard-usable and exposes meaningful accessible roles, names, and labels.
- Interactive states, feedback, and errors are visible and understandable.
- `npm run lint` and `npm run build` pass, or failures are reported with their cause.
- No unrelated files or behavior were changed.
