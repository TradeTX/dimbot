// const leetChars = {
//   a: ['4', '/-\\', '/_\\', '@', '/\\'],
//   b: ['8', '|3', '13', '|}', '|:', '|8', '18', '6', '|B', '|8', 'lo', '|o', '|3'],
//   c: ['<', '{', '[', '('],
//   d: ['|)', '|}', '|]'],
//   e: ['3'],
//   f: ['|=', 'ph', '|#', '|"'],
//   g: ['[', '-', '[+', 6],
//   h: ['4', '|-|', '[-]', '{-}', '|=|', '[=]', '{=}'],
//   i: ['1', '|', '!'],
//   j: ['_|', '_/', '_7', '_)'],
//   k: ['|<', '1<', 'l<', '|{', 'l{'],
//   l: ['|_', '|', '1', ']['],
//   m: ['44', '|\\/|', '^^', '\/\\/\\', '/X\\', '[]\\/][', '[]V[]', '][\\\\//][', '//.', '.\\\\', 'N\\'],
//   n: ['|\\|', '/\\/', '/V', '][\\\\]['],
//   o: ['0', '()', '[]', '{}', '<>'],
//   p: ['|o', '|O', '|>', '|*', '|°', '|D', '/o'],
//   q: ['O_', '9', '(,)', '0,'],
//   r: ['|2', '12', '.-', '|^', 'l2'],
//   s: ['5', '$', '§'],
//   t: ['7', '+', '7`', '|'],
//   u: ['|_|', '\\_\\', '/_/', '\\_/', '(_)', '[_]', '{_}'],
//   v: ['\\/'],
//   w: ['\\/\\/', '(/\\)', '\\^/', '|/\\|', '\\X/', '\\\\\'', '\'\/\/', 'VV'],
//   x: ['%', '*', '><', '}{', ')('],
//   y: ['`/', '¥'],
//   z: ['2', '7_', '>_']
// }
const leetChars = {
  a : '4',
  b : '8',
  c : '(',
  d : 'd',
  e : '3',
  f : 'f',
  g : '9',
  h : 'h',
  i : '!',
  j : 'j',
  k : 'k',
  l : '1',
  m : 'm',
  n : 'n',
  o : '0',
  p : 'p',
  q : 'q',
  r : 'r',
  s : '5',
  t : '7',
  u : 'u',
  v : 'v',
  w : 'w',
  x : 'x',
  y : 'y',
  z : '2'
}

const leetWords = {
  bai: 'bai',
  and: 'nd',
  dude: 'd00d',
  dog: 'dog8',
  from: 'form',
  guys: 'guise',
  hacks: 'h4x0rz',
  hi: 'hai',
  you: 'j00',
  cool: 'kewl',
  like: 'liek',
  mate: 'm8',
  master: 'mastah',
  max: 'max0r',
  omg: 'OMGG',
  lol: 'OLO',
  leet: '1337',
  fear: 'ph34',
  please: 'pl0x',
  power: 'powwah',
  porn: 'pr0n',
  the: 'teh',
  when: 'wen',
  what: 'wut',
  winner: 'winnar',
  you: 'u',
  are: 'r',
  why: 'y',
  yes: 'yuss'
};

const wordLeetify = word => {
  return word in leetWords
    ? leetWords[word]
    : word;
};

const charLeetify = char => {
  // return char in leetChars
  //   ? leetChars[char][Math.floor(Math.random() * leetChars[char].length)]
  //   : char;
  return char in leetChars
    ? leetChars[char]
    : char;
}

module.exports = text => text.toLowerCase().split(' ').map(wordLeetify).join(' ').split('').map(charLeetify).join('');
