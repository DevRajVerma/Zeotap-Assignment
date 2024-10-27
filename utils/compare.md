# Rule Engine with Abstract Syntax Tree (AST)

A powerful and flexible 3-tier rule engine application built with Node.js and MongoDB that uses Abstract Syntax Trees to evaluate complex business rules based on user attributes.

## Overview

This application provides a robust system for creating, combining, and evaluating business rules using an AST-based approach. It supports dynamic rule creation and modification, making it suitable for various business use cases where complex eligibility criteria need to be evaluated.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Frontend**: React.js
- **Testing**: Jest

## Features

- **AST-based Rule Processing**: Efficient rule representation using Abstract Syntax Trees
- **Dynamic Rule Creation**: Create rules from string expressions
- **Rule Combination**: Merge multiple rules into a single evaluation tree
- **Real-time Evaluation**: Evaluate user data against complex rule sets
- **Flexible Attribute Support**: Handle various data types (numeric, string, etc.)
- **Error Handling**: Comprehensive validation and error reporting
- **Attribute Validation**: Verify attributes against predefined catalogs

## Architecture

### Three-Tier Structure
1. **Frontend**: React.js UI for rule management
2. **Backend API**: Express.js RESTful services
3. **Data Layer**: MongoDB for persistent storage

### Core Components

#### Data Structure
The AST is implemented using a Node structure with:
```javascript
{
  type: String,      // "operator" or "operand"
  left: Object,      // Left child reference
  right: Object,     // Right child reference
  value: Any,        // Operand value
  field: String,     // Field name for comparison
  operator: String   // Operator type
}
```

#### API Endpoints

1. **Create Rule**
```http
POST /api/rules/create_rule
Content-Type: application/json

{
    "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25))"
}
```

2. **Combine Rules**
```http
POST /api/rules/combine
Content-Type: application/json

{
    "rules": ["ruleId1", "ruleId2"]
}
```

3. **Evaluate Rule**
```http
POST /api/rules/evaluate
Content-Type: application/json

{
    "ruleId": "ruleId",
    "data": {
        "age": 35,
        "department": "Sales",
        "salary": 60000,
        "experience": 3
    }
}
```

## Sample Rules

```javascript
// Rule 1
((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) 
AND (salary > 50000 OR experience > 5)

// Rule 2
((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)
```

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rule-engine-ast.git
```

2. Install dependencies:
```bash
cd rule-engine-ast
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and other configurations
```

4. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## MongoDB Schema

```javascript
// Rule Schema
const RuleSchema = new Schema({
  name: { type: String, required: true },
  ruleString: { type: String, required: true },
  astData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Rule Combination Schema
const RuleCombinationSchema = new Schema({
  name: { type: String, required: true },
  rules: [{ type: Schema.Types.ObjectId, ref: 'Rule' }],
  combinedAst: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

## Usage Examples

### Creating a Rule
```javascript
const RuleEngine = require('./services/RuleEngine');

const ruleString = "(age > 30 AND department = 'Sales')";
const rule = await RuleEngine.createRule(ruleString);
```

### Combining Rules
```javascript
const combinedRule = await RuleEngine.combineRules([rule1Id, rule2Id]);
```

### Evaluating Data
```javascript
const data = {
    age: 35,
    department: "Sales",
    salary: 60000,
    experience: 3
};

const result = await RuleEngine.evaluateRule(ruleId, data);
```

## Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## Error Handling

The system includes comprehensive error handling for:
- Invalid rule syntax
- Unknown attributes
- Type mismatches
- Missing required data
- Invalid operator usage
- MongoDB connection issues

## Performance Considerations

- AST optimization for repeated evaluations
- Efficient rule combination algorithms
- MongoDB indexing for frequent queries
- Caching using Redis (optional)
- Mongoose query optimization

## API Documentation

API documentation is available using Swagger UI at `/api-docs` when running the application.

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/        # MongoDB models
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── routes/        # API routes
├── tests/             # Test files
├── client/           # React frontend
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Your Name - *Initial work*

## Acknowledgments

- Thanks to contributors and reviewers
- Built with Node.js and MongoDB best practices