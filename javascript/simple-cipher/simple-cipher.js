const charBase = String.fromCharCode(...[...Array(26).keys()].map(i => i + 'a'.charCodeAt(0)));
// const charBase = 'abcdefghijklmnopqrstuvwxyz';

let randomChar = () => {
    return charBase.charAt(Math.floor(Math.random() * charBase.length))
}

/* https://stackoverflow.com/questions/25512771/what-is-array-apply-actually-doing/25513067#25513067
    Array constructor creates array with empty indices; map applies the function to all _non-empty_ indices
    therefore, need to use the ```Array.apply``` or ```fill()```*/
let generateCipherKey = (length = 100) => {
    return Array.apply(null, Array(length))
        // return Array(length).fill(Array(length)) //alternative syntax
        .map(randomChar).join('');
}

let encodeChar = (char, index, keyArray) => {
    let indexOfChar = charBase.indexOf(char);

    let keyChar = keyArray[index];
    let indexOfKeyChar = charBase.indexOf(keyChar);
    let newCharIndex = ((indexOfKeyChar + indexOfChar) % charBase.length);
    return charBase[newCharIndex];
}

let decodeChar = (encodedChar, nthEncodedChar) => {
    let indexOfEncodedChar = charBase.indexOf(encodedChar);
    let indexOfNthEncodedChar = charBase.indexOf(nthEncodedChar);

    let indexDiff = (((indexOfEncodedChar - indexOfNthEncodedChar) + charBase.length) % charBase.length);
    return charBase[indexDiff];
}

let onlyLowerCaseString = (toTest) => {
    return (/^[a-z]+$/.test(toTest));
}

class Cipher {

    constructor(key = generateCipherKey()) {
        if (onlyLowerCaseString(key)) {
            this._key = key;
        } else throw new Error('Bad key');
    }

    get key() {
        return this._key;
    }
    get keyArray() {
        return this._keyArray;
    }

    /* for each char of the plainText, get corresponding char of the key, and shift by a=0, b=1, etc*/
    encode(plainTextString) {
        let key = this._key;
        while (this._key.length < plainTextString.length) {
            this._key += key;
        }
        this._keyArray = this._key.split('');

        let plainArray = plainTextString.split('');
        let encodedText = '';
        for (let i = 0; i < plainArray.length; i++) {
            encodedText += encodeChar(plainArray[i], i, this._keyArray);
        }
        return encodedText;
    }

    /* alternative format to ```encode```. Needs to get index as can't map directly over two collections */
    decode(encodedString) {
        let encodedArray = encodedString.split('');
        return [...Array(encodedArray.length).keys()] //builds an array populated by the iteration of the array mentioned inside
            //return Array.from(Array(encodedArray.length).keys()) //alt array creation & population
            .map(i => {
                return decodeChar(encodedArray[i], this._keyArray[i])
            })
            .join('');
    }
}
module.exports = {
    Cipher
}