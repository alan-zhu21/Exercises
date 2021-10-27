def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    temp_list = list(phrase)
    temp_list.reverse()
    return ''.join(temp_list)