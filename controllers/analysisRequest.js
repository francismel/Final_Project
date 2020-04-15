const analysisRequest = require("../models/analysisRequest");
const path = require("path");
const { spawn } = require("child_process");
const { PythonShell } = require("python-shell");
const Sentiment = require("sentiment");

const fs = require("fs");

module.exports = {
  analyzeRequest,
};

async function analyzeRequest(req, res, next) {
  var currentPath = __dirname;
  let link = req.body.link;
  let numTweets = req.body.numTweets;
  // let pathToPython = "/usr/bin/python";

  // let sentiment = new Sentiment();
  // let docx = sentiment.analyze("i like apples");

  // console.log(docx);

  let options = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: currentPath,
    args: [link, numTweets],
  };
  PythonShell.run("experiment.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
    res.status(201).json(results);
  });
}
