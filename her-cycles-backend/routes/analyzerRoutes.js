// const express = require("express");
// const { analyze } = require("../controllers/analyzerController");

// const router = express.Router();

// router.post("/", analyze);

// module.exports = router;



const express = require("express");
const { analyze } = require("../controllers/analyzerController");

const router = express.Router();

router.post("/", analyze);

module.exports = router;