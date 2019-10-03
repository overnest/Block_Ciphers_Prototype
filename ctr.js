const aesjs = require('./aes-js');
const fs = require('fs');

const text = '|11111111111111||22222222222222||33333333333333|'
// An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

const decrypt = (encryptedBytes, counterValue = 5) => {
  let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counterValue));
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}



// Convert text to bytes

const textBytes = aesjs.utils.utf8.toBytes(text);


let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
let encryptedBytes = aesCtr.encrypt(textBytes);
const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

// When ready to decrypt the hex string, convert it back to bytes
encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
const decryptedText = decrypt(encryptedBytes);
console.log('TEST: decrypted text equals original text', decryptedText === text ? 'PASS' : 'FAIL');
// "Text may be any length you wish, no padding is required."



//Decrypt Block
const block = encryptedBytes.slice(16, 32);
const decryptedBlockText = decrypt(block, 6);

console.log('decrypted 2nd block', decryptedBlockText)



//Change text and replace encrypted block
let newText = 'thisisnewtextfoo';
const newTextBytes = aesjs.utils.utf8.toBytes(newText);
aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(6));
const newEncryptedBytes = aesCtr.encrypt(newTextBytes);

encryptedBytes.splice(16,16, ...newEncryptedBytes)
console.log('replaced block 2 with text: ', newText);
console.log('decrypted full text ', decrypt(encryptedBytes, 5));
console.log('decrypted 3rd block ', decrypt(encryptedBytes.slice(32, 48), 7))
