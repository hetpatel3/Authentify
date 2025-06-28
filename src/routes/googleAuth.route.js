import express from 'express';
import passport from 'passport';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from "../models/auth.models.js";

const router = express.Router();

const client = new OAuth2Client(process.env.ANDROID_GOOGLE_CLIENT_ID);

router.post('/google/mobile', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'No ID token provided' });

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.ANDROID_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email } = payload;

    if (!email) return res.status(400).json({ error: 'Email not found in token payload' });

    const username = email.split('@')[0];
    const fullname = username;
    const role = 'user';

    let user = await User.findOne({ googleId });

    if (!user) {

      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return res.status(409).json({ error: "An account already exists with this email." });
      }
      
      user = new User({
        googleId,
        email,
        username,
        fullname,
        role,
      });
      try {
        await user.save();
        console.log("✅ New Google user saved in DB:", user);
      } catch (err) {
        console.error("❌ Failed to save Google user to DB:", err);
        if (err?.code === 11000) {
          return res.status(409).json({ error: "Duplicate key error. Email or username already exists." });
        }
        return res.status(500).json({ error: 'User creation failed' });
      }
    }else {
      console.log("🔄 Google user already exists:", user);
    }

    const tokenPayload = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    // Sign your own JWT
    const token = jwt.sign(tokenPayload, 'qwerty', { expiresIn: '7d' });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        googleId: user.googleId,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
        hasPassword: !!user.password,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid ID token' });
  }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://127.0.0.1:5500/src/frontend/content.html');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;