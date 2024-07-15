export function numberToHex(value) {
    const num = BigInt(value)
    const result = num.toString(16);
    console.log(result)
    return '0x' + result;
}
