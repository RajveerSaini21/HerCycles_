// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");

// // Import routes
// const authRoutes = require("./routes/authRoutes");
// const communityRoutes = require("./routes/communityRoutes");
// const medicationRoutes = require("./routes/medicationRoutes");
// const symptomRoutes = require("./routes/symptomRoutes");
// const analyzerRoutes = require("./routes/analyzerRoutes");
// const cycleRoutes = require("./routes/cycleRoutes");

// // Import middleware
// const { notFound, errorHandler } = require("./middleware/errorHandler");

// // Initialize Express app
// const app = express();

// // Environment variables
// const PORT = process.env.PORT || 5001;
// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/her-cycles";

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// }));

// // Express 5 safe preflight route
// app.options(/.*/, cors());

// // Security middleware
// app.use(helmet({
//   crossOriginEmbedderPolicy: false,
//   crossOriginResourcePolicy: false
// }));

// // Body parsing middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Logging middleware
// app.use(morgan("dev"));

// // Basic route
// app.get("/", (req, res) => {
//   res.json({ 
//     success: true, 
//     message: "Her Cycles API is running",
//     timestamp: new Date().toISOString(),
//     version: "1.0.0"
//   });
// });

// // Health check endpoint
// app.get("/health", (req, res) => {
//   const healthCheck = {
//     status: "healthy",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     environment: process.env.NODE_ENV || "development",
//     version: process.env.npm_package_version || "1.0.0",
//     memory: process.memoryUsage(),
//     database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
//   };
  
//   res.status(200).json(healthCheck);
// });

// // API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/community", communityRoutes);
// app.use("/api/medications", medicationRoutes);
// app.use("/api/symptoms", symptomRoutes);
// app.use("/api/analyzer", analyzerRoutes);
// app.use("/api/cycles", cycleRoutes);

// // 🔹 Simple posts route to avoid 404 on /api/posts
// //    (You can later replace this with a real postsRoutes file)
// app.get("/api/posts", (req, res) => {
//   res.json({
//     success: true,
//     posts: [], // return empty list for now
//   });
// });

// // Error handling middleware (must be last)
// app.use(notFound);
// app.use(errorHandler);

// // Database connection
// mongoose.set("strictQuery", false);

// async function connectDB() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// }

// // Start server
// async function startServer() {
//   try {
//     // Connect to database first
//     await connectDB();
    
//     // Start the server
//     app.listen(PORT, '0.0.0.0', () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//       console.log(`🌐 Health check available at http://localhost:${PORT}/health`);
//       console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
//     });
//   } catch (error) {
//     console.error("❌ Server startup error:", error.message);
//     process.exit(1);
//   }
// }


// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.error('❌ Uncaught Exception:', err);
//   process.exit(1);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('❌ Unhandled Rejection:', err);
//   process.exit(1);
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('🛑 SIGTERM received, shutting down gracefully');
//   mongoose.connection.close(() => {
//     console.log('✅ MongoDB connection closed');
//     process.exit(0);
//   });
// });

// // Start the application
// startServer();











require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const analyzerRoutes = require("./routes/analyzerRoutes");
const cycleRoutes = require("./routes/cycleRoutes");
const rateLimit = require("express-rate-limit");


const analyzerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 requests per IP per minute (tweak as needed)
  standardHeaders: true,
  legacyHeaders: false,
});


// Import middleware
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Initialize Express app
const app = express();
app.set("trust proxy", true);
// Environment variables
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/her-cycles";



app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));


// Express 5 safe preflight route
app.options(/.*/, cors());

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "Her Cycles API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0",
    memory: process.memoryUsage(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  };
  
  res.status(200).json(healthCheck);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/analyzer", analyzerLimiter, analyzerRoutes);
app.use("/api/cycles", cycleRoutes);

// 🔹 Simple posts route to avoid 404 on /api/posts
//    (You can later replace this with a real postsRoutes file)
app.get("/api/posts", (req, res) => {
  res.json({
    success: true,
    posts: [], // return empty list for now
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Database connection
mongoose.set("strictQuery", false);

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

// Start server
async function startServer() {
  try {
    // Connect to database first
    await connectDB();
    
    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Health check available at http://localhost:${PORT}/health`);
      console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error.message);
    process.exit(1);
  }
}


// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  });
});

// Start the application
startServer();
