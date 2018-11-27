const allergies = {
  eggs: 1 << 0,
  peanuts: 1 << 1,
  shellfish: 1 << 2,
  strawberries: 1 << 3,
  tomatoes: 1 << 4,
  chocolate: 1 << 5,
  pollen: 1 << 6,
  cats: 1 << 7,
};

export default class Allergies {
  constructor(score = 0) {
    this.score = score;
    this.allergies = [];
  }

  list() {
    Object.keys(allergies).forEach(
      (allergyKey) => {
        if (this.allergicTo(allergyKey)) {
          this.allergies.push(allergyKey);
        }
      },
    );

    // could use keys in object but must check for hasOwnProperty because it would include prototype properties here too
    // for (const allergy in allergies) {
    //   if (allergies.hasOwnProperty(allergy) && this.allergicTo(allergy)) {
    //     this.allergies.push(allergy);
    //   }
    // }
    return this.allergies;
  }

  allergicTo(poison) {
    if (this.score & allergies[poison]) {
      return true;
    }
    return false;
  }
}
