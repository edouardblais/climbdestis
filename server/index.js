const express = require("express");
const app = express();
const cors = require("cors");
const { getAll, getByArea, getByDestination } = require("./controllers")

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("Server started on port 5000")
})

app.get("/", getAll)

app.get("/area/:area", getByArea)

app.get("/destination/:destination_id", getByDestination)