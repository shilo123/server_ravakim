const express = require("express");
const app = express();
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
const AWS = require("aws-sdk");
const PORT = process.env.PORT || 3006;

app.use("/UpFile", express.static("UpFile"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client")));

const s3 = new AWS.S3({
  accessKeyId: "AKIASWXFMBWARBBNHUMG",
  secretAccessKey: "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",
  region: "us-east-1",
});
const URL = "https://server-ravakim-10c1effbda77.herokuapp.com";
// const URL = "http://localhost:3006/";
let collection = null;
(async () => {
  const url =
    "mongodb+srv://hazshilo:1234@cluster0.0yzklos.mongodb.net/?tlsAllowInvalidCertificates=true";
  // const url =
  //   "mongodb+srv://hazshilo:1234@cluster1.ifbyw.mongodb.net/?tlsAllowInvalidCertificates=true";
  const connection = await mongo.connect(url);
  const db = connection.db("Project-ravakim");
  collection = db.collection("Users-Ravakim");
})();
let collectionP = null;
(async () => {
  const url =
    "mongodb+srv://hazshilo:1234@cluster0.0yzklos.mongodb.net/?tlsAllowInvalidCertificates=true";
  // const url =
  //   "mongodb+srv://hazshilo:1234@cluster1.ifbyw.mongodb.net/?tlsAllowInvalidCertificates=true";
  const connection = await mongo.connect(url);
  const db = connection.db("Project-ravakim");

  collectionP = db.collection("potentzial");
  // collection.deleteMany({});
})();
function random(min, max) {
  if (min > max) {
    throw new Error("אחי אך המינימלי גדול מהמקמילי אחיי");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// app.get("/", async (req, res) => {
//   res.json({ stuts: "shcoyeh" });
// });

app.post("/postFilee", upload.single("file"), async (req, res) => {
  const params = {
    Bucket: "dagmusht",
    Key: req.file.originalname,
    Body: req.file.buffer, // גוף הבקשה אמור להכיל את הקובץ עצמו
  };
  s3.upload(params, (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "שגיאה בהעלאת הקובץ ל-S3.", error: err.message });
    }
    // console.log(data.Location);
    const publicUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    // console.log("publicUrl", publicUrl);
    res.send(publicUrl);
  });
});
//
app.post("/ADDForm", async (req, res) => {
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
    // console.log(req.body);
    const { Name, AgeStart, AgeEnd, Gender } = req.body;
    let RamaDatit = req.body.RamaDatit;
    const ContentQuery = {
      Name: { $regex: `^${Name}`, $options: "i" },
      RamaDatit: { $regex: `^${RamaDatit}`, $options: "i" },
      Age: { $gt: +AgeStart, $lt: +AgeEnd },
    };
    if (Gender) {
      ContentQuery.Gender = Gender;
    }
    let data = await collection.find(ContentQuery).toArray();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.json(false);
  }
});
app.get("/GetDetalis/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await collection.find({ _id: new ObjectId(id) }).toArray();
    // console.log(data);
    res.json(data[0]);
  } catch (error) {
    res.json(false);
  }
});
app.post("/AddNote", async (req, res) => {
  try {
    const { val, id } = req.body;
    if (collection) {
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { Note: val } }
      );
    }
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});
app.get("/GetShiduhim", async (req, res) => {
  if (!collection) {
    while (!collection) {}
  }
  let data = await collection
    .aggregate([
      {
        $group: {
          _id: null,
          man: {
            $push: {
              $cond: [{ $eq: ["$Gender", "זכר"] }, "$$ROOT", "$$REMOVE"],
            },
          },
          woman: {
            $push: {
              $cond: [{ $eq: ["$Gender", "נקבה"] }, "$$ROOT", "$$REMOVE"],
            },
          },
        },
      },
    ])
    .toArray();
  res.json(data[0]);
});
app.get("/GetShoduh", async (req, res) => {
  let data = await collectionP
    .aggregate([
      {
        $lookup: {
          from: "Users-Ravakim", // שם הקולקשיין שממנו לצרף
          let: { potentzialIds: "$Potentzial" }, // הגדרת משתנים לשימוש בפייפליין של ה-lookup
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    "$_id",
                    {
                      $map: {
                        input: "$$potentzialIds",
                        as: "potId",
                        in: { $toObjectId: "$$potId" },
                      },
                    },
                  ], // השוואה בין ה-id של המשתמש למערך של ids שהומרו ל-ObjectId
                },
              },
            },
          ],
          as: "Shiduh", // שם השדה שבו יאוחסנו התוצאות
        },
      },
    ])
    .toArray();
  // console.log("data", data);
  res.json(data);
});
app.put("/EditZog", async (req, res) => {
  // console.log(req.body);
  try {
    const { newPoten, ID } = req.body;
    await collectionP.updateOne(
      {
        _id: new ObjectId(ID),
      },
      {
        $set: { Potentzial: newPoten },
      }
    );

    let data = await collectionP
      .aggregate([
        {
          $lookup: {
            from: "Users-Ravakim", // שם הקולקשיין שממנו לצרף
            let: { potentzialIds: "$Potentzial" }, // הגדרת משתנים לשימוש בפייפליין של ה-lookup
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: [
                      "$_id",
                      {
                        $map: {
                          input: "$$potentzialIds",
                          as: "potId",
                          in: { $toObjectId: "$$potId" },
                        },
                      },
                    ], // השוואה בין ה-id של המשתמש למערך של ids שהומרו ל-ObjectId
                  },
                },
              },
            ],
            as: "Shiduh", // שם השדה שבו יאוחסנו התוצאות
          },
        },
      ])
      .toArray();

    res.json(data);
  } catch (error) {
    res.json(null);
  }
});
app.post("/InsertShiduh", async (req, res) => {
  try {
    let Potentzial = req.body;
    await collectionP.insertOne({ Potentzial });
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});
app.delete("/DeleteShiduh/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await collectionP.deleteOne({ _id: new ObjectId(id) });
    res.json(true);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
});
app.post("/AddNoteT", async (req, res) => {
  try {
    const { id, note } = req.body;
    // res.json({ requ: req.body });
    await collectionP.updateOne(
      { _id: new ObjectId(id) },
      { $set: { Note: note } }
    );

    res.json(true);
  } catch (error) {
    res.json(false);
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
