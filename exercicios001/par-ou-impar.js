const value = process.argv[2]
const valueNumber = process.argv[3]

if (!value || !valueNumber) {
    console.log(`error, insira um valor valido`)
} else {
    const isPar = value.toLowerCase() === 'par'
    const randomNumber = Math.floor(Math.random() * 11)
    const sum = randomNumber + Number(valueNumber)
    const isSumPar = sum % 2 === 0
    const cond1 = isPar && isSumPar
    const cond2 = !isPar && !isSumPar
    cond1 || cond2 ?
        console.log(`Você jogou com ${valueNumber} e computador jogou ${randomNumber},a somatoria desses numeros e igual a ${sum}, que é um numero ${isSumPar ? 'par' : 'impar'} .Você Venceu!`)
        :
        console.log(`Você jogou com ${valueNumber} e computador jogou ${randomNumber},a somatoria desses numeros e igual a ${sum}, que é um numero ${isSumPar ? 'par' : 'impar'} .Você Perdeu!`)

}