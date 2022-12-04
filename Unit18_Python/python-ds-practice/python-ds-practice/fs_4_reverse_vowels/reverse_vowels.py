def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which are not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = 'aeiou'
    non_vowel_list = [char for char in s if char not in vowels]
    vowel_list = [char for char in s if char in vowels]
    vowel_list.reverse()
    vowel_use_count = 0
    non_vowel_use_count = 0
    new_string = ''

    for char in s:
        if char in vowels:
            new_string += vowel_list[vowel_use_count]
            vowel_use_count += 1
        else:
            new_string += non_vowel_list[non_vowel_use_count]
            non_vowel_use_count += 1
    return new_string



    