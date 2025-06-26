module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // ESM-compatible relative imports
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/public/", "/views/"],
};
