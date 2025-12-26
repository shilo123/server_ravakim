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
const PDFDocument = require("pdfkit");
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
        // חישוב גיל עם עשרוניים
        const diffTime = today.getTime() - birth.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        // 365.25 ימים לשנה (כולל שנים מעוברות)
        Age = Math.round((diffDays / 365.25) * 10) / 10; // עיגול לספרה אחת אחרי הנקודה
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
  // חישוב גיל עם עשרוניים
  const diffTime = today.getTime() - d.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  // 365.25 ימים לשנה (כולל שנים מעוברות)
  const age = Math.round((diffDays / 365.25) * 10) / 10; // עיגול לספרה אחת אחרי הנקודה
  return age;
}
function ageToBirthDate(age) {
  if (!age || age < 0) return null;

  const today = new Date();
  const birthYear = today.getFullYear() - age;

  const birthDate = new Date(birthYear, today.getMonth(), today.getDate());

  return birthDate;
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

    data = GetAge(data);
    res.json(data);
  } catch (error) {
    res.json(false);
  }
});
app.post("/FilterData", async (req, res) => {
  try {
    let { Name, AgeStart, AgeEnd, Gender, RamaDatit, Address, Status } =
      req.body;

    const ContentQuery = {};

    if (Name && Name.trim() !== "") {
      ContentQuery.Name = { $regex: `^${Name}`, $options: "i" };
    }

    if (RamaDatit && RamaDatit.trim() !== "") {
      ContentQuery.RamaDatit = { $regex: `^${RamaDatit}`, $options: "i" };
    }

    if (Address && Address.trim() !== "") {
      ContentQuery.Address = { $regex: `^${Address}`, $options: "i" };
    }

    if (Gender && Gender.trim() !== "") {
      ContentQuery.Gender = Gender;
    }

    if (Status && Status.trim() !== "") {
      ContentQuery.Status = { $regex: `^${Status}`, $options: "i" };
    }

    // ✅ פה בכוונה אין BirthDate בכלל

    let data = await collection.find(ContentQuery).toArray();

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
    data = GetAge(data);

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
    console.log({ id, note });
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
app.put("/UpdateNote/:id", async (req, res) => {
  const { id } = req.params;
  const { Note } = req.body;
  // console.log({ id, Note });
  try {
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { Note } });
    res.json(true);
  } catch (error) {
    res.json(false);
  }
  res.json(true);
});
app.put("/EditUser", async (req, res) => {
  const { id, field, value } = req.body;
  try {
    if (field !== "Age") {
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { [field]: value } }
      );
    } else {
      let valueAge = ageToBirthDate(value);
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { BirthDate: valueAge } }
      );
    }
    res.json(true);
  } catch (error) {
    res.json(false);
  }
});

// יצירת PDF עם שמות הרווקים
app.get("/GeneratePDF", async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).json({ error: "מסד הנתונים לא מוכן" });
    }

    let data = await collection.find({}).toArray();
    const names = data
      .map((user) => user.Name)
      .filter((name) => name && name.trim());

    if (names.length === 0) {
      return res.status(400).json({ error: "אין שמות להצגה" });
    }

    // יצירת PDF
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // הגדרת headers לפני pipe
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="לזיווג הגון.pdf"'
    );

    // טיפול בשגיאות לפני pipe
    doc.on("error", (err) => {
      console.error("PDF generation error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "שגיאה ביצירת PDF: " + err.message });
      } else {
        res.end();
      }
    });

    // Pipe ל-response
    doc.pipe(res);

    // כותרת
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("לזיווג הגון", { align: "center" })
      .moveDown(1.5);

    // כתיבת שמות - שני שמות בשורה
    doc.fontSize(16).font("Helvetica");
    const pageWidth = 595; // A4 width in points
    const margin = 50;
    const columnWidth = (pageWidth - 2 * margin) / 2;
    let y = 120;
    const lineHeight = 25;
    const maxY = 750;

    for (let i = 0; i < names.length; i += 2) {
      // בדיקה אם צריך דף חדש
      if (y > maxY) {
        doc.addPage();
        y = 50;
      }

      const name1 = names[i] || "";
      const name2 = names[i + 1] || "";

      // שם ראשון - עמודה שמאלית
      if (name1) {
        try {
          doc.text(name1, margin, y, {
            width: columnWidth - 10,
            align: "right",
          });
        } catch (err) {
          console.error("Error writing name1:", err);
        }
      }

      // שם שני - עמודה ימנית
      if (name2) {
        try {
          doc.text(name2, margin + columnWidth + 10, y, {
            width: columnWidth - 10,
            align: "right",
          });
        } catch (err) {
          console.error("Error writing name2:", err);
        }
      }

      y += lineHeight;
    }

    // סיום ה-PDF
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "שגיאה ביצירת PDF: " + error.message });
    }
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
