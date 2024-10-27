# Rule Engine with Abstract Syntax Tree (AST)

A powerful and flexible 3-tier rule engine application that uses Abstract Syntax Trees to evaluate complex business rules based on user attributes.

## Overview

This application provides a robust system for creating, combining, and evaluating business rules using an AST-based approach. It supports dynamic rule creation and modification, making it suitable for various business use cases where complex eligibility criteria need to be evaluated.

## Features

- **AST-based Rule Processing**: Efficient rule representation using Abstract Syntax Trees
- **Dynamic Rule Creation**: Create rules from string expressions
- **Real-time Evaluation**: Evaluate user data against complex rule sets
- **Flexible Attribute Support**: Handle various data types (numeric, string, etc.)
- **Error Handling**: Comprehensive validation and error reporting
- **Attribute Validation**: Verify attributes against predefined catalogs

## Architecture

### Three-Tier Structure
1. **Frontend**: I haven't build the frontend yet, just backend
2. **Backend API**: Process services for rule operations
3. **Data Layer**: Persistent storage for rules and metadata

### Core Components

#### Data Structure
The AST is implemented using a Node structure with:
- `type`: Node type (operator/operand)
- `left`: Left child reference
- `right`: Right child reference
- `value`: Operand value
- Additional metadata fields

#### API Endpoints

1. **Create Rule**
```http
POST /api/rules/create_rule
Content-Type: application/json

{
    "rule_string": "((age > 30 AND department = 'Sales') OR (age < 25))"
}
```


2. **Evaluate Rule**
```http
POST /api/rules/evaluate_rule
Content-Type: application/json

{
    "rule_id": "rule_id",
    "data": {
        "age": 35,
        "department": "Sales",
        "salary": 60000,
        "experience": 3
    }
}
```

## Sample Rules

```
# Rule 1
((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) 
AND (salary > 50000 OR experience > 5)

# Rule 2
((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)
```

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/DevRajVerma/Zeotap-Assignment.git
```

2. Install dependencies:
```bash
cd Zeotap-Assignment/
npm install
```

3. Set up the database:
```bash
python manage.py migrate
```

4. Start the application:
```bash
python manage.py runserver
```

## Usage Examples

### Creating a Rule
```python
from rule_engine import create_rule

rule_string = "(age > 30 AND department = 'Sales')"
rule = create_rule(rule_string)
```

### Combining Rules
```python
from rule_engine import combine_rules

combined_rule = combine_rules([rule1, rule2])
```

### Evaluating Data
```python
from rule_engine import evaluate_rule

data = {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
}

result = evaluate_rule(combined_rule, data)
```

## Testing

Run the test suite:
```bash
python -m pytest tests/
```

## Error Handling

The system includes comprehensive error handling for:
- Invalid rule syntax
- Unknown attributes
- Type mismatches
- Missing required data
- Invalid operator usage

## Performance Considerations

- AST optimization for repeated evaluations
- Efficient rule combination algorithms
- Caching of frequently used rules
- Optimized database queries

## Database Schema

```sql
-- Rules Table
CREATE TABLE rules (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    rule_string TEXT,
    ast_data JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Rule Combinations Table
CREATE TABLE rule_combinations (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    rules JSON,
    combined_ast JSONB,
    created_at TIMESTAMP
);
```






