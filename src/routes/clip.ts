import express from "express";
const sql = require("sql-query-generator");
import { getGames } from "../api/twitchApi";
import pool from "../pool";

const router = express.Router();

router.get("/get-clips", (req, res) => {
  const { game, language, cursor } = req.query;

  pool.connect((poolErr, client, release) => {
    if (poolErr) {
      release();
      res.status(500).json({ alert: { error: true, msg: poolErr.message } });
    }

    // Select clips
    const query = sql.select("clips", "*");
    let hasCursor = false;

    // Paginate by created_at date
    if (cursor?.length) {
      query.where({ created_at: cursor }, "<");
      hasCursor = true;
    }

    // Add game and language filters
    const queryParams: any = {};
    if (language !== "any") queryParams["language"] = language;
    if (game !== "0") queryParams["game_id"] = game;
    if (Object.keys(queryParams).length > 0) {
      if (hasCursor) query.and(queryParams);
      else query.where(queryParams);
    }

    // Take 10 most recent
    query.orderby("created_at DESC").limit(10, 0);

    client.query(query.text, query.values, (err, data) => {
      release();
      if (err) {
        res.status(500).json({ alert: { error: true, msg: err.message } });
      }
      res.status(200).json({
        clips: data.rows,
        alert: { error: false, msg: "Successfully retrieved clips" },
      });
    });
  });
});

router.get("/get-games", async (_, res) => {
  const games = await getGames(100);
  games.data.forEach((game: any) => {
    console.log(`\"${game.name}\": \"${game.id}\",`);
  });
  res.send({ done: "done" });
});

export default router;
