# TASK MANAGER REST API

## Description

This is a Rest API for a task manager app build with ExpressJS and PostgreSQL.

---

## API endpoints and usage

| Action                                       | Method | Endpoint                           | Req.body                                                                      | Private/Public  |
| -------------------------------------------- | ------ | ---------------------------------- | ----------------------------------------------------------------------------- | --------------- |
| Test endpoint           | GET   | /tasks/test                       |                                      | Public          |
| Get all tasks           | GET   | /tasks/all                       |                                     | Public          |
| Get all pending tasks           | GET   | /tasks/pending                       |                                     | Public          |
| Get a single task           | GET   | /tasks/:taskId                       |                                     | Public          |
| Create task           | POST   | /tasks/create                       | { title, description, deadline, isCompleted }                                     | Public          |
| Update task           | PUT   | /tasks/edit/:taskId                       | { title, description, deadline, isCompleted }                                     | Public          |
| Delete task           | DELETE   | /tasks/delete/:taskId                       |                                     | Public          |
