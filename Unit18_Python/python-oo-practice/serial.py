"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        '''Initializes the first serial number and keeps track of the first number'''
        self.serial_number = start
        self.first_value = start
    
    def __repr__(self):
        '''Returns initialized value and the next value in sequence'''
        return f'<SerialGenerator start={self.first_value} next={self.serial_number}>'

    def generate(self):
        '''Prints the serial number then increases by 1'''
        print(self.serial_number)
        self.serial_number += 1

    def reset(self):
        '''Returns the serial number back to original value'''
        self.serial_number = self.first_value
