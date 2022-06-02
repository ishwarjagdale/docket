const {Client} = require("pg");
const jwt = require("jsonwebtoken");
const {TokenExpiredError} = require("jsonwebtoken");

const credentials = {
    user: "postgres",
    password: "ishwar@01",
    database: "docket",
    host: "localhost",
    port: 5432,
}

const handleError = (err) => {
    console.log("ERROR: ", err.stack);
    return [false, err.toString()];
}

let client = null;

async function initialize() {

    client = new Client(credentials);
    client.connect();

    return await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {

            console.log(":: Connecting to database");
            let tables = res.rows.map((row) => row.table_name);
            console.log(":: Initializing database");
            console.log(":: Tables available: ", tables);
            // CREATING users TABLE
            if (!tables.includes("users"))
                client.query(`
                    CREATE TABLE IF NOT EXISTS users
                    (
                        id           BIGSERIAL PRIMARY KEY,
                        name         VARCHAR     NOT NULL,
                        email        VARCHAR     NOT NULL UNIQUE,
                        password     VARCHAR     NOT NULL,
                        date_created TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
                    );
                `, (err, res) => {
                    if (err) {
                        console.log(err.stack);
                    } else {
                        console.log("\tCreated table : 'users'");
                        return client;
                    }
                });

            // CREATING notes TABLE
            if (!tables.includes("notes"))
                client.query(`
                    CREATE TABLE IF NOT EXISTS notes
                    (
                        id            BIGSERIAL PRIMARY KEY,
                        title         VARCHAR,
                        content       VARCHAR,
                        category      VARCHAR,
                        owner         BIGSERIAL   NOT NULL,
                        color         VARCHAR,
                        mark          VARCHAR,
                        encrypted     VARCHAR,
                        date_created  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        date_modified TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (owner) REFERENCES users (id)
                    )
                `, (err, res) => {
                    if (err) {
                        console.log(err.stack);
                    } else {
                        console.log("\tCreated table : 'notes'");
                        return client;
                    }
                });

            console.log(":: Initialization Completed");

        }
    });
}

const createToken = (id, email) => {
    let token;
    try {
        token = jwt.sign({
            userId: id, email: email
        }, process.env.secret_key, {expiresIn: "1d"});
        return [true, token];
    } catch (e) {
        console.log(e);
        return [false, "JWTError"];
    }
}

async function login(email, password) {
    return await client.query("SELECT * FROM users WHERE email = $1", [email]).then((res) => {
        if (res.rows.length) {
            let user = res.rows[0];
            if (user["password"] === password) {
                let token = createToken(user['id'], user['email']);
                if(!token[0]) return token;
                console.log(`Activity: Login: ${email}`)
                delete user["password"];
                return [true, user, token[1]];
            } else {
                return [false, "wrong credentials"];
            }
        } else {
            return [false, "user not found"];
        }
    }).catch(handleError)
}

async function register(name, email, password) {
    return await client.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `, [name, email, password]).then(async (res) => {
        const userQuery = await client.query(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email])
        if (userQuery.rows.length) {
            let user = userQuery.rows[0];
            let token = createToken(user.id, user.email);
            if(!token[0]) return token;
            console.log(`Activity: Registered: ${user.email}`)
            delete user["password"];
            return [true, user, token[1]];
        } else {
            return [false, "Something went wrong!"];
        }
    }).catch(handleError)
}

function verifyToken(token) {
    try {
        return [true, jwt.verify(token, process.env.secret_key)];
    } catch (TokenExpiredError) {
        return [false, TokenExpiredError.toString()];
    }
}

async function getUser(dToken) {
    return await client.query("SELECT * FROM users WHERE id = $1", [dToken['userId']]).then((res) => {
        if (res.rows.length) {
            let user = res.rows[0];
            delete user.password;
            return user;
        } else {
            return false;
        }

    }).catch(handleError);
}

async function getNotes(userId) {
    return await client.query(`SELECT id, title, category, owner, color, mark, encrypted, date_created, date_modified
                               FROM notes
                               WHERE owner = $1 ORDER BY date_created`, [userId]).then((res) => {
        return [true, res.rows];
    }).catch(handleError)
}

async function getNote(userId, noteId) {
    return await client.query(`SELECT * FROM notes WHERE id = $1 AND owner = $2`, [noteId, userId]).then((res) => {
        if(res.rows.length) {
            return [true, res.rows[0]];
        } else {
            return [false, "Note doesn't exist"];
        }
    }).catch(handleError)
}

async function newNote(note) {
    if(note.hasOwnProperty("id")) {
        return await client.query(`
        UPDATE notes SET 
             title = $1, 
             content = $2, 
             category = $3, 
             owner = $4, 
             color = $5, 
             mark = $6, 
             encrypted = $7
        WHERE id = $8;
    `, [note.title, note.content, note.category, note.owner, note.color, note.mark, note.encrypted, note.id]
        ).then((res) => {
            return [true, res];
        }).catch(handleError);
    } else {
        return await client.query(`
        INSERT INTO notes (
                           title, content, category, owner, color, mark, encrypted
        ) VALUES (
                  $1, $2, $3, $4, $5, $6, $7
                 )
    `, [note.title, note.content, note.category, note.owner, note.color, note.mark, note.encrypted]
        ).then((res) => {
            return [true, res];
        }).catch(handleError);
    }
}

async function deleteNote(userId, noteId) {
    return await client.query(`
        DELETE FROM notes WHERE id = $1 AND owner = $2;
    `, [noteId, userId]).then((res) => {
        return [true, res];
    }).catch(handleError);
}

module.exports = {
    "initialize": initialize,
    "login": login,
    "client": client,
    "verifyToken": verifyToken,
    "getUser": getUser,
    "getNotes": getNotes,
    "getNote": getNote,
    "newNote": newNote,
    "deleteNote": deleteNote,
    "register": register,
}