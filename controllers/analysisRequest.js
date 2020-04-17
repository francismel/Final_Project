const analysisRequest = require("../models/analysisRequest");
const path = require("path");
const fetch = require("node-fetch");
const User = require("../models/user");

const fs = require("fs");

module.exports = {
  analyzeRequest,
  saveRequest,
  getRequests,
  delRequest,
};

async function analyzeRequest(req, res, next) {
  let request = {
    link: req.body.link,
    numReviews: req.body.numReviews,
  };
}

async function saveRequest(req, res, next) {
  let newRequest = {
    numReviews: req.body.numReviews,
    link: req.body.link,
  };
  User.findById(req.body.userId, function (error, currUser) {
    const newdoc = currUser.requests.create(newRequest);

    currUser.requests.push(newdoc);

    currUser.save();

    console.log("id of new review ", newdoc._id);
    res.status(201).json({ data: newdoc._id });
    // console.log('awesome')
  });
}

async function getRequests(req, res, next) {
  let userId = req.params.id;
  User.findById(userId, function (error, currUser) {
    let requests = currUser.requests;
    return res.json(requests);
  });
}

async function delRequest(req, res, next) {
  let userId = req.params.userId;
  let requestId = req.params.requestId;
  User.findById(userId, function (error, currUser) {
    currUser.requests.pull({ _id: requestId });
    currUser.save();
  });
}
