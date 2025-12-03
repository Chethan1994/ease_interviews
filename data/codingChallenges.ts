
import { CodingChallenge, Difficulty } from '../types';

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'cc-1',
    title: 'Implement Debounce',
    difficulty: Difficulty.Medium,
    description: 'Create a debounce function that limits the rate at which a function can fire.',
    tags: ['JavaScript', 'Functional Programming'],
    starterCode: `function debounce(func, wait) {\n  // Your code here\n}`,
    solutionCode: `function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(context, args), wait);\n  };\n}`
  },
  {
    id: 'cc-2',
    title: 'React Counter',
    difficulty: Difficulty.Easy,
    description: 'Build a simple counter component with Increment, Decrement, and Reset buttons.',
    tags: ['React', 'State'],
    starterCode: `import React, { useState } from 'react';\n\nexport default function Counter() {\n  return (\n    <div>\n      {/* TODO */}\n    </div>\n  );\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="p-4">\n      <h1 className="text-2xl mb-4">Count: {count}</h1>\n      <div className="space-x-2">\n        <button onClick={() => setCount(c => c + 1)}>+</button>\n        <button onClick={() => setCount(c => c - 1)}>-</button>\n        <button onClick={() => setCount(0)}>Reset</button>\n      </div>\n    </div>\n  );\n}`
  },
  {
    id: 'cc-3',
    title: 'Array.prototype.flat Polyfill',
    difficulty: Difficulty.Hard,
    description: 'Implement a polyfill for Array.flat() that flattens a nested array to a specific depth.',
    tags: ['JavaScript', 'Polyfill', 'Recursion'],
    starterCode: `function flat(arr, depth = 1) {\n  // Your code here\n}`,
    solutionCode: `function flat(arr, depth = 1) {\n  return depth > 0\n    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val), [])\n    : arr.slice();\n}`
  },
  {
    id: 'cc-4',
    title: 'Fetch and Display Users',
    difficulty: Difficulty.Medium,
    description: 'Fetch a list of users from "https://jsonplaceholder.typicode.com/users" and display their names.',
    tags: ['React', 'API', 'useEffect'],
    starterCode: `import React from 'react';\n\nexport default function UserList() {\n  // Fetch users on mount\n  return <ul></ul>;\n}`,
    solutionCode: `import React, { useEffect, useState } from 'react';\n\nexport default function UserList() {\n  const [users, setUsers] = useState([]);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(res => res.json())\n      .then(data => setUsers(data));\n  }, []);\n\n  return (\n    <ul>\n      {users.map(user => <li key={user.id}>{user.name}</li>)}\n    </ul>\n  );\n}`
  },
  {
    id: 'cc-5',
    title: 'Implement Promise.all',
    difficulty: Difficulty.Hard,
    description: 'Write your own implementation of Promise.all.',
    tags: ['JavaScript', 'Async', 'Promises'],
    starterCode: `function myPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    // Your code here\n  });\n}`,
    solutionCode: `function myPromiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    let results = [];\n    let completed = 0;\n    \n    if (promises.length === 0) resolve([]);\n    \n    promises.forEach((p, index) => {\n      Promise.resolve(p)\n        .then(value => {\n          results[index] = value;\n          completed++;\n          if (completed === promises.length) resolve(results);\n        })\n        .catch(reject);\n    });\n  });\n}`
  },
  {
    id: 'cc-6',
    title: 'Traffic Light Component',
    difficulty: Difficulty.Medium,
    description: 'Build a traffic light that cycles through Red, Yellow, Green automatically.',
    tags: ['React', 'useEffect', 'Timing'],
    starterCode: `import React from 'react';\n\nexport default function TrafficLight() {\n  // Green -> Yellow -> Red -> Green...\n  return <div className="traffic-light"></div>;\n}`,
    solutionCode: `import React, { useState, useEffect } from 'react';\n\nconst CONFIG = {\n  red: { next: 'green', duration: 4000 },\n  yellow: { next: 'red', duration: 1000 },\n  green: { next: 'yellow', duration: 3000 }\n};\n\nexport default function TrafficLight() {\n  const [color, setColor] = useState('green');\n\n  useEffect(() => {\n    const { next, duration } = CONFIG[color];\n    const timer = setTimeout(() => setColor(next), duration);\n    return () => clearTimeout(timer);\n  }, [color]);\n\n  return <div style={{ backgroundColor: color, width: 50, height: 50, borderRadius: '50%' }} />;\n}`
  }
];
