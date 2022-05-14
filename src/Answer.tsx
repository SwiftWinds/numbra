import { children, Component } from "solid-js";

const Answer: Component = (props) => {
  const c = children(() => props.children);
  return <>
    <div>{c()}</div>
    <style jsx dynamic>
      {`
        div {
          font-size: 1.5rem;
          position: absolute;
          right: 5px;
          top: ${props.idx * 28.8 - 1}px;
        }
      `}
    </style>
  </>;
};

export default Answer;
