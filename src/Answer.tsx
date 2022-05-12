import { styled } from "solid-styled-components";

const Answer = styled("div")(
  ({ idx }) => `
  font-size: 1.5rem;
  position: absolute;
  right: 5px;
  top: ${idx * 28.8 - 1}px;
`);

export default Answer;
