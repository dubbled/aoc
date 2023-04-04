const fs = require('fs')

const file = fs.readFileSync('./input/05.txt').toString()

const parse = () => {
  const [ initial, moves ] = file.split('\r\n\r\n')
  
  const groupItems = (line) => {
    const chars = []
  
    for (let i = 0; i < line.length; i += 4) {
      chars.push(line.slice(i, i + 4))
    }
  
    return chars
  }
  
  const lines = initial
    .split('\r\n')
  
  const data = lines
    .map(groupItems)
    .slice(0, lines.length - 1)
    .reverse()
  
  const stacks = new Array(data[0].length)
    .fill()
    .map(() => [])
  
  data.forEach((x) => x
    .map((y) => y.trim())
    .map((y) => y.slice(1, 2))
    .map((y) => y.length ? y : null)
    .forEach((y, index) => {
      stacks[index].push(y)
    })
  )

  const trimmedStacks = stacks
    .map(stack => stack.filter(v => v))

  return {
    stacks: trimmedStacks,
    moves: moves
      .split('\r\n')
      .map((line) => {
        const regex = /move (?<qty>\d+) from (?<src>\d+) to (?<dst>\d+)/

        const { qty, src, dst } = line.match(regex).groups

        return {
          qty: parseInt(qty),
          src: parseInt(src) - 1,
          dst: parseInt(dst) - 1,
        }
      })
  }
}

const getTop = (stack) => stack 
  .reduce(
    (acc, next) => acc + next.slice(next.length - 1),
    '',
  )

const { stacks, moves } = parse() 

const p1 = () => {
  const stackCopy = JSON.parse(JSON.stringify(stacks)) 

  moves
    .forEach(({ qty, src, dst }) => {
      for (let i = 0; i < qty; i++) {
        const move = stackCopy[src].pop()
        stackCopy[dst].push(move)
      }
    })

  const top = getTop(stackCopy)
  console.log(top)
}

const p2 = () => {
  const stackCopy = JSON.parse(JSON.stringify(stacks)) 

  moves
    .forEach(({ qty, src, dst }) => {
      const source = stackCopy[src]
      const destination = stackCopy[dst]
      const last = source.length
      const slice = source.slice(last - qty > 0 ? last - qty : 0)
      
      stackCopy[src] = source.slice(0, last - qty)
      stackCopy[dst] = destination.concat(slice)
    })

  const top = getTop(stackCopy)
  console.log(top)
}

p1()
p2()