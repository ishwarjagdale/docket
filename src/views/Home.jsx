import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ps: ["i can take notes 🗒️ for you!",
                "i- i'm confused",
                "I remember it all too well, yeah",
                "not in mood, later",
                "i don't know what i do",
                "Ɛ======>",
                "are you lost baby girl? 😏",
                "And don't you worry your pretty, little mind",
                "FUCk the patriarchy",
            ]
        };

        this.changeText = this.changeText.bind(this);
    }

    changeText(e) {
        e.target.classList.toggle("typewriter");
        e.target.innerText = this.state.ps[(this.state.ps.indexOf(e.target.innerText) + 1) % this.state.ps.length];
        e.target.classList.toggle("typewriter");
    }

    render() {
        return (
            <div className={"grad flex w-full h-full"}>
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
                <div className={"flex flex-col w-full fixed top-0 left-0 h-full justify-center backdrop-blur-sm items-center"}>
                    <h1 className={"text-9xl cursor-default font-bold entrance-slow"}>Docket</h1>
                    <div className={"flex items-baseline justify-center"}>
                        <p onClick={this.changeText} className={"mt-4 cursor-default font-bold tracking-wide typewriter text-center whitespace-nowrap"}>{
                            this.state.ps[Math.floor(Math.random() * this.state.ps.length)]
                        }</p><span className={"blinker font-bold"}>_</span>
                    </div>
                    <a href={"/app"} className={"mt-12 p-3 px-6 hover:bg-black hover:text-[rgba(255,255,255,0.8)] transition-all rounded-full border-black border-2 font-bold"}>get started</a>
                </div>
            </div>
        );
    }
}

export default Home;