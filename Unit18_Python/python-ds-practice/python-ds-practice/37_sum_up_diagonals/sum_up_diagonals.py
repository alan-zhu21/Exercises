def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    TL_down_total = 0
    BL_up_total = 0
    i = 0
    j = -1
    for list in matrix:
        TL_down_total += list[i]
        i += 1
        BL_up_total += list[j]
        j -= 1
    return TL_down_total + BL_up_total