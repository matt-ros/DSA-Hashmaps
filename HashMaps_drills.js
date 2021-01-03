const HashMap = require('./hashmap');
HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

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

