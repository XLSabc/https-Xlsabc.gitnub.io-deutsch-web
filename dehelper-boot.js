window.__DEHELPER_READY = (async () => {
  try {
    const raw = atob(window.WORTKARTE_DEHELPER_GZIP || "");
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    if (!("DecompressionStream" in window)) throw new Error("DecompressionStream unavailable");
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    const text = await new Response(stream).text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Dehelper gzip load failed", error);
    return null;
  }
})();
