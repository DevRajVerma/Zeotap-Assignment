# Rule Engine with Abstract Syntax Tree (AST)

A powerful and flexible 3-tier rule engine application that uses Abstract Syntax Trees to evaluate complex business rules based on user attributes.

## Overview

This application provides a robust system for creating, and evaluating business rules using an AST-based approach. It supports dynamic rule creation and modification, making it suitable for various business use cases where complex eligibility criteria need to be evaluated.

## Features

- **AST-based Rule Processing**: Efficient rule representation using Abstract Syntax Trees
- **Dynamic Rule Creation**: Create rules from string expressions
- **Real-time Evaluation**: Evaluate user data against complex rule sets
- **Error Handling**: Comprehensive validation and error reporting
- **Attribute Validation**: Verify attributes against predefined catalogs

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/DevRajVerma/Zeotap-Assignment.git
```

```bash
cd Zeotap-Assignment/
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

## What to do after Server starts running

You can create a new rule by POST /api/rules/create_rule

You can evaluate userdata against a rule by POST /api/rules/evaluate_rule

- Let's see how can we do this

#### API Endpoints

### Please use Postman to POST to these routes with requested body

1. **Create Rule**

Endpoint

```
POST http://localhost:3000/api/rules/create_rule
```

Headers

| Header       | Value            | Required |
| ------------ | ---------------- | -------- |
| Content-Type | application/json | Yes      |

Request Body

```json
{
  "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25))"
}
```

Response: You will get the generated AST for this rule along with rule Id

2. **Evaluate Rule**

Now to evaluate a user against a rule, you need ruleId of that rule and data of the user you want to evaluate

https://zeo-ass-1-frontend.vercel.app/ You can find the rules along with their ids here

Endpoint

```
POST http://localhost:3000/api/rules/evaluate_rule
```

Headers

| Header       | Value            | Required |
| ------------ | ---------------- | -------- |
| Content-Type | application/json | Yes      |

Request Body

```json
{
  "ruleId": "ruleId",
  "userData": {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
  }
}
```

Response : You will get whether the user is eligible or not according to the rule

## Sample Rules

```
# Rule 1
((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing'))
AND (salary > 50000 OR experience > 5)

# Rule 2
((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)
```

## Architecture

### Three-Tier Structure

1. **Frontend**: You can find all the created rules with their ruleIds here

- https://zeo-ass-1-frontend.vercel.app/

2. **Backend API**: Process services for rule operations
3. **Data Layer**: Persistent storage for rules and metadata

### Core Components

#### Data Structure

The AST is implemented using a Node structure with:

- `type`: Node type (operator/operand)
- `left`: Left child reference
- `right`: Right child reference
- `value`: Operand value

## Error Handling

The system includes comprehensive error handling for:

- Invalid rule syntax
- Unknown attributes
- Type mismatches
- Missing required data
- Invalid operator usage
