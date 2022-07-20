import React from "react";
import SideBar from "./../components/SideBar";
import Search from "./../components/Search";
import NoteCard from "./../components/NoteCard";
import Note from "./../components/Note";
// import NoteCardv2 from "../components/NoteCardv2";
import {Navigate} from "react-router-dom";
import {getNotes, logoutUser} from "../api/auth";

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dark: Boolean(localStorage.getItem('dark-theme') === 'true'),
            /*
            {
                    id: 1,
                    title: "This is Docket note.",
                    body: "",
                    date: "",
                    mark: null,
                    password: false,
                    color: "#ff9b74",
                },
                {
                    id: 2,
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non mattis justo, quis tempor lacus. Nulla in ante vel libero vulputate aliquam id nec purus. Donec ante magna, euismod at ultricies sit amet, rhoncus vel velit. Donec eu augue suscipit, aliquam lorem vitae, finibus sapien. Proin condimentum dapibus ipsum sed hendrerit. Vestibulum dolor ante, vehicula sed efficitur eget, ultrices in mauris. Nam id dapibus erat.",
                    date: "May 21, 2020",
                    password: false,
                    color: "#fcc96e",
                    mark: "heart"
                },
                {
                    id: 3,
                    title: "13 Things You Should Give Up If You Want To Be A Successful UX Designer",
                    date: "May 25, 2020",
                    body: "",
                    password: false,
                    mark: null,
                    color: "#ff9b74"
                },
                {
                    id: 4,
                    title: "10 UI/UX Lessons from designing My Own Product",
                    date: "May 27, 2020",
                    color: "#b591ff",
                    mark: null,
                    body: "",
                    password: false,
                },
                {
                    id: 5,
                    title: "52 Research Terms you need to know as a UX Designer",
                    date: "May 29, 2020",
                    color: "#e6ef93",
                    body: "",
                    password: false,
                    mark: "star",
                },
                {
                    id: 6,
                    title: "Text fields & Forms design - UI components series",
                    date: "June 2, 2020",
                    mark: null,
                    body: "",
                    password: false,
                    color: "#00d5ff",
                },
                {
                    id: 7,
                    mark: null,
                    password: true,
                    body: "",
                    date: "May 25, 2020",
                    color: "#ff9b74"
                },
            */
            notes: [],
            visibleNote: false,
            current: null,
            menuToggle: false,
            notesLoaded: false
        }


        this.newNote = this.newNote.bind(this);
        this.openNote = this.openNote.bind(this);
        this.closeNote = this.closeNote.bind(this);
        this.reload = this.reload.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
        this.search = this.search.bind(this);
    }

    newNote(data) {
        this.setState({notes: [data, ...this.state.notes]});
    }

    openNote(data) {
        this.setState({visibleNote: true, current: data});
    }

    closeNote(data) {
        this.setState({visibleNote: false});
    }

    componentDidMount() {
        if(this.state.dark) {
            document.getElementById('root').classList.add('dark');
        }

        getNotes().then((res) => {
            console.log(res);
            this.setState({notes: res, notesLoaded: true});
        });
    }

    reload(id=null) {
        if(id !== null) {

            let n = this.state.notes;
            for(let i = 0; i < n.length; i++) {
                if(n[i].id === id) {
                    n.splice(i, 1);
                    break;
                }
            }
            this.setState({notes: n});
        } else {
            this.setState({notesLoaded: false});
            getNotes().then((res) => {
                console.log(res);
                this.setState({notes: res, notesLoaded: true});
            });
        }
    }

    toggleTheme(mode) {
        localStorage.setItem("dark-theme", mode);
        this.setState({dark: mode});
    }

    logout() {
        logoutUser().then((res) => {
            if(res) window.location.href = "./";
        })
    }

    search(query) {
        getNotes(null, query === '' ? null : query).then((res) => {
            console.log(res);
            this.setState({notes: res, notesLoaded: true});
        });
    }


    render() {
        return (
            this.props.appState.user ?
                <>
                    {
                        this.state.visibleNote &&
                        <Note new={false} data={this.state.current} togglePop={this.closeNote} reload={this.reload}/>
                    }
                    <SideBar dark={this.state.dark} reload={this.reload} newNote={this.newNote} toggleTheme={this.toggleTheme}/>
                    <div className={"flex flex-col mx-8 items-center max-h-screen overflow-clip w-full relative"}>
                        <div className={"flex justify-between m-2 items-center w-full top-bar"}>
                            <Search search={this.search}/>
                            <button onClick={() => {
                                this.setState({menuToggle: !this.state.menuToggle})
                            }} className={"border-2 rounded-full mx-4 flex items-center"}>
                                <img
                                    src={"https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"}
                                    className={"h-10 w-10 rounded-full"}/>
                            </button>
                            <ul id={"menu"}
                                className={`absolute border drop-shadow-md rounded-2xl overflow-hidden bg-white z-30 right-0 top-20 ${this.state.menuToggle ? "" : "hidden"}`}>
                                <li>
                                    <a href={"#"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                        </svg>
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={"#"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={this.logout} href={"#"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                        </svg>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={"flex flex-col w-full overflow-y-scroll"}>
                            <section className={"flex flex-col mb-8 h-full overflow-y-scroll"}>
                                <h3 className={"text-4xl mt-8 mb-4 font-bold p-4"}>Notes</h3>
                                <div className={"flex flex-wrap"}>
                                    {
                                        this.state.notesLoaded &&
                                        this.state.notes.length ?
                                            this.state.notes.map((note, index) => <NoteCard openNote={this.openNote}
                                                                                            index={index} key={note.id}
                                                                                            data={note}/>):
                                            <span className={"italic p-4 cursor-pointer text-gray-500"} onClick={() => {document.getElementById("new-note-btn").click()}}>click ( + ) to add a new note!</span>
                                    }
                                </div>
                            </section>
                        </div>
                    </div>
                </>
                :
                <Navigate to={"/"}/>
        )
    }
}

export default Dashboard;