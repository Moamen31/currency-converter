//countries and currency
const countryCurrency = {
    "AED": "AE",
    "AFN": "AF",
    "XCD": "AG",
    "ALL": "AL",
    "AMD": "AM",
    "ANG": "AN",
    "AOA": "AO",
    "AQD": "AQ",
    "ARS": "AR",
    "AUD": "AU",
    "AZN": "AZ",
    "BAM": "BA",
    "BBD": "BB",
    "BDT": "BD",
    "XOF": "BE",
    "BGN": "BG",
    "BHD": "BH",
    "BIF": "BI",
    "BMD": "BM",
    "BND": "BN",
    "BOB": "BO",
    "BRL": "BR",
    "BSD": "BS",
    "NOK": "BV",
    "BWP": "BW",
    "BYR": "BY",
    "BZD": "BZ",
    "CAD": "CA",
    "CDF": "CD",
    "XAF": "CF",
    "CHF": "CH",
    "CLP": "CL",
    "CNY": "CN",
    "COP": "CO",
    "CRC": "CR",
    "CUP": "CU",
    "CVE": "CV",
    "CYP": "CY",
    "CZK": "CZ",
    "DJF": "DJ",
    "DKK": "DK",
    "DOP": "DO",
    "DZD": "DZ",
    "ECS": "EC",
    "EEK": "EE",
    "EGP": "EG",
    "ETB": "ET",
    "EUR": "FR",
    "FJD": "FJ",
    "FKP": "FK",
    "GBP": "GB",
    "GEL": "GE",
    "GGP": "GG",
    "GHS": "GH",
    "GIP": "GI",
    "GMD": "GM",
    "GNF": "GN",
    "GTQ": "GT",
    "GYD": "GY",
    "HKD": "HK",
    "HNL": "HN",
    "HRK": "HR",
    "HTG": "HT",
    "HUF": "HU",
    "IDR": "ID",
    "ILS": "IL",
    "INR": "IN",
    "IQD": "IQ",
    "IRR": "IR",
    "ISK": "IS",
    "JMD": "JM",
    "JOD": "JO",
    "JPY": "JP",
    "KES": "KE",
    "KGS": "KG",
    "KHR": "KH",
    "KMF": "KM",
    "KPW": "KP",
    "KRW": "KR",
    "KWD": "KW",
    "KYD": "KY",
    "KZT": "KZ",
    "LAK": "LA",
    "LBP": "LB",
    "LKR": "LK",
    "LRD": "LR",
    "LSL": "LS",
    "LTL": "LT",
    "LVL": "LV",
    "LYD": "LY",
    "MAD": "MA",
    "MDL": "MD",
    "MGA": "MG",
    "MKD": "MK",
    "MMK": "MM",
    "MNT": "MN",
    "MOP": "MO",
    "MRO": "MR",
    "MTL": "MT",
    "MUR": "MU",
    "MVR": "MV",
    "MWK": "MW",
    "MXN": "MX",
    "MYR": "MY",
    "MZN": "MZ",
    "NAD": "NA",
    "XPF": "NC",
    "NGN": "NG",
    "NIO": "NI",
    "NPR": "NP",
    "NZD": "NZ",
    "OMR": "OM",
    "PAB": "PA",
    "PEN": "PE",
    "PGK": "PG",
    "PHP": "PH",
    "PKR": "PK",
    "PLN": "PL",
    "PYG": "PY",
    "QAR": "QA",
    "RON": "RO",
    "RSD": "RS",
    "RUB": "RU",
    "RWF": "RW",
    "SAR": "SA",
    "SBD": "SB",
    "SCR": "SC",
    "SDG": "SD",
    "SEK": "SE",
    "SGD": "SG",
    "SKK": "SK",
    "SLL": "SL",
    "SOS": "SO",
    "SRD": "SR",
    "STD": "ST",
    "SVC": "SV",
    "SYP": "SY",
    "SZL": "SZ",
    "THB": "TH",
    "TJS": "TJ",
    "TMT": "TM",
    "TND": "TN",
    "TOP": "TO",
    "TRY": "TR",
    "TTD": "TT",
    "TWD": "TW",
    "TZS": "TZ",
    "UAH": "UA",
    "UGX": "UG",
    "USD": "US",
    "UYU": "UY",
    "UZS": "UZ",
    "VEF": "VE",
    "VND": "VN",
    "VUV": "VU",
    "YER": "YE",
    "ZAR": "ZA",
    "ZMK": "ZM",
    "ZWD": "ZW"
}

//api key
let apiKey = "d5d7845b32290f73fd876158"

//elements
let dropList = document.querySelectorAll(".select-box select"),
    exchangeBtn = document.querySelector(".get-exchange"),
    exchangeRateResult = document.querySelector(".exchange-rate"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    amount = document.querySelector(".amount input"),
    exchangeIcon = document.querySelector(".exchange")



dropList.forEach((list, index) => {
    for (curr in countryCurrency) {
        //select USD and EGP as default
        let selected;
        if (index === 0) {
            selected = curr === "USD" ? "selected" : ""
        }
        else if (index === 1) {
            selected = curr === "EGP" ? "selected" : ""
        }

        let option = `<option value="${curr}" ${selected}>${curr}</option>`
        list.insertAdjacentHTML("beforeend", option)
    }
    //change flags according to the selected country
    list.addEventListener("change", (e) => {
        changeFlags(e.target);
    })
})

//on btn click
exchangeBtn.addEventListener("click", () => {
    let amountVal = amount.value
    if (amountVal === "" || amountVal === "0") {
        amount.value = "1"
    }
    fetchApi();

})

window.onload = () =>{
    exchangeRateResult.classList.remove("active")
}

// fetch api function
function fetchApi() {
    exchangeRateResult.classList.add("active")
    exchangeRateResult.innerHTML = "Getting Exchange Rate..."
    let apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            let exchangeRate = result.conversion_rates[toCurrency.value]
            let totalExchangeRate = (amount.value * exchangeRate).toFixed(2)
            // show exchange rate
            exchangeRateResult.innerHTML = `${amount.value} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
        }).catch(() => {
            exchangeRateResult.innerHTML ="Something went wrong"
        })
}

function changeFlags(ele){
    //loop again in the countries currency
    for(item in countryCurrency){
        //if item in currency list equal to the value of the selected option
        if(item === ele.value){
            // getting the img of the option that had been changed
            let flagImg = ele.previousElementSibling
            flagImg.src = `https://countryflagsapi.com/svg/${countryCurrency[item]}`
        }
    }

}

exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = tempCode
    fetchApi()
    changeFlags(fromCurrency)
    changeFlags(toCurrency)
})