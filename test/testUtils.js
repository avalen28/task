const chai = require('chai');

const { expect } = chai;

const apiUrl = 'http://localhost:3000/tasks';

const expectResponseStatus = (responseStatus, expectedStatus) => {
  expect(responseStatus).equal(expectedStatus);
};

module.exports = { apiUrl, expectResponseStatus };
