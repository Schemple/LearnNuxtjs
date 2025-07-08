export function formatDate(timestamp: number | string) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

export function getCurrentDate() {
return new Date().toLocaleDateString('vi-VN');
};

export function formatDMS(degree) {
const absDegree = Math.abs(degree);
const d = Math.floor(absDegree);
const m = Math.floor((absDegree - d) * 60);
const s = ((absDegree - d - m / 60) * 3600).toFixed(2);
return `${d}° ${m}' ${s}"`;
}