const router = require("express").Router({ mergeParams: true });
const messageController = require("../controllers/messageController");

router.route("/").post(messageController.sendMessage);

module.exports = router;
