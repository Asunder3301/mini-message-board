import pool from "./pool.js";

async function getAllMessages() {
    const { rows } = await pool.query("SELECT username, message, added FROM messages");
    return rows;
}

export { getAllMessages };