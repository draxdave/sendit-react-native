import * as React from "react"
import Svg, { Path } from "react-native-svg"
const TrashBinIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <Path
      fill="#ffffff"
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z"
    />
  </Svg>
)
export default TrashBinIcon
