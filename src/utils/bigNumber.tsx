import { BigNumber } from 'bignumber.js';

export function toBigNumber(value: string): BigNumber {
    // 尝试直接转换，如果失败则处理科学记数法
    try {
        return new BigNumber(value);
    } catch (e) {
        // 将科学记数法转换为完整数字字符串
        const num = Number(value);
        if (!isFinite(num)) {
            throw new Error('Number is too large or not a number');
        }
        return new BigNumber(num.toString());
    }
}

export function scientificToDecimal(sciNumber: string): string {
    // 判断是否为科学记数法
    if (!/\d+\.?\d*e[+-]*\d+/i.test(sciNumber)) {
        return sciNumber; // 如果不是科学记数法，直接返回原字符串
    }

    let [base, exponent] = sciNumber.split('e').map(item => Number(item));
    let decimalPlaces = exponent < 0 ? Math.abs(exponent) - 1 : 0;
    let fullNumber = Math.abs(exponent);
    console.log("base", base);
    console.log("decimalPlaces", decimalPlaces);
    const decimalPlacesBase = countDecimalPlaces(base);
    console.log("decimalPlacesBase", decimalPlacesBase);
    console.log("fullNumber", fullNumber);
    if (exponent >= 0) {
        return base.toString().replace('.', '') + '0'.repeat(fullNumber-decimalPlacesBase);
    } else {
        return '0.' + '0'.repeat(decimalPlaces) + base.toFixed(0).replace('.', '');
    }
}

function countDecimalPlaces(value: number): number {
    if (!isFinite(value)) return 0; // 检查是否为有限数

    let text = value.toString();

    // 检查是否有小数点
    let decimalPointIndex = text.indexOf('.');
    if (decimalPointIndex === -1) return 0; // 没有小数点，返回 0

    return text.length - decimalPointIndex - 1; // 计算小数点后的位数
}

export function formatNumberToChinese(num: number): string {
    if (!isFinite(num)) return '数字太大或不是数字';

    const units = ["", "万", "亿"];
    let str = num.toString();
    let result = '';

    let counter = 0;

    while (str.length > 0) {
        let part = str.substring(str.length - 4);
        str = str.substring(0, str.length - 4);

        let partNum = parseInt(part, 10);
        if (partNum > 0) {
            result = partNum + units[counter] + result;
        }
        
        counter++;
    }

    return result;
}