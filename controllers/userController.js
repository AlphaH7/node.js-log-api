import User from '../models/user';

export const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validations
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        return res.status(400).send('Password must have at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Password and Confirm Password do not match.');
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).send({ message: 'User registered successfully!' });
};
