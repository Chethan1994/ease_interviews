
import { CodingChallenge, Difficulty, Category } from '../types';

const BASE_CHALLENGES: CodingChallenge[] = [
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
    id: 'cc-2',
    category: Category.React,
    title: 'Simple Counter',
    difficulty: Difficulty.Easy,
    description: 'Build a simple counter component with Increment, Decrement, and Reset buttons.',
    tags: ['State', 'Hooks'],
    starterCode: `import React, { useState } from 'react';\n\nexport default function Counter() {\n  return (\n    <div>\n      {/* TODO */}\n    </div>\n  );\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="p-4 text-center">\n      <h1 className="text-2xl mb-4 font-bold">Count: {count}</h1>\n      <div className="space-x-2">\n        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => setCount(c => c + 1)}>+</button>\n        <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => setCount(c => c - 1)}>-</button>\n        <button className="px-3 py-1 bg-gray-500 text-white rounded" onClick={() => setCount(0)}>Reset</button>\n      </div>\n    </div>\n  );\n}`
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
    id: 'cc-4',
    category: Category.React,
    title: 'Fetch and Display Users',
    difficulty: Difficulty.Medium,
    description: 'Fetch a list of users from "https://jsonplaceholder.typicode.com/users" and display their names.',
    tags: ['API', 'useEffect'],
    starterCode: `import React from 'react';\n\nexport default function UserList() {\n  // Fetch users on mount\n  return <ul></ul>;\n}`,
    solutionCode: `import React, { useEffect, useState } from 'react';\n\nexport default function UserList() {\n  const [users, setUsers] = useState([]);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(res => res.json())\n      .then(data => setUsers(data));\n  }, []);\n\n  return (\n    <div className="p-4">\n      <h2 className="text-xl font-bold mb-2">User List</h2>\n      <ul className="list-disc pl-5">\n        {users.map(user => <li key={user.id} className="mb-1">{user.name}</li>)}\n      </ul>\n    </div>\n  );\n}`
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
    id: 'cc-6',
    category: Category.React,
    title: 'Traffic Light Component',
    difficulty: Difficulty.Medium,
    description: 'Build a traffic light that cycles through Red, Yellow, Green automatically.',
    tags: ['useEffect', 'Timing'],
    starterCode: `import React from 'react';\n\nexport default function TrafficLight() {\n  // Green -> Yellow -> Red -> Green...\n  return <div className="traffic-light"></div>;\n}`,
    solutionCode: `import React, { useState, useEffect } from 'react';\n\nconst CONFIG = {\n  red: { next: 'green', duration: 4000, color: '#ef4444' },\n  yellow: { next: 'red', duration: 1000, color: '#eab308' },\n  green: { next: 'yellow', duration: 3000, color: '#22c55e' }\n};\n\nexport default function TrafficLight() {\n  const [state, setState] = useState('green');\n\n  useEffect(() => {\n    const { next, duration } = CONFIG[state];\n    const timer = setTimeout(() => setState(next), duration);\n    return () => clearTimeout(timer);\n  }, [state]);\n\n  return (\n    <div className="p-10 flex justify-center">\n      <div className="bg-slate-800 p-4 rounded-xl flex flex-col gap-4 shadow-xl">\n         {['red', 'yellow', 'green'].map(c => (\n            <div \n              key={c} \n              style={{ \n                width: 60, \n                height: 60, \n                borderRadius: '50%', \n                backgroundColor: state === c ? CONFIG[c].color : '#334155',\n                boxShadow: state === c ? \`0 0 20px \${CONFIG[c].color}\` : 'none',\n                transition: 'all 0.3s ease'\n              }}\n            />\n         ))}\n      </div>\n    </div>\n  );\n}`
  },
  {
      id: 'cc-7',
      category: Category.CSS,
      title: 'Holy Grail Layout',
      difficulty: Difficulty.Medium,
      description: 'Create a classic Holy Grail layout using CSS Grid: Header, Footer, Main Content, Left Sidebar, Right Sidebar.',
      tags: ['CSS Grid', 'Layout'],
      starterCode: `import React from 'react';\nimport './styles.css';\n\nexport default function Layout() {\n  return <div className="container">...</div>;\n}`,
      solutionCode: `import React from 'react';\n\nexport default function HolyGrail() {\n  return (\n    <div className="grid h-screen text-white font-bold text-center"\n         style={{\n           gridTemplateAreas: \`\n             "header header header"\n             "nav main ads"\n             "footer footer footer"\n           \`,\n           gridTemplateRows: '60px 1fr 60px',\n           gridTemplateColumns: '200px 1fr 200px',\n           gap: '4px'\n         }}\n    >\n      <header style={{ gridArea: 'header' }} className="bg-slate-700 flex items-center justify-center">Header</header>\n      <nav style={{ gridArea: 'nav' }} className="bg-slate-600 flex items-center justify-center">Nav</nav>\n      <main style={{ gridArea: 'main' }} className="bg-slate-500 flex items-center justify-center">Main Content</main>\n      <aside style={{ gridArea: 'ads' }} className="bg-slate-600 flex items-center justify-center">Sidebar</aside>\n      <footer style={{ gridArea: 'footer' }} className="bg-slate-700 flex items-center justify-center">Footer</footer>\n    </div>\n  );\n}`
  }
];

// Generator to fill up categories so we have > 5 items to test locking
const generateFillerChallenges = (): CodingChallenge[] => {
    const filler: CodingChallenge[] = [];
    const categories = Object.values(Category);
    
    categories.forEach((cat, catIdx) => {
        // Ensure each category has at least 10 items
        for (let i = 0; i < 8; i++) {
            filler.push({
                id: `filler-${catIdx}-${i}`,
                category: cat,
                title: `${cat} Challenge #${i + 1}`,
                difficulty: i % 2 === 0 ? Difficulty.Medium : Difficulty.Hard,
                description: `This is a premium practice challenge for ${cat} to test your advanced knowledge. Implement a robust solution.`,
                tags: [cat, 'Practice', 'Advanced'],
                starterCode: `// Starter code for ${cat} Challenge #${i+1}\n\nfunction solution() {\n  \n}`,
                solutionCode: `// Solution for ${cat} Challenge #${i+1}\n// Only visible to premium users\n\nexport default function Solution() {\n  return <div className="p-4 font-bold text-green-600">Correct Implementation</div>;\n}`
            });
        }
    });
    return filler;
};

export const CODING_CHALLENGES = [...BASE_CHALLENGES, ...generateFillerChallenges()];
