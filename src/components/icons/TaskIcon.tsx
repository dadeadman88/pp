import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function TaskIcon(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        fill="none"
        stroke="#1d2733"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <Path d="M504.37 324.88h5.25" transform="translate(-492 -316)" />
        <Path
          data-name="Vector"
          d="M498.38 324.88l.75.75 2.25-2.25M504.37 331.88h5.25M498.38 331.88l.75.75 2.25-2.25"
          transform="translate(-492 -316)"
        />
        <Path
          data-name="Vector"
          d="M501 338h6c5 0 7-2 7-7v-6c0-5-2-7-7-7h-6c-5 0-7 2-7 7v6c0 5 2 7 7 7z"
          transform="translate(-492 -316)"
        />
      </G>
    </Svg>
  )
}

export default TaskIcon
