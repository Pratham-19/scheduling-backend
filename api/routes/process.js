const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Handling GET requests to /process",
  });
});

router.post("/burst-time", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /burst-time",
  });
});
router.post("/time-quantum", (req, res) => {
  if (!req.body.burstTime)
    return res.status(400).json({ message: "Burst time is required" });
  const burstTime = req.body.burstTime;
  const n = burstTime.length;
  let sumBt = 0;
  burstTime.map((bt) => {
    sumBt += bt;
  });
  const timeQuantum = Math.floor(sumBt / n);
  res.status(200).json({
    message: "Success",
    timeQuantum: timeQuantum,
  });
});

router.post("/turn-around-time", (req, res) => {
  res.status(200).json({
    message: "Handling POST requests to /turn-around-time",
  });
});

module.exports = router;
