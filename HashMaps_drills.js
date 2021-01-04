const { HashMap, HashMapSC } = require('./hashmap');
HashMap.MAX_LOAD_RATIO = 0.5;
HashMapSC.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;
HashMapSC.SIZE_RATIO = 3;

function main() {
  const lotr = new HashMap();

  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandalf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');
  console.log(lotr);
  console.log(lotr.get('Maiar'));
  console.log(lotr.get('Hobbit'));
  // "Maiar": "Sauron"
  // "Hobbit": "Frodo"
  // The values of "Maiar" and "Hobbit" have been set to the latest value given to them.
  // This is consistent with the normal behavior of Objects/Hashmaps:
  // `object[key] = value` changes any previous value associated with that key to the new value

  // Capacity after hashing all above items is 24.  The original capacity is 8.
  // With a MAX_LOAD_RATIO of 0.5, the Hashmap will resize on the next .set() call after the load ratio exceeds 0.5
  // In this case, the addition of Legolas pushes the ratio over 0.5, so the next call triggers resize.
  // Resize sets the capacity to SIZE_RATIO * capacity, in this case 3 * 8 = 24.
  // The final load ratio is 10 / 24 = 0.416667, so no further resize is triggered.
}

main();

// 2. The output of the code is map1.get(str1) -> 20, map2.get(str3) -> 10.
// str1 and str2 are separate variables, but the strings they refer to are the same.
// Therefore, calling map1.set(str1, 10), then map1.set(str2, 20) is the same as calling map1.set('Hello, World.', 10), then map1.set('Hello, World.', 20).
// As previously established, this will update the value associated with 'Hello, World.' as opposed to creating a new key.

/* 3.1 {
  0: 22,
  1: 88,
  2: empty,
  3: empty,
  4: 4,
  5: 15,
  6: 28,
  7: 17,
  8: 59,
  9: 31,
  10: 10
} 

3.2 {
  0: empty,
  1: 28 -> 19 -> 10,
  2: 20,
  3: 12,
  4: empty,
  5: 5,
  6: 15 -> 33,
  7: empty,
  8: 17
} */

function removeDuplicates(string) {
  let chars = new HashMap(string.length);
  let output = '';
  for (let i = 0; i < string.length; i++) {
    let currChar = string.charAt(i);
    if (currChar === ' ') {
      output += currChar;
      continue;
    }
    try {
      let occurrences = chars.get(currChar);
    } catch (error) {
      output += currChar;
      chars.set(currChar, 1);
    }
  }
  return output;
}

console.log(removeDuplicates('google'));
console.log(removeDuplicates('google all that you can think of'));

function permutationPalindrome(string) {
  if (string.length === 1) {
    return true;
  }
  let occurrences = new HashMap();
  let chars = new Set();
  for (let i = 0; i < string.length; i++) {
    let currChar = string.charAt(i);
    chars.add(currChar);
    if (!occurrences.has(currChar)) {
      occurrences.set(currChar, 1);
      continue;
    }
    occurrences.set(currChar, occurrences.get(currChar) + 1);
  }

  const maxOddChars = string.length % 2;
  let oddChars = 0;
  for (const char of chars) {
    if (occurrences.get(char) % 2 === 1) {
      oddChars++;
      if (oddChars > maxOddChars) {
        return false;
      }
    }
  }
  return true;
}

console.log(permutationPalindrome('acecarr'));
console.log(permutationPalindrome('north'));

function groupAnagrams(list) {
  function areAnagrams(word1, word2) {
    if (word1.length !== word2.length) {
      return false;
    }
    let word1Chars = new HashMap();
    let word2Chars = new HashMap();
    for (let i = 0; i < word1.length; i++) {
      let w1Char = word1.charAt(i);
      let w2Char = word2.charAt(i);
      if (!word1Chars.has(w1Char)) {
        word1Chars.set(w1Char, 1)
      } else {
        word1Chars.set(w1Char, word1Chars.get(w1Char) + 1);
      }
      if (!word2Chars.has(w2Char)) {
        word2Chars.set(w2Char, 1)
      } else {
        word2Chars.set(w2Char, word2Chars.get(w2Char) + 1);
      }
    }
    for (let k = 0; k < word1.length; k++) {
      let currChar = word1.charAt(k);
      if (!word2Chars.has(currChar)) {
        return false;
      }
      if (word1Chars.get(currChar) !== word2Chars.get(currChar)) {
        return false;
      }
    }
    return true;
  }

  let output = [];
  for (let x = 0; x < list.length; x++) {
    let grams = [];
    let currWord = list[x];
    grams.push(currWord);
    for (let y = x + 1; y < list.length; y++) {
      if (areAnagrams(currWord, list[y])) {
        grams.push(list[y]);
        list.splice(y, 1);
        y--;
      }
    }
    output.push(grams);
  }
  return output;
}

console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

function mainSC() {
  const lotr = new HashMapSC();

  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandalf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');
  console.log(lotr);
  console.log(lotr.get('Maiar'));
  console.log(lotr.get('Hobbit'));
}

mainSC();
