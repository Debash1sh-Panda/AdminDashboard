const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
require("dotenv").config();

const Dashboard = express();
const PORT = process.env.PORT || 2008;

Dashboard.use(express.json());
Dashboard.use(cookieparser());
Dashboard.use(
  cors({
    origin: "https://admin-dashboard-fznxacubj-debash1sh-pandas-projects.vercel.app",
    credentials: true,
  })
);

require("./database").databaseConnection();

// APIs
const userRoute = require("./routes/route.user.js");
Dashboard.use("/api/user", userRoute);

Dashboard.listen(PORT, () => {
  console.log(`Running on .. ${PORT}`);
});

Dashboard.get("/", (req, res) => {
  res.send("WELCOME TO Dashboard");
});
