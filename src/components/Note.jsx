import React from "react";
import {notify} from "./notifier";
import {flagEnabled} from "tailwindcss/lib/featureFlags";

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: {
                ...this.props.data,
                password: false,
                mark: null
            },
            lockPop: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.closeMe = this.closeMe.bind(this);
        this.toggleLock = this.toggleLock.bind(this);
        this.handleMark = this.handleMark.bind(this);
        this.removePass = this.removePass.bind(this);
    }

    componentDidMount() {
        if(this.props.new) {
            let note = JSON.parse(sessionStorage.getItem("newNote"));
            if (note)
                this.setState({note: note});
        }
    }

    handleMark(e) {
        let note = this.state.note;
        note.mark = e === this.state.note.mark ? null : e;
        if(this.props.new)
            sessionStorage.setItem("newNote", JSON.stringify(note));
        this.setState({note: note});
    }

    handleChange(e) {
        this.setState((state) => {
            state.note[e.target.name] = e.target.value;
            if(this.props.new)
                sessionStorage.setItem("newNote", JSON.stringify(state.note));
        });
    }

    toggleLock(e) {
        if(e.key === "Enter" || e.type === "click")
        this.setState({lockPop: !this.state.lockPop});
    }

    removePass() {
        this.setState({note: {...this.state.note, password: !window.confirm("Unlock note?")}});
    }

    handlePass(e) {
        let note = this.state.note;
        note.password = e.target.value;
        if(this.props.new)
            sessionStorage.setItem("newNote", JSON.stringify(note));
        this.setState({note: note});
    }

    closeMe(e) {
        if(!this.props.new && this.state.note !== this.props.data) {
            console.log(this.state.note, this.props.data);
            if (window.confirm("Would you like to save the changes?")) {
                notify("Your changes will be saved!!", "success");
            }
        }
        else if(this.props.new && this.state.note.body !== "") {
            notify("Changes saved temporarily", "info");
        }

        e.target.parentElement.parentElement.classList.add("fade");
        setTimeout(() => {this.props.togglePop()}, 280);
    }

    render() {
        return (
            <>
                <div className={"flex w-full h-full fixed z-50 entrance backdrop-blur-sm items-center justify-center"}>
                    <div className={`overflow-hidden rounded-2xl w-[60vw] h-[60vh] shadow-2xl relative flex flex-col`} style={{backgroundColor: this.props.new ? "#" + this.props.color : this.state.note.color}}>
                        {
                            this.state.lockPop && <div className={"flex rounded-2xl w-full h-full backdrop-blur-sm items-center justify-center z-50 absolute flex-col"}>
                                <input onKeyUp={this.toggleLock} onChange={this.handlePass} type={"password"} className={"bg-[rgba(0,0,0,0.1)] rounded-2xl placeholder:text-black p-4 text-4xl font-[monospace] outline-none border-none text-center"} autoFocus autoComplete={"new-password"} placeholder={"enter password"} required/>
                                <p className={"mt-4 text-center"}>You lose the password, you lose the note<br/><b>AND I SWEAR IT!</b></p>
                            </div>
                        }
                        {
                            this.state.note.mark &&
                            <>
                                {
                                    this.state.note.mark === "heart" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mark h-56 w-56" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.2)" strokeWidth={0.6}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        :
                                        this.state.note.mark === "idea" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mark h-56 w-56" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.2)" strokeWidth={0.6}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mark h-56 w-56" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.2)" strokeWidth={0.6}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                }
                            </>
                        }
                        <div className={"flex flex-col flex-1"}>
                            <input name={"title"} className={"w-full z-30 p-8 pb-0 font-bold text-xl bg-transparent placeholder:text-gray-700 outline-none border-none border-black"} type={"text"} placeholder={"title"} defaultValue={this.state.note.title} onChange={this.handleChange} autoFocus />
                            <textarea name={"body"} className={"w-full z-30 p-8 font-bold text-xl h-full bg-transparent outline-none border-none resize-none placeholder:text-gray-800"} placeholder={"write here..."} maxLength={5000} minLength={1} onChange={this.handleChange} defaultValue={this.state.note.body}/>
                        </div>
                        <div className={"px-8 py-6 z-30 flex w-full justify-between items-center"}>
                            { this.state.note.password && <svg onClick={this.removePass} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                          stroke="currentcolor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                            }
                            <div className={"icos ml-auto flex items-center"}>
                                <button onClick={() => this.handleMark("important")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={this.state.note.mark === "important" ? "black" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </button>
                                <button onClick={() => this.handleMark("heart")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={this.state.note.mark === "heart" ? "black" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                                <button onClick={() => this.handleMark("idea")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={this.state.note.mark === "idea" ? "black" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul className={"rounded-full h-[60vh] ml-4 backdrop-blur-sm custom-shadow actions-bar flex px-2 flex-col items-center justify-evenly"}>
                        <li>
                            <button onClick={this.closeMe}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => {navigator.clipboard.writeText(this.state.note.body).then(() => notify("Copied to clipboard", "success"))}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button onClick={this.toggleLock}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default Note;