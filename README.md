# Todo Dashboard

A modern React dashboard application built with Tailwind CSS that provides a clean and intuitive interface for managing tasks, assignments, and notifications.

## Features

- **Responsive Dashboard Layout**: Clean and modern design with sidebar navigation
- **Task Management**: Today's tasks with progress tracking
- **Notifications System**: Stay updated with upcoming events and messages
- **Assignment Tracking**: Manage assignments with priority levels and due dates
- **Calendar Integration**: View scheduled meetings and events
- **Quick Actions**: Easy access to common tasks
- **Premium Features**: Upgrade options for enhanced functionality
- **Data Visualization**: Progress tracking with circular progress indicators

## Components

- **Sidebar**: Navigation menu with icon-based links
- **Header**: Top navigation with search, theme toggle, and action buttons
- **Dashboard**: Main content area with grid layout
- **WelcomeBanner**: Personalized greeting section
- **QuickActions**: Fast access to common operations
- **Notifications**: Event and message alerts
- **Assignments**: Task assignment management
- **Calendar**: Monthly calendar view with scheduled events
- **TodayTasks**: Current day task list with progress bars
- **PremiumBanner**: Upgrade promotion section
- **DataResearch**: Progress tracking for research tasks
- **BoardMeeting**: Meeting management interface

## Technology Stack

- **React 18**: Latest React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful hand-crafted SVG icons
- **React Scripts**: Build and development tools

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fahimmoon/todo.git
cd todo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js
│   ├── Dashboard.js
│   ├── Header.js
│   ├── WelcomeBanner.js
│   ├── QuickActions.js
│   ├── Notifications.js
│   ├── Assignments.js
│   ├── Calendar.js
│   ├── TodayTasks.js
│   ├── PremiumBanner.js
│   ├── DataResearch.js
│   └── BoardMeeting.js
├── App.js
├── index.js
└── index.css
```

## Customization

The application uses Tailwind CSS for styling. You can customize the appearance by:

1. Modifying the `tailwind.config.js` file for theme customization
2. Updating component-specific styles in individual component files
3. Adding custom CSS classes in `src/index.css`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern dashboard interfaces
- Icons provided by Heroicons
- Built with Create React App
