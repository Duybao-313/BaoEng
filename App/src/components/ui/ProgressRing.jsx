import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { colors, radius, themed } from "../../constants/theme";

/**
 * Vong tien do (donut) ve cung theo phan tram.
 * Noi dung giua vong truyen qua `children`.
 *
 * @param {{
 *   value?: number,
 *   size?: number,
 *   strokeWidth?: number,
 *   color?: string,
 *   trackColor?: string,
 *   accessibilityLabel?: string,
 *   children?: import("react").ReactNode,
 * }} props
 */
export function ProgressRing({
  value = 0,
  size = 120,
  strokeWidth = 10,
  color = colors.secondary,
  trackColor = colors.secondaryFixed,
  accessibilityLabel,
  children,
}) {
  const percent = Math.max(0, Math.min(100, Number(value) || 0));
  const center = size / 2;
  const ringRadius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * ringRadius;

  return (
    <View
      style={[styles.wrap, { width: size, height: size }]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(percent) }}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={ringRadius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {percent > 0 ? (
          <Circle
            cx={center}
            cy={center}
            r={ringRadius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference * (1 - percent / 100)}
            transform={`rotate(-90 ${center} ${center})`}
          />
        ) : null}
      </Svg>
      {children ? <View style={styles.center}>{children}</View> : null}
    </View>
  );
}

const styles = themed((colors) => ({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
}));
