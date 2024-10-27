const express = require("express");
const { createRule } = require("../controllers/ruleController");
const { evaluateRule } = require("../controllers/evaluateController")

const { fetchRules } = require("../controllers/fetchRules");

const router = express.Router();

//Route to create a new rule
router.post('/create_rule', createRule);

//Evaluate user data against the rule
router.post('/evaluate_rule', evaluateRule);

router.get('/fetch_rules', fetchRules );

//other routes

module.exports = router;