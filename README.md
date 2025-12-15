# Managely

Managely is a comprehensive, microservices-based ERP system designed for small to medium-sized manufacturing businesses. It provides tools for managing users, inventory, products, recipes, and sales, all through a unified API.

Built with NestJS, the system uses a NATS message broker for robust inter-service communication, PostgreSQL for persistent data storage, and Docker for containerization.

## 🏗️ Architecture

This project follows a microservices architecture designed for scalability and separation of concerns:

-   **API Gateway**: The single entry point for all client requests. It routes traffic to the appropriate downstream service. (Port: 3000)
-   **Auth Microservice**: Handles user authentication (login) and token validation.
-   **Users Microservice**: Manages user data, including creation, retrieval, and updates.
-   **Inventory Microservice**: Tracks raw material stock levels, adjustments, and history.
-   **Products Microservice**: Manages finished products, their recipes (bill of materials), and production cost calculations.
-   **Sales Microservice**: Processes sales transactions, calculates profits, and coordinates inventory updates.
-   **NATS**: A high-performance message broker for asynchronous communication between services. (Port: 4222)
-   **PostgreSQL**: The primary relational database for all microservices. (Port: 5432)
-   **Redis**: In-memory data store, typically used for caching and session management. (Port: 6379)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   [Docker](https://www.docker.com/get-started) (v20.10 or higher)
-   [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 or higher)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ricopomps/managely.git
cd managely
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory by copying the example file. This file will contain your database credentials and other sensitive configurations.

```bash
# .env
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=managely_db

# JWT Secret for Auth Service
JWT_SECRET=your_super_secret_key
```

> **Note:** For production, always use strong, unique passwords and secrets. Never commit the `.env` file to version control.

### 3. Build and Start the Application

Run the following command to build the Docker images and start all services in the background:

```bash
docker compose up -d --build
```

### 4. Verify the Services

Check the status of the running containers:

```bash
docker compose ps
```

You should see all services listed with a `running` status.

## ⚙️ API Endpoints

The API Gateway is available at `http://localhost:3000`.

---

### 🔑 Authentication

| Method | Endpoint         | Description              |
| :----- | :--------------- | :----------------------- |
| `POST` | `/auth/login`    | Authenticate a user.     |
| `POST` | `/auth/validate` | Validate a JWT token.    |

---

### 👤 Users

| Method   | Endpoint      | Description                |
| :------- | :------------ | :------------------------- |
| `POST`   | `/users`      | Create a new user.         |
| `GET`    | `/users`      | Get a list of all users.   |
| `PUT`    | `/users/{id}` | Update an existing user.   |
| `DELETE` | `/users/{id}` | Delete a user.             |

---

### 📦 Inventory & Raw Materials

#### Raw Materials

| Method   | Endpoint               | Description                     |
| :------- | :--------------------- | :------------------------------ |
| `POST`   | `/raw-materials`       | Create a new raw material.      |
| `GET`    | `/raw-materials`       | Get all raw materials.          |
| `GET`    | `/raw-materials/{id}`  | Get a specific raw material.    |
| `PATCH`  | `/raw-materials/{id}`  | Update a raw material.          |
| `DELETE` | `/raw-materials/{id}`  | Delete a raw material.          |

#### Inventory

| Method | Endpoint              | Description                               |
| :----- | :-------------------- | :---------------------------------------- |
| `GET`  | `/inventory`          | Get current stock levels of all materials.|
| `POST` | `/inventory/adjust`   | Adjust the stock of a raw material.       |
| `GET`  | `/inventory/history`  | Get the history of inventory adjustments. |

---

### 🏭 Products & Recipes

| Method   | Endpoint                                  | Description                                      |
| :------- | :---------------------------------------- | :----------------------------------------------- |
| `POST`   | `/products`                               | Create a new product.                            |
| `GET`    | `/products`                               | Get all products.                                |
| `GET`    | `/products/{id}`                          | Get a specific product.                          |
| `PATCH`  | `/products/{id}`                          | Update a product.                                |
| `DELETE` | `/products/{id}`                          | Delete a product.                                |
| `POST`   | `/products/{id}/recipe`                   | Add a recipe (bill of materials) to a product.   |
| `GET`    | `/products/{id}/recipe`                   | Get the recipe for a product.                    |
| `GET`    | `/products/{id}/cost`                     | Calculate the production cost of a product.      |
| `PATCH`  | `/products/{pId}/recipe/{rmId}`           | Update an item in a product's recipe.            |
| `DELETE` | `/products/{pId}/recipe/{rmId}`           | Remove an item from a product's recipe.          |
| `POST`   | `/products/{id}/check-production`         | Check if a certain quantity can be produced.     |

---

### 💰 Sales

| Method | Endpoint       | Description                |
| :----- | :------------- | :------------------------- |
| `POST` | `/sales`       | Create a new sale.         |
| `GET`  | `/sales`       | Get all sales records.     |
| `GET`  | `/sales/{id}`  | Get a specific sale record.|

## 🛠️ Development

### View Logs

To view real-time logs for all running services:
```bash
docker compose logs -f
```

To view logs for a specific service:
```bash
docker compose logs -f <service_name>
# Example: docker compose logs -f api_gateway
```

### Stop the Application

To stop and remove all running containers:
```bash
docker compose down
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
