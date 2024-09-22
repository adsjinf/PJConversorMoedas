let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")
async function getDollarValue() {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD')
      const data = await response.json()
  
      // Acessa o valor de compra do dólar (bid)
      const dollarBid = data.USDBRL.bid
  
     //console.log(`O valor de compra do dólar é: R$ ${dollarBid}`);
  
      return dollarBid
    } catch (error) {
      console.error('Erro ao buscar o valor do dólar:', error)
    }
  }
 
usdInput.addEventListener("keyup", () => {
    if(usdInput.value != ""){
        convert("usd-to-brl")
    } else {
        brlInput.value=""
    }
})
  
brlInput.addEventListener("keyup", () => {
    if(brlInput.value != ""){
        convert("brl-to-usd")
    } else {
        usdInput.value = ""
    }
})

usdInput.addEventListener("blur", () =>{
    usdInput.value = formatCurrency(usdInput.value)
    if(brlInput.value = "NaN"){
        usdInput.value = ""
        brlInput.value = ""
    }
})

brlInput.addEventListener("blur", () =>{
    brlInput.value = formatCurrency(brlInput.value)
    if(usdInput.value = "NaN"){
        usdInput.value = ""
        brlInput.value = ""
    }
})

//usdInput.value = "1000,00"

function formatCurrency(value){
    // ajustar o valor
    let fixedValue = fixValue(value)
    // utlizar função de formatar
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }
    let formatter = new Intl.NumberFormat("pt-BR", options)
    // retorna o valor formatado
    return formatter.format(fixedValue)
}

function fixValue(value){
    let fixedValue = value.replace(",", ".")
    let floatValue = parseFloat(fixedValue)
    if (floatValue == NaN) {
        floatValue=0
    }
    return floatValue
}

async function convert(type){
    let usdValor = await getDollarValue() // Aguarda o valor da Promise ser resolvido
    if (type == "usd-to-brl"){
        // ajustar valor
        let fixedValue = fixValue(usdInput.value)
        // converter o valor
        let result = fixedValue * usdValor
        result = result.toFixed(2)
        // mostra no campo de real
        brlInput.value = formatCurrency(result)
    }

    if (type == "brl-to-usd"){
        // ajustar valor
        let fixedValue = fixValue(brlInput.value)
        // converter o valor
        let result = fixedValue / usdValor
        result = result.toFixed(2)
        // mostra no campo de real
        usdInput.value = formatCurrency(result)
    }
}