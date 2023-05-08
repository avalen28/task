const mocha = require('mocha');
const chai = require('chai');
const axios = require('axios');

const { describe, it } = mocha;
const { expect } = chai;

const { apiUrl, expectResponseStatus } = require('./testUtils');

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
    // Setup
    const expectedMessage = { message: 'Please provide a valid task ID' };
    // Act
    let errorResponse;
    try {
      await axios.get(`${apiUrl}/invalidID`);
    } catch (error) {
      errorResponse = error.response;
    }
    // Assert
    expectResponseStatus(errorResponse.status, 400);
    expect(errorResponse.data).to.be.an('object');
    expect(errorResponse.data).to.deep.equal(expectedMessage);
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

  describe('POST /tasks/create', () => {
    it('returns an error 400 with a json message when req.body fields have wrong format', async () => {
      // Setup
      const expectedMessage = { message: 'Please check your fields' };
      const reqBody = {
        title: 'test',
        description: 'test description',
        deadline: 'false',
        isCompleted: false,
      };
      // Act
      let errorResponse;
      try {
        await axios.post(`${apiUrl}/create`, reqBody);
      } catch (error) {
        errorResponse = error.response;
      }
      // Assert
      expectResponseStatus(errorResponse.status, 400);
      expect(errorResponse.data).to.be.an('object');
      expect(errorResponse.data).to.deep.equal(expectedMessage);
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
      // Setup
      const expectedMessage = { message: 'Please provide a valid task ID' };
      // Act
      let errorResponse;
      try {
        await axios.get(`${apiUrl}/invalidID`);
      } catch (error) {
        errorResponse = error.response;
      }
      // Assert
      expectResponseStatus(errorResponse.status, 400);
      expect(errorResponse.data).to.be.an('object');
      expect(errorResponse.data).to.deep.equal(expectedMessage);
    });
    it('returns an error 400 with a json message when req.body fields have wrong format', async () => {
      // Setup
      const expectedMessage = { message: 'Please check your fields' };
      const reqBody = {
        title: 'test',
        description: 'test description',
        deadline: 'false',
        isCompleted: false,
      };
      const taskIdTest = 1;
      // Act
      let errorResponse;
      try {
        await axios.put(`${apiUrl}/edit/${taskIdTest}`, reqBody);
      } catch (error) {
        errorResponse = error.response;
      }
      // Assert
      expectResponseStatus(errorResponse.status, 400);
      expect(errorResponse.data).to.be.an('object');
      expect(errorResponse.data).to.deep.equal(expectedMessage);
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
  });
});
