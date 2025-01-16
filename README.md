# Task Management API

<!-- important dependencies -->
1. npm install express mongoose dotenv body-parser swagger-ui-express

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file with: PORT=3000 MONGO_URI=<your-mongodb-uri>
4. Start the server: npm start
    - Ensure that port 3000 is not in already in use
    - If show EADDRINUSE: address already in use :::3000 like this error then use another port or terminate port 3000
    - For terminate in window follow the below step:
        - Check running port = netstat -ano | findstr :3000
        - If LISTENING   <PID>
        - Terminate port = taskkill /PID 3444 /F
    - For macOS/Linux: 
        - lsof -i :3000
        - kill -9 <PID>
5. Instead of npm start use nodemon for automatically restarts your Node.js application
6. npm install -g nodemon
7. nodemon app.js
8. Now you need to save file only and nodemon restart your application automatically

## Folder Structure
- `models/`: Mongoose schemas.
- `routes/`: API routes.
- `controllers/`: Business logic.
- `config/`: Database connection.
- `app.js`: Main Express app.
- `server.js`: Server entry point.

## Features
- CRUD operations for tasks.
- Pagination and search support.
- Error handling and validations.

## Bonus Features
- Swagger documentation.
- MongoDB Atlas integration.

## Testing the API

### Using Postman
1. Import the `tasksDB.postman_collection.json` file into Postman.
2. Use the predefined requests to test the API.

### Using cURL
You can test the API endpoints using the following cURL commands:

#### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
      "title": "Design the homepage",
      "description": "Work on the homepage layout and structure",
      "status": "Pending"
    }'
```
#### Retrieve All Tasks
```curl -X GET "http://localhost:3000/tasks"```

### with filter
```curl -X GET "http://localhost:3000/tasks?status=Completed"```

#### Retrieve a Single Task
```curl -X GET "http://localhost:3000/tasks/<task-id>"```

#### Update a Task
```bash
curl -X PUT http://localhost:3000/tasks/<task-id> \
-H "Content-Type: application/json" \
-d '{
      "title": "Updated title",
      "status": "Completed"
    }'
```
#### Delete a Task
```curl -X DELETE http://localhost:3000/tasks/<task-id>```