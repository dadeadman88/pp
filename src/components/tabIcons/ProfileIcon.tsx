import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ProfileIcon = ({ color = "#999b9f" }) => (
  <Svg width={26} height={26} viewBox="0 0 26 27">
    <Path
      d="M14.14 14.91a1.123 1.123 0 0 0-.28 0 3.827 3.827 0 1 1 .28 0Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
    />
    <Path
      data-name="Vector"
      d="M21.864 22.607A11.59 11.59 0 0 1 14 25.666a11.59 11.59 0 0 1-7.863-3.059 4.292 4.292 0 0 1 2.065-3.01 11.352 11.352 0 0 1 11.6 0 4.292 4.292 0 0 1 2.062 3.01Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
    />
    <Path
      data-name="Vector"
      d="M25.666 14A11.667 11.667 0 1 1 14 2.333 11.667 11.667 0 0 1 25.666 14Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
    />
  </Svg>
);
