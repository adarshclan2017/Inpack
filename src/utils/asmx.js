export function extractJsonFromAsmx(xmlText) {
  try {
    if (!xmlText) return null;

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const stringNode = xml.querySelector("string");
    if (!stringNode) return null;

    const raw = stringNode.textContent?.trim();
    if (!raw) return null;

    return JSON.parse(raw);
  } catch (error) {
    console.error("ASMX JSON parse error:", error);
    return null;
  }
}