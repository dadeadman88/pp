import * as React from "react"
import Svg, { Text, TSpan } from "react-native-svg"

function CameraIcon(props: any) {
  return (
    <Svg
      width={28}
      height={29}
      viewBox="0 0 28 29"
      {...props}
    >
      <Text
        transform="translate(0 25)"
        fill="#4cb38d"
        fontSize={28}
        fontFamily="FontAwesome5FreeSolid, 'Font Awesome \\\\35 Free'"
      >
        <TSpan x={0} y={0}>
          {"\uF030"}
        </TSpan>
      </Text>
    </Svg>
  )
}

export default CameraIcon;