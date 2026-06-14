# Distributed Task Queue

## Overview

Distributed Task Queue is a full-stack application inspired by task processing systems such as Celery and RabbitMQ. The application enables users to create tasks that are processed asynchronously by background workers through a Redis-backed queue.

The system separates task creation from task execution, allowing long-running operations to be processed independently without blocking user requests.

## Architecture

```text
Frontend (React + Vite)
        |
        v
Backend API (Node.js + Express)
        |
        v
MongoDB (Task Storage)
        |
        v
BullMQ Queue
        |
        v
Redis Broker
        |
        v
Worker Process
        |
        v
Task Result & Status Update
```

## Features

### User Management

* User Registration
* User Login
* JWT Authentication

### Task Management

* Create Tasks
* View Tasks
* Track Task Status
* View Task Results

### Background Processing

* Asynchronous Task Execution
* Redis-backed Queue Management
* Worker-based Processing
* Automatic Retry Mechanism
* Concurrent Task Processing

### Supported Task Types

* Number Processing (Factorial Calculation)
* Message Processing
* Email Task Simulation
* Notification Task Simulation

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis
* BullMQ
* JWT
* bcrypt

## Project Structure

```text
DistributedTaskQueue/

├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── APIs/
│   ├── config/
│   ├── middlewares/
│   ├── models/
│   ├── queues/
│   ├── workers/
│   ├── package.json
│   └── server.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd DistributedTaskQueue
```

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=4000
DB_URL=<mongodb_connection_string>
JWT_SECRET=<jwt_secret>
```

Start the backend:

```bash
nodemon server.js
```

Expected output:

```text
Redis connected successfully
DB connected Successfully
Worker is running...
App is listening to port 4000...
```

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Queue Processing Workflow

1. User creates a task through the frontend.
2. Backend stores task information in MongoDB.
3. Task is pushed to BullMQ.
4. Redis manages the queue.
5. Worker consumes and processes the task.
6. Task status and results are updated in MongoDB.
7. User can view the completed result from the frontend.

## Retry Mechanism

The queue is configured with automatic retries:

* Maximum Attempts: 3
* Backoff Strategy: Exponential
* Initial Delay: 2 Seconds

This improves reliability when task execution fails temporarily.

## Learning Outcomes

This project demonstrates:

* Asynchronous Processing
* Message Queues
* Background Workers
* Redis Integration
* Distributed System Fundamentals
* REST API Development
* Authentication & Authorization
* Full-Stack Application Development

## Future Enhancements

* Scheduled Tasks
* Priority Queues
* Real-Time Monitoring Dashboard
* Dead Letter Queue
* Docker Support
* Multi-Worker Deployment
* Task Progress Tracking

## Author

N.Shiva Shankar
Roll No.24EG104E28
