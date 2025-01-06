import { IconType } from "./icons.types";

const InventoryIcon = ({ color = "#000000", className }: IconType) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10.8333 1.6665V4.99984C10.8333 6.84079 12.3257 8.33317 14.1667 8.33317L17.5 8.33317M2.5 4.99984L2.5 14.9998C2.5 16.8408 3.99238 18.3332 5.83333 18.3332H14.1667C16.0076 18.3332 17.5 16.8408 17.5 14.9998V9.71388C17.5 8.82983 17.1488 7.98198 16.5237 7.35686L11.8096 2.64281C11.1845 2.01769 10.3367 1.6665 9.45262 1.6665L5.83333 1.6665C3.99238 1.6665 2.5 3.15889 2.5 4.99984Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M4.9187 11.3599H6.2395C6.53735 11.3599 6.7644 11.3826 6.92065 11.4282C7.13062 11.4901 7.31047 11.5999 7.46021 11.7578C7.60994 11.9157 7.72388 12.1094 7.802 12.3389C7.88013 12.5667 7.91919 12.8483 7.91919 13.1836C7.91919 13.4782 7.88257 13.7321 7.80933 13.9453C7.71981 14.2057 7.59204 14.4165 7.42603 14.5776C7.3007 14.6997 7.13143 14.7949 6.91821 14.8633C6.75871 14.9137 6.54549 14.939 6.27856 14.939H4.9187V11.3599ZM5.64136 11.9653V14.3359H6.18091C6.38273 14.3359 6.5284 14.3245 6.61792 14.3018C6.73511 14.2725 6.83195 14.2228 6.90845 14.1528C6.98657 14.0828 7.05005 13.9681 7.09888 13.8086C7.14771 13.6475 7.17212 13.4285 7.17212 13.1519C7.17212 12.8752 7.14771 12.6628 7.09888 12.5146C7.05005 12.3665 6.98169 12.251 6.8938 12.168C6.80591 12.085 6.69442 12.0288 6.55933 11.9995C6.45841 11.9767 6.26066 11.9653 5.96606 11.9653H5.64136Z"
      fill={color}
    />
    <path
      d="M8.38794 13.1714C8.38794 12.8068 8.44246 12.5008 8.55151 12.2534C8.63289 12.0711 8.74357 11.9076 8.88354 11.7627C9.02515 11.6178 9.17977 11.5104 9.34741 11.4404C9.57039 11.346 9.82756 11.2988 10.1189 11.2988C10.6462 11.2988 11.0678 11.4624 11.3835 11.7896C11.7009 12.1167 11.8596 12.5716 11.8596 13.1543C11.8596 13.7321 11.7026 14.1846 11.3884 14.5117C11.0743 14.8372 10.6544 15 10.1287 15C9.59644 15 9.17326 14.8381 8.85913 14.5142C8.545 14.1886 8.38794 13.741 8.38794 13.1714ZM9.13257 13.147C9.13257 13.5522 9.22616 13.8599 9.41333 14.0698C9.6005 14.2782 9.83813 14.3823 10.1262 14.3823C10.4143 14.3823 10.6503 14.279 10.8342 14.0723C11.0198 13.8639 11.1125 13.5522 11.1125 13.1372C11.1125 12.7271 11.0222 12.4211 10.8416 12.2192C10.6625 12.0174 10.4241 11.9165 10.1262 11.9165C9.82837 11.9165 9.5883 12.019 9.40601 12.2241C9.22371 12.4276 9.13257 12.7352 9.13257 13.147Z"
      fill={color}
    />
    <path
      d="M14.7161 13.623L15.4167 13.8452C15.3093 14.2358 15.1303 14.5264 14.8796 14.7168C14.6306 14.9056 14.314 15 13.9299 15C13.4547 15 13.064 14.8381 12.7581 14.5142C12.4521 14.1886 12.2991 13.7443 12.2991 13.1812C12.2991 12.5854 12.4529 12.1232 12.7605 11.7944C13.0681 11.464 13.4726 11.2988 13.9739 11.2988C14.4117 11.2988 14.7673 11.4282 15.0408 11.687C15.2035 11.84 15.3256 12.0597 15.407 12.3462L14.6917 12.5171C14.6493 12.3315 14.5606 12.1851 14.4255 12.0776C14.2921 11.9702 14.1293 11.9165 13.9373 11.9165C13.672 11.9165 13.4563 12.0117 13.2903 12.2021C13.1259 12.3926 13.0437 12.701 13.0437 13.1274C13.0437 13.5799 13.1251 13.9022 13.2878 14.0942C13.4506 14.2863 13.6622 14.3823 13.9226 14.3823C14.1147 14.3823 14.2799 14.3213 14.4182 14.1992C14.5566 14.0771 14.6558 13.8851 14.7161 13.623Z"
      fill={color}
    />
  </svg>
);

export default InventoryIcon;