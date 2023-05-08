# TASK MANAGER REST API 📝

## Description

This is a Rest API for a task manager app build with ExpressJS and PostgreSQL.

The app allows the user to create, read, update and delete tasks. Tasks can be retrieved individually, as a whole and also just those that are pending, sorted by the task deadline.

Unit testing has been implemented with Mocha and Chai. 

Coding standards for JS have been used through th inclusion of AirBnB's coding style guide with the extension of ESLint on the code editor.

Potential errors on each endpoint have been handled and tested with the unit tests that have been implemented.

Dockerization has been partially implemented.

The design of this API has been based on some assumptions, like: 
- Having duplicated task titles is not something to avoid
- Including an endpoint to retrieve individual tasks could be desirable
- The status of the task (completed/pending) could be reflected with a field is_completed in the task schema, with type boolean
- The order in which the tasks are returned in the endpoint for all pending tasks sorted should be from the most recent to the most old
- None of the endpoints requires access restriction (for instance, only accessible by an admin user), so no middlewares were implemented


---

## Instructions ✨

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project should run on **PORT 3000**.

Then, run:

```bash
npm install
```

---
## Database usage 📦


The app hasn't been completely dockerized: the API is present in the Docker environment, it has its own container, but the PostgresQL container does not yet have a script to initialize the database and the corresponding tables. 

Therefore, to test the app locally, without using the Docker environment, you should follow these steps: 

1. Connect to your PostgresQL environment on the terminal
2. Create the database *task_db* for the task-manager app with the following command: 

```bash
CREATE DATABASE task_db;
````
3. Create the table *tasks* in the task_db database with the following columns:

```bash
CREATE TABLE tasks (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(500),
    deadline DATE,             
    is_completed BOOLEAN
);
```
##### ❗️(Disclaimer) Deadline date should be provided in format yyyy-mm-dd

---

## API usage 💻

To test the endpoints of the task manager app, you can use the Postman collection included in the project (*Task Manager.postman_collection.json*):
1. Open Postman desktop application.
2. Go to File > Import and upload the Postman collection.json
3. Explore the API! 🔍

## Task manager app endpoints 

| Action                                       | Method | Endpoint                           | Req.body                                                                      | Private/Public  |
| -------------------------------------------- | ------ | ---------------------------------- | ----------------------------------------------------------------------------- | --------------- |
| Test endpoint           | GET   | /tasks/test                       |                                      | Public          |
| Get all tasks           | GET   | /tasks/all                       |                                     | Public          |
| Get all pending tasks           | GET   | /tasks/pending                       |                                     | Public          |
| Get a single task           | GET   | /tasks/:taskId                       |                                     | Public          |
| Create task           | POST   | /tasks/create                       | { title, description, deadline, isCompleted }                                     | Public          |
| Update task           | PUT   | /tasks/edit/:taskId                       | { title, description, deadline, isCompleted }                                     | Public          |
| Delete task           | DELETE   | /tasks/delete/:taskId                       |                                     | Public          |

---

## Scripts 🏃‍♂️

- To start the project run:

```bash
npm run start
```

- To start the project in development mode, run:

```bash
npm run dev
```

- To start the unit testing for the project, run:
```bash
npm test
```

---

## Next steps 📈
1. Finish the dockerization of the project: PostgreSQL container. Include a script to automatize the creation of the database and its tables.
2. Create a script to seed the database with a few rows on the task table to start with some content.
3. Expand the coverage of the tests: maybe add test cases for each of the individual validations that have been implemented (especially in the POST and PUT endpoints).
4. Find a way to deal with duplicated tasks and its implications in terms of data storage (titles maybe could be unique).


---

Thank you for your attention and... Happy coding! ❤️