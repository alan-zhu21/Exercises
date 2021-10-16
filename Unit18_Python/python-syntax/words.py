def print_upper_words1(list):
    '''goes through a list and prints out each word in all uppercase'''

    for word in list:
        print(word.upper())


def print_upper_words2(list):
    '''goes through a list and prints out each word in all uppercase if the word starts with lower and uppercase letter e'''

    for word in list:
        if word.startswith('e') or word.startswith('E'):
            print(word.upper())



def print_upper_words3(list, must_start_with):
    '''this will go through a list and print out all words that start with passed in letters'''

    for word in list:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.upper())

                
    
print_upper_words3(["hello", "hey", "goodbye", "yo", "yes", 'Everyone', 'eagle'], must_start_with={"h", "y"})