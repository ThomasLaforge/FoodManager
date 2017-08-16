export const apiPath = 'http://localhost:8080/api'
export const openFoodApiPath = 'http://fr.openfoodfacts.org/api/v0'

// Update function with this calcul
// https://www.gs1.org/how-calculate-check-digit-manually
export function isValidBarCode(barCode: string){
    let isValidBarCode = false

    console.log('isValidBarCode length', barCode.length)
    if( barCode.length >= 8 && barCode.length <= 13){
        let barCodeWithoutLastDigit = barCode.slice(0, barCode.length - 1).split('').map(char => Number.parseInt(char)).reverse()
        let checkDigit = Number.parseInt(barCode[barCode.length - 1])

        let sumOfMultipliedDigit = 0;
        barCodeWithoutLastDigit.forEach( (digit, i) => {
            sumOfMultipliedDigit += i % 2 === 0 ? digit * 3 : digit
        })   
        let calculatedCheckDigit = 10 - (sumOfMultipliedDigit % 10);        
        // console.log('calcul of check digit', sumOfMultipliedDigit, calculatedCheckDigit)
        // console.log('isValidBarCode EAN-13', barCodeWithoutLastDigit, checkDigit, calculatedCheckDigit)
        isValidBarCode = checkDigit === calculatedCheckDigit
    }


    return isValidBarCode;
}
