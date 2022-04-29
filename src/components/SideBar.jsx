import React from "react";

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dark: this.props.dark
        };
    }

    render() {
        return (
            <div className={"flex flex-col items-center p-8 w-2/12 border-r min-w-[160px]"}>
                <div id={"brand"} className={"w-full mb-32"}>
                    <a href={"/"}><h1 className={"font-bold text-2xl font-pops text-center"}>Docket</h1></a>
                </div>
                <div className={"flex flex-col items-center my-4"}>
                    <button className={"bg-black rounded-full p-4"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                    <ul className={"colors"}>
                        <li className={"bg-[#fcc96e]"}/>
                        <li className={"bg-[#ff9b74]"}/>
                        <li className={"bg-[#b591ff]"}/>
                        <li className={"bg-[#00d5ff]"}/>
                        <li className={"bg-[#e6ef93]"}/>
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
        )
    }
}

export default SideBar;