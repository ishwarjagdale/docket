import React from "react";

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.toggleActions = this.toggleActions.bind(this);
    }

    toggleActions(state) {
        document.getElementById(`actions-bar-${this.props.data.id}`).classList.toggle('hidden');
    }

    render() {
        return (
            <div onMouseEnter={() => this.toggleActions(0)} onMouseLeave={() => this.toggleActions(1)} key={this.props.data.id} className={`bg-[${this.props.data.color}] p-8 overflow-hidden rounded-2xl relative w-[320px] h-[300px] m-4 hover`}>
                <div className={"absolute bottom-[-50px] right-[-80px]"}>
                    {
                        this.props.data.mark &&
                            <>
                                {
                                    this.props.data.mark === "heart" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-56 w-56" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.2)" strokeWidth={0.6}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-56 w-56" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.2)" strokeWidth={0.6}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                }
                            </>
                    }
                </div>
                <div className={"flex flex-col justify-between w-full h-full"}>
                    <p className={"note-body font-bold text-xl text-left z-10 w-full"}>
                        {
                            this.props.data.body
                        }
                    </p>
                    <div className={"flex text-gray-800 justify-between z-10"}>
                        <span>
                            {
                                this.props.data.date
                            }
                        </span>
                        <ul id={`actions-bar-${this.props.data.id}`} className={"actions-bar hidden"}>
                            <li>
                                <button className={"px-2"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Note;