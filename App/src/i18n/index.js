import { EN_MESSAGES } from "./messages";

/**
 * i18n toi gian: dich theo chinh chuoi tieng Viet hien thi trong code.
 * Nho vay man hinh khong phai doi sang key, van giu duoc tieng Viet lam nguon.
 */
let activeLanguage = "vi";

const PLACEHOLDER = /\{(\w+)\}/g;

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Cac mau chuoi co placeholder, vi du `{n} bài học` — dung de dich chuoi da ghep so lieu. */
const HAS_PLACEHOLDER = /\{\w+\}/;

const PATTERNS = Object.entries(EN_MESSAGES)
  .filter(([key]) => HAS_PLACEHOLDER.test(key))
  .map(([key, value]) => {
    PLACEHOLDER.lastIndex = 0;
    const tokens = [];
    const source = key
      .split(/(\{\w+\})/g)
      .map((part) => {
        const token = part.match(/^\{(\w+)\}$/);
        if (token) {
          tokens.push(token[1]);
          return "(.+?)";
        }
        return escapeRegExp(part);
      })
      .join("");
    return { regex: new RegExp(`^${source}$`), tokens, template: value };
  })
  .sort((a, b) => b.template.length - a.template.length);

/** Doi ngon ngu dang dung (SettingsProvider goi truoc khi render children). */
export function setActiveLanguage(language) {
  activeLanguage = language === "en" ? "en" : "vi";
}

export function getActiveLanguage() {
  return activeLanguage;
}

function keepSpacing(source, translated) {
  const leading = source.match(/^\s*/)[0];
  const trailing = source.match(/\s*$/)[0];
  return `${leading}${translated}${trailing}`;
}

/**
 * Dich mot chuoi hien thi. Khong co ban dich => tra ve nguyen ban (du lieu dong tu API).
 * @param {string} text
 */
export function translate(text) {
  if (activeLanguage !== "en" || typeof text !== "string") return text;

  // Uu tien khop nguyen van (giu nguyen khoang trang cua manh chuoi JSX).
  const raw = EN_MESSAGES[text];
  if (raw !== undefined) return raw;

  const trimmed = text.trim();
  if (!trimmed) return text;

  const exact = EN_MESSAGES[trimmed];
  if (exact !== undefined) return keepSpacing(text, exact);

  for (const pattern of PATTERNS) {
    const match = trimmed.match(pattern.regex);
    if (!match) continue;
    let result = pattern.template;
    pattern.tokens.forEach((token, index) => {
      result = result.split(`{${token}}`).join(match[index + 1]);
    });
    return keepSpacing(text, result);
  }

  return text;
}

export { EN_MESSAGES };
