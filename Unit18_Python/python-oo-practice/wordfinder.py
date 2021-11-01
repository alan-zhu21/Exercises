class WordFinder:
    """
    Word Finder: finds random words from a dictionary.
    """
    def __init__(self, path):
        '''Create a list of words from a given path'''
        self.list_of_words = []
        self.create_list(path)
        print(f'{len(self.list_of_words)} words read')

    def create_list(self, path):
        '''Function that creates the list'''
        self.file = open(path, 'r')
        for line in self.file:
            word = line.strip()
            self.list_of_words.append(word)
        self.file.close()
    
    def random(self):
        '''Returns a random word from the list of read words'''
        from random import choice
        return choice(self.list_of_words)

class SpecialWordFinder(WordFinder):
    '''Subclass of WordFinder that filters out comments and blank lines'''
    def __init__(self, path):
        '''Create a list of words from a given path'''
        super().__init__(path)

    # def create_list(self, path):
    #     self.file = open(path, 'r')
    #     for line in self.file:
    #         word = line.strip()
    #         if '#' not in word and len(word) != 0:
    #             self.list_of_words.append(word)
    #     self.file.close()

    def create_list(self, path):
        '''Subclass method that creates list with comments and blank lines filtered out'''
        super().create_list(path)
        self.list_of_words = [word for word in self.list_of_words if '#' not in word and len(word) != 0]