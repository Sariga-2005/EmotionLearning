// backend/routes/test.js - FIXED VERSION
const express = require("express");
const router = express.Router();
const TestScore = require("../models/TestScore");
const User = require("../models/User");
const mongoose = require("mongoose");

/**
 * SAVE TEST SCORE - FIXED
 */
router.post("/save", async (req, res) => {
  try {
    const { userId, score, total } = req.body;

    console.log("📝 Received score save request:", { userId, score, total });

    // Validate input
    if (!userId || score === undefined || !total) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: userId, score, or total" 
      });
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid userId format" 
      });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // ✅ FIXED: Use 'new' keyword for Mongoose 8
    const testScore = new TestScore({ 
      userId: new mongoose.Types.ObjectId(userId), // ✅ FIXED HERE
      score, 
      total 
    });
    
    await testScore.save();

    console.log("✅ Score saved successfully:", testScore);

    res.json({ 
      success: true, 
      message: "Score saved successfully",
      score: testScore 
    });
  } catch (error) {
    console.error("❌ Save score error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to save score",
      error: error.message 
    });
  }
});

/**
 * LEADERBOARD - Get top 10 scores - FIXED
 */
router.get("/leaderboard", async (req, res) => {
  try {
    console.log("🏆 Fetching leaderboard...");

    // First, check if there are any test scores
    const totalScores = await TestScore.countDocuments();
    console.log(`📊 Total test scores in database: ${totalScores}`);

    if (totalScores === 0) {
      return res.json({ 
        success: true,
        scores: [],
        count: 0,
        message: "No test scores yet"
      });
    }

    // ✅ FIXED: Improved aggregation pipeline
    const leaderboard = await TestScore.aggregate([
      {
        $group: {
          _id: "$userId",
          bestScore: { $max: "$score" },
          total: { $first: "$total" },
          lastAttempt: { $max: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: "$_id",
          name: "$user.name",
          email: "$user.email",
          score: "$bestScore",
          total: "$total",
          lastAttempt: 1,
          percentage: {
            $multiply: [{ $divide: ["$bestScore", "$total"] }, 100]
          }
        }
      },
      { $sort: { percentage: -1, lastAttempt: -1 } },
      { $limit: 10 }
    ]);

    console.log(`✅ Leaderboard fetched: ${leaderboard.length} entries`);

    res.json({ 
      success: true,
      scores: leaderboard,
      count: leaderboard.length
    });
  } catch (err) {
    console.error("❌ Leaderboard error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to load leaderboard",
      error: err.message,
      scores: [] 
    });
  }
});

/**
 * GET USER'S BEST SCORE - FIXED
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid userId" 
      });
    }

    const scores = await TestScore.find({ userId })
      .sort({ score: -1, createdAt: -1 });
    
    const bestScore = scores.length > 0 ? scores[0] : null;

    res.json({ 
      success: true,
      bestScore,
      allScores: scores
    });
  } catch (error) {
    console.error("❌ Get user score error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to get user score" 
    });
  }
});

/**
 * DEBUG ROUTE - Check database state
 */
router.get("/debug", async (req, res) => {
  try {
    const scoreCount = await TestScore.countDocuments();
    const userCount = await User.countDocuments();
    const recentScores = await TestScore.find().limit(5).populate('userId', 'name email');
    
    res.json({
      success: true,
      stats: {
        totalScores: scoreCount,
        totalUsers: userCount,
        recentScores: recentScores
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;