const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend integration
app.use(express.json()); // Parse JSON request bodies

// Routes
const asteroidRoutes = require("./routes/asteroids");
const chatRoutes = require("./routes/chat");
app.use("/api/watchlist", require("./routes/watchlist"));
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

app.use("/api/asteroids", asteroidRoutes);
app.use("/api/chat", chatRoutes);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        message: "NASA Asteroid Risk Analysis API is running",
        version: "2.0.0",
        endpoints: {
            today: "/api/asteroids/today",
            dateRange: "/api/asteroids/date-range?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD",
            detail: "/api/asteroids/:id"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal server error",
        message: err.message
    });
});

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity in this project
        methods: ["GET", "POST"]
    }
});

// Socket.io Connection Handling
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Handle incoming messages
    socket.on("send_message", async (data) => {
        // Broadcast message to all clients (including sender)
        io.emit("receive_message", data);

        // Generate AI Response
        try {
            const { getChatResponse } = require("./utils/chatService");
            const aiResponseText = await getChatResponse(data.text);

            const aiMessage = {
                id: Date.now() + 1, // Ensure unique ID
                userId: "gemini_bot",
                text: aiResponseText,
                timestamp: new Date().toLocaleTimeString(),
                isBot: true
            };

            io.emit("receive_message", aiMessage);
        } catch (error) {
            console.error("Error generating AI response:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 NASA Asteroid API running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/`);
    console.log(`🌌 Today's asteroids: http://localhost:${PORT}/api/asteroids/today`);
    console.log(`💬 Socket.io server ready`);
});
