def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    dict1 = {}
    dict2 = {}
    for num in str(num1):
        if dict1.get(num):
            dict1[num] += 1
        else:
            dict1[num] = 1
    for num in str(num2):
        if dict2.get(num):
            dict2[num] += 1
        else:
            dict2[num] = 1
    return dict1 == dict2