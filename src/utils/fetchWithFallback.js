// File: src/utils/fetchWithFallback.js
// Author: Cheng
// Description: 
//    Utility function to fetch data from a given API URL with optional fetch options.
//    If the request fails (e.g., network error, non-2xx status), it returns the provided fallback data,
//    and appends an `isMock: true` flag to indicate mock usage.

export async function fetchWithFallback(apiUrl, fallbackData, options = {}) {
  try {
    const res = await fetch(apiUrl, options);
    if (!res.ok) throw new Error(`❌ API error: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`⚠️ Failed to fetch ${apiUrl}, using fallback:`, err.message);

    if (Array.isArray(fallbackData)) {
      return fallbackData.map((item) => ({ ...item, isMock: true }));
    } else if (typeof fallbackData === "object" && fallbackData !== null) {
      return { ...fallbackData, isMock: true };
    } else {
      return fallbackData; 
    }
  }
}
