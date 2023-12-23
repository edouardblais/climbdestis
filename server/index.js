const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/apiKeys", require("./routes/apiKeys"));
app.use("/data", require("./routes/data"));

app.listen(5000, () => {
    console.log("Server started on port 5000")
})