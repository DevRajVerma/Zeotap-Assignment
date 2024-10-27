const Joi = require("joi");
const Rule = require("../models/Rule");
const { evaluateAST } = require("../utils/evaluate");

// Define Joi schema for input validation
const evaluateRuleSchema = Joi.object({
  ruleId: Joi.string().required(),
  userData: Joi.object().required(), // Adjust based on the structure of userData
});

exports.evaluateRule = async (req, res) => {
  const { ruleId, userData } = req.body;

  // Validate request body against Joi schema
  const { error } = evaluateRuleSchema.validate({ ruleId, userData });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Step 1: Fetch the AST from the database using the ruleId
    const ast = await Rule.findById(ruleId); // Assuming Rule is our Mongoose model for the rules

    if (!ast) {
      return res.status(404).json({ error: "Rule not found" });
    }

    const finalAST = ast.astRepresentation;

    // Step 2: Evaluate the AST against the provided userData
    const result = evaluateAST(finalAST, userData);

    // Step 3: Return the result (true or false)
    res.json({ eligible: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
