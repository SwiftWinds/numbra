import { styled } from "solid-styled-components";

const Answer = styled("div")(
  ({ idx }) => `
  font-size: 1.5rem;
  position: absolute;
  right: 5px;
  top: ${idx * 27}px;
`);

export default Answer;
