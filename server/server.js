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
function GetAge(data) {
  const calculateAge = (obj) => {
    let Age = null;

    if (obj && obj.BirthDate) {
      const birth =
        obj.BirthDate instanceof Date ? obj.BirthDate : new Date(obj.BirthDate);

      if (!isNaN(birth.getTime())) {
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          years--;
        }

        Age = years;
      }
    }

    return {
      ...obj,
      Age,
    };
  };

  // ✅ אם זה מערך
  if (Array.isArray(data)) {
    return data.map((item) => calculateAge(item));
  }

  // ✅ אם זה אובייקט יחיד
  if (typeof data === "object" && data !== null) {
    return calculateAge(data);
  }

  // ✅ אם הגיע משהו לא צפוי
  return data;
}
function calcAge(birthDate) {
  if (!birthDate) return null;

  const d = new Date(birthDate); // עובד גם על Date וגם על string תקין

  if (isNaN(d.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    age--;
  }
  return age;
}

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
    const publicUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    res.send(publicUrl);
  });
});
//
app.post("/ADDForm", async (req, res) => {
  try {
    // req.body.Age = parseInt(req.body.Age);
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
    // console.log(data);

    data = GetAge(data);
    res.json(data);
  } catch (error) {
    res.json(false);
  }
});
app.post("/FilterData", async (req, res) => {
  try {
    let { Name, AgeStart, AgeEnd, Gender, RamaDatit } = req.body;

    console.log("BODY:", { Name, AgeStart, AgeEnd, Gender, RamaDatit });

    const ContentQuery = {};

    if (Name && Name.trim() !== "") {
      ContentQuery.Name = { $regex: `^${Name}`, $options: "i" };
    }

    if (RamaDatit && RamaDatit.trim() !== "") {
      ContentQuery.RamaDatit = { $regex: `^${RamaDatit}`, $options: "i" };
    }

    if (Gender && Gender.trim() !== "") {
      ContentQuery.Gender = Gender;
    }

    // ✅ פה בכוונה אין BirthDate בכלל
    console.log(
      "MONGO QUERY (WITHOUT AGE):",
      JSON.stringify(ContentQuery, null, 2)
    );

    let data = await collection.find(ContentQuery).toArray();

    console.log("FOUND BEFORE AGE FILTER:", data.length);

    // ✅ סינון גיל אך ורק בצד שרת
    if (
      AgeStart != null &&
      AgeEnd != null &&
      AgeStart !== "" &&
      AgeEnd !== ""
    ) {
      AgeStart = +AgeStart;
      AgeEnd = +AgeEnd;

      data = data.filter((doc) => {
        const age = calcAge(doc.BirthDate);
        return age != null && age >= AgeStart && age <= AgeEnd;
      });
    }

    console.log("FOUND AFTER AGE FILTER:", data.length);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.json(false);
  }
});
app.get("/GetDetalis/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await collection.find({ _id: new ObjectId(id) }).toArray();
    data = GetAge(data[0]);

    res.json(data);
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
  data = GetAge(data[0]);

  res.json(data);
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
  data = GetAge(data);

  res.json(data);
});
app.put("/EditZog", async (req, res) => {
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
    data = GetAge(data);

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
app.get("/DeleteUser/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(ID) });
    if (result.deletedCount === 1) {
      let data = await collection.find({}).toArray();
      data = GetAge(data);
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {}
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
