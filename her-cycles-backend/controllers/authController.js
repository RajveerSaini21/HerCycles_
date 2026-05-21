// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// // POST /api/auth/register
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and password are required",
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email",
//       });
//     }

//     const user = new User({ name, email, password });
// await user.save();

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Registration failed",
//       error: error.message,
//     });
//   }
// };

// // POST /api/auth/login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // Check password
//     // Check password using model method
// const isPasswordValid = await user.matchPassword(password);
// console.log("Password valid?", isPasswordValid); // temporary log for debugging

// if (!isPasswordValid) {
//   return res.status(401).json({
//     success: false,
//     message: "Invalid email or password",
//   });
// }


//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Login failed",
//       error: error.message,
//     });
//   }
// };

// // GET /api/auth/me
// exports.getMe = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.replace("Bearer ", "");
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");
    
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Get me error:", error);
//     res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };

// // POST /api/auth/logout
// exports.logout = (req, res) => {
//   res.json({
//     success: true,
//     message: "Logout successful",
//   });
// };

// // GET /api/auth/users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");
//     res.json({
//       success: true,
//       count: users.length,
//       users: users,
//     });
//   } catch (error) {
//     console.error("Get users error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch users",
//       error: error.message,
//     });
//   }
// };


const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Nodemailer transporter (Gmail / Mailtrap etc)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


// Optional: check connection once on startup
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP verification failed:", err.message);
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});

// Helper to send OTP email
async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Her Cycles" <no-reply@hercycles.com>',
    to: email,
    subject: "Verify Your Her Cycles Account – OTP Code",

    html: `
    <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:25px;">
      <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.07);">

        <h2 style="text-align:center; color:#6a1b9a; margin-bottom:10px;">
          Her Cycles – Account Verification
        </h2>

        <p style="font-size:15px; color:#555;">
          Hello,
          <br><br>
          Thank you for creating an account on <strong>Her Cycles</strong>.  
          To complete your registration, please use the OTP code below:
        </p>

        <!-- OTP BOX -->
        <div style="
          background:#6a1b9a;
          color:white;
          text-align:center;
          font-size:32px;
          font-weight:bold;
          padding:15px 0;
          border-radius:8px;
          margin:20px 0;
          letter-spacing:5px;
        ">
          ${otp}
        </div>

        <p style="font-size:15px; color:#555;">
          This OTP is valid for <strong>10 minutes</strong>.  
          Do not share this code with anyone for your security.
        </p>

        <p style="font-size:15px; margin-top:20px; color:#555;">
          If you did not request this verification, you can safely ignore this email.
        </p>

        <hr style="border:none; border-top:1px solid #eee; margin:25px 0;">

        <p style="font-size:13px; color:#777; text-align:center;">
          © ${new Date().getFullYear()} Her Cycles.  
          All rights reserved.
        </p>

      </div>
    </div>
  `,
  };

  return transporter.sendMail(mailOptions);
}


// Helper to create JWT
function createToken(user) {
  // return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
  //   expiresIn: "7d",
  // });
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

/* =========================
   POST /api/auth/register
   ========================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
      otp,
      otpExpiresAt,
    });

    // For dev: log OTP in server console
    console.log(
      `DEBUG OTP for ${email}: ${otp} (valid till ${otpExpiresAt.toISOString()})`
    );

    // Try to send email, but don't crash if it fails
    try {
      await sendOtpEmail(email, otp);
      console.log("OTP email sent");
    } catch (mailErr) {
      console.error("Error sending OTP email:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "User registered. OTP generated and email sent (if SMTP ok).",
      user: { email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: err.message,
    });
  }
};

/* =========================
   POST /api/auth/verify-otp
   ========================= */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });
    }

    if (!user.otp || !user.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }

    if (new Date() > new Date(user.otpExpiresAt)) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired. Request a new one." });
    }

    if (String(user.otp) !== String(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = createToken(user);

    return res.json({
      success: true,
      message: "Account verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during OTP verification",
      error: err.message,
    });
  }
};

/* =========================
   POST /api/auth/resend-otp
   ========================= */
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    console.log(
      `DEBUG RESEND OTP for ${email}: ${otp} (valid till ${otpExpiresAt.toISOString()})`
    );

    try {
      await sendOtpEmail(email, otp);
      console.log("Resent OTP email");
    } catch (mailErr) {
      console.error("Error resending OTP email:", mailErr.message);
    }

    return res.json({
      success: true,
      message: "OTP resent (check email if SMTP configured)",
    });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during resend OTP",
      error: err.message,
    });
  }
};

/* =========================
   POST /api/auth/login
   ========================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const match = await user.matchPassword(password);
    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your account with OTP first",
      });
    }

    const token = createToken(user);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: err.message,
    });
  }
};

/* =========================
   GET /api/auth/me
   ========================= */
exports.getMe = async (req, res) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");


    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("GetMe Error:", err);
    return res
      .status(401)
      .json({ success: false, message: "Invalid token", error: err.message });
  }
};

/* =========================
   POST /api/auth/logout
   ========================= */
exports.logout = (req, res) => {
  return res.json({ success: true, message: "Logout successful" });
};

/* =========================
   GET /api/auth/users
   ========================= */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json({ success: true, count: users.length, users });
  } catch (err) {
    console.error("GetAllUsers Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};
