module.exports = {
    /*trying our map, filter, reduce - build array from phrase, map over to make it lowercase, 
    filter to remove non-alpha characters, then reduce to add each char to a set.*/
    isPangram: (phrase) => {
        let filteredSet = phrase.split(``)
            .map((char) => {
                return char.toLowerCase();
            })
            .filter((char) => {
                return /[a-z]/.test(char);
            })
            .reduce((acc, char) => {
                return acc.add(char);
            }, new Set());
        return [...filteredSet].length === 26;
    }
}