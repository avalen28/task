// function to check typeof values in req.body
const reqBodyFielsAreValid = (title, description, deadline, isCompleted) => {
  // string checks
  const stringChecks = [title, description];
  for (let i = 0; i < stringChecks.length; i += 1) {
    const element = stringChecks[i];
    if (typeof element !== 'string') {
      return false;
    }
  }
  // date check
  const parsedDate = Date.parse(deadline);
  if (Number.isNaN(parsedDate)) {
    return false;
  }
  // boolean check
  if (typeof isCompleted !== 'boolean') {
    return false;
  }
  return true;
};

module.exports = { reqBodyFielsAreValid };
