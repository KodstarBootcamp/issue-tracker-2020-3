const info = (...params) => {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'local-test'){
    params.forEach(para => console.log(para))
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'local-test'){
    params.forEach(para => console.error(para))
  }
}

module.exports = {
  info,
  error
}
