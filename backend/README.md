# Distributed Task Queue - Backend

## Overview

This backend powers a distributed task queue system inspired by Celery and RabbitMQ concepts. It provides APIs for user management, task creation, task processing, and task tracking.

Tasks are stored in MongoDB, queued using BullMQ, processed asynchronously by workers, and managed through Redis.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis
* BullMQ

## Features

* User Registration and Login
* JWT-based Authentication
* Create and Manage Tasks
* Asynchronous Task Processing
* Background Worker Execution
* Retry Mechanism for Failed Jobs
* Task Status Tracking
* Redis-backed Queue Management

## Project Structure

backend/

├── APIs/

├── config/

├── middlewares/

├── models/

├── queues/

├── workers/

├── .env

├── package.json

└── server.js

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file:

```env
PORT=4000
DB_URL=<mongodb_connection_string>
REDIS_HOST=<redis_host>
REDIS_PORT=<redis_port>
JWT_SECRET=<jwt_secret>
```

4. Start the server

```bash
nodemon server.js
```

## API Modules

### User APIs

* Register User
* Login User
* Authentication

### Task APIs

* Create Task
* View Tasks
* Track Task Status
* Retrieve Task Results

## Queue Workflow

Client Request

↓

Express API

↓

MongoDB Task Storage

↓

BullMQ Queue

↓

Worker Processing

↓

Task Result Update

## Future Improvements

* Priority Queues
* Scheduled Tasks
* Real-time Monitoring Dashboard
* Dead Letter Queue
* Docker Deployment

## Author

N.Shiva Shankar
Roll No.24EG104E28

