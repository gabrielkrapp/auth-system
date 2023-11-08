import express from "express";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { pool } from "../database/database";
import { GetUserBy } from "../utils/GetUserBy";
import { generateToken } from "../utils/GenerateToken";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { RegisterUserQuery } from "../database/Querys/RoutersQuerys";

const router = express.Router();

passport.use(
  "google-auth",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await GetUserBy(profile.emails![0].value);

        if (existingUser) {
          const token = generateToken(existingUser.id, existingUser.username, existingUser.permissions);
          return done(null, { token });
        }

        const id = uuidv4();
        const username = profile.displayName!;
        const password = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(RegisterUserQuery, [id, username, hashedPassword]);

        const token = generateToken(id, username, "user");

        return done(null, { token });
        
      } catch (error) {
        return done(null, {error: "Something went wrong"});
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google-auth", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google-auth", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default router;
