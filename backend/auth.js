const bcrypt = require('bcrypt');
const db = require('./db');
const jwt = require('jsonwebtoken');

async function registerUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
}

async function loginUser(email, password) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return null;

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        // Generate JWT and send it back
        const token = jwt.sign({ id: user.id, email: user.email }, '2723', { expiresIn: '1h' });
        return { user, token };
    }
    return null;
}

module.exports = { registerUser, loginUser };
