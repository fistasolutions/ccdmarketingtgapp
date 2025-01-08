# CCD Marketing TG App

A Telegram-based marketing mini-app designed to help users complete tasks, participate in quizzes, earn rewards, and engage in weekly streaks. The app provides an intuitive and functional admin panel for managing tasks, streaks, quizzes, referrals, and a lottery system.

## Application Link
[Click here to access the app](https://t.me/fistaapp000001ccd_bot)

---

## Features

### User Features
- **Task Completion**: Users can perform platform-specific tasks such as following pages or joining groups to earn points.
- **Weekly Streaks**: Participate in daily streaks to earn increasing rewards throughout the week.
- **Quizzes**: Take part in interactive quizzes with customizable questions and rewards.
- **Referral System**: Invite friends to the app and earn points for each successful referral.
- **Lottery System**: Spin the wheel daily for a chance to win points, multipliers, or badges.

### Admin Panel Features
#### Authentication & Role Management
- Admin Login: Secure access for administrators.
- Role Management: Define roles like Super Admin and Marketing Admin with specific permissions.

#### Task Management
- Add, edit, and delete tasks with detailed attributes:
  - Task Title, Description, Type (e.g., Follow Page, Join Group), Platform (Twitter, Discord), Start/End Date, and Points.

#### Weekly Streak Management
- Add, edit, and delete weekly streaks with rewards for each day of the week.

#### Quiz Management
- Create, update, and delete quizzes with:
  - Custom titles, questions, flyer images, passing criteria, and points for each question.

#### Referral System
- Manage referral bonuses with configurable points per successful referral.

#### News Management
- Add, edit, and delete news articles with titles, categories, authors, content, and featured images.

#### Lottery System
- Configure rewards, daily spin limits, and animation speeds for the wheel of fortune.

#### Dashboard Analytics
- User Statistics: Track total users, active users, and new signups.
- Task Statistics: Monitor total tasks, completed tasks, and pending tasks.
- Referral Data: Analyze referral conversions and points earned.
- Streak Data: Insights into active streaks and average streak lengths.
- Engagement Metrics: DAU, MAU, session durations, and drop-off rates.

---

## Project Structure

ccdmarketingtgapp/
├── public/                # Static assets
├── src/                   # Application source code
│   ├── components/        # Reusable React components
│   ├── pages/             # Next.js page components
│   ├── styles/            # Tailwind CSS styles
│   ├── utils/             # Utility functions
│   └── hooks/             # Custom React hooks
├── README.md              # Documentation
├── package.json           # Project dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fistasolutions/ccdmarketingtgapp.git

Navigate to the project directory:
bash
Copy code
cd ccdmarketingtgapp
Install dependencies:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm run dev
Tech Stack
Frontend: Next.js, TailwindCSS
Backend: Node.js, Telegram Bot API
Database: PostgreSQL
API Endpoints
Task Endpoints
POST /api/tasks: Add a new task.
GET /api/tasks: Get all tasks.
PUT /api/tasks/:id: Edit a task.
DELETE /api/tasks/:id: Delete a task.
Weekly Streak Endpoints
POST /api/streaks: Add a new streak.
GET /api/streaks: Get all streaks.
PUT /api/streaks/:id: Edit a streak.
DELETE /api/streaks/:id: Delete a streak.
Quiz Endpoints
POST /api/quizzes: Add a new quiz.
GET /api/quizzes: Get all quizzes.
PUT /api/quizzes/:id: Edit a quiz.
DELETE /api/quizzes/:id: Delete a quiz.
Lottery System
GET /api/lottery/spin: Spin the wheel and get the result.
POST /api/lottery/config: Configure the lottery system.
Admin Panel Functionality
The admin panel is a web-based interface that provides the following features:

Role-Based Authentication: Secure login with role-specific permissions.
Task Management: Create, update, and delete marketing tasks.
Streak Management: Define weekly streak rewards.
Quiz Creation: Build quizzes with dynamic questions and rewards.
Referral Tracking: Manage referral bonuses and conversion analytics.
Lottery Configuration: Set up and manage the daily lottery system.
Contributing
We welcome contributions to the CCD Marketing TG App! Please fork the repository, make your changes, and submit a pull request. Make sure your code adheres to our style guidelines and passes all lint checks.

License
This project is licensed under the MIT License.

Contact
For inquiries or support, please reach out to:

Company: FISTA Solutions
Website: fistasolutions.com
Telegram App: CCD Marketing TG App