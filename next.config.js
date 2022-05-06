// eslint-disable-next-line
const { withPlausibleProxy } = require("next-plausible")

module.exports = withPlausibleProxy()({
  images: {
    domains: ["i.imgur.com"],
  },
  swcMinify: true,
})
