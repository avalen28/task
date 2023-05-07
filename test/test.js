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
