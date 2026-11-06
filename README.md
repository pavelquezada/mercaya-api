# MercaYa API

A demo REST API for managing products and categories in a catalog. The project is built with NestJS and TypeScript, uses PostgreSQL as its database, and provides interactive documentation with Swagger.

## Features

- REST API organized into product and category modules.
- Operations to retrieve and create categories, and to retrieve, create, update, and deactivate products.
- PostgreSQL persistence using TypeORM.
- Database migrations for managing schema creation.
- OpenAPI/Swagger documentation.
- Input validation and transformation with `class-validator` and `class-transformer`.
- Consistent HTTP error responses.
- Tests with Vitest and Supertest.
- Optional instrumentation with NestJS Observe when credentials are configured.

## Technologies

- Node.js and TypeScript
- NestJS
- PostgreSQL
- TypeORM
- Swagger / OpenAPI
- Vitest and Supertest

## Requirements

- Node.js and npm
- Docker Desktop with Docker Compose, or your own PostgreSQL instance

## Installation and configuration

Install the dependencies:

```bash
npm install
```

Start PostgreSQL locally with Docker Compose:

```bash
docker compose up -d
```

By default, Compose creates the `ecommerce_db` database and exposes PostgreSQL at `localhost:5432`, with `postgres` as the username and password. The application uses these same values by default. To customize the connection, create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ecommerce_db
DB_LOGGING=false
PORT=3000
```

Do not commit real credentials to the repository.

## Database and migrations

Automatic schema synchronization is disabled. Run the migrations to create the tables:

```bash
npm run migration:run
```

The initial schema creates the `products` and `categories` tables and their relationship. To check the migration status:

```bash
npm run typeorm -- migration:show
```

To generate a migration from changes to the entities:

```bash
npm run migration:generate -- src/database/migrations/MigrationName
```

The application and TypeORM commands read the connection settings from the `DB_*` variables. Make sure these variables point to the same instance and database that you access with your PostgreSQL client.

## Running the application

Development mode with automatic reload:

```bash
npm run start:dev
```

Other available commands:

```bash
npm run build
npm run start
npm run start:prod
```

The API is available by default at `http://localhost:3000`, with the `/api` prefix.

## Swagger documentation

With the application running, open:

```text
http://localhost:3000/swagger
```

Swagger lets you explore endpoints and schemas, and try requests from your browser.

## Endpoints

All resource endpoints use the `/api` prefix.

### Products

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/products` | Lists active products, sorted by name, with their category. |
| `GET` | `/api/products/:id` | Retrieves a product by UUID. |
| `GET` | `/api/products/sku/:sku` | Finds a product by SKU. |
| `POST` | `/api/products` | Creates a product. |
| `PATCH` | `/api/products/:id` | Partially updates a product. |
| `DELETE` | `/api/products/:id` | Deactivates a product (soft delete); responds with `204 No Content`. |

Example request to create a product:

```json
{
  "sku": "AZU-CAR-1KG",
  "name": "Sugar",
  "price": 1.99,
  "stock": 10,
  "categoryId": "CATEGORY-UUID"
}
```

The `sku` must be unique and use uppercase letters and numbers separated by hyphens, for example `SUG-AR-1KG`. The service converts SKUs to uppercase when creating a product. `categoryId` is optional.

### Categories

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/categories` | Lists categories, sorted by name. |
| `GET` | `/api/categories/:id` | Retrieves a category by UUID. |
| `POST` | `/api/categories` | Creates a category. |

Example request to create a category:

```json
{
  "name": "Beverages",
  "description": "Beverages and soft drinks"
}
```

Requests are validated globally: properties not declared in the DTOs are rejected, and compatible values are transformed. Route identifiers must be UUIDs.

## Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## Observability (optional)

The project includes NestJS Observe instrumentation. To link an application, run:

```bash
npx @nestjs/observe link
```

You can also configure `OBSERVE_APP_KEY` and `OBSERVE_APP_SECRET` in the environment. They are not required to run the API locally.
