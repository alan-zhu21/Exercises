def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    # will use x, y, z and loop through to set variable values to check
    i = 0
    while i < (len(nums)-2):
        x = nums[i]
        y = nums[i+1]
        z = nums[i+2]
        if (x + y + z) % 2 == 1:
            return True
        i += 1
    return False