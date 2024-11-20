# Steps To Run

- Run `yarn install`
- Run `yarn dev`

# Packages used

- classnames
- vite
- scss
- typescript
- eslint + prettier

# Folder Structure Standard

For this project, I considered two well-known organizational patterns: Atomic Design and Feature-Sliced Design (FSD). While Atomic Design focuses on organizing components hierarchically (atoms, molecules, organisms, templates, pages), I opted for Feature-Sliced Design due to its scalability and focus on functional boundaries.

## Why Feature-Sliced Design?

Feature-Sliced Design is a modern approach to structuring projects by dividing the codebase into distinct layers and features. It emphasizes organizing functionality and separating concerns, making it easier to maintain and scale projects as they grow. Each feature encapsulates its own logic, components, hooks, and utilities, reducing dependencies and improving readability.

This structure ensures:

- **Clarity**: Clear separation of responsibilities within the codebase.
- **Scalability**: Features are isolated, enabling smooth integration of new functionalities.
- **Maintainability**: Easier to refactor or debug specific areas without affecting the rest of the project.

For a small project, the FSD structure ensures modularity while demonstrating the potential for future extensions.

## Current Structure

```
src/
├── pages/            # Main inputs such as App or routes
│   ├── TimelinePage.tsx
├── features/         # Each functionality isolated
│   └── timeline/
│       ├── components/
│       │   ├── Timeline.tsx
│       │   ├── TimelineEvent.tsx
│       │   ├── TimelineLane.tsx
│       ├── hooks/
│       │   ├── useTimeline.ts
│       │   ├── useZoom.ts
│       ├── lib/
│       │   ├── calculateLanes.ts
│       │   ├── formatEvents.ts
│       ├── model/
│       │   ├── types.ts
│       │   ├── store.ts (opcional: se fosse usar Redux, Context, etc.)
│       ├── styles/
│       │   ├── timeline.css
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   ├── hooks/
│   │   ├── useDebounce.ts
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   ├── domUtils.ts
├── App.tsx
└── index.tsx
```

# Why Yarn and Node_Modules?

I chose Yarn as the package manager for this project due to its speed and modern features. While Yarn Plug'n'Play (PnP) offers performance improvements by eliminating the need for the `node_modules` folder, I decided to use the traditional `node_modules` strategy for this project.

The primary reason is to ensure compatibility and avoid potential errors or incompatibilities when running the project on different environments. This decision was made to reduce any friction the recruiter might face while testing the code, providing a more predictable and universally supported setup.

The `.yarnrc.yml` configuration has been updated to use `node-modules` as the `nodeLinker`, ensuring all dependencies are installed in the conventional `node_modules` directory. This approach prioritizes stability and ease of use over the performance benefits of PnP.
