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
      const pendingTasks = response.data.filter((task) => task.is_completed === false);
      expect(pendingTasks.length).equal(response.data.length);
    }
  });
});

describe('GET /tasks/:taskId', () => {
  it('returns an error 400 with a json message', async () => {
    const expectedMessage = { message: 'Please provide a valid task ID' };
    // Act
    let response;
    try {
      response = await axios.get(`${apiUrl}/invalidID`);
    } catch (error) {
      response = error.response;
    }
    // Assert
    expectResponseStatus(response.status, 400);
    expect(response.data).to.be.an('object');
    expect(response.data).to.deep.equal(expectedMessage);
  });
  it('returns a status 200 with a json message no found style', async () => {
    const expectedMessage = { message: 'No task found with the provided ID' };
    // Act
    let response;
    try {
      response = await axios.get(`${apiUrl}/9999`);
    } catch (error) {
      response = error.response;
    }
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.deep.equal(expectedMessage);
  });
  it('returns a status 200 with a single object - task json', async () => {
    const taskId = 1;
    // Act
    let response;
    try {
      response = await axios.get(`${apiUrl}/${taskId}`);
    } catch (error) {
      response = error.response;
    }
    // Assert
    expectResponseStatus(response.status, 200);
    expect(response.data[0]).to.be.an('object');
    expect(response.data[0].id).to.deep.equal(taskId);
  });
});
