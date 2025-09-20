import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StarIcon(props: any) {
  const {stroke = '#1d2733', fill = '#fff'} = props;
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      {...props}
    >
      <Path
        d="M19.116 4.529l2.493 4.987A3.078 3.078 0 0023.621 11l4.519.751c2.89.482 3.57 2.578 1.487 4.647l-3.513 3.513a3.076 3.076 0 00-.737 2.564l1.006 4.349c.793 3.442-1.034 4.774-4.08 2.975L18.068 27.3a3.063 3.063 0 00-2.8 0l-4.241 2.5c-3.032 1.8-4.873.453-4.08-2.975l1.006-4.349a3.076 3.076 0 00-.737-2.564L3.7 16.4c-2.066-2.067-1.4-4.164 1.49-4.646L9.709 11a3.085 3.085 0 002-1.488L14.2 4.529c1.36-2.705 3.57-2.705 4.916 0z"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default StarIcon
