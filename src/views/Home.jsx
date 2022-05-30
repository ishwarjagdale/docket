import React from "react";
import {login, verifyUser} from "../api/auth";
import {Navigate} from "react-router-dom";
import {notify} from "../components/notifier";

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
            name: null,
            email: "",
            password: "",
            loaded: false,
            userFound: false,
            register: false,
        };

        this.changeText = this.changeText.bind(this);
        this.getStarted = this.getStarted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    changeText(e) {
        e.target.classList.toggle("typewriter");
        e.target.innerText = this.state.ps[(this.state.ps.indexOf(e.target.innerText) + 1) % this.state.ps.length];
        e.target.classList.toggle("typewriter");
    }

    handleRegistration() {
        this.setState({register: !this.state.register});
    }

    getStarted() {
        this.setState({started: true});
    }

    handleSubmit(e) {
        e.preventDefault();
        let creds = {name: this.state.name, email: this.state.email, password: this.state.password};
        login(creds, this.state.register).then((res) => {
            if(res) {
                setTimeout(() => {
                    window.location.href = "./app";
                }, 2000);
            }
        })
    }

    handleChange(e) {
        this.setState((state) => {state[e.target.name] = e.target.value});
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={"grad flex flex-col w-full"}>
                <div className={"flex flex-col w-full z-20 top-0 left-0 min-h-screen justify-center items-center"}>
                    <h1 className={"text-6xl md:text-8xl lg:text-9xl cursor-default font-bold entrance-slow"}>docket</h1>
                    <div className={"flex items-baseline justify-center cursor-default"}>
                        <p onClick={this.changeText} className={"mt-4 cursor-default font-bold tracking-wide typewriter text-center whitespace-nowrap"}>{
                            this.state.ps[Math.floor(Math.random() * this.state.ps.length)]
                        }</p><span className={"blinker font-bold"}>_</span>
                    </div>
                    {
                        this.state.started ?
                            <>
                                <form onSubmit={this.handleSubmit} className={"flex hofo flex-col p-8 py-4 rounded-2xl mt-12 items-center border-2 border-black entrance"}>
                                    {
                                        this.state.register && <input autoFocus onChange={this.handleChange} type={"text"} name={"name"}
                                            required={true} placeholder={"name"}
                                            className={"mb-4 font-bold text-lg bg-transparent outline-none border-none text-center placeholder:text-gray-800 p-2"}/>
                                    }
                                    <input autoFocus={!this.state.register} onChange={this.handleChange} type={"email"} name={"email"} required={true} placeholder={"email"} className={"mb-4 font-bold text-lg bg-transparent outline-none border-none text-center placeholder:text-gray-800 p-2"} />
                                    <input onChange={this.handleChange} type={"password"} name={"password"} required={true} placeholder={"password"} min={6} className={"mb-4 font-bold text-lg bg-transparent outline-none border-none text-center placeholder:text-gray-800 p-2"} max={20}/>
                                    <button type={"submit"} name={"submit"} value={"Sign In"} className={"mt-2 p-2 px-6 w-full hover:bg-black hover:text-[rgba(255,255,255,0.8)] transition-all rounded-full border-black border-2 font-bold"}>Sign In</button>
                                    <button type={"button"} name={"register"} value={"register"} className={"mt-2 p-2 font-bold text-sm underline underline-offset-2"} onClick={this.handleRegistration}>{
                                        !this.state.register ?
                                            "create an account" :
                                            "already have an account"
                                    }</button>

                                </form>
                            </>
                            :
                            <button onClick={this.getStarted} className={"mt-12 p-3 px-6 hover:bg-black hover:text-[rgba(255,255,255,0.8)] transition-all rounded-full border-black border-2 font-bold"}>get started</button>
                    }
                </div>
                <div className={"p-8 absolute bottom-0 z-20 w-full"}>
                    <a href={"https://github.com/ishwarjagdale"} target={"_blank"} className={"text-gray-800 text-lg font-bold"}>@dev</a>
                </div>
            </div>
        );
    }
}

export default Home;