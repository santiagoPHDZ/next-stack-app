
function getBaseUrl() {
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
    return getBaseUrl() + "/api/trpc";
}