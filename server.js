const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("DB connected"))
.catch(err => console.log(err));

//
const ruleRoutes = require("./routes/ruleRoutes");
app.use('/api/rules', ruleRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});