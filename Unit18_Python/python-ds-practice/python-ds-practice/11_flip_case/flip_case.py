def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    new_list = []
    lowered_let = to_swap.lower()
    for char in phrase:
        if char.lower() == lowered_let:
            if char.lower() == char:
                new_list.append(char.upper())
            else:
                new_list.append(char.lower())
        else:
            new_list.append(char)
    return ''.join(new_list)
