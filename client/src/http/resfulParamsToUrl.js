export default function resfulParamsToUrl(url, params) {
  if (!/{*}/g.test(url)) {
    return url
  } else if (
    params === undefined ||
    (typeof params == 'object' && Object.keys(params).length == 0)
  ) {
    console.warn(
      `url:${url} contain unconverted parameters,but the parmas in arguments is undefined or an empty object`
    )
    return url.slice(0, url.indexOf('{'))
  } else {
    let { keys } = Object
    for (let key of keys(params)) {
      let reg = new RegExp('{' + key + '}', 'g')
      if (reg.test(url)) {
        url = url.replace(reg, encodeURIComponent(params[key]))
        delete params[key]
      }
    }
    if (/{*}/g.test(url)) {
      console.warn(
        `url:${url} contain unconverted parameters at the last moment`
      )
    }
  }
  return url
}
