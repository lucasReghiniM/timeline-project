# Overview

This Gantt timeline project was developed with a minimum reliance on third-party libraries by developing an in-house solution instead of using out-of-the-box solutions. For instance, drag-and-drop functionality has been implemented from scratch without depending on any drag-and-drop React libraries. It was kept lightweight and fully customizable to demonstrate the technical skills required to develop an application's basic features yourself.

### Features Implemented

- Custom drag-and-drop functionality for moving tasks.
- Inline editing for task names using double-click.
- Dynamic lanes and column calculations based on event dates.
- Flexible grid with clickable areas to detect empty lanes.

### What Could Be Improved with More Time

If given additional time and resources, I would enhance the project by implementing the following:

1. **Design & UI/UX Improvements**

   - Create a polished design using **Figma**, leveraging my UI/UX expertise with better research and planning.
   - Conduct usability testing to refine the interface for a seamless user experience.

2. **Scalability and Architecture**

   - Architect the project with more modular and scalable patterns.
   - Consider splitting components and hooks further to improve maintainability.
   - Fix import aliases

3. **Additional Features**

   - **Zoom Functionality**: Add zoom levels for viewing the timeline at daily, weekly, monthly, or yearly scales.
   - **Complex Events**:
     - Assign task responsibilities to users.
     - Add detailed modals for viewing, editing, and managing additional task information.
   - **Task Resizing**: Allow resizing tasks directly on the timeline to adjust their duration.
   - **Time and Timezones**: Expand date handling to cover specific times and timezone support.
   - **Task Comments**: Enable comments within tasks for team collaboration.
   - **Real-Time Updates**: Use **Socket.IO** or similar real-time technologies to synchronize updates across multiple users.

4. **Customization**

   - Add more advanced theme customization, allowing users to modify colors, grid styles, and lane structures.
   - Implement global contexts for consistent theme and settings management.

5. **State Management**
   - Integrate a robust state management solution like **Redux** to handle complex application state more efficiently.

obs: I created a hook with zoom logic, but it was not satisfactory in terms of UX because it zoomed in, rather than expanding the elements laterally (as expected in a timeline/calendar). For this reason, and due to the time constraint, I deleted the related files.

### Technologies I Would Consider

- **Socket.IO**: For real-time collaboration and updates.
- **Redux/RTK**: For state management and scalability in handling user data and events.
- **TailwindCSS**: For more dynamic and maintainable styling.
- **Cypress**: For end-to-end testing of drag-and-drop and UI features.
- **RTL/Jest**: For unit testing.
- **Node.js/Express**: For building a backend to handle task assignments, real-time communication, and persistent storage.
- **MongoDB/PostgreSQL**: For database storage of tasks, users, and settings.
- **GraphQL**: For flexible and efficient data querying, especially with complex task data.

This project showcases the ability to build foundational features while leaving room for future enhancements to make it production-ready.

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
│       │   ├── TimelineBody.tsx
│       │   ├── AddEventModal.tsx
│       ├── hooks/
│       │   ├── useTimeline.ts
│       │   ├── useDradAndDrop.ts
├── shared/
│   ├── components/
│   │   ├── Button.tsx //Do not have time to create shared and custom components, but I would love to create it here. From sketch  or usign a UI lib (mui,radix-ui etc)
│   │   ├── Input.tsx
│   ├── hooks/
│   │   ├── useDebounce.ts //same here
│   ├── utils/
│   │   ├── calculateLate.ts
│   ├── types/
│   │   ├── timeline.ts
│   ├── constants/
│   │   ├── mockTimelineData.ts
├── App.tsx // Do not created a route duo the test nature (single page)
└── index.tsx
```

# Why Yarn and Node_Modules?

I chose Yarn as the package manager for this project due to its speed and modern features. While Yarn Plug'n'Play (PnP) offers performance improvements by eliminating the need for the `node_modules` folder, I decided to use the traditional `node_modules` strategy for this project.

The primary reason is to ensure compatibility and avoid potential errors or incompatibilities when running the project on different environments. This decision was made to reduce any friction the recruiter might face while testing the code, providing a more predictable and universally supported setup.

The `.yarnrc.yml` configuration has been updated to use `node-modules` as the `nodeLinker`, ensuring all dependencies are installed in the conventional `node_modules` directory. This approach prioritizes stability and ease of use over the performance benefits of PnP.
