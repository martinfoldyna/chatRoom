export class CipherService {
  constructor() {
  }

  private alphabet = " abcdefghijklmnopqrstuvwxyzáčďéěíňóřšťúůýžABCDEFGHIJKLMNOPQRSTUV0123456789ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ.!?,:;'/";


  /*
      @author: Martin Foldyna
      @description: Creates key that is same length as the input string
  */
  private getFullKey(key, string) {
    let keyLength = key.length;
    const strLength = string.length;


    while (keyLength < strLength) {
      for (var i = 0; i <= strLength; i++) {
        const currentLetter = key.charAt(i);
        if (currentLetter == "") {
          key += key.charAt(i - keyLength);
        }
      }
      keyLength++;
    }

    if (keyLength > strLength) {
      key = key.substr(0, strLength);
    }
    return key;
  }

  encrypt(key: String, string: String) {

    key = this.getFullKey(key, string);

    let encrypted = "";

    for (let i = 0; i < string.length; i++) {
      const keyItem = key.charAt(i);
      const strItem = string.charAt(i);

      const strItemCode = this.alphabet.indexOf(strItem);
      const keyItemCode = this.alphabet.indexOf(keyItem);

      const codeDifference = Math.abs(strItemCode - keyItemCode);

      encrypted += this.alphabet.charAt(strItemCode + keyItemCode);

    }

    return encrypted;
  }

  decrypt(key: String, string: String) {
    return new Promise((resolve, reject) => {
      key = this.getFullKey(key, string);

      let decrypt = "";

      for (let i = 0; i < string.length; i++) {
        const keyItem = key.charAt(i);
        const strItem = string.charAt(i);

        const strItemCode = this.alphabet.indexOf(strItem);
        const keyItemCode = this.alphabet.indexOf(keyItem);

        const codeDifference = Math.abs(strItemCode - keyItemCode);

        decrypt += this.alphabet.charAt(strItemCode - keyItemCode);

      }

      resolve(decrypt);
    })
  }




}
