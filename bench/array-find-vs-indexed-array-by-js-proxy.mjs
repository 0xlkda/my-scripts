import { performance } from 'perf_hooks'

/*

> Find the first of 10_000_000 items:
find        | 0.21ms
find x2     | 0.04ms

findById    | 0.16ms
findById x2 | 0.04ms ( memoize )

> Find the last of 10_000_000 items:
find        | 99.00ms
find x2     | 91.67ms

findById    | 0.03ms
findById x2 | 0.01ms ( memoize )

*/

const IndexedArray = new Proxy(Array, {
  construct: function (target, [originalArray]) {
    const index = {}
    originalArray.forEach((item) => (index[item.id] = item))
    return new Proxy(target, {
      get: function (target, prop) {
        switch (prop) {
          case 'push':
            return (item) => {
              index[item.id] = item
              return target.push.call(target, item)
            }
          case 'pop':
            return (item) => {
              delete index[item.id]
              return target.pop.call(target, item)
            }
          case 'findById':
            return (searchId) => index[searchId]
          default:
            return target[prop]
        }
      },
    })
  },
})

function bench(fn, name) {
  let start = `${name}_start`
  let end = `${name}_end`
  performance.mark(start)
  let result = fn()
  performance.mark(end)
  let measure = performance.measure(name, start, end)
  let message = `${measure.name} | ${measure.duration.toFixed(2)}ms`
  return [message, result]
}

const LENGTH = 10_000_000

function run(length, searchId) {
  let samples = [...Array(length).keys()].map((i) => ({ id: i }))
  let indexedSamples = new IndexedArray(samples)
  let [m1] = bench(() => samples.find((i) => i.id === searchId), 'find')
  let [m2] = bench(() => indexedSamples.findById(searchId), 'findById')
  console.log([m1, m2].join('\n'))
}

console.log(`\n> Find the first of ${LENGTH} items`)
run(LENGTH, 1)

console.log(`\n> Find the last of ${LENGTH} items`)
run(LENGTH, LENGTH - 1)
