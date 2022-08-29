import React, {Component, useState} from "react";
import '../css/landingpage.css';
//import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

    const randomEmoji =
        `😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋
	 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫
	 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫
	 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧
	 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 
	 😻 😼 😽 🙀 😿 😾`.split(" ");

    function LandingPage() {
        const [hi, setHi] = useState("👾");
        return (
            <div align="center">
                <h1>Task Management Website</h1>
                <button
                    className="NotLoggedIcon"
                    onClick={() => {
                        setHi(
                            randomEmoji[
                                Math.floor(Math.random() * randomEmoji.length)
                                ]
                        );
                    }}
                >
                    <p>{hi}</p>
                </button><br/>
                <button style={{cursor:'pointer'}} className="loginButton">
                    <Link to="/login" style={{textDecoration:'none',fontSize:'12px'}}>Login</Link>
                </button>
                <button style={{cursor:'pointer'}} className="registerButton">
                    <Link to="/signup" style={{textDecoration:'none',fontSize:'12px'}}>Register</Link>
                </button>
            </div>
        );
}
export default LandingPage;