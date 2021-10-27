def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    list_of_chars = []
    for char in phrase:
        if char != ' ':
            list_of_chars.append()
    reversed_lst_of_chars = list_of_chars.copy()
    reversed_lst_of_chars.reverse()
    no_space_str = ''.join(list_of_chars)
    no_space_reversed = ''.join(reversed_lst_of_chars)
    return no_space_str == no_space_reversed

    