
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
  },
  // --- Next.js Challenges ---
  {
      id: 'next-1',
      category: Category.NextJS,
      title: 'GetStaticProps Basic',
      difficulty: Difficulty.Medium,
      description: 'Write a getStaticProps function that fetches a list of blog posts from an external API.',
      tags: ['SSG', 'Data Fetching'],
      starterCode: `// pages/blog.js\n\nexport default function Blog({ posts }) {\n  return (\n    <ul>\n      {posts.map(post => <li key={post.id}>{post.title}</li>)}\n    </ul>\n  );\n}\n\n// TODO: Implement getStaticProps`,
      solutionCode: `export default function Blog({ posts }) {\n  return (\n    <ul>\n      {posts.map(post => <li key={post.id}>{post.title}</li>)}\n    </ul>\n  );\n}\n\nexport async function getStaticProps() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts');\n  const posts = await res.json();\n\n  return {\n    props: {\n      posts: posts.slice(0, 5), // Limit for example\n    },\n    // Optional: Revalidate every 10 seconds (ISR)\n    revalidate: 10,\n  };\n}`
  },
  {
      id: 'next-2',
      category: Category.NextJS,
      title: 'Dynamic API Route',
      difficulty: Difficulty.Medium,
      description: 'Create a Next.js API route that handles a dynamic query param `id` and returns a user object.',
      tags: ['API Routes', 'Backend'],
      starterCode: `// pages/api/user/[id].js\n\nexport default function handler(req, res) {\n  const { id } = req.query;\n  // TODO: Return user data based on ID\n}`,
      solutionCode: `// pages/api/user/[id].js\n\nexport default function handler(req, res) {\n  const { id } = req.query;\n\n  // Mock DB lookup\n  const user = {\n    id,\n    name: \`User \${id}\`,\n    role: 'Admin'\n  };\n\n  if (req.method === 'GET') {\n    res.status(200).json(user);\n  } else {\n    res.status(405).end(); // Method Not Allowed\n  }\n}`
  },
  {
      id: 'next-3',
      category: Category.NextJS,
      title: 'Simple Image Component',
      difficulty: Difficulty.Easy,
      description: 'Use the next/image component to render a responsive image with width and height.',
      tags: ['Optimization', 'Components'],
      starterCode: `import Image from 'next/image';\n\nexport default function Avatar() {\n  // TODO: Render '/avatar.png'\n  return <div></div>;\n}`,
      solutionCode: `import Image from 'next/image';\n\nexport default function Avatar() {\n  return (\n    <div className="p-4">\n      <h1>User Avatar</h1>\n      <Image\n        src="/avatar.png"\n        alt="Profile Picture"\n        width={150}\n        height={150}\n        className="rounded-full"\n        priority\n      />\n    </div>\n  );\n}`
  },
  // --- Node.js Challenges ---
  {
    id: 'node-1',
    category: Category.NodeJS,
    title: 'Basic HTTP Server',
    difficulty: Difficulty.Easy,
    description: 'Create a simple HTTP server using the built-in `http` module that responds with "Hello World" to any request.',
    tags: ['HTTP', 'Server'],
    starterCode: `const http = require('http');\n\n// Create server\n`,
    solutionCode: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello World');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running at http://localhost:3000/');\n});`
  },
  {
    id: 'node-2',
    category: Category.NodeJS,
    title: 'Read JSON File',
    difficulty: Difficulty.Medium,
    description: 'Write a function using `fs.readFile` to read a JSON file and parse it. Handle errors gracefully.',
    tags: ['File System', 'Async'],
    starterCode: `const fs = require('fs');\n\nfunction readConfig(filePath) {\n  // TODO\n}`,
    solutionCode: `const fs = require('fs');\n\nfunction readConfig(filePath) {\n  fs.readFile(filePath, 'utf8', (err, data) => {\n    if (err) {\n      console.error('Error reading file:', err);\n      return;\n    }\n    try {\n      const config = JSON.parse(data);\n      console.log('Config loaded:', config);\n    } catch (parseErr) {\n      console.error('Error parsing JSON:', parseErr);\n    }\n  });\n}`
  },
  {
    id: 'node-3',
    category: Category.NodeJS,
    title: 'Event Emitter',
    difficulty: Difficulty.Medium,
    description: 'Create a custom Event Emitter class that supports `on` (subscribe) and `emit` (publish) methods.',
    tags: ['Events', 'Design Pattern'],
    starterCode: `class MyEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  on(type, listener) {\n    // TODO\n  }\n\n  emit(type, payload) {\n    // TODO\n  }\n}`,
    solutionCode: `class MyEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  on(type, listener) {\n    if (!this.events[type]) {\n      this.events[type] = [];\n    }\n    this.events[type].push(listener);\n  }\n\n  emit(type, payload) {\n    if (this.events[type]) {\n      this.events[type].forEach(listener => listener(payload));\n    }\n  }\n}\n\n// Usage:\n// const emitter = new MyEmitter();\n// emitter.on('greet', name => console.log('Hello ' + name));\n// emitter.emit('greet', 'Alice');`
  },
  {
    id: 'node-4',
    category: Category.NodeJS,
    title: 'Express Middleware',
    difficulty: Difficulty.Medium,
    description: 'Write a logging middleware for Express that logs the method and URL of every incoming request.',
    tags: ['Express', 'Middleware'],
    starterCode: `const express = require('express');\nconst app = express();\n\n// Add middleware here\n\napp.get('/', (req, res) => res.send('Home'));`,
    solutionCode: `const express = require('express');\nconst app = express();\n\n// Logger Middleware\nconst requestLogger = (req, res, next) => {\n  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);\n  next();\n};\n\napp.use(requestLogger);\n\napp.get('/', (req, res) => {\n  res.send('Home');\n});\n\n// app.listen(3000);`
  },
  {
    id: 'node-5',
    category: Category.NodeJS,
    title: 'Transform Stream',
    difficulty: Difficulty.Hard,
    description: 'Create a Transform stream using `stream` module that converts input text to uppercase.',
    tags: ['Streams', 'Pipes'],
    starterCode: `const { Transform } = require('stream');\n\nconst upperCaseStream = new Transform({\n  transform(chunk, encoding, callback) {\n    // TODO\n  }\n});\n\nprocess.stdin.pipe(upperCaseStream).pipe(process.stdout);`,
    solutionCode: `const { Transform } = require('stream');\n\nconst upperCaseStream = new Transform({\n  transform(chunk, encoding, callback) {\n    // Convert buffer to string, uppercase it, then push it\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  }\n});\n\n// Usage example:\n// process.stdin.pipe(upperCaseStream).pipe(process.stdout);\n// Type something in terminal to see it transform`
  },
  {
    id: 'node-6',
    category: Category.NodeJS,
    title: 'Promisify Utility',
    difficulty: Difficulty.Medium,
    description: 'Write a utility function that takes a callback-based function and returns a Promise-based version.',
    tags: ['Async', 'Utils'],
    starterCode: `function promisify(fn) {\n  return function(...args) {\n    // TODO\n  }\n}`,
    solutionCode: `function promisify(fn) {\n  return function(...args) {\n    return new Promise((resolve, reject) => {\n      fn(...args, (err, result) => {\n        if (err) return reject(err);\n        resolve(result);\n      });\n    });\n  };\n}\n\n// Usage:\n// const readFileAsync = promisify(fs.readFile);\n// readFileAsync('file.txt').then(data => ...)`
  },
  {
    id: 'node-7',
    category: Category.NodeJS,
    title: 'Rate Limiter',
    difficulty: Difficulty.Hard,
    description: 'Implement a simple rate limiter that allows only 5 requests per user (by IP) per minute.',
    tags: ['Algorithm', 'Security'],
    starterCode: `const requests = {};\n\nfunction isAllowed(ip) {\n  // Return true if allowed, false if blocked\n}`,
    solutionCode: `const requests = {};\nconst LIMIT = 5;\nconst WINDOW_MS = 60000;\n\nfunction isAllowed(ip) {\n  const now = Date.now();\n  if (!requests[ip]) {\n    requests[ip] = [];\n  }\n  \n  // Filter out timestamps older than the window\n  requests[ip] = requests[ip].filter(time => now - time < WINDOW_MS);\n  \n  if (requests[ip].length < LIMIT) {\n    requests[ip].push(now);\n    return true;\n  }\n  return false;\n}`
  },
  {
    id: 'node-8',
    category: Category.NodeJS,
    title: 'CLI Argument Parser',
    difficulty: Difficulty.Easy,
    description: 'Parse command line arguments passed to a Node script (e.g., node script.js --name=John --age=30).',
    tags: ['CLI', 'Utils'],
    starterCode: `const args = process.argv.slice(2);\n// Parse args into an object\nconsole.log(args);`,
    solutionCode: `const rawArgs = process.argv.slice(2);\nconst parsedArgs = {};\n\nrawArgs.forEach(arg => {\n  const [key, value] = arg.split('=');\n  if (key && value) {\n    // Remove leading dashes\n    const cleanKey = key.replace(/^-+/, '');\n    parsedArgs[cleanKey] = value;\n  }\n});\n\nconsole.log(parsedArgs);`
  },
  {
    id: 'node-9',
    category: Category.NodeJS,
    title: 'Simple API Client',
    difficulty: Difficulty.Easy,
    description: 'Make a GET request to an external API using the `https` module (without fetch/axios).',
    tags: ['HTTPS', 'Network'],
    starterCode: `const https = require('https');\n\nhttps.get('https://api.github.com', (res) => {\n  // TODO\n});`,
    solutionCode: `const https = require('https');\n\nconst options = {\n  hostname: 'api.github.com',\n  path: '/',\n  method: 'GET',\n  headers: { 'User-Agent': 'Node.js-Client' }\n};\n\nconst req = https.request(options, (res) => {\n  let data = '';\n  res.on('data', (chunk) => { data += chunk; });\n  res.on('end', () => {\n    console.log('Response:', data.substring(0, 100) + '...');\n  });\n});\n\nreq.on('error', (e) => console.error(e));\nreq.end();`
  },
  {
    id: 'node-10',
    category: Category.NodeJS,
    title: 'Recursive Directory List',
    difficulty: Difficulty.Hard,
    description: 'Recursively list all file paths in a directory using `fs.readdir` or `fs.readdirSync`.',
    tags: ['Recursion', 'File System'],
    starterCode: `const fs = require('fs');\nconst path = require('path');\n\nfunction getFiles(dir) {\n  // TODO\n}`,
    solutionCode: `const fs = require('fs');\nconst path = require('path');\n\nfunction getFiles(dir, files = []) {\n  const entries = fs.readdirSync(dir, { withFileTypes: true });\n  \n  for (const entry of entries) {\n    const fullPath = path.join(dir, entry.name);\n    if (entry.isDirectory()) {\n      getFiles(fullPath, files);\n    } else {\n      files.push(fullPath);\n    }\n  }\n  return files;\n}`
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
