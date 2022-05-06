let isDevelopment = false

if (process && process.env.NODE_ENV === "development") {
  isDevelopment = true
}

export default isDevelopment
