import * as React from "react"
import Svg, { Path } from "react-native-svg"
const TickIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 512.016 512"
    {...props}
  >
    <Path
      fill="#345"
      d="M261.332 288.008a15.887 15.887 0 0 1-11.305-4.691l-96-96c-6.25-6.254-6.25-16.387 0-22.637s16.383-6.25 22.633 0l84.695 84.695 223.336-223.34c6.254-6.25 16.387-6.25 22.637 0s6.25 16.383 0 22.633L272.66 283.336a16.03 16.03 0 0 1-11.328 4.672Zm0 0"
    />
  </Svg>
)
export default TickIcon
