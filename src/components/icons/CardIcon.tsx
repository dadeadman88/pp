import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function CardIcon(props: any) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <G
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.25}
        data-name="vuesax/linear/card-add"
      >
        <Path
          d="M1.333 5.667H9"
          strokeLinejoin="round"
          transform="translate(-179 -508) translate(179 508)"
        />
        <Path
          data-name="Vector"
          d="M4 11h1.333M7 11h2.667M14.666 8.02v2.72c0 2.34-.593 2.927-2.96 2.927H4.293c-2.367-.001-2.96-.587-2.96-2.927V5.26c0-2.34.593-2.927 2.96-2.927H9"
          strokeLinejoin="round"
          transform="translate(-179 -508) translate(179 508)"
        />
        <Path
          data-name="Vector"
          d="M11 4.167h3.667M12.833 6V2.333"
          transform="translate(-179 -508) translate(179 508)"
        />
      </G>
    </Svg>
  )
}

export default CardIcon
