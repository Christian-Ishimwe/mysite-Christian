function validateUserRegistration(req, res, next) {
    const { email, password, confirmPassword, name } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ Message: "Invalid email format" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ Message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ Message: "Passwords do not match" });
    }
    if (name.length < 2) {
        return res.status(400).json({ error: "Name must be at least 2 characters long" });
    }
    next();
}

function validateUserLogin(req, res, next) {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ Message: "Invalid email format" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ Message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number" });
    }
    next();
}


module.exports={
    validateUserRegistration,
    validateUserLogin
}