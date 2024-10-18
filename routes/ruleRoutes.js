const express = require("express");
const { createRule } = require("../controllers/ruleController");

const router = express.Router();

//Route to create a new rule
router.post('/', createRule);

//other routes

module.exports = router;