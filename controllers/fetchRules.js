const Rule = require("../models/Rule");

exports.fetchRules = async (req, res) => {
  try {
    // Fetch all rules, selecting only _id and ruleString fields
    const rules = await Rule.find({}, "ruleString _id")
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .lean(); // Convert to plain JavaScript objects for better performance

    // console.log("Fetched rules:", rules);

    return res.status(200).json({
      success: true,
      data: rules,
      message: "Rules fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching rules:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching rules",
      error: error.message,
    });
  }
};
