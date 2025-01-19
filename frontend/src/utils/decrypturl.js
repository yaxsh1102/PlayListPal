import CryptoJS from 'crypto-js';

function decryptUrl(encryptedUrl) {
    try {
        // Convert the key to WordArray
        const key = CryptoJS.enc.Utf8.parse("38346591");
        
        // Decode base64 URL
        const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedUrl.trim());
        
        // Configure decryption options
        const config = {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        };
        
        // Decrypt the URL
        const decrypted = CryptoJS.DES.decrypt(
          { ciphertext: encryptedBytes },
          key,
          config
        );
        
        // Convert to UTF-8 string
        let decryptedUrl = decrypted.toString(CryptoJS.enc.Utf8);
        
        // Replace the file version in URL
        decryptedUrl = decryptedUrl.replace("_96.mp4", "_320.mp4");
        return decryptedUrl
    }catch(err){

    }
        
}

export default decryptUrl;
