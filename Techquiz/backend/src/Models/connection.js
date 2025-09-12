require("dotenv").config();
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Database Connected");
})
.catch((err) => {
    console.log("❌ Database Connection Failed:", err);
});

module.exports = mongoose;
