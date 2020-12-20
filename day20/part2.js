var { arr } = require('@arrows/arrows')
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
    borders,
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

const flipVertical = (tile) => {
  return [...tile].reverse()
}

const flipHorizontal = (tile) => {
  return tile.map((row) => [...row].reverse())
}

const rotate = (tile) => {
  const length = tile.length
  var tileRot = Array.from({ length: length }, () =>
    Array.from({ length: length })
  )

  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      tileRot[y][x] = tile[length - 1 - x][y]
    }
  }

  return tileRot
}

const identity = (tile) => tile

function* transform(tile) {
  const transformations = [identity, flipVertical, flipHorizontal]
  var current = tile

  for (let i = 0; i < transformations.length; i++) {
    current = transformations[i](tile)
    yield current
    for (let j = 0; j < 3; j++) {
      current = rotate(current)
      yield current
    }
  }
}

const neighbours = getNeighbours()
const done = new Set()
const oriented = new Map()

const orientate = (tile, x = 0, y = 0) => {
  const pixels = oriented.get(tile.id).pixels
  const [top, bottom, left, right] = getBorders(pixels)

  tile.neighbours.forEach((id) => {
    if (done.has(id)) return

    const index = idToIndex[id]
    const neighbourPixels = tiles[index].pixels
    for (const pix of transform(neighbourPixels)) {
      const [t, b, l, r] = getBorders(pix)

      if (t === bottom) {
        oriented.set(id, { pixels: pix, x: x, y: y - 1 })
        break
      }
      if (b === top) {
        oriented.set(id, { pixels: pix, x: x, y: y + 1 })
        break
      }
      if (l === right) {
        oriented.set(id, { pixels: pix, x: x - 1, y: y })
        break
      }
      if (r === left) {
        oriented.set(id, { pixels: pix, x: x + 1, y: y })
        break
      }
    }

    done.add(id)
  })

  tile.neighbours.forEach((id) => {
    const index = idToIndex[id]
    const curr = oriented.get(id)
    const tileX = {
      ...neighbours[index],
      neighbours: neighbours[index].neighbours.filter((n) => !done.has(n)),
    }

    orientate(tileX, curr.x, curr.y)
  })
}

const stripBorders = (tile) => {
  return tile.slice(1, -1).map((row) => row.slice(1, -1))
}

const commonPart = (arr1, arr2) => {
  const set = new Set(arr2)
  return arr1.filter((v) => set.has(v))
}

const init = neighbours[0]
const idToIndex = Object.fromEntries(tiles.map(({ id }, i) => [id, i]))

oriented.set(init.id, { pixels: init.pixels, x: 0, y: 0 })
done.add(init.id)
orientate(init)

const orientedVal = [...oriented.values()]

const shiftX = Math.abs(Math.min(...orientedVal.map((v) => v.x)))
const shiftY = Math.abs(Math.min(...orientedVal.map((v) => v.y)))

const orientedValNormalized = orientedVal
  .map((val) => ({
    pixels: val.pixels,
    x: val.x + shiftX,
    y: val.y + shiftY,
  }))
  .sort((a, b) => a.y - b.y || a.x - b.x)

const maxY = Math.max(...orientedValNormalized.map((v) => v.y))

const picture = arr
  .chunk_(
    orientedValNormalized.length / (maxY + 1),
    orientedValNormalized.map(({ pixels }) => stripBorders(pixels))
  )
  .map((bigRow) =>
    bigRow.reduce((a, b) => arr.zipWith_((d, c) => [...d, ...c], b, a))
  )
  .reverse()
  .flat()

const hashesCount = picture.flat().filter((v) => v === '#').length

const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `

const monsterSegments = monster.match(/#/g).length

const monsterReg = monster
  .split('\n')
  .map((row) => new RegExp(`(?=(${row.replace(/\s/g, '.')}))`, 'g'))

const counts = []

for (const pix of transform(picture)) {
  const lines = pix.map((v) => v.join(''))
  var monsterCount = 0

  for (let i = 0; i < lines.length - 2; i++) {
    const l1 = [...lines[i].matchAll(monsterReg[0])].map((x) => x.index)
    const l2 = [...lines[i + 1].matchAll(monsterReg[1])].map((x) => x.index)
    const l3 = [...lines[i + 2].matchAll(monsterReg[2])].map((x) => x.index)

    monsterCount += commonPart(commonPart(l1, l2), l3).length
  }

  counts.push(monsterCount)
}

const result = hashesCount - Math.max(...counts) * monsterSegments

console.log(result)
