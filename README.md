
# Job Portal Application

A full-stack web application connecting recruiters and job seekers through job postings, job discovery, and application management.

## Features

- **Authentication:** JWT-based login and registration.
- **Role-Based Access:** Separate access for recruiters and candidates.
- **Job Management:** Create and manage job postings.
- **Job Search:** Browse available job opportunities.
- **Application Management:** Apply for jobs and manage applications.
- **Responsive UI:** Interactive frontend built with React.
- **REST APIs:** Backend services built with Node.js and Express.js.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| JWT | Authentication |

## Getting Started

### Prerequisites

- [Node.js and npm](https://nodejs.org/)
- MongoDB or a MongoDB Atlas connection
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/keshav061/job-portal-application.git
cd job-portal-application
```

### 2. Install Dependencies

Run `npm install` in each directory containing a `package.json` file.

```bash
npm install
```

### 3. Configure Environment Variables

Create the required `.env` file(s) based on the application's configuration. These may include:

- MongoDB connection URI
- JWT secret
- Backend port
- Frontend API URL

Use the variable names expected by the source code. Do not commit credentials or secrets.

### 4. Run the Application

Start the backend and frontend separately using the scripts defined in their respective `package.json` files.

For example:

```bash
npm start
```

or

```bash
npm run dev
```

### 5. Access the Application

Open the local URL displayed by the frontend development server in your browser.

## Future Improvements

- Advanced job filtering and search
- Email notifications for application updates
- Recruiter analytics dashboard
- Enhanced application tracking
