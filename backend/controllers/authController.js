const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getAccessToken } = require("./amadeusController");

// user registration

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Registration error: ", error);

    res.status(400).json({
      error: "Registration failed",
    });
  }
};

// User login and get access_token and refresh_token from amadeus api

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Get Amadeus API access token after login
    const amadeusToken = await getAccessToken();

    // Assuming the user model has fields `amadeusAccessToken` and `amadeusRefreshToken`
    user.amadeusAccessToken = amadeusToken;  // You may also want to save the refresh token if applicable
    user.amadeusTokenExpiry = Date.now() + 3600 * 1000;  // Example expiry time (1 hour)

    // Save the updated user with the new tokens in the database
    await user.save();

    res.json({
      token, // JWT for your system
      amadeusAccessToken: amadeusToken, // Amadeus access token
      amadeusTokenExpiry: user.amadeusTokenExpiry, // Expiry time of the access token
    });

  } catch (error) {
    console.log("Login error: ", error);

    res.status(400).json({
      error: "Login failed",
    });
  }
};

