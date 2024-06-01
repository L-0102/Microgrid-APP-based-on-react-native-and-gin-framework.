import CryptoJS from "react-native-crypto-js"; //crypto-js加解密库
//javascript Aes解密方法
export const aesDecrypt=(text)=> {
    let key = CryptoJS.enc.Utf8.parse("aaaabbbbccccdddd");

    let decryptedData = CryptoJS.AES.decrypt(text, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decryptedData.toString(CryptoJS.enc.Utf8);
};