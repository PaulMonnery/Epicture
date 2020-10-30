import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <Svg
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M8.5 10.5a1 1 0 011-1h3.052a1 1 0 00.761-.35l.683-.8a1 1 0 01.76-.35h2.488a1 1 0 01.76.35l.683.8a1 1 0 00.76.35H22.5a1 1 0 011 1M9.7 12.2v.6l1.16 9.916a1 1 0 00.993.884h7.694a1 1 0 00.993-.884L21.7 12.8v-.6"
        stroke="#fff"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default SvgComponent;
