const fs = require('fs')

const input = fs.readFileSync('./input/04.txt').toString()
const lines = input.split('\r\n')

const pairs = lines
  .map((pair) => pair.split(','))
  .map(pair => pair.map(
    elf => elf.split('-')
      .map(seat => parseInt(seat))
    )
  )

const encompasses = (startOne, endOne, startTwo, endTwo) => (
  startOne <= startTwo && endOne >= endTwo
)

const p1 = () => {
  const count = pairs
    .map(([[ startOne, endOne ], [ startTwo, endTwo ]]) => (
      encompasses(startOne, endOne, startTwo, endTwo)
      || encompasses(startTwo, endTwo, startOne, endOne)
    ))
    .reduce((acc, next) => next ? acc + 1 : acc, 0)

    console.log(count)
}

const overlap = (startOne, endOne, startTwo, endTwo) => {
  const row = {}
  for (let i = startOne; i <= endOne; i++) {
    row[i] = true
  }

  for (let i = startTwo; i <= endTwo; i++) {
    if (row[i]) return true
  }
  return false
}

const p2 = () => {
  const count = pairs
    .map(([[ a1, a2 ], [ b1, b2 ]]) => overlap(a1, a2, b1, b2))
    .reduce((acc, next) => next ? acc + 1 : acc)

  console.log(count)
}

p1()
p2()