def test_all_exercises():
    ''' 
    Used to test all py files within the current working directory against their respective doctests

    '''
    from os import listdir
    list_of_dirs = listdir()
    
    # for dir in list_of_dirs:
    #     cd dir
    #     %run f'{dir}.py'
    #     cd ..

    