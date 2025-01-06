import Tippy, { TippyProps } from "@tippyjs/react";
import { PropsWithChildren } from "react";

const Tooltip = ({ children, ...rest }: PropsWithChildren<TippyProps>) => {
  return (
    <Tippy className="p-2" {...rest}>
      <div>{children}</div>
    </Tippy>
  );
};

export default Tooltip;
