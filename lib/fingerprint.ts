let cachedFingerprint: string | null = null;

export function getFingerprint(): string {
  if (typeof window === "undefined") return "";
  if (cachedFingerprint) return cachedFingerprint;

  const stored = localStorage.getItem("fp");
  if (stored) {
    cachedFingerprint = stored;
    return stored;
  }

  const fp = "fp_" + Math.random().toString(36).substring(2, 15);
  localStorage.setItem("fp", fp);
  cachedFingerprint = fp;
  return fp;
}
