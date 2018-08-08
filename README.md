# Assets API

REST API for the assets manager.

Uses TypeORM, Koa and TypeScript. 

## Environment variables
    - MYSQL_HOST || "localhost"
    - MYSQL_PORT || 3306
    - MYSQL_USER || "root"
    - MYSQL_PASS || "root"
    - MYSQL_DB || "assets_db"
    - PORT || 3000
    - TOKEN_SECRET || 'secret'

## Routes

The SQL script inside the project creates the schema and put some data. The admin user can be logged using the following JSON on the route `users/login`:
``` JSON
{
  "email":"admin@admin.com",
  "password":"admin",
}
```

You should save the token and send it in the header (Authorization) on every request to the API.


### Employees

  - GET `/employees` Get all employees
  - GET `/employees/:id` Get an employee by ID. 
  - GET `/employees/:id/assets` Get all assets from an employee by ID.
  - POST `/employees/` Create a new employee. Body request:
      ```JSON
      {
        "name": "John Doe"
      }
      ```
  - PATCH `/employees/:id` Update an employee.
  - DELETE `/employees/:id` Delete an employee.

### Assets

  - GET `/assets` Get all assets
  - GET `/assets/:id` Get an asset by ID. 
  - POST `/assets/` Create a new asset. Body request:
      ```JSON
      {
        "name": "John Doe",
        "notes": null,
        "blocked": false,
        "serialNumber": "12ihpo31hj541oi4h51"
      }
      ```
  - PATCH `/assets/:id` Update an asset.
  - DELETE `/assets/:id` Delete an asset.

### Records

  - GET `/records` Get all records


## TO DO

- [ ] Add date and property filters for routes
- [ ] Add pagination for routes
