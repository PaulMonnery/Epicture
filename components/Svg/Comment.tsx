import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>):JSX.Element {
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
        clipRule="evenodd"
        d="M11.076 27.182a.24.24 0 00.37.153c.908-.576 2.805-2.12 5.345-4.496l.313-.292h3.965c3 0 5.431-2.442 5.431-5.454v-5.139c0-3.012-2.432-5.454-5.431-5.454H10.931c-3 0-5.431 2.442-5.431 5.454v6.28c0 2.382 1.922 4.313 4.294 4.313h1.11l-.024 1.115c-.037 1.6.033 2.783.196 3.52v0z"
      />
    </Svg>
  );
}

export default SvgComponent;
