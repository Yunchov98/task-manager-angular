You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Project Context

This is a learning project built to strengthen Angular, RxJS, and Signals skills.
The developer has 1.7 years of professional Angular experience.

The app supports **two view modes** for the same task data:

- **List view** — single-column todo list (Material 3 style, "Calm Azure")
- **Board view** — 3-column Kanban (Todo / In Progress / Done)

## Project Structure

- `client/` — Angular frontend
- `server/` — Node.js backend (coming later)

## Domain Model

- `Task` has a `status: TaskStatus` field (not `completed: boolean`).
- `TaskStatus` is an `as const` object + derived literal union type — replaces TS enum.
  - Values: `'todo' | 'doing' | 'done'`
- Domain metadata lives alongside `TaskStatus`:
  - `TaskStatusLabel: Record<TaskStatus, string>` — human-readable labels
  - `TaskStatusIcon: Record<TaskStatus, string>` — Material Symbol names
- `TaskService` exposes:
  - Per-status computed signals: `todoTasks`, `doingTasks`, `doneTasks`, `pendingTasks`
  - Per-status counts: `todoCount`, `doingCount`, `doneCount`, `pendingCount`
  - Single status-mutation method: `updateTaskStatus(id, status)` (no `toggleDone` helper)

## Design Decisions

- **Status control**: chip with `mat-menu` dropdown (not checkbox). Checkbox implies binary; chip+menu matches the 3-status model and works identically in list and board views.
- **Status colors**: semantic CSS variables mapped to `--mat-sys-*` system tokens (free dark mode).
  - `--status-todo: outline (neutral)`
  - `--status-doing: primary (azure)`
  - `--status-done: tertiary (green-ish)`
- **Routing**: route-based view switching (`/tasks/list`, `/tasks/board`). Lazy-loaded via `loadComponent`.

## Learning Goals

### RxJS Operators to practice

- switchMap — HTTP requests, search with cancellation
- mergeMap — parallel requests
- combineLatest — combining multiple streams
- forkJoin — parallel HTTP calls that complete
- debounceTime — search input optimization
- distinctUntilChanged — avoid duplicate emissions
- catchError — error handling
- takeUntilDestroyed — automatic unsubscribe

### Angular Signals (deepen knowledge)

- signal(), computed(), effect()
- linkedSignal()
- toSignal(), toObservable() — bridge between Signals and RxJS
- resource() — async data fetching with signals

### Other important topics

- OnPush change detection strategy
- Reactive Forms with validation
- Route Guards (functional guards)
- Lazy loading
- Angular Material theming + dark mode
- Angular CDK DragDrop (board view kanban drag&drop)

## Progress

### Completed

- Project setup with Angular 21, Material, ESLint, Prettier
- Folder structure (core, shared, features)
- Design tokens (`_colors.scss`, `_tokens.scss`)
- Material 3 theme with azure primary palette
- Task model with `TaskStatus` (`as const` enum pattern) + `TaskStatusLabel`
- `TaskService` with Signals (signal, computed)
- CRUD operations: `addTask`, `updateTaskStatus`, `deleteTask`
- Per-status computed signals and counts
- Smart/dumb component architecture:
  - tasks-page (smart) — orchestrator
  - task-list (dumb) — renders list
  - task-item (dumb) — renders single task
  - task-form — reactive form with validation
- Event bubbling pattern (output → output → service)

### In progress

- Replace checkbox with `mat-chip` + `mat-menu` status control in `TaskItem`
- Add `TaskStatusIcon` metadata
- Wire `statusChange` output through TaskList → TasksPage → service

### Next

- Reorganize folders into `list-view/` + `board-view/` + `shared/components/`
- TypeScript path aliases (`@core/*`, `@features/*`, `@shared/*`)
- Routing setup with lazy-loaded view components
- View switcher in toolbar (`mat-button-toggle-group`)
- List view UI ("Calm Azure" Material 3 design)
- Board view UI (3-column Kanban)
- Dark mode toggle
- Filter chips (All / Active / Completed)
- Drag & drop in board view (Angular CDK)
- Search with RxJS (debounceTime, switchMap)
- localStorage persistence (signal `effect()`)
- Route Guards + further lazy loading
- Node.js backend (Express REST API)
