/*prettier-ignore*/
"use strict";

var levelEmojis = {
  debug: "🐛",
  error: "🛑",
  info: "ℹ️ ",
  trace: "💻",
  warn: "⚠️ ",
}

var levels = Object.keys(levelEmojis)

module.exports = function log(dot, opts) {
  opts = opts || {}

  if (dot.state.log) {
    return dot
  }

  dot.state.log = opts

  dot.any("before", logAll)
  dot.any("log", logger)

  return dot
}

function logAll(arg, opts) {
  var dot = opts.dot,
    ns = opts.ns,
    prop = opts.prop

  if (ns === "log") {
    return
  }

  dot("log", prop, { message: arg, ns: ns })
}

function logger(arg, opts) {
  var level = "info",
    propArr = opts.propArr

  if (levels.indexOf(propArr[0]) > -1) {
    level = propArr[0]
    propArr = propArr.slice(1)
  }

  var message = opts.message || arg

  var out = [new Date().toISOString(), levelEmojis[level]]

  if (opts.ns) {
    out.push(opts.ns)
  }

  if (propArr.length) {
    out.push(propArr.join("."))
  }

  if (message) {
    out.push(JSON.stringify(message))
  }

  // eslint-disable-next-line no-console
  console.log.apply(null, out)
}
