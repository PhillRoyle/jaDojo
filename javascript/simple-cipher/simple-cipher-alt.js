const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_LENGTH = ALPHABET.length;

function getRandomLetter() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET_LENGTH)];
}

function generateKey(keyLength = 100) {
  return [...Array(keyLength)]
    .map(getRandomLetter)
    .join('');
}

/**
  Circular letter access in any direction.
*/
function letterFrom(string, index) {
  const length = string.length;
  return string[((index % length) + length) % length];
}

function shiftFor(index, { key, direction }) {
  const keyLetter = letterFrom(key, index);
  return direction * ALPHABET.indexOf(keyLetter);
}

function shiftLetters(input, shiftOptions) {
  return input
    .split('')
    .reduce((output, letter, index) => {
      const shift = shiftFor(index, shiftOptions);
      const shiftedIndex = ALPHABET.indexOf(letter) + shift;
      return output += letterFrom(ALPHABET, shiftedIndex);
    }, '');
}

export default function Cipher(key = generateKey()) {
  const isKeyValid = /^[a-z]+$/.test(key);

  if (!isKeyValid) {
    throw new Error('Bad key');
  }

  return {
    key,
    encode: input => shiftLetters(input, { key, direction: +1 }),
    decode: input => shiftLetters(input, { key, direction: -1 })
  };
}