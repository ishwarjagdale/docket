const express = require("express");
const { Pool, Client } = require("pg");
const { expressjwt: jwt } = require("express-jwt");

const db = require("./database");
const {verify} = require("jsonwebtoken");
const {getUser} = require("./database");
const PORT = process.env.PORT || 3001;
const app = express();

let sessions  = {
  inSession: [],
  outOfSession: []
};

(async () => {
    await db.initialize().then((res) => {
        db.client = res;
    });
})();

const getCookieToken = (req) => {
    let jar = {};
    req.headers.cookie?.split(" ").forEach((cookie) => {
        cookie = (cookie.endsWith(";") ? cookie.slice(0, cookie.length - 1) : cookie).split("=");
        jar[cookie[0]] = cookie[1];
    } )
    req.userToken = jar['sessionToken'];
    return jar['sessionToken'];
};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hi from server!");
});

app.post("/login", (req, res) => {
    if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
        db.login(req.body.email, req.body.password).then((r) => {
            console.log(r);
            if (r[0]) {
                sessions.inSession.push(r[2]);
                console.log(sessions);
                let date = new Date()
                date.setDate(date.getDate() + 1)
                res.cookie('sessionToken', r[2], {httpOnly: true, expires: date});
                res.status(200).json(r[1]);
            } else {
                res.status(400).json(r[1]);
            }
        })
    }
})


app.post("/register", (req, res) => {
    if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
        db.register(req.body.name, req.body.email, req.body.password).then((r) => {
            console.log(r);
            if (r[0]) {
                sessions.inSession.push(r[2]);
                let date = new Date()
                date.setDate(date.getDate() + 1)
                res.cookie('sessionToken', r[2], {httpOnly: true, expires: date});
                res.status(200).json(r[1]);
            } else {
                res.status(400).json(r[1]);
            }
        })
    }
})

app.get("/auth/verify", (req, res) => {
    let dToken = db.verifyToken(getCookieToken(req));
    if(dToken[0]) {
        db.getUser(dToken[1]).then((r) => {
            if(r) {
                res.status(200).json(r);
            } else {
                res.status(401).json("Invalid credentials!");
            }
        });
    } else {
        res.status(401).json("Authorization required!");
    }
})

app.use("/api", jwt({ secret: process.env.secret_key, algorithms: ["HS256"], getToken:  getCookieToken}));

app.get("/api/notes", (req, res) => {
    let userId = db.verifyToken(req.userToken)[1]['userId'];
    db.getNotes(userId).then((r) => {
        if(r[0]) {
            res.status(200).json(r[1]);
        } else {
            res.status(400).json(r[1]);
        }
    });
});

app.get("/api/notes/:noteId", (req, res) => {
    let userId = db.verifyToken(req.userToken)[1]['userId'];
    let noteId = req.params.noteId;
    db.getNote(userId, noteId).then((r) => {
        if(r[0]) {
            res.status(200).json(r[1]);
        } else {
            res.status(400).json(r[1]);
        }
    })
})

app.delete("/api/notes/:noteId", (req, res) => {
    let userId = db.verifyToken(req.userToken)[1]['userId'];
    let noteId = req.params.noteId;
    db.deleteNote(userId, noteId).then((r) => {
        if(r[0]) {
            res.status(200).json(r[1]);
        } else {
            res.status(400).json(r[1]);
        }
    })
})

app.post("/api/notes", (req, res) => {
    let userId = Number.parseInt(db.verifyToken(req.userToken)[1]['userId']);
    let note = {
        title: "",
        content: "",
        category: "",
        owner: userId,
        color: "",
        mark: null,
        encrypted: null,
        ...req.body
    };
    if(Number.parseInt(note.owner) === userId) {
        db.newNote(note).then((r) => {
            if(r[0]) {
                res.status(200).json(r[1]);
            } else {
                res.status(500).json("Something went wrong");
            }
        })
    } else {
        res.status(401).json("Unauthorized request");
    }
})

app.get("/auth/logout", (req, res) => {
    let userId = Number.parseInt(db.verifyToken(getCookieToken(req))[1]['userId']);
    let userToken = req.userToken;
    sessions.inSession.splice(sessions.inSession.indexOf(userToken), 1);
    sessions.outOfSession.push(userToken);
    console.log(sessions);
    res.cookie('sessionToken', null, {
        maxAge: -1,
    })
    res.status(200).json(true);
})

app.get("/test", (req, res) => {
    db.client.query(req.body)
})

app.listen(PORT, () => {
    console.log(`docket server listening on ${PORT}`);
});
