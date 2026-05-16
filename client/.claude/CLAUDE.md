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
- `TaskService` exposes:
  - Per-status computed signals: `todoTasks`, `doingTasks`, `doneTasks`, `pendingTasks`
  - Per-status counts: `todoCount`, `doingCount`, `doneCount`, `pendingCount`
  - Single status-mutation method: `updateTaskStatus(id, status)` (no `toggleDone` helper)

## Design Decisions

- **List view status control**: styled checkbox div with checkmark icon when done. Click toggles between Todo ↔ Done. Matches the "Calm Azure" design from the design variants.
- **Board view status control**: cards live in their respective columns. Status changes happen via drag & drop or a card-level menu (TBD).
- **Component separation**: list view and board view use separate item components (`task-item` for list, `task-card` for kanban) — simpler than one component with conditional rendering since visual structures differ significantly.
- **Routing**: route-based view switching (`/tasks/list`, `/tasks/board`). Lazy-loaded via `loadComponent`.

## Design System

- `_tokens.scss` — spacing, radius, typography, transitions, z-index, layout, component sizes, borders
- `_colors.scss` — domain-specific color tokens (task-completed-text, task-card-bg, etc.)
- `_reset.scss` — minimal CSS reset (box-sizing, margins, list-style, etc.)
- Material 3 theme with azure primary palette via `mat.theme()`
- Component sizes (`--size-xs` through `--size-4xl`) for consistent dimensions across components
- `--border-base: 2px solid var(--mat-sys-outline)` — reusable border token

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
- Design tokens (`_colors.scss`, `_tokens.scss`, `_reset.scss`)
- Component size scale (`--size-xs` through `--size-4xl`)
- `--border-base` reusable border token
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
- **Phase 1 refactoring complete** — aligned components with `TaskStatus` model:
  - `task-item`: `completedTask` computed signal, removed `completed` boolean references
  - `task-list`: propagates `toggleTask` upward
  - `tasks-page`: uses `doneCount`/`pendingCount`, wires toggle to `updateTaskStatus`
- `task-item` UI (list view):
  - `mat-card` wrapper with content layout
  - Styled checkbox div (16/20px square, rounded corners, primary fill when done)
  - Checkmark icon inside checkbox when done
  - Title (bold), description, created date
  - `more_vert` icon button (delete menu — TBD wiring)
  - Line-through + muted color on completed title

### In progress

- Styling the list view layout (tasks-page + task-form)

### Next

- Wire delete action from `more_vert` button (currently no click handler)
- Add `viewMode` signal in `tasks-page` with view toggle (list/board)
- Create `task-card` component for kanban view
- Create `task-board` component (3 columns using `todoTasks`/`doingTasks`/`doneTasks`)
- Style `tasks-page` (toolbar, stats, view toggle)
- Style `task-form` (Calm Azure design)
- Style `task-board` + `task-card` (kanban view)
- Reorganize folders into `list-view/` + `board-view/` + `shared/components/`
- TypeScript path aliases (`@core/*`, `@features/*`, `@shared/*`)
- Routing setup with lazy-loaded view components
- Dark mode toggle
- Filter chips (All / Active / Completed)
- Drag & drop in board view (Angular CDK)
- Search with RxJS (debounceTime, switchMap)
- localStorage persistence (signal `effect()`)
- Route Guards + further lazy loading
- Node.js backend (Express REST API)
