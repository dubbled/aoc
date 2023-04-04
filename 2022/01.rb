elves = [0]

File.foreach("./input/01.txt") { |line|
    if line == "\n" then
        elves.append(0)
    else
        elves.append(elves.pop + line.to_i)
    end
}

puts elves.sort.last
