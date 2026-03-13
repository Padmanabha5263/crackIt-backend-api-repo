# CrackIt Backend API

A robust authentication API built with Node.js, Express, and TypeScript for the CrackIt interview preparation platform.

## Features

- **User Authentication**: Secure user registration and login
- **Session Management**: MongoDB-backed session storage
- **Password Reset**: Email-based password recovery system
- **TypeScript**: Full type safety and better development experience
- **MongoDB Integration**: NoSQL database for user data and sessions
- **Email Services**: SMTP-based email sending for notifications

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Session Store**: connect-mongodb-session
- **Authentication**: bcrypt for password hashing
- **Email**: Nodemailer with Gmail SMTP
- **Development**: Nodemon for hot reloading

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd CrackIt-backend-api-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/crackit
   SESSION_SECRET_KEY=your-super-secret-session-key
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with hot reloading using Nodemon.

### Production Build
```bash
npm run build
npm start
```
The `build` command compiles TypeScript to JavaScript, and `start` runs the compiled code.

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/resetpassword` | Send password reset email |
| POST | `/api/auth/resetpassword/confirm` | Confirm password reset |

### Request/Response Examples

#### User Registration
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "age": 25,
  "phone": "1234567890",
  "usertype": "student"
}
```

#### User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Password Reset
```bash
POST /api/auth/resetpassword
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## Project Structure

```
CrackIt-backend-api-repo/
├── src/
│   ├── config/
│   │   └── databaseconfig.ts      # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.ts     # Authentication logic
│   ├── middlewares/
│   │   └── isauth.middleware.ts   # Authentication middleware
│   ├── models/
│   │   ├── user.model.ts          # User schema
│   │   ├── email.model.ts         # Email templates schema
│   │   └── session.model.ts       # Session schema
│   ├── routes/
│   │   └── auth.routes.ts         # Authentication routes
│   ├── services/
│   │   ├── auth.service.ts        # Business logic
│   │   └── email.service.ts       # Email service
│   ├── types/
│   │   ├── user.types.ts          # TypeScript types
│   │   └── session.d.ts           # Session types
│   ├── util/
│   │   ├── constants.ts           # Application constants
│   │   ├── cryptoutils.ts         # Crypto utilities
│   │   └── email.ts               # Email utilities
│   └── index.ts                   # Application entry point
├── dist/                          # Compiled JavaScript (generated)
├── node_modules/                  # Dependencies
├── .env                           # Environment variables
├── package.json                   # Project metadata and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `SESSION_SECRET_KEY` | Secret key for session encryption | Yes |
| `EMAIL_USER` | Gmail address for sending emails | Yes |
| `EMAIL_PASS` | Gmail app password | Yes |

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (currently not implemented)

### Code Style

This project uses TypeScript with strict type checking. Make sure to:

- Use proper TypeScript types
- Follow the existing code structure
- Run `npm run build` before committing to ensure no compilation errors

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues, please open an issue in the repository or contact the development team.</content>
<parameter name="filePath">e:\Projects\crackit-interviewprep\CrackIt-backend-api-repo\README.md