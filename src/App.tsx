import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [digit, setDigit] = useState("");
  const [digitMsg, setDigitMsg] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
    setDigitMsg('长度为 ' + digit);
  }

  return (
    <div className="container">
      <h1>Namey</h1>

      <div className="row">
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
      </div>

      <h4>修改文件名长度</h4>
      <ul className="tip">
      <li>删除文件名中的前缀 0 ，使文件名符合指定长度</li>
      <li>或用 0 前置填充文件名至指定长度</li>
      </ul>

      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            type="file"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="选择目录"
          />
          <div className="row2">
          <input
            id="digit"
            type="number"
            min="2"
            required
            onChange={(e) => setDigit(e.currentTarget.value)}
            placeholder="文件名长度"
          />
          <button type="submit">确定</button>
          </div>
        </form>
      </div>
      <p>{greetMsg}</p>
      <p>{digitMsg}</p>
    </div>
  );
}

export default App;
