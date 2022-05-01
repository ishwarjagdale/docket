import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ps: ["i can take notes 🗒️ for you!",
                "this is cloud ✨🗒️☁️✨ notes, magic!!",
                "i- i'm confused",
                "I remember it 🧣 all too well, yeah",
                "not in mood, later",
                "i don't know what i do",
                "Ɛ==== tada ===>",
                "are you lost baby girl? 😏",
                "And don't you worry your pretty, little mind",
                "FUCk the patriarchy",
                "pikkkkachu!"
            ],
            started: false,
        };

        this.changeText = this.changeText.bind(this);
        this.getStarted = this.getStarted.bind(this);
    }

    changeText(e) {
        e.target.classList.toggle("typewriter");
        e.target.innerText = this.state.ps[(this.state.ps.indexOf(e.target.innerText) + 1) % this.state.ps.length];
        e.target.classList.toggle("typewriter");
    }

    getStarted() {
        this.setState({started: true});
    }

    render() {
        return (
            <div className={"grad flex w-full h-full flex-col justify-between items-center"}>
                {
                    // bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/1400/4d845686128681.5d909dad4ddd3.jpg')]
                }
                {
                    /*
                        <div className={"flex w-full h-full relative top-0 left-0"}>
                    <div className={"bg-[#b591ff] fixed top-[3vh] left-[4vw]  p-8 cursor-pointer rounded-2xl relative w-[300px] h-[300px] m-4 hover"}>
                        <pre className={"whitespace-pre-line"}>
                            10101110101010010100010100
                            10010101001010101010001001
                            10111001101001001000010001
                            10101000101100001001000100
                            10110110101010001010010100
                            11101001010100100001000011
                            10100010101011101010010001
                        </pre>
                    </div>
                    <div className={"bg-[#ff9b74] absolute top-[10vh] left-[10vw] p-8 cursor-pointer rounded-2xl relative w-[320px] h-[300px] m-4 hover"}>
                        <p className={"note-body font-bold text-xl text-left z-10 w-full"}>
                            insert something funny
                        </p>
                        <div className={"bg-[#fcc96e] absolute left-[200px] top-[100px] p-8 overflow-hidden cursor-pointer rounded-2xl relative w-[320px] h-[300px] m-4 hover"}>
                            <p className={"note-body font-bold text-xl text-left z-10 w-full"}>
                                You are not supposed to see this.
                            </p>
                        </div>
                    </div>
                    <div className={"bg-[#ff9b74] absolute top-[60vh] left-[40vw] p-8 cursor-pointer rounded-2xl relative w-[320px] h-[300px] m-4 hover"}>
                        <p className={"note-body font-bold text-xl text-left z-10 w-full"}>
                            I don't know you are nosy or just curious 🤨
                        </p>
                    </div>
                    <div className={"bg-[#e6ef93] absolute top-[50vh] left-[-40vw] p-8 cursor-pointer rounded-2xl relative w-[320px] h-[300px] m-4 hover"}>
                        <pre className={"whitespace-pre-line"}>
                            blah blah blah blah blah....
                            I'm doing this for a college project -_-
                        </pre>
                    </div>
                    <div className={"bg-[#b591ff] absolute top-[10vh] p-8 cursor-pointer rounded-2xl relative w-[364px] h-[300px] m-4 hover"}>
                        <pre className={"whitespace-pre-line"}>
                            ...................../´¯¯/)
                            ...................,/¯.../
                            .................../..../
                            .............../´¯/'..'/´¯¯`·¸
                            .........../'/.../..../....../¨¯\
                            ..........('(....´...´... ¯~/'..')
                            ...........\..............'...../
                            ............\....\.........._.·´
                            .............\..............(
                            ..............\..............\
                        </pre>
                    </div>
                </div>
                     */
                }
                <div className={"flex flex-col w-full top-0 left-0 h-full justify-center backdrop-blur-sm items-center"}>
                    <h1 className={"text-8xl md:text-9xl cursor-default font-bold entrance-slow"}>docket</h1>
                    <div className={"flex items-baseline justify-center cursor-default"}>
                        <p onClick={this.changeText} className={"mt-4 cursor-default font-bold tracking-wide typewriter text-center whitespace-nowrap"}>{
                            this.state.ps[Math.floor(Math.random() * this.state.ps.length)]
                        }</p><span className={"blinker font-bold"}>_</span>
                    </div>
                    {
                        this.state.started ?
                            <>
                                <form className={"flex flex-col p-8 py-4 rounded-2xl mt-12 items-center border-2 border-black entrance"}>
                                    <input type={"email"} name={"email"} required={true} placeholder={"email"} className={"mb-4 font-bold text-lg bg-transparent outline-none border-none text-center placeholder:text-gray-800 p-2"} />
                                    <input type={"password"} name={"password"} required={true} placeholder={"password"} min={6} className={"mb-4 font-bold text-lg bg-transparent outline-none border-none text-center placeholder:text-gray-800 p-2"} max={20}/>
                                    <button type={"submit"} name={"submit"} value={"Sign In"} className={"mt-2 p-2 px-6 w-fit hover:bg-black hover:text-[rgba(255,255,255,0.8)] transition-all rounded-full border-black border-2 font-bold"}>Sign In</button>
                                </form>
                            </>
                            :
                            <button onClick={this.getStarted} className={"mt-12 p-3 px-6 hover:bg-black hover:text-[rgba(255,255,255,0.8)] transition-all rounded-full border-black border-2 font-bold"}>get started</button>
                    }
                </div>
                <div className={"p-8 absolute bottom-0 w-full"}>
                    <a href={"https://github.com/ishwarjagdale"} target={"_blank"} className={"text-gray-800 text-lg font-bold"}>@dev</a>
                </div>
            </div>
        );
    }
}

export default Home;