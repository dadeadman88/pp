import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

export const MessageIcon = (props: any) => {

  const {color = '#999b9f'} = props;

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          d="M692.5 205h-.5c-4 0-6-1-6-6v-5q0-6 6-6h8q6 0 6 6v5q0 6-6 6h-.5a1.014 1.014 0 00-.8.4l-1.5 2a1.421 1.421 0 01-2.4 0l-1.5-2a1.13 1.13 0 00-.8-.4z"
          strokeWidth={1.5}
          transform="translate(-684 -186)"
        />
        <Path
          data-name="Vector"
          d="M699.997 197h.005M695.996 197h.005M691.995 197H692"
          strokeWidth={2}
          transform="translate(-684 -186)"
        />
      </G>
    </Svg>
  )
}
