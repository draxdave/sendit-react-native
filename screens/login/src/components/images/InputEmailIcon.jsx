import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const InputEmailIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill="#00000000"
      stroke="#232323"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.6 26c-2.2 1.5-5 2.3-8 1.9-5.5-.6-10-5.1-10.6-10.6C3.3 10.1 8.9 4 16 4h.8c7.5.5 12.4 8.3 10 15.5v.1C26.3 21 25 22 23.5 22h0c-1.9 0-3.5-1.6-3.5-3.5V11"
    />
    <Path
      fill="#00000000"
      stroke="#232323"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 21h0c-2.2 0-4-1.8-4-4v-2c0-2.2 1.8-4 4-4h0c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4z"
    />
  </Svg>
)
export default InputEmailIcon
