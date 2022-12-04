class WordFinder:
    """
    Word Finder: finds random words from a dictionary.
    """
    def __init__(self, path):
        '''Create a list of words from a given path'''
        self.list_of_words = []
        self.file = open(path, 'r')
        self.create_list()
        self.file.close()
        print(f'{len(self.list_of_words)} words read')
        

    def create_list(self):
        '''Function that creates the list'''
        for line in self.file:
            word = line.strip()
            self.list_of_words.append(word)
    
    def random(self):
        '''Returns a random word from the list of read words'''
        from random import choice
        return choice(self.list_of_words)

class SpecialWordFinder(WordFinder):
    '''Subclass of WordFinder that filters out comments and blank lines'''

    def create_list(self):
        '''Subclass method that creates list with comments and blank lines filtered out'''
        self.list_of_words = [word.strip() for word in self.file if '#' not in word and len(word.strip()) != 0]