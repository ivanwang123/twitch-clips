import express from "express";
const router = express.Router();

router.get("/all", (_, res) => {
  res.json({ clips: "all" });
});

export default router;
