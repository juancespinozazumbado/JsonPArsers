const CryptoJS = require("crypto-js");

const XTDecryptAES256V4 = (message, secretKey, iv) => {
    var result = ""
    var secretKeyBytes = CryptoJS.enc.Utf8.parse(secretKey);
    var ivBytes = CryptoJS.enc.Utf8.parse(iv);
    var cipher = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(message));
    try {
        var decryptedText = CryptoJS.AES.decrypt(cipher, secretKeyBytes, {
            iv: ivBytes,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            blockSize: 128 / 32, // Bloque de 128 bits (16 bytes)
            keySize: 256 / 32 // Clave de 256 bits (32 bytes)

        });
        var jsonString = decryptedText.toString(CryptoJS.enc.Utf8);
        result = JSON.stringify(JSON.parse(jsonString));

    }
    catch (e) {
        result = e;
    }
    return result;
}

module.exports = XTDecryptAES256V4;