import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Rect } from "react-native-svg"

function RadioIcon(props: any) {
  const {checked} = props;

  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <G transform="translate(-335 -480)">
        <Rect
          data-name="Rectangle 5"
          width={20}
          height={20}
          rx={10}
          transform="translate(335 480)"
          fill={ checked ? "#2aa9a8" : "#CCCED3C2"}
        />
        <Rect
          data-name="Rectangle 5"
          width={10}
          height={10}
          rx={5}
          transform="translate(340 485)"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default RadioIcon
