import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { colors } from "../../constants/theme";

const SETS = {
  /** Material Symbols / Material Icons (mac dinh). */
  material: MaterialIcons,
  /** Mo rong: co them glyph thuong hieu (google, apple...). */
  community: MaterialCommunityIcons,
};

/**
 * Icon duy nhat cua app — moi man hinh di qua day de de doi bo icon sau nay.
 * Ten icon lay tu: https://icons.expo.fyi
 *
 * @param {{
 *   name: string,
 *   set?: keyof typeof SETS,
 *   size?: number,
 *   color?: string,
 *   style?: any,
 * }} props
 */
export function Icon({
  name,
  set = "material",
  size = 20,
  color = colors.textMuted,
  style,
}) {
  const IconSet = SETS[set] ?? MaterialIcons;
  return <IconSet name={name} size={size} color={color} style={style} />;
}
