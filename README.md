# TASK MANAGER REST API

## Description

This is a Rest API for a task manager app build with ExpressJS and PostgreSQL.

---

## API endpoints and usage

| Action                                       | Method | Endpoint                           | Req.body                                                                      | Private/Public  |
| -------------------------------------------- | ------ | ---------------------------------- | ----------------------------------------------------------------------------- | --------------- |
| Test endpoint           | GET   | /tasks/test                       |                                      | Public          |
| Create task           | POST   | /tasks/create                       | { title, description, deadline, isCompleted }                                     | Public          |
