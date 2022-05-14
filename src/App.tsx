import type { Component } from "solid-js";
import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";
import { all, create } from "mathjs";

import Answer from "./Answer";

const App: Component = () => {
  const [body, setBody] = createSignal("");
  const [answers, setAnswers] = createSignal([]);
  const [mode, setMode] = createSignal("regular");

  createEffect(() => {
    const mathjs = create(all);
    if (mode() === "frac") {
      mathjs.config({ number: "Fraction" });
    }
  });

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.shiftKey && e.ctrlKey) {
      switch (e.key) {
        case "r":
          setMode("reg");
          break;
        case "s":
          setMode("sci");
          break;
        case "f":
          setMode("frac");
          break;
        case "p":
          setMode("proper-frac");
          break;
      }
    }
  };

  onMount(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);
  });

  onCleanup(() => {
    // remove the event listener
    document.removeEventListener("keydown", handleKeyPress);
  });

  const handleChange = (e: InputEvent) => {
    const p = mathjs.parser();
    const val = e.target.value;
    setBody(val);
    const sols = [];
    console.log("here");
    for (const [i, line] of val.split("\n").entries()) {
      console.log({ i, line });
      if (i > 0) {
        p.set("ans", (mathjs.typeOf(sols[i - 1]) === "number" || mathjs.typeOf(sols[i - 1]) === "Fraction") ? sols[i - 1] : undefined);
      }
      try {
        const sol = p.evaluate(line);
        if (typeof sol === "function") {
          sols.push("f(x)");
        } else {
          sols.push(sol);
        }
      } catch (e) {
        sols.push(undefined);
      }
    }
    setAnswers(sols);
    console.log(answers());
  };

  return (
    <>
      <textarea onInput={handleChange} value={body()} spellcheck={false}
                autocapitalize="off" autocomplete="off" />
      <For each={answers()}>
        {(answer, i) => (
          <Answer
            idx={i()}>{answer?.n}{answer?.d === 1 ? "" : `/${answer?.d}`}</Answer>
        )}
      </For>
      <style jsx>
        {`
          textarea {
            border: none;
            background-color: #212226;
            resize: none;
            outline: none;
            width: 100vw;
            height: 99vh;
            font-size: 1.5rem;
            font-family: inherit;
          }
        `}
      </style>
    </>
  );
};

export default App;
