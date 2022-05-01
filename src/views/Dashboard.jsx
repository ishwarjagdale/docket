import React from "react";
import SideBar from "./../components/SideBar";
import Search from "./../components/Search";
import NoteCard from "./../components/NoteCard";
import Note from "./../components/Note";

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dark: document.getElementById("root").classList.contains("dark"),
            notes: [
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
            ],
            visibleNote: false,
            current: null,
        }


        this.newNote = this.newNote.bind(this);
        this.openNote = this.openNote.bind(this);
        this.closeNote = this.closeNote.bind(this);
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


    render() {
        return (
            <>
                {
                    this.state.visibleNote && <Note new={false} data={this.state.current} togglePop={this.closeNote}/>
                }
                <SideBar dark={this.state.dark} newNote={this.newNote} />
                <div className={"flex flex-col items-center w-full h-full relative"}>
                    <Search/>
                    <div className={"flex flex-col h-full overflow-y-scroll mb-8"}>
                        <section className={"flex flex-col mb-8 h-full"}>
                            <h3 className={"text-4xl mt-8 mb-4 font-bold p-4"}>Notes</h3>
                            <div className={"flex flex-wrap"}>
                                {
                                    this.state.notes.map((note) => <NoteCard openNote={this.openNote} key={note.id} data={note} />)
                                }
                            </div>
                        </section>
                    </div>
                </div>
                <div id={"noti-stack"} className={"fixed z-50 bottom-0 right-0 m-10 flex flex-col items-end w-full md:max-w-lg"}/>
            </>
        )
    }
}

export default Dashboard;