class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      // Bitwise left shift with 5 0s - this would be similar to
      // hash*31, 31 being the decent prime number
      // but bit shifting is a faster way to do this
      // tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      // converting hash to a 32 bit integer
      hash = hash & hash;
    }
    // making sure hash is unsigned - meaning non-negative number. 
    return hash >>> 0;
  }

  has(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      return false;
    }
    return true;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    // Find slot where this key should be located
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset length - it will rebuild as you add items back in
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }
}

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }

    while (currNode.value.key !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {
        currNode = currNode.next;
      }
    }

    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }

    if (this.head.value.key === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;
    while (currNode !== null && currNode.value.key !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }
}

class HashMapSC {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      // Bitwise left shift with 5 0s - this would be similar to
      // hash*31, 31 being the decent prime number
      // but bit shifting is a faster way to do this
      // tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      // converting hash to a 32 bit integer
      hash = hash & hash;
    }
    // making sure hash is unsigned - meaning non-negative number. 
    return hash >>> 0;
  }

  has(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index].find(key) === null) {
      return false;
    }
    return true;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined || this._hashTable[index].find(key) === null) {
      throw new Error('Key error');
    }
    return this._hashTable[index].find(key).value.value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMapSC.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapSC.SIZE_RATIO);
    }
    // Find slot where this key should be located
    const index = this._findSlot(key);
    const data = {
      key,
      value
    };

    if (!this._hashTable[index]) {
      this.length++;
      this._hashTable[index] = new LinkedList();
      this._hashTable[index].insertFirst(data);
      return;
    }
    if (!this._hashTable[index].find(key)) {
      this.length++;
    } else {
      this._hashTable[index].remove(key);
    }
    this._hashTable[index].insertFirst(data);
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined || slot.find(key) === null) {
      throw new Error('Key error');
    }
    slot.remove(key);
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMapSC._hashString(key);
    const index = hash % this._capacity;
    return index;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset length - it will rebuild as you add items back in
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        let currNode = slot.head;
        while (currNode !== null) {
          this.set(currNode.value.key, currNode.value.value);
          currNode = currNode.next;
        }
      }
    }
  }
}
HashMap.MAX_LOAD_RATIO = 0.5;
HashMapSC.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;
HashMapSC.SIZE_RATIO = 3;

module.exports = { HashMap, HashMapSC };