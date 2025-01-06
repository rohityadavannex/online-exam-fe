import { Button as AntButton, ButtonProps, Tooltip, TooltipProps } from "antd";

type ButtonTypes = ButtonProps & TooltipProps;

const Button = (props: ButtonTypes) => {
  return (
    <Tooltip title={props.title}>
      <AntButton {...props} />
    </Tooltip>
  );
};

export default Button;
