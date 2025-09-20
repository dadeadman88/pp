import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const FeedIcon = ({color = '#999b9f'}) => (
  <Svg width={24} height={24} viewBox="0 0 26 26">
    <Path
      d="M10.687 12.681a2.121 2.121 0 0 0-.385 0 5.186 5.186 0 1 1 .385 0Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <Path
      data-name="Vector"
      d="M19.145 4.667a4.08 4.08 0 0 1 4.083 4.083 4.089 4.089 0 0 1-3.935 4.084 1.318 1.318 0 0 0-.3 0M4.854 16.985c-2.823 1.89-2.823 4.97 0 6.848a11.394 11.394 0 0 0 11.678 0c2.823-1.89 2.823-4.97 0-6.848a11.447 11.447 0 0 0-11.678 0ZM21.397 23.333a5.643 5.643 0 0 0 2.287-1.015 2.955 2.955 0 0 0 0-4.985 5.8 5.8 0 0 0-2.252-1"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
);
