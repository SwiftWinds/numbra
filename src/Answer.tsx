import { children, Component } from "solid-js";

const Answer: Component = (props) => {
  const body = children(() => props.children);
  const handleCopyAnswer = () => {
    navigator.clipboard.writeText(body().slice(0, -1));
  };
  return <>
    <div onClick={handleCopyAnswer}>{body()}</div>
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
