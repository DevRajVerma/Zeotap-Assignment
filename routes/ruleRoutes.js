const express = require("express");
const { createRule } = require("../controllers/ruleController");
const { evaluateRule } = require("../controllers/evaluateController")

const router = express.Router();

//Route to create a new rule
router.post('/create_rule', createRule);

//Evaluate user data against the rule
router.post('/evaluate_rule', evaluateRule);

//other routes

module.exports = router;