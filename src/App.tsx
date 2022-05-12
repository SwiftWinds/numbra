import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { parser } from "mathjs";

const App: Component = () => {
  const [body, setBody] = createSignal("");
  const [answers, setAnswers] = createSignal([]);

  const handleChange = (e: KeyboardEvent) => {
    const p = parser();
    const val = e.target.value;
    setBody(val);
    setAnswers(val.split("\n").map(n => {
      try {
        return p.evaluate(n);
      } catch (e) {
        return undefined;
      }
    }));
    console.log(answers());
  };

  return (
    <>
      <div id="textarea-container">
        <textarea onKeyUp={handleChange} value={body()} />
        <div id="copy">{body}</div>
        <div id="cut">cut</div>
        <div id="paste">paste</div>
      </div>
      <style jsx>
        {`
          div#textarea-container {
            position: relative;
            float: left;
          }

          div#copy {
            font-size: 1.5rem;
            position: absolute;
            right: 5px;
            top: 0;
          }

          div#cut {
            font-size: 1.5rem;
            position: absolute;
            right: 5px;
            top: 25px;
          }

          div#paste {
            font-size: 1.5rem;
            position: absolute;
            right: 5px;
            top: 50px;
          }

          textarea {
            border: none;
            background-color: #212226;
            resize: none;
            outline: none;
            width: 99.8vw;
            height: 99.03vh;
            font-size: 1.5rem;
          }

          * {
            margin: 0;
            padding: 0;
            background-color: #212226;
            color: #fff;
          }
        `}
      </style>
    </>
  );
};

export default App;
