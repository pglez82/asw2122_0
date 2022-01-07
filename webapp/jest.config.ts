export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["!src/api/api.ts","!src/reportWebVitals.ts","!src/index.tsx"]
}