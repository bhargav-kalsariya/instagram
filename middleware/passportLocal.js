const { users } = require("../models/userShema");
const PassportLocal = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

exports.initializePassport = (passport) => {
    passport.use(new PassportLocal(async (username, password, done) => {
        try {
            let user = await users.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                console.log("User not found");
                return done(null, false);
            }
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }))

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await users.findById(id);
            return done(null, user);
        } catch (error) {
            done(error, false);
        }
    });
};