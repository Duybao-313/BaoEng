import { StyleSheet, Text } from "react-native";

import { colors } from "../../constants/theme";

/**
 * To dam phan khop voi tu khoa trong mot doan text (khong phan biet hoa/thuong).
 *
 * @param {{
 *   text?: string,
 *   keyword?: string,
 *   style?: any,
 *   highlightStyle?: any,
 *   numberOfLines?: number,
 * }} props
 */
export function HighlightedText({
  text,
  keyword,
  style,
  highlightStyle,
  numberOfLines,
}) {
  const content = String(text ?? "");
  const needle = String(keyword ?? "").trim();

  if (!needle) {
    return (
      <Text style={style} numberOfLines={numberOfLines}>
        {content}
      </Text>
    );
  }

  const lowerContent = content.toLowerCase();
  const lowerNeedle = needle.toLowerCase();
  const parts = [];
  let cursor = 0;

  let index = lowerContent.indexOf(lowerNeedle);
  while (index !== -1) {
    if (index > cursor) {
      parts.push({ text: content.slice(cursor, index), match: false });
    }
    parts.push({
      text: content.slice(index, index + needle.length),
      match: true,
    });
    cursor = index + needle.length;
    index = lowerContent.indexOf(lowerNeedle, cursor);
  }
  if (cursor < content.length) {
    parts.push({ text: content.slice(cursor), match: false });
  }

  return (
    <Text style={style} numberOfLines={numberOfLines}>
      {parts.map((part, i) =>
        part.match ? (
          <Text key={i} style={[styles.match, highlightStyle]}>
            {part.text}
          </Text>
        ) : (
          <Text key={i}>{part.text}</Text>
        ),
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  match: {
    backgroundColor: colors.tertiaryFixed,
    color: colors.onTertiaryFixed,
    fontWeight: "700",
  },
});
