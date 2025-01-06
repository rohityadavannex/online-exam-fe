import Tippy, { TippyProps } from "@tippyjs/react";
import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";

const ContextDropdown = ({
  children,
  content,
  placement = "auto",
  className,
}: PropsWithChildren<{ content: ReactNode } & TippyProps>) => {
  const sameWidthModifier = {
    name: "sameWidth",
    enabled: true,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state }: any) => {
      const triggerWidth = `${state.rects.reference.width}px`;
      // state.styles.popper.width = triggerWidth;
      state.styles.popper.minWidth = triggerWidth; // Optional: set min-width
      // state.styles.popper.maxWidth = triggerWidth; // Optional: set max-width
      state.styles.popper.boxShadow = "none"; // Optional: remove shadow if needed
    },
  };

  return (
    <Tippy
      content={content}
      arrow={false}
      className={classNames(" rounded-14px", className)}
      theme="light"
      interactive
      placement={placement}
      trigger="click"
      onAfterUpdate={(e) => e.hide()}
      popperOptions={{
        modifiers: [sameWidthModifier as any],
      }}
    >
      <div>{children}</div>
    </Tippy>
  );
};

export default ContextDropdown;
