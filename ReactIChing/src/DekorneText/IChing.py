import pickle
import re


class HexaList:
    """The primary list from which all hexagrams will be accessed. Later on will support browsing functionality"""

    def __init__(self):
        self.hexagrams = ''
        self.regex_patterns = {}
        self.load()

    def save(self):
        pickle.dump(self.hexagrams, open(r'hexagrams.p', 'wb'))  # Save the hexagrams to the pickle file
        pickle.dump(self.regex_patterns, open(r'regex_patterns.p', 'wb'))
        print('Saved.')

    def load(self):
        self.hexagrams = pickle.load(open(r'./DekorneText/hexagrams.p', 'rb'))  # Used for initial loading, and as a sneaky little
        # undo button for when I fuck shit up
        # self.regex_patterns = pickle.load(open(r'regex_patterns.p', 'rb'))
        print('Hexagrams loaded.')

    def backup(self):
        pickle.dump(self.hexagrams, open(r'hexagrams_backup.p', 'wb'))
        print('Backup complete.')

    def load_backup(self):
        self.hexagrams = pickle.load(open(r'hexagrams_backup.p', 'rb'))
        print('Reverted to backup')


class HexaHelper(HexaList):
    """A variant of the HexaList, with additional functionality for the purpose of extracting text from the dekorne
    library """

    def __init__(self):
        super().__init__()
        self.test_pattern = re.compile(pattern=r'''
        (Line-6)
        (.*?)
        ((Legge):(.*?))
        ((Wilhelm/Baynes | Wilhelm):(.*?))
        ((Blofeld):(.*?))
        ((Liu):(.*?))
        ((Ritsema/Karcher):(.*?))
        ((Shaughnessy):(.*?))?
        (Clear.*?(1|2)(.*?))
        (Clear.*?(1|2)(.*?))?
        ((Wu):(.*?))
        (COMMENTARY)
        (.*?)
        (NOTES)
        (.*)
        ''', flags=re.VERBOSE | re.DOTALL)
        self.dekorne_text = pickle.load(open(r'dekornetext.p', 'rb'))

    def try_pattern(self, pattern=None):
        """Function for trying out different regex patterns"""
        self.results = {}
        if not pattern:
            pattern = self.test_pattern
        for hex_num in self.dekorne_text:  # iterate through dekorne text contents
            print(f"Searching Hex {hex_num}")
            hex_results = re.search(pattern, self.dekorne_text[hex_num])
            if hex_results:
                self.results[hex_num] = list(
                    hex_results.groups())  # append the results for each hexagram to aggregation list.
            else:
                self.results[hex_num] = ''
        no_result = []  # Keep track of the hexagrams that find nothing so I can quickly target problem areas.
        for hex_num_result, result in self.results.items():  # Scan results for failures
            if result:
                print(f"Hex #{hex_num_result}:")
                print(f"Groups Found: {len(result)}")
                for index, group in enumerate(result):
                    print(f"Group #{index}: {group}, ")
                print('')
            if not result:  # If the list is empty
                no_result.append(hex_num_result)  # add it to no result list.
        if no_result:  # if we have hexagrams with missing info
            print(f'Hexagrams missing info: {no_result}')
        if not no_result:
            print('All hexagrams have at least one match.')
        for result in self.results:
            for index, string in enumerate(self.results[result]):
                if string:
                    if len(string) > 2200:
                        print(f"Result # {result} is fucked at #{index}")

    def save_results(self):
        """Allows me to save a copy of my results if I need to preserve them while restarting the application. """
        pickle.dump(self.results, open(r'results.p', 'wb'))
        print('Results Saved.')

    def load_results(self):
        """If I am tweaking the dataset, and need to maintain these changes while restarting the application multiple
        times """
        self.results = pickle.load(open(r'results.p', 'rb'))
        print('Results Loaded.')

    def save_results_dict(self):
        self.dict_name = input('Enter the name of the variable: ')
        self.groups_to_save = input('Please enter the group numbers you intend to save: (separated by 1 space)')
        self.groups_to_save = self.groups_to_save.split()  # split up the group numbers
        self.saved_results = {}  # prepare the dictionary
        for i in range(1, 65):
            self.saved_results[i] = {}  # load it with hexagram numbers that match indexes
        for group in self.groups_to_save:
            group = int(group)  # convert to int
            print(f"Group # {group}")
            print(f'Group Example from hex #1: {self.results[1][group]}')
            key = input("Please enter the key name for this information: ")  # get key name
            for result_num, result_list in self.results.items():
                if result_list[group]:
                    self.saved_results[result_num][key] = result_list[group]  # if there is a string, add it to dict
                    # with corresponding index number
                else:
                    pass
        for index, hexagram in enumerate(self.hexagrams, 1):  # open up the hexagrams
            hexagram.__setattr__(self.dict_name, self.saved_results[index])  # set the attribute to the corresponding
            # dictionary
        self.regex_patterns[self.dict_name] = self.test_pattern  # save the regex pattern
        print('Done. Do not forget to save!')

    def save_results_single(self):
        self.var_name = input('Enter the name of the variable: ')
        self.group = int(input('Please enter the group number you intend to save: '))
        self.saved_results = {}  # prepare the dictionary
        for result_num, result_list in self.results.items():
            if result_list[self.group]:
                self.saved_results[result_num] = result_list[self.group]  # if there is a string, add it to dict
                # with corresponding index number
        for index, hexagram in enumerate(self.hexagrams, 1):  # open up the hexagrams
            hexagram.__setattr__(self.var_name, self.saved_results[index])  # set the attribute to the corresponding
            # dictionary
        self.regex_patterns[self.var_name] = self.test_pattern  # save the regex pattern


class Hexagram:
    """The fundamental data unit for the application. Will contain all of the relevant text information, and later on will contain
    functionality necessary to display itself to the user. """

    def __init__(self):
        self.title = ''
        self.other_titles = ''

class TriList:
    """A place where I write a bunch of shit into a dickshinary."""

    def __init__(self):
        self.trigrams = ''
        self.load()

    def save(self):
        pickle.dump(self.trigrams, open('../trigrams.p', 'wb'))  # Save the hexagrams to the pickle file
        print('Saved.')

    def load(self):
        self.trigrams = pickle.load(open('../trigrams.p', 'rb'))  # Used for initial loading, and as a sneaky little
        # undo button for when I fuck shit up
        print('Trigrams loaded.')

    def backup(self):
        pickle.dump(self.trigrams, open('../trigrams_backup.p', 'wb'))
        print('Backup complete.')

    def load_backup(self):
        self.trigrams = pickle.load(open('../hexagrams_backup.p', 'rb'))
        print('Reverted to backup')

class Trigram:
    def __init__(self, name, direction, element, season, family, personality, body_part):
        self.name = name
        self.direction = direction
        self.element = element
        self.season = season
        self.family = family
        self.personality = personality
        self.body_part = body_part

# import os
# print(os.getcwd())
hexaList = HexaList()
import json
for index, hexagram in enumerate(hexaList.hexagrams):
    with open(f'./DekorneText/hexagramJSONS/hexagram{index+1}.json', 'w') as file:
        json.dump(hexagram.__dict__, file, indent=4)

    