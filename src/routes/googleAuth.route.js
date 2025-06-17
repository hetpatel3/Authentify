import express from 'express';
import passport from 'passport';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

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
    const { sub, email } = payload;

    if (!email) return res.status(400).json({ error: 'Email not found in token payload' });

    const username = email.split('@')[0];
    const fullname = username;
    const role = 'user';

    // You should create or fetch user from your DB here
    const user = {
      id: sub,
      email,
      fullname,
      username,
      role
    };

    // Sign your own JWT
    const token = jwt.sign(user, 'qwerty', { expiresIn: '7d' });

    return res.json({ token, user });
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