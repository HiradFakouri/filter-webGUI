#filter by Hirad Fakouri
import sys
from filter import Filter

#py main.py type_of_filter(-r, -f, -g, -fe, -b, -e) file output_filename
def main():
    if len(sys.argv) < 4 or len(sys.argv) > 4:
        print("Usage: py main.py type_of_filter file output_filename")

    type_of_filter = sys.argv[1]
    file = sys.argv[2]
    output_file = sys.argv[3]

    filter = Filter(file, output_file)

    if type_of_filter == "-r":
        filter.reflect()
    elif type_of_filter == "-f":
        filter.flip()
    elif type_of_filter == "-g":
        filter.grayScale()
    elif type_of_filter == "-fe":
        filter.find_edges()
    elif type_of_filter == "-b":
        filter.blur()
    elif type_of_filter == "-e":
        filter.emboss()



main()