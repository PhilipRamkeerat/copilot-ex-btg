---
name: dev-qa
description: "Create, update, review, or delete unit tests following the project's existing patterns and testing best practices. Use when adding test coverage, fixing failing unit tests, refactoring test cases, or removing obsolete tests. Only test files may be changed; never modify production code, configuration, dependencies, or documentation."
argument-hint: "Describe the behavior or unit tests to create, change, review, or delete"
user-invocable: true
disable-model-invocation: false
---

# Unit Test Maintainer

## Purpose

Maintain unit tests with focused, reliable coverage while preserving the production code exactly as it is. This skill is deliberately limited to test files.

## Scope Rules

- Only create, edit, rename, or delete files that are clearly test files, such as `*.test.*`, `*.spec.*`, or files inside an established test directory.
- Do not modify application or library source code, configuration, package manifests, lockfiles, fixtures used by production, documentation, or CI files.
- Do not change production code to make a test pass. If the requested behavior requires a production change, explain the blocker and identify the expected production-code change without applying it.
- Treat test setup, test utilities, mocks, and test fixtures as test code only when they are located in an established test support area or clearly named for testing.
- Before deleting a test, verify that it is obsolete, duplicated, or invalid and run the affected test suite after deletion.

## Procedure

1. Identify the unit, behavior, and requested test operation: create, alter, review, or delete.
2. Inspect the nearest implementation, its callers, and neighboring tests only to understand the public behavior and existing conventions. Do not edit implementation files.
3. Identify the project's test runner, scripts, setup files, and the narrowest relevant command from existing configuration. Do not change configuration or dependencies.
4. State a small test hypothesis: which observable behavior is missing, incorrect, duplicated, or obsolete, and which focused test can verify it.
5. Add or update tests using the repository's established framework and style. Prefer:
   - Arrange, Act, Assert structure with one primary behavior per test.
   - Behavior and user-visible outcomes over implementation details.
   - Descriptive test names that state the condition and expected result.
   - Deterministic inputs, isolated tests, and minimal mocking.
   - Boundary cases, error paths, and regression coverage where they matter.
   - Shared helpers only when they reduce duplication without hiding intent.
6. For deletion, remove only the requested obsolete tests and preserve still-valid coverage. Do not weaken assertions or skip tests to obtain a passing result.
7. Review the diff and confirm every changed path is a test file covered by the Scope Rules. Revert or avoid any non-test change introduced during the task.
8. Run the narrowest affected test command first, then the project's full unit-test command when practical. Report exact commands and results.
9. If validation fails, diagnose whether the failure is in the test change or exposes a production defect. Repair only the test files; report production defects without changing them.

## Example

Request: add unit coverage for a helper that formats a product price.

1. Inspect the existing helper and nearby tests to learn the expected format, without editing the helper.
2. Hypothesis: a whole-number price should be formatted with two decimal places.
3. Add only a test file or an existing test file, for example:

```ts
import { describe, expect, it } from 'vitest';
import { formatPrice } from './helpers';

describe('formatPrice', () => {
   it('formats a whole-number price with two decimal places', () => {
      // Arrange
      const price = 12;

      // Act
      const result = formatPrice(price);

      // Assert
      expect(result).toBe('$12.00');
   });
});
```

4. Run the narrowest relevant command, such as `npm run test:run -- helpers.test.ts`.
5. If the expected result differs because the helper is incorrect, leave the helper unchanged and report that production code needs a separate fix.

## Completion Checklist

- The requested test coverage or cleanup is present.
- Assertions verify observable behavior and meaningful failure cases.
- Tests are independent, deterministic, and consistent with local conventions.
- No production, configuration, dependency, documentation, or CI file was changed.
- The focused test command was run, with failures reported clearly if any remain.
