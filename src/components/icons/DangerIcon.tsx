import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DangerIcon(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      {...props}
    >
      <Path
        d="M17 12.75v7.083"
        fill="none"
        stroke="#1d2733"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Vector"
        d="M17 30.331H8.415c-4.916 0-6.97-3.513-4.59-7.806l4.42-7.962 4.165-7.48c2.522-4.548 6.658-4.548 9.18 0l4.165 7.49 4.42 7.962c2.38 4.292.312 7.806-4.59 7.806H17zM16.992 24.083h.013"
        fill="none"
        stroke="#1d2733"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default DangerIcon
