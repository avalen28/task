const mocha = require('mocha');
const chai = require('chai');
const axios = require('axios');

const { describe, it } = mocha;
const { expect } = chai;

describe('GET /tasks/test', () => {
  it('returns a json with a message', async () => {
    // Setup
    const expectedMessage = {
      message: 'This is a test endpoint for the task manager project',
    };
    // Act
    const response = await axios.get('http://localhost:3000/tasks/test');
    // Assert
    expect(response.status).equal(200);
    expect(response.data).to.deep.equal(expectedMessage);
  });
});
