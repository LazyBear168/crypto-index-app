// File: src/utils/fetchWithFallback.js

export async function fetchWithFallback(apiUrl, fallbackData, options = {}) {
  try {
    const res = await fetch(apiUrl, options);
    if (!res.ok) throw new Error(`❌ API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`⚠️ Failed to fetch ${apiUrl}, using fallback:`, err.message);

    // 標記 fallback 資料
    if (Array.isArray(fallbackData)) {
      return fallbackData.map((item) => ({ ...item, isMock: true }));
    } else if (typeof fallbackData === "object" && fallbackData !== null) {
      return { ...fallbackData, isMock: true };
    } else {
      return fallbackData; // primitive 或錯誤型別 fallback 原樣回傳
    }
  }
}
