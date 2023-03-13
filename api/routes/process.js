const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Handling GET requests to /process",
  });
});

router.post("/time-quantum", (req, res) => {
  if (!req.body.burstTime)
    return res.status(400).json({ message: "Burst time is required" });
  const burstTime = req.body.burstTime;
  const n = burstTime.length;
  let sumBt = 0;
  burstTime.map((bt) => {
    sumBt += parseInt(bt);
  });
  const timeQuantum = Math.floor(sumBt / n);
  res.status(200).json({
    message: "Success",
    timeQuantum: timeQuantum,
  });
});
router.post("/calculation-arrival-same", (req, res) => {
  console.log(req.body);
  if (
    !(
      req.body.processes &&
      req.body.burstTime &&
      req.body.timeQuantum &&
      req.body.processes.length === req.body.burstTime.length
    )
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const processes = req.body.processes;
  const n = processes.length;
  processes.map((process) => {
    process;
  });
  const burstTime = req.body.burstTime;
  const timeQuantum = req.body.timeQuantum;
  let waitingTime = [];
  let turnAroundTime = [];
  let chart = [];
  var total_time = 0;
  let remainingBurstTime = [...burstTime];
  while (true) {
    let done = true;
    for (let i = 0; i < n; i++) {
      if (remainingBurstTime[i] > 0) {
        done = false;
        if (remainingBurstTime[i] > timeQuantum) {
          remainingBurstTime[i] -= timeQuantum;
          total_time += parseInt(timeQuantum);
        } else {
          total_time += remainingBurstTime[i];
          turnAroundTime[i] = total_time;
          waitingTime[i] = total_time - burstTime[i];
          remainingBurstTime[i] = 0;
        }
        chart.push(processes[i]);
      }
    }
    if (done === true) {
      break;
    }
  }
  res.status(200).json({
    message: "success",
    waitingTime: waitingTime,
    turnAroundTime: turnAroundTime,
    chart: chart,
    total_time: total_time,
  });
});

router.post("/calculation-arrival-different", (req, res) => {});
module.exports = router;
