import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#df6f29", "#c69347"],
    default: ["black", "gray"],
  }
  
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `CC-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCvc = document.querySelector('#security-code')
const securityCvcPattern = {
  mask : "0000",
}
const securityCodeMasked = IMask(securityCvc, securityCvcPattern);


const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
   YY: {
     mask: IMask.MaskedRange,
     from: String(new Date().getFullYear()).slice(2),
     to: String(new Date().getFullYear()+10).slice(2)
   },
  MM: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 12
  },
}
}
const expirationCodeMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "Visa",
    },
    {
      mask: "0000 0000 0000 0000",
        regex: /(^5[1,5]\d{0,2}|^22[2,9]\d{0,2})\d{0,12}/,
      cardType: "Matercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "Default",
    },
  ],
 dispatch: function (appended, dynamicMasked) {
      const number = (dynamicMasked.value + appended).replace(/\D/g,'')
      const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
      })
      console.log(foundMask)
      return foundMask
 },
}

const cardCodeMasked = IMask(cardNumber, cardNumberPattern);

