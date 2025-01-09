import { Tooltip as ReactTooltip } from "react-tooltip";

interface Tooltip {
  id: string;
}

export default function Tooltip({ id }: Tooltip) {
  return (
    <>
      <ReactTooltip
        id={id}
        delayShow={500}
        opacity={0.8}
        style={{ fontFamily: "sohne", fontSize: "12px" }}
      />
    </>
  );
}
