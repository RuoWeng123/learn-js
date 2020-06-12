const toText = text => text

const toDate = text => new Date(Date.parse(text))

const toNumber = text => parseFloat(text)

export default {
  default: toText,
  toText,
  toDate,
  toNumber
}
