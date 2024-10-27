// Function to evaluate the AST against user data
function evaluateAST(ast, userData) {
  // Base case: If this is an operand node, evaluate the condition
  if (ast.type === "operand") {
      return evaluateCondition(ast.value, userData);
  }

  // Recursive case: If this is an operator node, evaluate left and right children
  // Access left and right directly as objects
  const leftResult = evaluateAST(ast.left, userData); // Access left node directly
  const rightResult = evaluateAST(ast.right, userData); // Access right node directly

  // Perform the logical operation (AND/OR) based on the current operator node
  if (ast.value === "AND") {
      return leftResult && rightResult;
  } else if (ast.value === "OR") {
      return leftResult || rightResult;
  }

  throw new Error(`Unsupported operator: ${ast.value}`);
}

// Helper function to evaluate individual conditions like "age > 30"
function evaluateCondition(condition, userData) {
  const [attribute, operator, value] = parseCondition(condition);

  const userValue = userData[attribute];

  // Ensure that userValue is defined
  if (userValue === undefined) {
      throw new Error(`Attribute '${attribute}' not found in user data`);
  }

  // Determine the type of the value (number or string)
  let parsedValue;
  if (!isNaN(value)) {
      // If the value is numeric, convert it to a number
      parsedValue = parseFloat(value);
  } else {
      // If the value is a string (like 'Sales'), remove quotes and treat it as a string
      parsedValue = value.replace(/['"]+/g, ""); // Remove quotes for string comparison
  }

  // Now compare userValue with parsedValue
  switch (operator) {
      case ">":
          return userValue > parsedValue;
      case "<":
          return userValue < parsedValue;
      case "==": // Use '==' for comparison
          return userValue == parsedValue;
      case "=": // Allow '=' as valid equality check
          return userValue == parsedValue; // or userValue === parsedValue for strict check
      case "!=":
          return userValue != parsedValue;
      case ">=": // Add support for greater than or equal to
          return userValue >= parsedValue;
      case "<=": // Add support for less than or equal to
          return userValue <= parsedValue;
      default:
          throw new Error(`Unsupported operator: ${operator}`);
  }
}

// Helper function to parse the condition into [attribute, operator, value]
function parseCondition(condition) {
  const conditionParts = condition.match(
      /([a-zA-Z_]+)\s*(>=|<=|>|<|==|=|!=)\s*([0-9a-zA-Z'"]+)/
  );

  // Handle if condition doesn't match expected pattern
  if (!conditionParts) {
      throw new Error(`Invalid condition format: '${condition}'`);
  }

  return [conditionParts[1], conditionParts[2], conditionParts[3]];
}

module.exports = { evaluateAST };
