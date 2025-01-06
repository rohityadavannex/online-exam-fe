import { IconType } from "./icons.types";

const VerifiedIcon = ({ className, color = "#18AE9F" }: IconType) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9.63623 13.9419L12.5106 16.5289C13 16.9693 13.7602 16.9018 14.1644 16.3822L18.7085 10.5398M14.1724 25.2822C20.4354 25.2822 25.5127 20.205 25.5127 13.9419C25.5127 7.6788 20.4354 2.60156 14.1724 2.60156C7.90927 2.60156 2.83203 7.6788 2.83203 13.9419C2.83203 20.205 7.90927 25.2822 14.1724 25.2822Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VerifiedIcon;
