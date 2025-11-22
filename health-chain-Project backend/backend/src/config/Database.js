const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://nadiarajpoot44_db_user:anK2WuhhDbFlBSlD@cluster0.okgev32.mongodb.net/Onetrusthealthchain")
}
module.exports = connectDB;
//anK2WuhhDbFlBSlD
//nadiarajpoot44_db_user