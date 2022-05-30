import React from "react";

class NoteCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div onClick={() => this.props.openNote(this.props.data)} key={this.props.data.id} className={`bg-[${this.props.data.color}] p-8 overflow-hidden cursor-pointer rounded-2xl relative w-[320px] h-[300px] m-4 hover`}>
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
                                        this.props.data.mark === "idea" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-56 w-56" fill="none" viewBox="0 0 24 24" stroke="rgba(0,0,0,0.2)" strokeWidth={0.6}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
                    <p className={`note-body font-bold text-xl text-left z-10 w-full ${!this.props.data.title.length && 'text-gray-400 italic'}`}>
                        {
                            this.props.data.title.length ? this.props.data.title : "__no_title__"
                        }
                    </p>

                    <div className={"flex text-gray-800 justify-between z-10 items-center"}>
                        <span>
                            {
                                this.props.data.date
                            }
                        </span>
                        {
                            this.props.data.password &&
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default NoteCard;