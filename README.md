# elgo-backend

## Overview

Elgo-backend is the core backend service for Elgo's customer-facing application, designed to manage data streams, device communications, user interactions, and detect anomalies using both internal algorithms and Amazon SageMaker. It is built with Node.js and Express, featuring a RESTful API and scheduled tasks for efficient operations.

## Features

- **Comprehensive API Routing**: Dedicated routes for handling anomalies, devices, users, and data streams.
- **IoT Integration**: Initialization and communication with IoT devices through MQTT protocol.
- **Cron Jobs**: Scheduled tasks for anomaly checking and data maintenance.
- **Cross-Origin Resource Sharing (CORS)**: Configured to allow requests from different origins.
- **Error Handling**: Middleware for centralized error handling.

## Prerequisites

Before installing, ensure you have the following:
- Node.js (14.x or higher recommended)
- A PostgreSQL database setup
- AWS credentials for IoT and SageMaker functionalities
- SendGrid API key for email notifications

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ElgoElectric/elgo-backend.git
   cd elgo-backend
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Environment Setup:**

   Create a `.env` file at the root of your project directory. Include necessary environment variables such as database connection strings, AWS credentials, and SendGrid API key.

4. **Database Migrations:**

   ```bash
   pnpm run migrate:dev
   ```

## Usage

### Starting the Server

Run the server locally with:

```bash
pnpm run start
```

This will start the application on the default port `8080` or on a port defined in your `.env` file.

### IoT Device Initialization

The application automatically attempts to initialize configured IoT devices on startup, ensuring they are ready to communicate and transmit data.

### API Endpoints

The server defines multiple routes for various functionalities:

- `/anomalies` - Anomaly reports and management.
- `/devices` - Device registration and management.
- `/users` - User account management.
- `/datastreams` - Data stream management.
- `/sagemakerAnomalies` - Anomaly detection through Amazon SageMaker.

### Scheduled Tasks

Two cron jobs are configured for regular operations:

- Anomaly checking
- Data maintenance

These are accessible via `/anomalyChecker/cron` and `/clearData/cron` endpoints.

## Development

Contributions are welcome. Ensure adherence to coding standards and submit pull requests for any enhancements or bug fixes.

### Testing

The application includes a basic test setup:

```bash
pnpm run test
```

## Deployment

This application is configured for deployment with Vercel, leveraging the settings in `vercel.json`. Refer to the [Vercel Documentation](https://vercel.com/docs) for deployment instructions.


Licensed under the ISC License. See [LICENSE](LICENSE) for more information.

## Support

For bug reports and feature requests, use the [Issues](https://github.com/ElgoElectric/elgo-backend/issues) section of the GitHub repository.

## More Information

- **Repository**: [GitHub](https://github.com/ElgoElectric/elgo-backend)
- **Live Application**: [elgo-backend.vercel.app](https://elgo-backend.vercel.app)

