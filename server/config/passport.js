const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');



passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://loaniq-api-rbqu.onrender.com/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const googleId = profile.id;
                const email = profile.emails[0].value.toLowerCase().trim();
                const name = profile.displayName;

                console.log(`[Google Auth] Login attempt: ${email}`);

                // Atomically find or create. 
                // We must include email in $set or $setOnInsert when using $or for upsert.
                const user = await User.findOneAndUpdate(
                    {
                        $or: [
                            { googleId: googleId },
                            { email: email }
                        ]
                    },
                    {
                        $set: { googleId, name, email },
                        $setOnInsert: { role: 'user' }
                    },
                    {
                        new: true,
                        upsert: true,
                        runValidators: false,
                        setDefaultsOnInsert: true
                    }
                );

                console.log(`[Google Auth] User logged in: ${user.email}`);
                return done(null, user);
            } catch (error) {
                console.error('[Google Auth] callback error:', error);
                // Fallback for extreme cases
                if (error.code === 11000) {
                    try {
                        const email = profile.emails[0].value.toLowerCase().trim();
                        const extantUser = await User.findOne({ email });
                        if (extantUser) {
                            extantUser.googleId = profile.id;
                            await extantUser.save();
                            return done(null, extantUser);
                        }
                    } catch (fallbackErr) {
                        return done(fallbackErr, null);
                    }
                }
                done(error, null);
            }
        }
    )
);
