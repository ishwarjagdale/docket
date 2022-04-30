import React from "react";

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dark: this.props.dark,
            current: "fcc96e",
            colors: [
                "fcc96e", "ff9b74", "b591ff", "00d5ff", "e6ef93"
            ],
            visiblePop: false,
            newNote: "" || sessionStorage.getItem("newNote")
        };

        this.handleColor = this.handleColor.bind(this);
        this.togglePop = this.togglePop.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        sessionStorage.setItem("newNote", e.target.value);
        this.setState({newNote: e.target.value});
    }

    handleColor(e) {
        this.setState({current: e.target.ariaLabel});
    }

    togglePop(e) {
        if(e.key === "Escape" || e.type === 'click')
            this.setState({visiblePop: !this.state.visiblePop});
    }

    render() {
        return (
            <>
                {
                    this.state.visiblePop &&
                    <div className={"flex w-full h-full fixed z-50  backdrop-blur-sm items-center justify-center"}>
                        <div className={`p-8 rounded-2xl w-[60vw] h-[60vh] shadow-2xl bg-[#${this.state.current}]`}>
                            <textarea onKeyUp={this.togglePop} className={"w-full text-xl h-full bg-transparent outline-none border-none resize-none "} maxLength={1000} minLength={1} onChange={this.handleChange} defaultValue={sessionStorage.getItem("newNote")} autoFocus/>
                        </div>
                        <ul className={"rounded-full h-[60vh] ml-4 backdrop-blur-sm custom-shadow actions-bar flex px-2 flex-col items-center justify-evenly"}>
                            <li>
                                <button onClick={this.togglePop}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => {navigator.clipboard.writeText(this.state.newNote)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button>
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
                }
                <div className={"flex flex-col items-center p-8 w-2/12 border-r min-w-[160px] mr-16"}>
                    <div id={"brand"} className={"w-full mb-32"}>
                        <a href={"/"}><h1 className={"font-bold text-2xl font-pops text-center"}>Docket</h1></a>
                    </div>
                    <div className={"flex flex-col items-center my-4"}>
                        <button className={"bg-black rounded-full p-4 hover:scale-105"} onClick={this.togglePop} disabled={this.state.visiblePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        <ul className={"colors flex flex-col items-center"}>
                            <li className={"bg-[#fcc96e]"} aria-label={"fcc976"} onClick={this.handleColor}/>
                            <li className={"bg-[#ff9b74]"} aria-label={"ff9b74"} onClick={this.handleColor}/>
                            <li className={"bg-[#b591ff]"} aria-label={"b591ff"} onClick={this.handleColor}/>
                            <li className={"bg-[#00d5ff]"} aria-label={"00d5ff"} onClick={this.handleColor}/>
                            <li className={"bg-[#e6ef93]"} aria-label={"e6ef93"} onClick={this.handleColor}/>
                        </ul>
                    </div>
                    <button className={"mt-auto p-3 rounded-full flex items-center text-sm"} onClick={() => {
                        this.setState({dark: !this.state.dark})
                        document.getElementById("root").classList.toggle("dark")
                    }}>
                        {
                            this.state.dark ?
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentcolor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <b>Light Mode</b>
                                </>
                                :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentcolor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    <b>Dark Mode</b>
                                </>
                        }
                    </button>
                </div>
            </>
        )
    }
}

export default SideBar;