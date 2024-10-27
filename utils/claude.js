function parseExpression(tokens) {
    console.log("Parsing expression with tokens:", tokens);
    
    if (tokens.length === 0) {
      throw new Error("Unexpected end of input");
    }
    
    let node = parseConditionOrSubexpression(tokens);
  
    while (tokens.length > 0 && (tokens[0] === "AND" || tokens[0] === "OR")) {
      const operator = tokens.shift();
      console.log("Operator found:", operator);
      const rightNode = parseConditionOrSubexpression(tokens);
      node = createNode("operator", node, rightNode, operator);
    }
  
    return node;
  }
  
  function parseConditionOrSubexpression(tokens) {
    if (tokens[0] === "(") {
      tokens.shift(); // Remove opening parenthesis
      console.log("Opening parenthesis found, parsing subexpression");
      const node = parseExpression(tokens);
      
      if (tokens.length === 0 || tokens[0] !== ")") {
        throw new Error("Missing closing parenthesis");
      }
      tokens.shift(); // Remove closing parenthesis
      return node;
    } else if (isConditionStart(tokens[0])) {
      return parseCondition(tokens);
    } else {
      throw new Error(`Unexpected token: ${tokens[0]}`);
    }
  }
  
  function isConditionStart(token) {
    return /^[a-zA-Z_]+$/.test(token);
  }
  
  function parseCondition(tokens) {
    console.log("Parsing condition with tokens:", tokens);
    const attribute = tokens.shift();
    const operator = tokens.shift();
    const value = tokens.shift();
  
    console.log(`Parsed condition: ${attribute} ${operator} ${value}`);
    console.log("Remaining tokens:", tokens);
  
    if (!attribute || !operator || value === undefined) {
      throw new Error(`Invalid condition format: ${attribute} ${operator} ${value}`);
    }
  
    return createNode("operand", null, null, `${attribute} ${operator} ${value}`);
  }
  
  function createNode(type, left, right, value) {
    return { type, left, right, value };
  }
  
  // Example usage:
  // const tokens = ['(', 'age', '>', '18', 'AND', 'salary', '>=', '50000', ')', 'OR', '(', 'department', '=', "'Sales'", ')'];
  try {
    const ast = parseExpression(tokens);
    console.log(JSON.stringify(ast, null, 2));
  } catch (error) {
    console.error("Error parsing expression:", error.message);
    console.log("Remaining tokens:", tokens);
  }