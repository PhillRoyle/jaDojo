const allergies = {
  1: 'eggs',
  2: 'peanuts',
  4: 'shellfish',
  8: 'strawberries',
  16: 'tomatoes',
  32: 'chocolate',
  64: 'pollen',
  128: 'cats',
};

class Allergies {
  constructor(score) {
    this._score = score;
  }

  list() {
    let myScore = this._score;
    const allergyArray = new Set();

    while (myScore > 0) {
      const highestAllergyScore = Object.keys(allergies)
        .filter((key) => key <= myScore)
        .pop();
      allergyArray.add(allergies[highestAllergyScore]);
      myScore -= highestAllergyScore;
    }
    return [...allergyArray].reverse();
  }

  allergicTo(allergy) {
    return this.list().includes(allergy);
  }
}
module.exports = Allergies;
