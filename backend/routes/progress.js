const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Record emotion practice
router.post('/record', async (req, res) => {
  try {
    const { userId, emotion, correct } = req.body;
    
    let progress = await Progress.findOne({ userId, emotion });
    
    if (!progress) {
      progress = new Progress({ userId, emotion });
    }
    
    progress.attempts += 1;
    if (correct) {
      progress.correctIdentifications += 1;
    }
    
    progress.lastPracticed = new Date();
    progress.timestamps.push({ date: new Date(), correct });
    
    // Calculate mastery level (0-5 stars)
    const accuracy = progress.correctIdentifications / progress.attempts;
    if (progress.attempts >= 10) {
      progress.masteryLevel = Math.min(5, Math.floor(accuracy * 6));
    }
    
    await progress.save();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's overall progress
router.get('/user/:userId', async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get progress for specific emotion
router.get('/user/:userId/emotion/:emotion', async (req, res) => {
  try {
    const progress = await Progress.findOne({ 
      userId: req.params.userId, 
      emotion: req.params.emotion 
    });
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get stats dashboard
router.get('/stats/:userId', async (req, res) => {
  try {
    const allProgress = await Progress.find({ userId: req.params.userId });
    
    const stats = {
      totalAttempts: allProgress.reduce((sum, p) => sum + p.attempts, 0),
      totalCorrect: allProgress.reduce((sum, p) => sum + p.correctIdentifications, 0),
      averageMastery: allProgress.length > 0 
        ? allProgress.reduce((sum, p) => sum + p.masteryLevel, 0) / allProgress.length 
        : 0,
      emotionBreakdown: allProgress.map(p => ({
        emotion: p.emotion,
        mastery: p.masteryLevel,
        attempts: p.attempts,
        accuracy: p.attempts > 0 ? (p.correctIdentifications / p.attempts * 100).toFixed(1) : 0
      }))
    };
    
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;