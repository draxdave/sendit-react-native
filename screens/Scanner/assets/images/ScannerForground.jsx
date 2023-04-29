import Svg, { SvgProps, G, Path } from "react-native-svg"
const ScannerForground = (props: SvgProps) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={256}
    height={256}
  >
    <G
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
    >
      
      <Path
        d="M83.984 90H55.6a1 1 0 1 1 0-2h28.385A4.02 4.02 0 0 0 88 83.984V55.6a1 1 0 1 1 2 0v28.385A6.022 6.022 0 0 1 83.984 90zM34.4 90H6.016A6.022 6.022 0 0 1 0 83.984V55.6a1 1 0 1 1 2 0v28.385A4.02 4.02 0 0 0 6.016 88H34.4a1 1 0 1 1 0 2zM1 35.4a1 1 0 0 1-1-1V6.016A6.023 6.023 0 0 1 6.016 0H34.4a1 1 0 0 1 0 2H6.016A4.021 4.021 0 0 0 2 6.016V34.4a1 1 0 0 1-1 1zM89 35.4a1 1 0 0 1-1-1V6.016A4.021 4.021 0 0 0 83.984 2H55.6a1 1 0 1 1 0-2h28.385A6.022 6.022 0 0 1 90 6.016V34.4a1 1 0 0 1-1 1z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "skyblue",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
    </G>
  </Svg>
)
export default ScannerForground