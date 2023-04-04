lines = []

with open('./input/03.txt', 'r') as f:
    lines = [line.rstrip('\n') for line in f]

def to_dict(line):
    result = {}
    for c in line:
        result[c] = True

    return result

def convert_priority(d):
    return ord(d) - 96 + 58 if d.isupper() else ord(d) - 96

def get_repeat(one, two):
    for c in one:
        if c in two:
            return c

def p1():
    total = 0

    for line in lines:
        compartment_one, compartment_two = set(line[:len(line) // 2]), set(line[len(line) // 2:])

        repeat = get_repeat(compartment_one, compartment_two)
        total += convert_priority(repeat)

    print(total)

def p2():
    total = 0
    for group in range(0, len(lines), 3):
        ruck_1, ruck_2, ruck_3 = lines[group], lines[group+1], lines[group+2]
        for char in ruck_1:
            if char in ruck_2 and char in ruck_3:
                total += convert_priority(char)
                break
            
    print(total)

p1()
p2()
