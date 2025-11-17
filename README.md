# Managely

A microservices-based application built with NestJS, using NATS for inter-service communication, PostgreSQL for data persistence, and Redis for caching.

## 🏗️ Architecture

This project follows a microservices architecture with the following components:

- **API Gateway** - HTTP REST API entry point (Port 3000)
- **Users Microservice** - Handles user management operations
- **Payments Microservice** - Manages payment processing
- **NATS** - Message broker for inter-service communication (Port 4222)
- **PostgreSQL** - Primary database (Port 5432)
- **Redis** - Cache layer (Port 6379)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (v20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 or higher)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/ricopomps/managely.git
cd managely
```

### 2. Set up environment variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
DB_HOST=db_user
DB_USER=postgree
DB_PASSWORD=9439
DB_NAME=db_user
```

> **Note:** For production, use strong passwords and never commit the `.env` file to version control.

### 3. Build and start the application

```bash
docker-compose up --build
```

Or run in detached mode (background):

```bash
docker-compose up -d --build
```

### 4. Verify the services are running

Check that all containers are up:

```bash
docker-compose ps
```

You should see all services in the "Up" state.

### 5. Access the API

The API Gateway is now available at:

```
http://localhost:3000
```

#### Example API Endpoints

**Get all users:**
```bash
curl http://localhost:3000/users
```

**Create a new user:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "displayName": "John Doe"
  }'
```

## 🛠️ Development

### View logs

View logs for all services:
```bash
docker-compose logs -f
```

View logs for a specific service:
```bash
docker-compose logs -f users_microservice
docker-compose logs -f payments_microservice
docker-compose logs -f api_gateway
```

### Restart a specific service

```bash
docker-compose restart users_microservice
```

### Stop the application

```bash
docker-compose down
```

To stop and remove volumes (will delete database data):
```bash
docker-compose down -v
```

### Rebuild a specific service

```bash
docker-compose up -d --build users_microservice
```

## 📁 Project Structure

```
managely/
├── http-api-gateway/          # API Gateway service
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── users/             # Users endpoints
│   │   └── payments/          # Payments endpoints
│   └── Dockerfile
│
├── users-microservice/        # Users microservice
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── users/
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       ├── users.module.ts
│   │       ├── models/
│   │       │   └── User.model.ts
│   │       └── dtos/
│   │           └── User.dto.ts
│   └── Dockerfile
│
├── payments-microservice/     # Payments microservice
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── payments/
│   │       ├── payments.controller.ts
│   │       └── payments.module.ts
│   └── Dockerfile
│
├── docker-compose.yml         # Docker Compose configuration
├── .env                       # Environment variables
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `db_user` |
| `DB_USER` | PostgreSQL username | `postgree` |
| `DB_PASSWORD` | PostgreSQL password | `9439` |
| `DB_NAME` | PostgreSQL database name | `db_user` |

### Ports

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 3000 | HTTP REST API |
| NATS | 4222 | Message broker |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache |

## 🐛 Troubleshooting

### Services won't start

1. Make sure no other services are using the required ports
2. Check Docker is running: `docker --version`
3. Verify Docker Compose is installed: `docker-compose --version`

### Database connection errors

1. Ensure the `.env` file exists and has the correct credentials
2. Check PostgreSQL container is running: `docker-compose ps postgres`
3. View PostgreSQL logs: `docker-compose logs postgres`

### NATS connection errors

1. Ensure NATS container is running: `docker-compose ps nats`
2. Check microservices can reach NATS: `docker-compose logs payments_microservice`

### Reset the database

To start fresh with a clean database:

```bash
docker-compose down -v
docker-compose up --build
```

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

- **ricopomps** - Initial work

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ using NestJS and Docker
