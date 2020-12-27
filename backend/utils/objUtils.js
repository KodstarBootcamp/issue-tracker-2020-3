const objCleaner = obj => {
  Object.getOwnPropertyNames(obj).forEach(property => {
    if (obj[property]===null || obj[property]===undefined) {
      delete obj[property]
    }
  })
}

module.exports = {
  objCleaner
}
