import { toast } from "react-toastify";

export function isNull(str: any) {
  if (typeof str === "undefined" || str === "" || str === null) {
    return true;
  }
  return false;
}

export function getErrorMessage(str: any) {
  if (typeof (str) !== 'string') return 'ERROR';
  console.log("str", str);
  const regex = /Reason: (.+?)(\n|\r\n)/;
  const match = str.match(regex);
  const errorMessage = match ? match[1] : null;
  console.log("errorMessage", errorMessage);
  return errorMessage;
}

export async function copyTextToClipboard(text: string, t: any): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast(t("Text copied to clipboard"));
  } catch (err) {
    toast(t("Failed to copy text to clipboard"));
  }
}

export function timestampToDate(timestamp: number): string {
  // 创建 Date 对象
  const date = new Date(timestamp * 1000); // JavaScript 时间戳以毫秒为单位

  // 获取年、月、日
  const year = date.getFullYear(); // 只取年份的后两位
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从 0 开始，需要 +1
  const day = date.getDate().toString().padStart(2, "0");

  // 格式化输出
  return `${year}-${month}-${day}`;
}

export function formatTimestamp(timestamp: number) {
  // 将时间戳从秒转换为毫秒
  const date = new Date(timestamp * 1000);

  // 获取年、月、日、小时和分钟
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，所以需要加 1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // 拼接成 yyyy-mm-dd hh:mm 格式
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function abbreviateAddress(address: string) {
  // 确保地址是有效的
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error("Invalid Ethereum address");
  }

  // 提取前 4 个和后 4 个字符
  const start = address.slice(0, 6); // "0x" + 前 4 个字符
  const end = address.slice(-4); // 后 4 个字符

  return `${start}...${end}`; // 返回缩写后的地址
}

export function abbreviateTransactionHash(hash: string) {
  if (isNull(hash)) return hash;
  // 提取前 4 个和后 4 个字符
  const start = hash.slice(0, 12); // "0x" + 前 4 个字符
  const end = hash.slice(-4); // 后 4 个字符

  return `${start}...${end}`; // 返回缩写后的地址
}

export function getFirstTwoDigits(hash: any) {
  if (isNull(hash)) return "";
  // 去掉 '0x' 前缀
  const cleanedHash = hash.replace(/^0x/, '');

  // 提取前两位数字
  let digits = '';
  for (let i = 0; i < cleanedHash.length; i++) {
      if (!isNaN(cleanedHash[i])) { // 检查字符是否为数字
          digits += cleanedHash[i];
          if (digits.length === 2) break; // 获取到前两位数字后退出循环
      }
  }

  // 如果前两位数字不足两位，补0
  return digits.padStart(2, '0');
}

// 将数字保留5位小数，不进行四舍五入
export function formatToFixedFiveDecimals(value: number): string {
  const stringValue = value.toString();
  const decimalPointIndex = stringValue.indexOf('.');

  if (decimalPointIndex === -1) {
      return stringValue + '.00000'; // 如果是整数，则直接补零
  }

  const decimalPart = stringValue.slice(decimalPointIndex + 1, decimalPointIndex + 6); // 截取小数点后5位
  return stringValue.slice(0, decimalPointIndex) + '.' + decimalPart.padEnd(5, '0'); // 不足5位补零
}