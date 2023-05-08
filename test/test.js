const mocha = require('mocha');
const chai = require('chai');
const axios = require('axios');

const { describe, it } = mocha;
const { expect } = chai;

const {
  apiUrl,
  expectResponseStatus,
  validateRequestBody,
  validateUrlParam,
} = require('./testUtils');

describe('GET /tasks/test', () => {
  it('returns a json with a message', async () => {
    // Setup
    const expectedMessage = {
      message: 'This is a test endpoint for the task manager project',
    };
    // Act
    const response = await axios.get(`${apiUrl}/test`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.deep.equal(expectedMessage);
  });
});

describe('GET /tasks/all', () => {
  it('returns a json with an array of tasks', async () => {
    // Act
    const response = await axios.get(`${apiUrl}/all`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('array');
  });
});

describe('GET /tasks/pending', () => {
  it('returns a json with an array of pending tasks', async () => {
    // Act
    const response = await axios.get(`${apiUrl}/pending`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('array');
    if (response.data.length > 0) {
      const pendingTasks = response.data.filter(
        (task) => task.is_completed === false,
      );
      expect(pendingTasks.length).equal(response.data.length);
    }
  });
});

describe('GET /tasks/:taskId', () => {
  it('returns an error 400 with a json message when the task id is not a number', async () => {
    validateUrlParam('get');
  });

  it('returns a status 200 with a json message not found task', async () => {
    // Setup
    const expectedMessage = { message: 'No task found with the provided ID' };
    // Act
    const response = await axios.get(`${apiUrl}/9999`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.deep.equal(expectedMessage);
  });

  it('returns a status 200 with a single object - task json', async () => {
    // Setup
    const taskId = 1;
    // Act
    const response = await axios.get(`${apiUrl}/${taskId}`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('array');
    expect(response.data.length).equal(1);
    expect(response.data[0]).to.be.an('object');
    expect(response.data[0].id).to.deep.equal(taskId);
  });
});

describe('POST /tasks/create', () => {
  it('returns an error 400 with a json message when req.body fields have wrong format', async () => {
    validateRequestBody('post');
  });
  it('returns a status 201 with a json message', async () => {
    // Setup
    const reqBody = {
      title: 'test',
      description: 'test description',
      deadline: '2027-06-03',
      isCompleted: false,
    };
    const expectedMessage = { message: '1 tasks added to DB' };
    // Act
    const response = await axios.post(`${apiUrl}/create`, reqBody);
    // Assert
    expectResponseStatus(response.status, 201);
    expect(response.data).to.deep.equal(expectedMessage);
  });
});

describe('PUT /tasks/edit/:taskId', () => {
  it('returns an error 400 with a json message when the task id is not a number', async () => {
    validateUrlParam('put');
  });
  it('returns an error 400 with a json message when req.body fields have wrong format', async () => {
    validateRequestBody('put');
  });
  it('returns a status 200 with a json message not found task', async () => {
    // Setup
    const expectedMessage = {
      message: 'No task found with the provided ID',
    };
    const reqBody = {
      title: 'test',
      description: 'test description',
      deadline: '2023-05-08',
      isCompleted: false,
    };
      // Act
    const response = await axios.put(`${apiUrl}/edit/9999`, reqBody);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.deep.equal(expectedMessage);
  });
  it('returns a status 200 with a json message with task confirmed', async () => {
    // Setup
    const taskIdTest = 1;
    const confirmMessage = {
      message: `Task modified with ID: ${taskIdTest}`,
    };
    const reqBody = {
      title: 'test',
      description: 'test description',
      deadline: '2023-05-08',
      isCompleted: false,
    };
      // Act
    const task = await axios.get(`${apiUrl}/${taskIdTest}`);
    const response = await axios.put(`${apiUrl}/edit/${taskIdTest}`, reqBody);
    const updatedTask = await axios.get(`${apiUrl}/${taskIdTest}`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.deep.equal(confirmMessage);
    expect(task).to.not.deep.equal(updatedTask);
  });
});

describe('DELETE /tasks/delete/:taskId', async () => {
  it('returns an error 400 with a json message when the task id is not a number', async () => {
    validateUrlParam('delete');
  });
  it('returns a status 200 with a json message not found task', async () => {
    // Setup
    const expectedMessage = {
      message: 'No task found with the provided ID',
    };
      // Act
    const response = await axios.delete(`${apiUrl}/delete/889`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.deep.equal(expectedMessage);
  });
  it('returns a status 200 with a json message - deleted task', async () => {
    // Setup
    const taskIdTest = 1;
    const expectedMessage = {
      message: `Task deleted with ID: ${taskIdTest}`,
    };
      // Act
    const allTasks = await axios.get(`${apiUrl}/all`);
    const response = await axios.delete(`${apiUrl}/delete/${taskIdTest}`);
    const allTaskAfterDeletion = await axios.get(`${apiUrl}/all`);
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('object');
    expect(allTasks).to.not.deep.equal(allTaskAfterDeletion);
    expect(response.data).to.deep.equal(expectedMessage);
    expect(allTaskAfterDeletion.data.length).to.equal(
      allTasks.data.length - 1,
    );
  });
});
