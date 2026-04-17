const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});