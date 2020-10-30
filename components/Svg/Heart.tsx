import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M20.045 8.25c-1.67 0-3.147.97-4.045 2.237-.898-1.268-2.374-2.237-4.045-2.237A4.957 4.957 0 007 13.209c0 2.873 2.071 6.372 7.933 10.34.644.436 1.49.436 2.134 0C22.93 19.581 25 16.082 25 13.21a4.957 4.957 0 00-4.955-4.959z"
      />
    </Svg>
  );
}

export default SvgComponent;
