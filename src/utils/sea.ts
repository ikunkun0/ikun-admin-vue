// aes.js文件为AES加密解密方法，代码如下
import CryptoJS from 'crypto-js' // 引用AES源码js

// 加密密钥（需要和后端保持一致）
const secretKey = 'your-secret-key'

// 加密方法
export function encryptData(data: any): string {
  const jsonData = JSON.stringify(data) // 将对象序列化为 JSON 字符串
  const ciphertext = CryptoJS.AES.encrypt(jsonData, secretKey).toString() // AES 加密
  return ciphertext
}

// 解密方法（可选，用于验证）
export function decryptData(ciphertext: string): any {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  const originalData = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(originalData)
}
