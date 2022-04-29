import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import Search from "./components/Search";
import Note from "./components/Note";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dark: false,
            notes: [
                {
                    id: 1,
                    body: "This is Docket note.",
                    date: "",
                    color: "#ff9b74",
                },
                {
                    id: 2,
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non mattis justo, quis tempor lacus. Nulla in ante vel libero vulputate aliquam id nec purus. Donec ante magna, euismod at ultricies sit amet, rhoncus vel velit. Donec eu augue suscipit, aliquam lorem vitae, finibus sapien. Proin condimentum dapibus ipsum sed hendrerit. Vestibulum dolor ante, vehicula sed efficitur eget, ultrices in mauris. Nam id dapibus erat.",
                    date: "May 21, 2020",
                    color: "#fcc96e",
                    mark: "heart"
                },
                {
                    id: 3,
                    body: "13 Things You Should Give Up If You Want To Be A Successful UX Designer",
                    date: "May 25, 2020",
                    color: "#ff9b74"
                },
                {
                    id: 4,
                    body: "10 UI/UX Lessons from designing My Own Product",
                    date: "May 27, 2020",
                    color: "#b591ff"
                },
                {
                    id: 5,
                    body: "52 Research Terms you need to know as a UX Designer",
                    date: "May 29, 2020",
                    color: "#e6ef93",
                    mark: "star"
                },
                {
                    id: 6,
                    body: "Text fields & Forms design - UI components series",
                    date: "June 2, 2020",
                    color: "#00d5ff"
                },
            ]
        }
    }

    render() {
        return (
            <>
                <SideBar dark={this.state.dark}/>
                <div className={"flex flex-col items-center w-full h-full relative"}>
                    <Search/>
                    <div className={"flex mx-4 flex-col max-w-[1500px] h-full"}>
                        <h3 className={"text-4xl mt-8 mb-4 font-bold p-4"}>Notes</h3>
                        <div className={"flex flex-wrap"}>
                            {
                                this.state.notes.map((note) => <Note key={note.id} data={note} />)
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default App;