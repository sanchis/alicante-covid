const parse = require('date-fns/parse')
function dateParse (date) {
  return parse(date, 'yyyy-MM-dd', new Date())
}
module.exports = {
  dateParse
}
