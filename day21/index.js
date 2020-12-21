const { log } = require('console')

const input = require('../filereader.js').readFile('\n', false)

const prepInput = () => {
  return input.map((food) => {
    const div = food.split('(')
    const products = new Set(div[0].trim().split(' '))
    const allergens = div[1]
      .trim()
      .replace('contains ', '')
      .slice(0, -1)
      .split(', ')

    return { products, allergens }
  })
}

const getIngredientsAllergenCommon = (products) => {
  if (products.length === 1) return products[0]

  return products.reduce((a, b) => {
    const common = new Set()
    a.forEach((p) => {
      if (b.has(p)) common.add(p)
    })

    return common
  })
}

const performeAssociations = (input) => {
  const allAllergens = new Set(input.map(({ allergens }) => allergens).flat())
  const size = allAllergens.size

  const done = new Set()
  const notSafe = new Map()

  while (done.size < size) {
    allAllergens.forEach((allergen) => {
      const foodWithAllergen = input.filter(({ allergens }) =>
        allergens.includes(allergen)
      )

      const common = getIngredientsAllergenCommon(
        foodWithAllergen.map(({ products }) => products)
      )

      if (common.size === 1) {
        // console.log(allergen, common.values().next().value)
        const ingredient = common.values().next().value

        notSafe.set(allergen, ingredient)
        done.add(allergen)
        allAllergens.delete(allergen)
        input.forEach((f) => f.products.delete(ingredient))
      }
    })
  }

  const safeCount = input
    .map(({ products }) => products.size)
    .reduce((a, b) => a + b)

  const dangerousIngreList = [...notSafe.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((x) => x[1])
    .join(',')

  return { dangerousIngreList, safeCount }
}

console.time('Time')
const result1 = performeAssociations(prepInput()).safeCount
console.timeEnd('Time')
console.log('Result:', result1)

console.time('Time')
const result2 = performeAssociations(prepInput()).dangerousIngreList
console.timeEnd('Time')
console.log('Result:', result2)
