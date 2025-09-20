import * as React from "react"
import Svg, { G, Path, Text, TSpan } from "react-native-svg"

function BellIcon(props: any) {

  const {color = '#1d2733'} = props;

  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <G
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        data-name="vuesax/linear/notification-bing"
      >
        <Path
          d="M10 5.367v2.775"
          strokeLinecap="round"
          transform="translate(-108 -188) translate(108 188)"
        />
        <Path
          data-name="Vector"
          d="M10.017 1.667a5.548 5.548 0 00-5.55 5.55v1.75a4.327 4.327 0 01-.525 1.9l-1.056 1.767a1.777 1.777 0 001 2.708 19.45 19.45 0 0012.275 0 1.85 1.85 0 001-2.708L16.1 10.867a4.358 4.358 0 01-.525-1.9v-1.75a5.582 5.582 0 00-5.558-5.55z"
          strokeLinecap="round"
          transform="translate(-108 -188) translate(108 188)"
        />
        <Path
          data-name="Vector"
          d="M12.775 15.683A2.785 2.785 0 0110 18.458a2.78 2.78 0 01-1.958-.817 2.78 2.78 0 01-.817-1.958"
          transform="translate(-108 -188) translate(108 188)"
        />
      </G>
    </Svg>
  )
}

export default BellIcon;