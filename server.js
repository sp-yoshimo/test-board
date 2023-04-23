const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const Thread=require("./models/Thread");

app.use(express.json());
app.use(express.static("public"));

///MongoDBと接続
mongoose.connect(
    "mongodb+srv://yoshimo:sy1208sy@cluster0.it45yc4.mongodb.net/?retryWrites=true&w=majoritymongodb+srv://yoshimo:sy1208sy@cluster0.it45yc4.mongodb.net/?retryWrites=true&w=majority"
).then(() => console.log("DB connect"))
    .catch((err) => console.log(err));


//getメソッド
app.get("/api/v1/threads", async (req, res) => {
    try {
        const allThreads=await Thread.find({});
        res.status(200).json(allThreads);
    } catch (err) {
        console.log(err);
    }
});

//postメソッド
app.post("/api/v1/thread", async (req, res) => {
    try {
        const createThreads=await Thread.create(req.body);
        res.status(200).json(createThreads);
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, console.log("server running"));
