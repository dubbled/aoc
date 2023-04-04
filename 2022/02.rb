Round = Struct.new(:outcome, :play)

$normalize = {
	"X" => "A",
	"Y" => "B",
	"Z" => "C",
}

$point_table = {
	"A" => 1, # rock
	"B" => 2, # paper
	"C" => 3, # scissors
}

$win_table = {
	"A" => "B",
	"B" => "C",
	"C" => "A",
}

$lose_table = {
	"A" => "C",
	"B" => "A",
	"C" => "B",
}

def play(opp, me)
	if opp == me then
		return 3
	elsif $win_table[me] == opp then
		return 6
	end

	return 0
end

def p1
	total = 0

	File.foreach("./input/02.txt") { |line|
		pair = line.split(' ')

		opponent_play = pair[0]
		normalized_suggestion = $normalize[pair[1]]

		outcome = play(opponent_play, normalized_suggestion)

		total += outcome + $point_table[normalized_suggestion]
	}

	puts total
end

def p2
	total = 0
	File.foreach("./input/02.txt") { |line|
		pair = line.split(' ')

		opponent_play = pair[0]
		outcome = pair[1]

		if outcome == "X" then
			total += $point_table[$lose_table[opponent_play]] + 0
		elsif outcome == "Y" then
			total += $point_table[opponent_play] + 3
		else
			total += $point_table[$win_table[opponent_play]] + 6
		end
	}

	puts total
end

p2()