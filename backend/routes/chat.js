const express = require("express");
const { getChatResponse } = require("../utils/chatService");

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message required" });
    }

    const reply = await getChatResponse(message);

    res.json({ reply });
});

module.exports = router;
