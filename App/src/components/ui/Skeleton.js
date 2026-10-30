import { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

import { colors, radius } from "../../constants/theme";

/**
 * Khoi xuong (skeleton) hien thi khi dang tai du lieu.
 * @param {{ width?: any, height?: number, style?: any }} props
 */
export function Skeleton({ width = "100%", height = 16, style }) {
  const [opacity] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.base,
        { width, height, borderRadius: radius.sm, opacity },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surfaceContainerHigh,
  },
});
