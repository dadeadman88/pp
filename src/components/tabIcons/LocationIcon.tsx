import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

export const LocationIcon = (props: any) => {
  const {color = '#999b9f'} = props;
  
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G fill="none" stroke={color} strokeWidth={1.5}>
        <Path
          d="M443.12 198.31a3.12 3.12 0 11-3.12-3.12 3.12 3.12 0 013.12 3.12z"
          transform="translate(-428 -188)"
        />
        <Path
          data-name="Vector"
          d="M431.62 196.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 01-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05z"
          transform="translate(-428 -188)"
        />
      </G>
    </Svg>
  )
}