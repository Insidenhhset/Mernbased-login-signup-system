const mongoDB = require("./config/db");
const cors = require("cors");
const express = require("express"); // Import express correctly
const app = express(); // Initialize express app
const port = 3000;

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204, // For legacy browser support
};

app.use(cors(corsOptions)); // Enable CORS with options

const userRouter = require("./api/User");

// Correctly use the JSON middleware
app.use("/user", userRouter);

// Connect to MongoDB
mongoDB();

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
