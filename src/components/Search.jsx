import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.handleQuery = this.handleQuery.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleQuery(e) {
        this.setState((state) => {state.query = e.target.value});
        this.props.search(this.state.query);
    }

    handleSearch(e) {
        e.preventDefault();

    }


    render() {
        return (
            <div className={"flex w-full items-center sticky top-0 p-4"}>
                <div className={"flex items-center w-full"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="darkgray" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                        <input onChange={this.handleQuery} type={"text"} name={"search"} placeholder={"Search"} className={"p-2 w-1/2 outline-0 bg-transparent"} autoComplete={"off"} defaultValue={this.state.query}/>

                </div>
            </div>
        )
    }
}

export default Search;