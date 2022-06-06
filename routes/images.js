const express = require("express");
const axios = require("axios");

const images = express.Router();

images.route("/image-search")
  .get((req, res) => {
    let searchInput = req.query.input;
    let page = req.query.page;
    let apiEndpoint = "https://image-search-abstraction-layer.freecodecamp.rocks/query/";
    let params = `${searchInput}?page=${page}`;

    // Request images from API
    axios.get(apiEndpoint + params)
      .then(imageResults => {
        console.log("Successfully retrieved images");
        res.json(imageResults.data)
      })
      .catch(err => console.log(err));
  });

images.route("/image-recent")
  .get((req, res) => {
    let apiEndpoint = "https://image-search-abstraction-layer.freecodecamp.rocks/recent/";

    // Request recent searches from API
    axios.get(apiEndpoint)
      .then(recentResults => {
        console.log("Successfully retrieved recent searches");
        res.json(recentResults.data)
      })
      .catch(err => console.log(err));
  });

module.exports = images;