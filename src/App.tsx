import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import { parser } from "mathjs";
import Answer from "./Answer";
import { styled } from "solid-styled-components";

const CalcTextarea = styled("textarea")`
  border: none;
  background-color: #212226;
  resize: none;
  outline: none;
  width: 100vw;
  height: 100vh;
  font-size: 1.5rem;
  font-family: inherit;
`;

const App: Component = () => {
  const [body, setBody] = createSignal("");
  const [answers, setAnswers] = createSignal([]);

  const handleChange = (e: InputEvent) => {
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
      <CalcTextarea onInput={handleChange} value={body()} />
      <For each={answers()}>
        {(answer, i) => (
          <Answer idx={i()}>{answer}</Answer>
        )}
      </For>
    </>
  );
};

export default App;
