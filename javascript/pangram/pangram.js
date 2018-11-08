module.exports = {
    /*trying out map, filter, reduce - build array from phrase, map over to make it lowercase, 
    filter to remove non-alpha characters, then reduce to add each char to a set.*/
    my_isPangram: (phrase) => {
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
    },
    /* genius! adapted from malydok's solution in exercism */
    malydok_isPangram: (phrase) => {
        const text = phrase.toLowerCase().match(/[a-z]/g);
        return new Set(text).size === 26;
    },
    /* also genius! adapted from angamaiton's solution in exercism */
    isPangram: (phrase) => {
        const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
        const text = phrase.toLowerCase();
        return alphabet.every(letter => text.includes(letter));
    }
}