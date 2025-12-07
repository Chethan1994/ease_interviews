import { CodingChallenge, Difficulty, Category } from '../../types';

export const JS_CHALLENGES: CodingChallenge[] = [
  {
    id: 'cc-1',
    category: Category.JavaScript,
    title: 'Implement Debounce',
    difficulty: Difficulty.Medium,
    description: 'Create a debounce function that limits the rate at which a function can fire.',
    tags: ['Functional Programming', 'Async'],
    starterCode: `function debounce(func, wait) {\n  // Your code here\n}`,
    solutionCode: `function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(context, args), wait);\n  };\n}`
  },
  {
    id: 'cc-3',
    category: Category.JavaScript,
    title: 'Array.prototype.flat Polyfill',
    difficulty: Difficulty.Hard,
    description: 'Implement a polyfill for Array.flat() that flattens a nested array to a specific depth.',
    tags: ['Polyfill', 'Recursion'],
    starterCode: `function flat(arr, depth = 1) {\n  // Your code here\n}`,
    solutionCode: `function flat(arr, depth = 1) {\n  return depth > 0\n    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val), [])\n    : arr.slice();\n}`
  },
  {
    id: 'cc-5',
    category: Category.JavaScript,
    title: 'Implement Promise.all',
    difficulty: Difficulty.Hard,
    description: 'Write your own implementation of Promise.all.',
    tags: ['Async', 'Promises'],
    starterCode: `function myPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    // Your code here\n  });\n}`,
    solutionCode: `function myPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    let results = [];\n    let completed = 0;\n    \n    if (promises.length === 0) resolve([]);\n    \n    promises.forEach((p, index) => {\n      Promise.resolve(p)\n        .then(value => {\n          results[index] = value;\n          completed++;\n          if (completed === promises.length) resolve(results);\n        })\n        .catch(reject);\n    });\n  });\n}`
  },
  {
    id: 'js-algo-1',
    category: Category.JavaScript,
    title: 'Flatten Array (Recursive)',
    difficulty: Difficulty.Medium,
    description: 'Convert n dimensional array to 1 dimensional array without using any pre-built prototypes like flat, reduce (use recursion).',
    tags: ['Recursion', 'Algorithms'],
    starterCode: `function flattenRecursive(arr) {\n  // Your code here\n}`,
    solutionCode: `function flattenRecursive(arr) {\n  let result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (Array.isArray(arr[i])) {\n      result = result.concat(flattenRecursive(arr[i]));\n    } else {\n      result.push(arr[i]);\n    }\n  }\n  return result;\n}`
  },
  {
    id: 'js-algo-2',
    category: Category.JavaScript,
    title: 'Flatten Array (Reduce)',
    difficulty: Difficulty.Medium,
    description: 'Convert n dimensional array to 1D array using reduce prototype.',
    tags: ['Functional Programming', 'Reduce'],
    starterCode: `function flattenReduce(arr) {\n  // Your code here\n}`,
    solutionCode: `function flattenReduce(arr) {\n  return arr.reduce((acc, val) => \n    Array.isArray(val) ? acc.concat(flattenReduce(val)) : acc.concat(val), \n  []);\n}`
  },
  {
    id: 'js-algo-3',
    category: Category.JavaScript,
    title: 'Print Nested Object Keys',
    difficulty: Difficulty.Medium,
    description: 'Print the keys of the given nested object in dot notation (e.g. location.0, qualifications.0.education).',
    tags: ['Recursion', 'Objects'],
    starterCode: `function printKeys(obj) {\n  // Your code here\n}`,
    solutionCode: `function printKeys(obj, prefix = '') {\n  let keys = [];\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      const newKey = prefix ? \`\${prefix}.\${key}\` : key;\n      if (typeof obj[key] === 'object' && obj[key] !== null) {\n        keys = keys.concat(printKeys(obj[key], newKey));\n      } else {\n        keys.push(newKey);\n      }\n    }\n  }\n  return keys;\n}\n\n// Usage:\n// console.log(printKeys(inputObject).join('\\n'));`
  },
  {
    id: 'js-algo-4',
    category: Category.JavaScript,
    title: 'Frequency Count Sorted',
    difficulty: Difficulty.Easy,
    description: 'Calculate the frequency count of items in an array and return an object sorted alphabetically by key.',
    tags: ['Algorithms', 'Sorting'],
    starterCode: `function frequencyCount(arr) {\n  // Your code here\n}`,
    solutionCode: `function frequencyCount(arr) {\n  const count = arr.reduce((acc, curr) => {\n    acc[curr] = (acc[curr] || 0) + 1;\n    return acc;\n  }, {});\n  \n  return Object.keys(count).sort().reduce((acc, key) => {\n    acc[key] = count[key];\n    return acc;\n  }, {});\n}`
  },
  {
    id: 'js-algo-5',
    category: Category.JavaScript,
    title: 'Max Value from Pattern',
    difficulty: Difficulty.Easy,
    description: 'Find max value from a patterned items of an array. Input: ["10-50-20", "80-90-35"] -> Output: [50, 90]',
    tags: ['String Manipulation', 'Math'],
    starterCode: `function maxFromPattern(arr) {\n  // Your code here\n}`,
    solutionCode: `function maxFromPattern(arr) {\n  return arr.map(str => {\n    const nums = str.split('-').map(Number);\n    return Math.max(...nums);\n  });\n}`
  },
  {
    id: 'js-algo-6',
    category: Category.JavaScript,
    title: 'Find Missing Values',
    difficulty: Difficulty.Easy,
    description: 'Find the missing values in an incremental integer array sequence.',
    tags: ['Algorithms', 'Math'],
    starterCode: `function findMissing(arr) {\n  // Your code here\n}`,
    solutionCode: `function findMissing(arr) {\n  const missing = [];\n  const min = arr[0];\n  const max = arr[arr.length - 1];\n  const set = new Set(arr);\n  \n  for (let i = min; i <= max; i++) {\n    if (!set.has(i)) {\n      missing.push(i);\n    }\n  }\n  return missing;\n}`
  },
  {
    id: 'js-algo-7',
    category: Category.JavaScript,
    title: 'Unique & Filter',
    difficulty: Difficulty.Medium,
    description: 'Remove duplicate items from an array, sort them, and separate odd numbers greater than 10.',
    tags: ['Sets', 'Filtering'],
    starterCode: `function processArray(arr) {\n  // Your code here\n}`,
    solutionCode: `function processArray(arr) {\n  const uniqueSorted = [...new Set(arr)].sort((a, b) => a - b);\n  const oddGreaterThan10 = uniqueSorted.filter(n => n > 10 && n % 2 !== 0);\n  \n  return {\n    uniqueSorted,\n    oddGreaterThan10\n  };\n}`
  },
  {
    id: 'js-algo-8',
    category: Category.JavaScript,
    title: 'Deep Clone Object',
    difficulty: Difficulty.Medium,
    description: 'Implement deep copy of an n-level nested object without using any external library.',
    tags: ['Recursion', 'Objects'],
    starterCode: `function deepClone(obj) {\n  // Your code here\n}`,
    solutionCode: `function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  \n  if (Array.isArray(obj)) {\n    return obj.map(item => deepClone(item));\n  }\n  \n  const cloned = {};\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      cloned[key] = deepClone(obj[key]);\n    }\n  }\n  return cloned;\n}`
  },
  {
    id: 'js-algo-9',
    category: Category.JavaScript,
    title: 'Group Anagrams',
    difficulty: Difficulty.Medium,
    description: 'Group an array of strings into sublists of anagrams.',
    tags: ['Algorithms', 'Maps'],
    starterCode: `function groupAnagrams(strs) {\n  // Your code here\n}`,
    solutionCode: `function groupAnagrams(strs) {\n  const map = {};\n  \n  for (let str of strs) {\n    const sorted = str.split('').sort().join('');\n    if (!map[sorted]) map[sorted] = [];\n    map[sorted].push(str);\n  }\n  \n  return Object.values(map);\n}`
  }
];