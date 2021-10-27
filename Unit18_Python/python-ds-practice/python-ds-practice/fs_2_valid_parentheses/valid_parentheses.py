def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    # function will run parens argument through 2 tests - 1) if it starts with open parens and 2) if there are equivalent left and right parens
    curr_list = [sym for sym in parens if sym in ['(', ')']]
    left_side = 0
    right_side = 0
    if curr_list[0] != '(':
        return False
    for element in curr_list:
        if element == '(':
            left_side += 1
        else:
            right_side += 1
    return left_side == right_side
