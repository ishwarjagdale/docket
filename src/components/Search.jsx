import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={"flex max-w-[1500px] w-full mx-auto items-center sticky top-0 p-4 pt-6 z-50"}>
                <div className={"flex items-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="darkgray" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type={"text"} name={"search"} placeholder={"Search"} className={"p-2 outline-0 bg-transparent"} autoComplete={"off"} />
                </div>
            </div>
        )
    }
}

export default Search;