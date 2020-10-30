import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="-7 -7 32 32"
      fill="none"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M6.179 0H.153v8.93H7.183V0zM6.279 12.1H.253v4.93H7.283V12.1zM15.979 8.1H9.953v8.829H16.983V8.1zM15.879-.1H9.853v5.03H16.883V-.1z"
      />
    </Svg>
  );
}

export default SvgComponent;
