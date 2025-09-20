import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path
} from "react-native-svg"

export function HomeIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
      viewBox="0 0 50 50"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="a"
          x1={-0.099}
          y1={-0.097}
          x2={1.081}
          y2={1.079}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#12a3bd" />
          <Stop offset={0.338} stopColor="#2aa9a8" />
          <Stop offset={0.748} stopColor="#43b094" />
          <Stop offset={1} stopColor="#4cb38d" />
        </LinearGradient>
      </Defs>
      <G transform="translate(-1065 -662)">
        <Circle
          data-name="Ellipse 7 copy"
          cx={25}
          cy={25}
          r={25}
          transform="translate(1065 662)"
          fill="url(#a)"
        />
        <G
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          data-name="vuesax/linear/home"
        >
          <Path d="M568 206v-3" transform="translate(522 487)" />
          <Path
            data-name="Vector"
            d="M566.07 190.82l-6.93 5.55a3.373 3.373 0 00-1.11 2.914l1.33 7.96a3.19 3.19 0 003.04 2.57h11.197a3.209 3.209 0 003.04-2.57l1.33-7.96a3.429 3.429 0 00-1.11-2.91l-6.927-5.544a3.225 3.225 0 00-3.86-.01z"
            transform="translate(522 487)"
          />
        </G>
      </G>
    </Svg>
  )
}
