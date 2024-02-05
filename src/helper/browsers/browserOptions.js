//const type = process.env.npm_config_BROWSER != undefined ? process.env.npm_config_BROWSER : "chrome";
const type = process.env.npm_config_BROWSER || "chrome";
const mode = process.env.npm_config_HEADLESS === undefined ? false :
  process.env.npm_config_HEADLESS.toLowerCase() === 'true' ? true : false
const browserOptions = {
  headless: mode,
  channel: type
}
module.exports = { browserOptions };