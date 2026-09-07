import pool from "./pool.js";

async function getAllMessages() {
    const { rows } = await pool.query("SELECT username, message, added FROM messages");
    return rows;
}

async function insertMessage({ text, user, added }) {
    await pool.query("INSERT INTO messages (username, message, added) VALUES ($1, $2, $3)", [user, text, added]);
}

export { getAllMessages, insertMessage };