# Auth Microservice

Independent microservice responsible for user authentication and JWT token issuance/validation. It communicates with the `users-microservice` over NATS to fetch and verify user credentials.

## Features

- **Login**: Validates username & password, returns a signed JWT plus public user data
- **Token Validation**: Verifies an existing JWT and returns its payload
- **NATS Communication**: Delegates user lookup to the `users-microservice` via message patterns

## Architecture

```
Client --> API Gateway (HTTP) --> Auth Microservice (NATS) --> Users Microservice (NATS + DB)
```

Flow:
1. `POST /auth/login` (API Gateway) sends `{ cmd: 'login' }` to auth microservice.
2. Auth microservice requests `{ cmd: 'findUserByUsername' }` from users microservice.
3. Password compared with bcrypt, JWT generated via `@nestjs/jwt`.
4. Response returns `access_token` and sanitized user object.

## NATS Message Patterns

### Login
- Command: `{ cmd: 'login' }`
- Payload:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- Response:
  ```json
  {
    "access_token": "jwt-token-here",
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "displayName": "string"
    }
  }
  ```

### Validate Token
- Command: `{ cmd: 'validateToken' }`
- Payload:
  ```json
  {
    "token": "jwt-token-here"
  }
  ```
- Response:
  ```json
  {
    "valid": true,
    "payload": {
      "sub": "user-id",
      "username": "string",
      "email": "string"
    }
  }
  ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NATS_URL` | NATS server URL | `nats://nats:4222` |
| `JWT_SECRET` | Secret key used to sign JWTs | `your-secret-key-change-in-production` |
| `JWT_EXPIRES_IN` | Token expiry (seconds) | `86400` (1 day) |

If you use a string like `1d`, update code to parse it; current implementation expects seconds (numeric).

## API Gateway HTTP Endpoints

### Login
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "john123",
  "password": "secret123"
}
```

Response:
```json
{
  "access_token": "<jwt>",
  "user": {
    "id": "...",
    "username": "john123",
    "email": "john@example.com",
    "displayName": "John"
  }
}
```

### Validate Token
```bash
POST http://localhost:3000/auth/validate
Content-Type: application/json

{
  "token": "<jwt>"
}
```

Response:
```json
{
  "valid": true,
  "payload": {
    "sub": "...",
    "username": "john123",
    "email": "john@example.com"
  }
}
```

## Local Development (Docker)

The service is included in `docker-compose.yml` as `auth_microservice`. To rebuild after changes:

```powershell
docker compose build auth_microservice
docker compose up -d auth_microservice
```

## Dependencies

- `@nestjs/jwt` for token signing/verification
- `bcryptjs` for password hashing/validation
- `@nestjs/microservices` + NATS transport for inter-service communication

## Security Notes

- Change `JWT_SECRET` in production; never commit real secrets
- Consider rotating secrets and adding refresh tokens for long sessions
- Limit token lifetime; default is 24h (86400 seconds)

## Future Enhancements

- Refresh token support
- Role/permission claims in JWT payload
- Revocation list (Redis) for logout handling
- Rate limiting on login attempts

---
Maintained as part of the `managely` backend microservices stack.
