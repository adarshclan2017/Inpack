export async function validatePhone(phone) {
  const url = `/asmx/InPackService.asmx/validatePhoneno?Phoneno=${encodeURIComponent(
    phone
  )}`;

  const res = await fetch(url);
  const text = await res.text();

  // ASMX often returns XML/text. Try JSON else return text.
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}