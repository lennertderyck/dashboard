const Bundler = require("parcel-bundler");
const Path = require("path");
const processEnv = process.argv[2];
const entryFiles = Path.join(__dirname, "../index.html");

process.env.NODE_ENV = processEnv;

const options = {
  outDir: processEnv == "production" ? "./docs" : "./dev", // The out directory to put the build files in, defaults to dist
  outFile: "index.html", // The name of the outputFile
  publicUrl: "/", // The url to serve on, defaults to '/'
  watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  cacheDir: ".cache", // The directory cache gets put in, defaults to .cache
  contentHash: false, // Disable content hash from being included on the filename
  global: "moduleName", // Expose modules as UMD under this name, disabled by default
  minify: true, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  target: "browser", // Browser/node/electron, defaults to browser
  bundleNodeModules: true, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
  hmr: true, // Enable or disable HMR while watching
  hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
  autoInstall: true, // Enable or disable auto install of missing dependencies found during bundling
};

(async function () {
  const bundler = new Bundler(entryFiles, options);

  if (processEnv == "production") await bundler.bundle();
  else if (processEnv == "development") await bundler.serve();
})();
