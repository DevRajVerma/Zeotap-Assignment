# Create Rule API Documentation

## Endpoint
```
POST http://localhost:3000/api/rules/create_rule
```

## Headers
| Header          | Value            | Required |
|-----------------|------------------|----------|
| Content-Type    | application/json | Yes      |

## Request Body
```json
{
    "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25))"
}
```

### Request Body Parameters
| Parameter   | Type   | Required | Description                                     |
|------------|--------|----------|-------------------------------------------------|
| ruleString | string | Yes      | The logical expression representing your rule   |

## Response
### Success Response (200 OK)
```json
{
    "success": true,
    "message": "Rule created successfully",
    "data": {
        "_id": "6714e56f39055041ad25c4be",
        "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25))",
        "astRepresentation": {
            "type": "operator",
            "value": "OR",
            "left": {
                "type": "operator",
                "value": "AND",
                "left": {
                    "type": "operand",
                    "value": "age > 30",
                    "left": null,
                    "right": null
                },
                "right": {
                    "type": "operand",
                    "value": "department = 'Sales'",
                    "left": null,
                    "right": null
                }
            },
            "right": {
                "type": "operand",
                "value": "age < 25",
                "left": null,
                "right": null
            }
        },
        "createdAt": "2024-10-20T11:11:43.643Z"
    }
}
```

### Error Response (400 Bad Request)
```json
{
    "success": false,
    "message": "Invalid rule string format",
    "error": "Detailed error message"
}
```

## Example Usage

### Using cURL
```bash
curl -X POST \
  http://localhost:3000/api/rules/create_rule \
  -H 'Content-Type: application/json' \
  -d '{
    "ruleString": "((age > 30 AND department = '\''Sales'\'') OR (age < 25))"
}'
```

### Using JavaScript Fetch
```javascript
const response = await fetch('http://localhost:3000/api/rules/create_rule', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        ruleString: "((age > 30 AND department = 'Sales') OR (age < 25))"
    })
});

const data = await response.json();
```

### Using Axios
```javascript
const response = await axios.post('http://localhost:3000/api/rules/create_rule', {
    ruleString: "((age > 30 AND department = 'Sales') OR (age < 25))"
}, {
    headers: {
        'Content-Type': 'application/json'
    }
});
```

## Notes
- The rule string must be a valid logical expression
- Supported operators: AND, OR
- Supported comparisons: >, <, >=, <=, =
- String values should be enclosed in single quotes
- The response includes the parsed AST (Abstract Syntax Tree) representation of your rule
- All created rules are stored with a timestamp and unique ID