function removeVowels(str) {
    function isVowel(char) {
        if ('aeiou'.indexOf(char) !== -1) return true;
    }
    let removedVowels = '';
    str.toLowerCase().split('').forEach(function (val) {
        if (!isVowel(val)) {
            removedVowels += val;
        }
    })
    return removedVowels;
}

removeVowels('Elie')