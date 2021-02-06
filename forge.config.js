module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["windows"],
      config: {},
    },
  ],
  publishers: {
    name: "@electron-forge/publisher-github",
    config: {
      repository: {
        owner: "ivan-marquez",
        name: "sysinfostats",
      },
      prerelease: true,
    },
  },
};
