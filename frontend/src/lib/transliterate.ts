// Uzbek Latin ↔ Cyrillic transliteration for flexible search
// Based on the official Uzbek Latin alphabet

const latinToCyrillicMap: [RegExp, string][] = [
  // Multi-character mappings first (order matters)
  [/sh/gi, "ш"],
  [/ch/gi, "ч"],
  [/ng/gi, "нг"],
  [/o[''ʻ]/gi, "ў"],
  [/g[''ʻ]/gi, "ғ"],
  [/ye/gi, "е"],
  [/yo/gi, "ё"],
  [/yu/gi, "ю"],
  [/ya/gi, "я"],
  [/ts/gi, "ц"],
  // Single character mappings
  [/a/gi, "а"],
  [/b/gi, "б"],
  [/v/gi, "в"],
  [/g/gi, "г"],
  [/d/gi, "д"],
  [/e/gi, "е"],
  [/j/gi, "ж"],
  [/z/gi, "з"],
  [/i/gi, "и"],
  [/y/gi, "й"],
  [/k/gi, "к"],
  [/l/gi, "л"],
  [/m/gi, "м"],
  [/n/gi, "н"],
  [/o/gi, "о"],
  [/p/gi, "п"],
  [/q/gi, "қ"],
  [/r/gi, "р"],
  [/s/gi, "с"],
  [/t/gi, "т"],
  [/u/gi, "у"],
  [/f/gi, "ф"],
  [/x/gi, "х"],
  [/h/gi, "ҳ"],
  [/[''ʻ]/g, "ъ"],
  [/w/gi, "в"],
];

const cyrillicToLatinMap: [RegExp, string][] = [
  // Multi-character mappings first
  [/нг/gi, "ng"],
  // Single character mappings
  [/а/gi, "a"],
  [/б/gi, "b"],
  [/в/gi, "v"],
  [/г/gi, "g"],
  [/ғ/gi, "g'"],
  [/д/gi, "d"],
  [/е/gi, "e"],
  [/ё/gi, "yo"],
  [/ж/gi, "j"],
  [/з/gi, "z"],
  [/и/gi, "i"],
  [/й/gi, "y"],
  [/к/gi, "k"],
  [/қ/gi, "q"],
  [/л/gi, "l"],
  [/м/gi, "m"],
  [/н/gi, "n"],
  [/о/gi, "o"],
  [/ў/gi, "o'"],
  [/п/gi, "p"],
  [/р/gi, "r"],
  [/с/gi, "s"],
  [/т/gi, "t"],
  [/у/gi, "u"],
  [/ф/gi, "f"],
  [/х/gi, "x"],
  [/ҳ/gi, "h"],
  [/ц/gi, "ts"],
  [/ч/gi, "ch"],
  [/ш/gi, "sh"],
  [/щ/gi, "sh"],
  [/ъ/gi, "'"],
  [/ы/gi, "i"],
  [/э/gi, "e"],
  [/ю/gi, "yu"],
  [/я/gi, "ya"],
];

function latinToCyrillic(text: string): string {
  let result = text;
  for (const [pattern, replacement] of latinToCyrillicMap) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function cyrillicToLatin(text: string): string {
  let result = text;
  for (const [pattern, replacement] of cyrillicToLatinMap) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function isCyrillic(text: string): boolean {
  return /[а-яА-ЯёЁғҒқҚўЎҳҲ]/.test(text);
}

function isLatin(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}

/**
 * Performs a flexible search that works across Latin and Cyrillic scripts.
 * Given a query, checks if the target text contains the query in either script.
 */
export function flexibleMatch(target: string, query: string): boolean {
  const lowerTarget = target.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Direct match first
  if (lowerTarget.includes(lowerQuery)) {
    return true;
  }

  // Try transliterated variants
  if (isLatin(lowerQuery)) {
    // Convert Latin query to Cyrillic and search
    const cyrillicQuery = latinToCyrillic(lowerQuery);
    if (lowerTarget.includes(cyrillicQuery)) {
      return true;
    }
  }

  if (isCyrillic(lowerQuery)) {
    // Convert Cyrillic query to Latin and search
    const latinQuery = cyrillicToLatin(lowerQuery);
    if (lowerTarget.includes(latinQuery)) {
      return true;
    }
  }

  return false;
}
