import axios from "axios";
import {notify} from "../components/notifier";

axios.defaults.withCredentials = true;
let token = null;
let inProgress = false;
let api_url = 'https://docket-note.herokuapp.com/';

async function login(credentials, register=false) {
    return await axios.post(api_url + register? "/register" : "/login", credentials).then((res) => {
        if(res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            notify(`${register ? 'Registered' : 'Logged'} In Successfully!`, "success");
            return true;
        }
    }).catch((err) => {
        notify(`${err.response.status}: ${err.response.data.toString()}`, "failed");
        return false;
    });
}

function vefyu() {
    return axios.get(api_url + "/auth/verify").then((res) => {
        if(res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            if(!inProgress) {
                inProgress = true;
                notify(`Authentication Successful`, "success");
            }
            return true;
        } else {
            localStorage.removeItem('user');
            return false;
        }
    }).catch((err) => {
        window.location.href = "/";
        notify(`Authentication required!`, "failed");
        return false;
    });
}

function verifyUser() {
    let user = localStorage.getItem('user');
    if(user) {
        vefyu().then((res)=> {
            user = res;
        });
    } else {
        user = false;
    }
    return user;
}

async function getNotes(noteId=null) {
    return await axios.get(api_url + noteId ? `/api/notes/${noteId}` : "/api/notes").then((res) => {
        if(res.status === 200) {
            return res.data;
        }
    }).catch((e) => {
        console.log(e);
        notify(e.toString(), 'failed');
    })
}

async function deleteNote(noteId) {
    return await axios.delete(api_url + `/api/notes/${noteId}`).then((res) => {
        return res.status === 200;
    }).catch((e) => {
        console.log(e);
        notify(e.toString(), 'failed');
    })
}

async function newNote(note) {
    return await axios.post(api_url + "/api/notes", {...note}).then((res) => {
        return res.status === 200;
    }).catch((e) => {
        console.log(e);
        notify(e.toString(), "failed");
    })
}

async function logoutUser() {
    return await axios.get(api_url + "/auth/logout").then((res) => {
        return res.status === 200;
    }).catch((e) => {
        console.log(e);
        notify(e.toString(), "failed");
    })
}

export { login, verifyUser, getNotes, newNote, deleteNote, logoutUser };