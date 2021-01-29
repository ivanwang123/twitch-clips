import express from "express";
import cors from "cors";
import clip from "./routes/clip";
import user from "./routes/user";
import test from "./routes/test";
// import path from "path";
// import { fetchData } from "./dataFetcher";

const app = express();

// fetchData();
// getValidated();

// if (process.env.NODE_ENV === "production")
//   app.use(express.static(path.join(__dirname, "../client/build")));

app.use(cors());

app.use("/clip", clip);
app.use("/user", user);
app.use("/test", test);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
