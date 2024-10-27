okay what have we done till now is taking the rule string from the user
now what we have to do is convert this ruleString into an AST
Then store this AST into DB, we are storing ruleString directly into DB,
we have to store AST of ruleString into DB

//we are taking ruleString input from the user, converting it into AST and stored into DB

//humne user se ruleSTring input leke ast banake db mein store kr diya
//ab humne user se data aur rule leke evaluate kr diya
//ab kya krna hai

//body of request for creating rule
{
"ruleString": "((age > 18 OR age < 60) AND (salary >= 50000 OR location = 'NYC') AND department = 'Sales')"
}

//body of request for evaluating userdata against a rule provided
{
"ruleId": "6713afae08cd6d44fcdc4978",
"userData": {
"age": 10,
"salary": 40034,
"department": "Sales"
}
}



(age > 18 AND salary >= 50000) OR (department = 'Sales')
String after converting to tokens [
'(', 'age',
'>', '18',
'AND', 'salary',
'>=', '50000',
')', 'OR',
'(', 'department',
'=', "'Sales'",
')'
]

// Create the operator node and return it
return createNode('operator', leftNode, rightNode, operator);

function createNode(type, left = null, right = null, value = null) {

return { type, left, right, value };
}


left node = { type: 'operand', left: null, right: null, value: 'age > 18' } 
//left node aa gya humara

right node = { type: 'operand', left: null, right: null, value: 'salary >= 50000' }
//right node bhi aa gya humara

These two operand nodes are created

//ab humara rule ka ast sahi ban raha hai, hume bas ab evaluate krna hai, aur phir 2 routes complete

//evaluate rule bhi kaam kr rha hai thik 


//Humko kya lag raha hai ki humne kar liya
//lag raha hai ki ruleString se AST sahi ban raha hai
//jo bhi AST ban raha hai use hum db mein store kara rahe hai


//to hume krna kya hai?
//hume krna ye hai, ki jo humara AST ban raha hai, use check krna hai, ki AST sahi bana hai ki nhi

//agar sahi bana hai, to hum agle route pe jayenge
//aur agar AST sahi nhi bana hai, to hume sahi AST banana hai

//To humara next step ye hai ki jo bhi humara AST ban raha hai ab, use check krna hai ki shi AST bana hai ki nhi
//kaise check krenge, test case likhte hai