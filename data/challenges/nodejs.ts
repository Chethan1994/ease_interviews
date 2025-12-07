import { CodingChallenge, Difficulty, Category } from '../../types';

export const NODE_CHALLENGES: CodingChallenge[] = [
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