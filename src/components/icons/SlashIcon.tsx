import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SlashIcon(props: any) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      {...props}
    >
      <Path
        d="M17 31.166A14.167 14.167 0 102.833 17 14.172 14.172 0 0017 31.166z"
        fill="none"
        stroke="#1d2733"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Vector"
        d="M26.775 7.083L6.942 26.916"
        fill="none"
        stroke="#1d2733"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default SlashIcon
