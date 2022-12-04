def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    list_of_phrase = phrase.split(' ')
    new_list = []
    for word in list_of_phrase:
        new_list.append(word.capitalize())
    return ' '.join(new_list)