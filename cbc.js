const aesjs = require('./aes-js');
const fs = require('fs');

let text = fs.readFileSync('./text.txt', 'utf-8');

//MODIFY OFFSET AND LIMIT TO DESIRED VALUES
const offset = 72;
const limit = 187;

let key = [ 1, 2, 3, 4, 5, 6, 124, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
let iv = [ 221, 227, 123, 24, 53, 26, 27, 28, 29, 130, 31, 67, 133, 78, 95, 36 ];

let textBytes = aesjs.utils.utf8.toBytes(text);

const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
let encryptedBytes = aesCbc.encrypt(textBytes);


const aesCbc2 = new aesjs.ModeOfOperation.cbc(key, iv);

let decryptedPartialBytes = aesCbc2.decryptPartial(encryptedBytes, offset, limit);
let decryptedPartialText = aesjs.utils.utf8.fromBytes(decryptedPartialBytes);
console.log('decrypted partial: ', decryptedPartialText)

const indexOf = text.indexOf(decryptedPartialText)

console.log('test: index of partial text should match offset: ', offset === indexOf ? 'PASS!' : 'FAIL!');
console.log('test: length of partial text should match the limit: ', decryptedPartialText.length === limit ? 'PASS!' : 'FAIL!');
