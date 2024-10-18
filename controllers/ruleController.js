const Rule = require('../models/Rule');

const { createAST } = require("../utils/astUtils");

//Creating a new rule
exports.createRule = async(req,res) =>{
    const { ruleString } = req.body;

    try{
        const astRepresentation = createAST(ruleString);
        const newRule = new Rule({ ruleString, astRepresentation});
        await newRule.save();
        res.status(201).json(newRule);

    }
    catch(error){
        res.status(400).json({ error : error.message});
    }
}