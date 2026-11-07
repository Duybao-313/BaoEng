import { Text as RNText } from "react-native";

import { useSettings } from "../../providers";
import { translate } from "../../i18n";

/**
 * Text cua app: tu dong dich chuoi con theo ngon ngu dang chon.
 * Thay cho `Text` cua react-native o moi component/man hinh.
 * Component dang ky voi SettingsProvider de chuoi duoc dich lai ngay khi doi ngon ngu
 * (ke ca ben trong man hinh da bi memo cua navigator).
 *
 * @param {{ children?: import('react').ReactNode }} props
 */
export function Text({ children, ...rest }) {
  useSettings();
  return <RNText {...rest}>{mapChildren(children)}</RNText>;
}

function mapChildren(children) {
  if (typeof children === "string") return translate(children);
  if (Array.isArray(children)) {
    return children.map((child) =>
      typeof child === "string" ? translate(child) : child,
    );
  }
  return children;
}
