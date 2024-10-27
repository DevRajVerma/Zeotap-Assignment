const Rule = require("../models/Rule");

const { evaluateAST } = require("../utils/evaluate");

exports.evaluateRule = async (req, res) => {
  const { ruleId, userData } = req.body;

  try {
    // Step 1: Fetch the AST from the database using the ruleId
    const ast = await Rule.findById(ruleId); // Assuming RuleModel is our Mongoose model for the rules

    // console.log(ast);
    const finalAST = ast.astRepresentation;
    // console.log(finalAST);

    // return res.send("gand marao bc");
    console.log("gand marao bc");
    

    // Step 2: Evaluate the AST against the provided userData
    const result = evaluateAST(finalAST, userData);

    // res.send("gand marao bhenchodo");

    // Step 3: Return the result (true or false)
    res.json({ eligible: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
