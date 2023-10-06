import User from '../models/user';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('A user with this email already exists.');
    }

    // Validations
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        return res.status(400).send('Password must have at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Password and Confirm Password do not match.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    
    await user.save();

    res.status(201).send({ message: 'User registered successfully!' });
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password.');
        }

        // If all is good, handle login (e.g., create a session, return a JWT, etc.)
        // For demonstration, we'll just send a success message.
        res.send({ message: 'Logged in successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Server Error.' });
    }
};