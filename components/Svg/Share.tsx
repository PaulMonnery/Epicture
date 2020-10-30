import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <Svg viewBox="0 0 32 20" width={32} height={32} {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M16 3l4 4-4 4"
      />
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M7 17c0-5.523 4.477-10 10-10h2"
      />
    </Svg>
  );
}

export default SvgComponent;
