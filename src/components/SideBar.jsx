import React from "react";
import Note from "./Note";

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
        };

        this.handleColor = this.handleColor.bind(this);
        this.togglePop = this.togglePop.bind(this);

    }

    handleColor(e) {
        this.setState({current: e.target.ariaLabel});
    }

    togglePop() {
        this.setState({visiblePop: !this.state.visiblePop});
    }

    render() {
        return (
            <>
                {
                    this.state.visiblePop && <Note new={true} color={this.state.current} togglePop={this.togglePop} />
                }
                <div className={"flex flex-col items-center p-8 w-2/12 border-r min-w-[160px] mr-16"}>
                    <div id={"brand"} className={"w-full mb-32"}>
                        <a href={"/"}><h1 className={"font-bold text-2xl font-pops text-center"}>Docket</h1></a>
                    </div>
                    <div className={"flex flex-col items-center my-4"}>
                        <button className={"bg-black shadow-2xl rounded-full p-4 hover:scale-105 darkb"} onClick={this.togglePop} disabled={this.state.visiblePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        <ul className={"colors flex flex-col items-center"}>
                            <li className={"bg-[#fcc96e]"} aria-label={"fcc96e"} onClick={this.handleColor}/>
                            <li className={"bg-[#ff9b74]"} aria-label={"ff9b74"} onClick={this.handleColor}/>
                            <li className={"bg-[#b591ff]"} aria-label={"b591ff"} onClick={this.handleColor}/>
                            <li className={"bg-[#00d5ff]"} aria-label={"00d5ff"} onClick={this.handleColor}/>
                            <li className={"bg-[#e6ef93]"} aria-label={"e6ef93"} onClick={this.handleColor}/>
                        </ul>
                    </div>
                    <button className={"mt-auto p-3 rounded-full flex items-center text-sm darkb"} onClick={() => {
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