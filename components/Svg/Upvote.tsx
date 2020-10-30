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
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M14.85 7.713a1.72 1.72 0 012.3 0c.78.687 1.97 1.782 3.6 3.412a44.235 44.235 0 013.69 4.155c.482.623.033 1.47-.754 1.47H20v6.282c0 .748-.437 1.403-1.175 1.525-.627.103-1.54.193-2.825.193-1.284 0-2.198-.09-2.825-.193-.738-.122-1.175-.777-1.175-1.525V16.75H8.314c-.787 0-1.236-.847-.754-1.47a44.23 44.23 0 013.69-4.155c1.63-1.63 2.82-2.725 3.6-3.412z"
      />
    </Svg>
  );
}

export default SvgComponent;
