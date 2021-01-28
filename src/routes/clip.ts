import express from "express";
const router = express.Router();

router.get("/all", (_, res) => {
  res.json({ clips: "all" });
});

// router.get("/", (req, res) => {
//   // category, language, pagination
// });

export default router;
