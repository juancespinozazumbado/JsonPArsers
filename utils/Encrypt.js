const CryptoJS = require("crypto-js");

const XTEncryptAES256V4 = (message, secretKey, iv) => {
    var result = ""
    try {
        var secretKeyBytes = CryptoJS.enc.Utf8.parse(secretKey);
        if (iv != "") {
            message = atob(message);
            var jsonString = JSON.stringify(JSON.parse(message));
            var ivBytes = CryptoJS.enc.Utf8.parse(iv);
            var parametro = {
                iv: ivBytes,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                blockSize: 128 / 32, // Bloque de 128 bits (16 bytes)
                keySize: 256 / 32 // Clave de 256 bits (32 bytes)
            };
            var encrypted = CryptoJS.AES.encrypt(jsonString, secretKeyBytes, parametro);
            result = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(encrypted.toString()))
        }
        else {
            result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(message), secretKey).toString();
        }
    }
    catch (e) {
        result = e.error + "-" + e.stack;
    }
    return result;
}

module.exports = XTEncryptAES256V4;