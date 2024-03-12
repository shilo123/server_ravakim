const express = require("express");
const app = express();
const port = process.env.PORT || 3006;
const cors = require("cors");
let mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const mailjetModule = require("node-mailjet");
const path = require("path");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use("/UpFile", express.static("UpFile"));
app.use(bodyParser.json());
app.use(cors());
const URL = "http://localhost:3006";
let collection = null;
(async () => {
  const url =
    "mongodb+srv://hazshilo:1234@cluster1.ifbyw.mongodb.net/?tlsAllowInvalidCertificates=true";
  const connection = await mongo.connect(url);
  const db = connection.db("Project-ravakim");
  collection = db.collection("Users-Ravakim");
})();
function random(min, max) {
  if (min > max) {
    throw new Error("אחי אך המינימלי גדול מהמקמילי אחיי");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/postFilee", upload.single("file"), async (req, res) => {
  let File = req.file;
  let nameFile = File.originalname;
  if (nameFile.split(".")[1]) {
    nameFile = nameFile.split(".")[0];
  }
  if (nameFile.split(" ")[1]) {
    nameFile = nameFile.split(" ")[0];
  }
  nameFile += JSON.stringify(random(0, 1000)) + ".png";
  const filePath = path.join("UpFile", nameFile);
  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving the file.");
    }
    res.json(`${URL}/UpFile/${nameFile}`);
  });
});
//
app.post("/GetForm", async (req, res) => {
  try {
    req.body.Age = parseInt(req.body.Age);
    await collection.insertOne(req.body);
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});
//
app.get("/GetRavakim", async (req, res) => {
  try {
    let data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.json(false);
  }
});
app.post("/FilterData", async (req, res) => {
  try {
    const { Name, AgeStart, AgeEnd } = req.body;
    let RamaDatit = req.body.RamaDatit;
    const ContentQuery = {
      Name: { $regex: `^${Name}`, $options: "i" },
      RamaDatit: { $regex: `^${RamaDatit}`, $options: "i" },
      Age: { $gt: +AgeStart, $lt: +AgeEnd },
    };
    console.log(ContentQuery);
    let data = await collection.find(ContentQuery).toArray();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.json(false);
  }
});
app.get("/GetDetalis/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await collection.find({ _id: new ObjectId(id) }).toArray();
    console.log(data);
    res.json(data[0]);
  } catch (error) {
    res.json(false);
  }
});
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
