const input = require('../filereader.js').readFile('\n\r', false)

const tiles = input.map((tile) => {
  const [t_id, ...t_img] = tile.trim().split('\n')
  const id = Number(t_id.slice(5, t_id.indexOf(':')))
  const pixels = t_img.map((row) => row.trim().split(''))

  return { id, pixels }
})

const getBorders = (tile) => {
  return [
    tile[0].join(''),
    tile[tile.length - 1].join(''),
    Array.from({ length: tile.length }, (_, i) => tile[i][0]).join(''),
    Array.from(
      { length: tile.length },
      (_, i) => tile[i][tile.length - 1]
    ).join(''),
  ]
}

const getNeighbours = () => {
  const bordersFrames = tiles.map(({ id, pixels }) => {
    const borders = getBorders(pixels)
    const reversed = borders.map((border) => [...border].reverse().join(''))

    return { id, pixels, borders: [borders, reversed] }
  })

  return bordersFrames.map(({ id, pixels, borders }, i) => ({
    id,
    pixels,
    neighbours: bordersFrames
      .filter((bf_aux, j) => {
        if (i === j) return false
        for (const b of borders) {
          for (const bb of bf_aux.borders) {
            if (new Set([...b, ...bb]).size < 8) return true
          }
        }
      })
      .map((bf) => bf.id),
  }))
}

const neighbours = getNeighbours()

const result = neighbours
  .filter(({ neighbours }) => neighbours.length === 2)
  .map((n) => n.id)
  .reduce((a, b) => a * b)

console.log(result)
