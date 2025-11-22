const express = require('express')
const app = express()
const connectDB = require("./config/Database");
const authRoutes = require("./routes/auth");
const accessRoutes = require("./routes/access");
const port = 3000
const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/access", accessRoutes);

connectDB()
  .then(() => {
    console.log("database connection is establised...");
    app.listen(port, () => {
      console.log("server running successfully");
    });
  })
  .catch((err) => {
    console.log(`error: ${err.message}`);
  });