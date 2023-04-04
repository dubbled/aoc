const fs = require('fs')

const data = fs.readFileSync('./input/06.txt').toString()

const locateMarker = (size) => {
    for (let i = 0; i < data.length; i++) {
        const tracker = {}
        for (let j = 0; j < size; j++) {
            tracker[data[i + j]] = true
        }

        if (Object.entries(tracker).length === size) {
            console.log(i + size)
            break
        }
    }
}

const p1 = () => {
    locateMarker(4)
}

const p2 = () => {
    locateMarker(14)
}

p1()
p2()
