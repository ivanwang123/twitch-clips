import express from "express";
import cors from "cors";
import clip from "./routes/clip";
import fetchData from "./dataFetcher";

const app = express();

fetchData();

app.use(cors());

app.use("/clip", clip);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
