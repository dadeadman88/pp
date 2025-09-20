import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function WalletIcon(props: any) {

  const {color = '#999b9f'} = props;

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="Group 57051"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <Path d="M697 325h-6" transform="translate(-684 -316)" />
        <Path
          data-name="Vector"
          d="M706 326.97v2.06a1.027 1.027 0 01-1 1.02h-1.96a2.132 2.132 0 01-2.16-1.87 2.008 2.008 0 01.6-1.63 1.993 1.993 0 011.44-.6H705a1.027 1.027 0 011 1.02z"
          transform="translate(-684 -316)"
        />
        <Path
          data-name="Vector"
          d="M701.48 326.55a2.008 2.008 0 00-.6 1.63 2.132 2.132 0 002.16 1.87H705v1.45a4.724 4.724 0 01-5 5h-9a4.724 4.724 0 01-5-5v-7a4.654 4.654 0 014.19-4.94 5.322 5.322 0 01.81-.06h9a4.573 4.573 0 01.75.05 4.664 4.664 0 014.25 4.95v1.45h-2.08a1.993 1.993 0 00-1.44.6z"
          transform="translate(-684 -316)"
        />
      </G>
    </Svg>
  )
}

export default WalletIcon
