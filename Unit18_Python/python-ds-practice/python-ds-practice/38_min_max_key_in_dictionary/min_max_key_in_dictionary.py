def min_max_keys(d):
    """Return tuple (min-keys, max-keys) in d.

        >>> min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'})
        (1, 10)

    Works with any kind of key that can be compared, like strings:

        >>> min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"})
        ('apple', 'cherry')
    """
    copy = d.copy()
    min_key = max_key = copy.popitem()[0]
    for key in copy.keys():
        min_key = key if key < min_key else min_key
        max_key = key if key > max_key else max_key
    return (min_key, max_key)

