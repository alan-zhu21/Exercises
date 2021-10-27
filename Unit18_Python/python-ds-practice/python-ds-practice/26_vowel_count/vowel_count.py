def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    vowels = 'aeiou'
    vowel_frequency = {}
    for char in phrase:
        if char.lower() in vowels:
            if vowel_frequency.get(char.lower(), False):
                vowel_frequency[char.lower()] += 1
            else:
                vowel_frequency[char.lower()] = 1
    return vowel_frequency