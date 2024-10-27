const Rule = require("../models/Rule");
const Joi = require("joi");

const { createAST } = require("../utils/astUtils");

// Define the Joi schema for ruleString validation
const ruleSchema = Joi.object({
  ruleString: Joi.string()
    .min(5) // Minimum length of 5 characters
    .required() // Required field
    .pattern(new RegExp(/[\w\s><=]+/)) // Basic regex pattern to allow valid rule content
    .message("Invalid rule string format"),
});

//Creating a new rule
exports.createRule = async (req, res) => {
  const { ruleString } = req.body;

  // Validate the ruleString using Joi
  const { error } = ruleSchema.validate({ ruleString });

  // If validation fails, return the error message
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    console.log(ruleString);
    const astRepresentation = createAST(ruleString);

    console.log("Generated AST for rule: ", astRepresentation);
    const newRule = new Rule({ ruleString, astRepresentation });
    await newRule.save();
    res.status(201).json(newRule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
