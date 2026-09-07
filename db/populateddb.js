import { argv } from "node:process"
import pg from "pg";
const { Client } = pg;

const SQL = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR (255),
        message TEXT,
        added DATE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO messages (username, message)
    VALUES
        ('Amando', 'Hello World!'),
        ('Charles', 'Hello There!');
`

async function main() {
    try {
        console.log("Sending...");
        const client = new Client({
            connectionString: argv[2],
        });
        await client.connect();
        await client.query(SQL);
        await client.end();
        console.log("Done!");
    } catch (error) {
        console.log(error);
    }
}

main();