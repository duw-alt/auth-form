const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
    // Function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            
            if (!user) {
                return done(null, false, { message: "No user found with that email" });
            }

            // Compare the provided password with the hashed password stored in the database
            // const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (e) {
            console.error(e);
            return done(e); // Pass any caught errors to Passport's done callback
        }
    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUsers));
    
    passport.serializeUser((user, done) => done(null, user.id));
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });
}

module.exports = initialize;
