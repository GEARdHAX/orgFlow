const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

module.exports = function (passport) {

    // -----------------------------
    // Local Strategy (login)
    // -----------------------------
    passport.use(
        new LocalStrategy(
            {
                usernameField: "username", // <-- REQUIRED
                passwordField: "password",
                passReqToCallback: false
            },
            async (username, password, done) => {
                try {
                    // Find user
                    const user = await User.findOne({ username });

                    if (!user) {
                        return done(null, false, { message: "User not found" });
                    }

                    // Check password
                    const isMatch = await user.comparePassword(password);
                    if (!isMatch) {
                        return done(null, false, { message: "Incorrect password" });
                    }

                    // Success
                    return done(null, user);

                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    // -----------------------------
    // Serialize user → stores user.id inside session cookie
    // -----------------------------
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // -----------------------------
    // Deserialize user → attach full user object to req.user
    // -----------------------------
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id).select("-password"); // remove password
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
