export function formatPhoneLada(phone) {
    if (!phone) return "";
    const cleaned = String(phone).trim();
    if (cleaned.startsWith("+")) {
        return cleaned;
    }

    if (/^\d{10}$/.test(cleaned)) {
        return `+52${cleaned}`;
    }

    if (/^52\d{10}$/.test(cleaned)) {
        return `+52${cleaned.substring(2)}`;
    }
    return cleaned;
}
