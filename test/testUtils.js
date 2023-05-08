const chai = require('chai');
const axios = require('axios');

const { expect } = chai;

const apiUrl = 'http://localhost:3000/tasks';

// Function to check status
const expectResponseStatus = (responseStatus, expectedStatus) => {
  expect(responseStatus).equal(expectedStatus);
};

// Function to validate request body
const validateRequestBody = async (endpointToTest) => {
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
    if (endpointToTest === 'put') {
      await axios.put(`${apiUrl}/edit/1`, reqBody);
    } else if (endpointToTest === 'post') {
      await axios.post(`${apiUrl}/create`, reqBody);
    }
  } catch (error) {
    errorResponse = error.response;
  }
  // Assert
  expectResponseStatus(errorResponse.status, 400);
  expect(errorResponse.data).to.be.an('object');
  expect(errorResponse.data).to.deep.equal(expectedMessage);
};

// Function to validate url param for task id
const validateUrlParam = async (endpointToTest) => {
  // Setup
  const expectedMessage = { message: 'Please provide a valid task ID' };
  // Act
  let errorResponse;
  try {
    switch (endpointToTest) {
      case 'get':
        await axios.get(`${apiUrl}/invalidID`);
        break;
      case 'put':
        await axios.put(`${apiUrl}/invalidID`);
        break;
      default:
        await axios.delete(`${apiUrl}/delete/invalidID`);
        break;
    }
  } catch (error) {
    errorResponse = error.response;
  }
  // Assert
  expectResponseStatus(errorResponse.status, 400);
  expect(errorResponse.data).to.be.an('object');
  expect(errorResponse.data).to.deep.equal(expectedMessage);
};

module.exports = {
  apiUrl,
  expectResponseStatus,
  validateRequestBody,
  validateUrlParam,
};
