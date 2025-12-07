import { CodingChallenge, Difficulty, Category } from '../types';

const BASE_CHALLENGES: CodingChallenge[] = [
  // --- JavaScript / Logic ---
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

  // --- React Standard ---
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
    id: 'cc-6',
    category: Category.React,
    title: 'Traffic Light Component',
    difficulty: Difficulty.Medium,
    description: 'Build a traffic light that cycles through Red, Yellow, Green automatically.',
    tags: ['useEffect', 'Timing'],
    starterCode: `import React from 'react';\n\nexport default function TrafficLight() {\n  // Green -> Yellow -> Red -> Green...\n  return <div className="traffic-light"></div>;\n}`,
    solutionCode: `import React, { useState, useEffect } from 'react';\n\nconst CONFIG = {\n  red: { next: 'green', duration: 4000, color: '#ef4444' },\n  yellow: { next: 'red', duration: 1000, color: '#eab308' },\n  green: { next: 'yellow', duration: 3000, color: '#22c55e' }\n};\n\nexport default function TrafficLight() {\n  const [state, setState] = useState('green');\n\n  useEffect(() => {\n    const { next, duration } = CONFIG[state];\n    const timer = setTimeout(() => setState(next), duration);\n    return () => clearTimeout(timer);\n  }, [state]);\n\n  return (\n    <div className="p-10 flex justify-center">\n      <div className="bg-slate-800 p-4 rounded-xl flex flex-col gap-4 shadow-xl">\n         {['red', 'yellow', 'green'].map(c => (\n            <div \n              key={c} \n              style={{ \n                width: 60, \n                height: 60, \n                borderRadius: '50%', \n                backgroundColor: state === c ? CONFIG[c].color : '#334155',\n                boxShadow: state === c ? \`0 0 20px \${CONFIG[c].color}\` : 'none',\n                transition: 'all 0.3s ease'\n              }}\n            />\n         ))}\n      </div>\n    </div>\n  );\n}`
  },
  // --- New React Challenges ---
  {
    id: 'cc-8',
    category: Category.React,
    title: 'To-Do List',
    difficulty: Difficulty.Easy,
    description: 'Create a simple To-Do list. Users should be able to type a task into an input field and click an "Add" button to append it to a list displayed below. The input should clear after adding.',
    tags: ['State', 'Lists', 'Forms'],
    starterCode: `import React, { useState } from 'react';\n\nexport default function TodoList() {\n  return (\n    <div className="p-4">\n      <input type="text" placeholder="Add a task" />\n      <button>Add</button>\n      <ul>\n        {/* List items go here */}\n      </ul>\n    </div>\n  );\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nexport default function TodoList() {\n  const [tasks, setTasks] = useState([]);\n  const [input, setInput] = useState('');\n\n  const handleAdd = () => {\n    if (input.trim()) {\n      setTasks([...tasks, input]);\n      setInput('');\n    }\n  };\n\n  return (\n    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-sm border border-slate-200 mt-4">\n      <h3 className="text-lg font-bold mb-4">My Tasks</h3>\n      <div className="flex gap-2 mb-4">\n        <input \n          type="text" \n          value={input} \n          onChange={(e) => setInput(e.target.value)}\n          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}\n          className="border border-slate-300 p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 outline-none"\n          placeholder="Add a task..."\n        />\n        <button \n          onClick={handleAdd}\n          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"\n        >\n          Add\n        </button>\n      </div>\n      <ul className="list-disc pl-5 space-y-1 text-slate-700">\n        {tasks.map((task, i) => (\n          <li key={i}>{task}</li>\n        ))}\n      </ul>\n      {tasks.length === 0 && <p className="text-slate-400 text-sm italic">No tasks yet.</p>}\n    </div>\n  );\n}`
  },
  {
    id: 'cc-9',
    category: Category.React,
    title: 'Custom Progress Bar',
    difficulty: Difficulty.Easy,
    description: 'Build a progress bar component that accepts a "value" prop (0-100) and displays the progress visually. Do not use any external libraries.',
    tags: ['CSS', 'Components'],
    starterCode: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-10">\n      <ProgressBar value={50} />\n    </div>\n  );\n}\n\nfunction ProgressBar({ value }) {\n  // Render progress bar here\n  return <div>{value}%</div>;\n}`,
    solutionCode: `import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [val, setVal] = useState(0);\n  \n  // Simulating progress\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setVal(v => (v >= 100 ? 0 : v + 10));\n    }, 800);\n    return () => clearInterval(timer);\n  }, []);\n\n  return (\n    <div className="p-10 space-y-4 max-w-md mx-auto">\n      <h3 className="font-bold text-slate-700">Loading Status: {val}%</h3>\n      <ProgressBar value={val} />\n    </div>\n  );\n}\n\nfunction ProgressBar({ value }) {\n  // Clamp value between 0 and 100\n  const clampedValue = Math.min(100, Math.max(0, value));\n  \n  return (\n    <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden border border-slate-300 shadow-inner">\n      <div \n        className="bg-blue-600 h-full transition-all duration-300 ease-out flex items-center justify-end pr-2 text-[10px] text-white font-bold"\n        style={{ width: \`\${clampedValue}%\` }}\n      >\n        {clampedValue > 10 && \`\${clampedValue}%\`}\n      </div>\n    </div>\n  );\n}`
  },
  {
    id: 'cc-10',
    category: Category.React,
    title: 'Theme Provider',
    difficulty: Difficulty.Medium,
    description: 'Create a Theme Provider from scratch with "Dark" and "Light" modes. Build a UI with buttons to toggle themes, changing background, text color, and border styles globally.',
    tags: ['Context API', 'State'],
    starterCode: `import React, { createContext, useState, useContext } from 'react';\n\n// Create Context\nconst ThemeContext = createContext();\n\nexport default function App() {\n  return (\n    <ThemeProvider>\n      <Layout />\n    </ThemeProvider>\n  );\n}\n\nfunction ThemeProvider({ children }) {\n  // TODO: Implement state and provider\n  return <div>{children}</div>;\n}\n\nfunction Layout() {\n  // TODO: Consume theme and render buttons\n  return <div>Theme Content</div>;\n}`,
    solutionCode: `import React, { createContext, useState, useContext } from 'react';\n\nconst ThemeContext = createContext();\n\nexport default function App() {\n  return (\n    <ThemeProvider>\n      <Layout />\n    </ThemeProvider>\n  );\n}\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  const toggleTheme = (mode) => setTheme(mode);\n  \n  const styles = {\n    light: { \n      background: '#ffffff', \n      color: '#1e293b', \n      borderColor: '#e2e8f0', \n      padding: '40px', \n      minHeight: '300px' \n    },\n    dark: { \n      background: '#0f172a', \n      color: '#f8fafc', \n      borderColor: '#334155', \n      padding: '40px', \n      minHeight: '300px' \n    }\n  };\n\n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme, style: styles[theme] }}>\n      <div style={styles[theme]} className="transition-colors duration-300">\n        {children}\n      </div>\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Layout() {\n  const { theme, toggleTheme } = useContext(ThemeContext);\n  return (\n    <div className="text-center">\n      <h1 className="text-3xl font-bold mb-4">Current Theme: {theme.toUpperCase()}</h1>\n      <p className="mb-8 opacity-80">This is a global theme demonstration.</p>\n      <div className="space-x-4">\n        <button \n          onClick={() => toggleTheme('light')} \n          className="px-6 py-2 bg-slate-200 text-slate-900 rounded font-semibold hover:bg-slate-300 transition-colors"\n        >\n          Apply Light Theme\n        </button>\n        <button \n          onClick={() => toggleTheme('dark')} \n          className="px-6 py-2 bg-slate-800 text-white rounded font-semibold hover:bg-slate-700 transition-colors"\n        >\n          Apply Dark Theme\n        </button>\n      </div>\n    </div>\n  );\n}`
  },
  {
    id: 'cc-11',
    category: Category.React,
    title: 'Drag and Drop Lists',
    difficulty: Difficulty.Hard,
    description: 'Create two boxes with list items. Implement drag and drop functionality to move items between boxes. If dropped outside, items should return to their original box.',
    tags: ['Drag & Drop', 'Events'],
    starterCode: `import React, { useState } from 'react';\n\nexport default function DragDrop() {\n  const [box1, setBox1] = useState(['Item 1', 'Item 2', 'Item 3']);\n  const [box2, setBox2] = useState(['Item 4']);\n\n  return (\n    <div className="flex gap-10 p-10">\n      <div className="border p-4 w-40 min-h-[200px]">\n        {/* Render Box 1 items */}\n      </div>\n      <div className="border p-4 w-40 min-h-[200px]">\n        {/* Render Box 2 items */}\n      </div>\n    </div>\n  );\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nexport default function DragDrop() {\n  const [boxes, setBoxes] = useState({\n    box1: ['Item 1', 'Item 2', 'Item 3'],\n    box2: ['Item A', 'Item B']\n  });\n  const [draggedItem, setDraggedItem] = useState(null);\n\n  const onDragStart = (e, item, sourceBox) => {\n    setDraggedItem({ item, sourceBox });\n  };\n\n  const onDrop = (e, targetBox) => {\n    if (!draggedItem) return;\n    const { item, sourceBox } = draggedItem;\n    if (sourceBox === targetBox) return;\n\n    setBoxes(prev => ({\n      ...prev,\n      [sourceBox]: prev[sourceBox].filter(i => i !== item),\n      [targetBox]: [...prev[targetBox], item]\n    }));\n    setDraggedItem(null);\n  };\n\n  const onDragOver = (e) => e.preventDefault();\n\n  return (\n    <div className="flex flex-col sm:flex-row gap-8 p-8 justify-center items-center sm:items-start">\n      {['box1', 'box2'].map(boxId => (\n        <div \n          key={boxId}\n          onDragOver={onDragOver}\n          onDrop={(e) => onDrop(e, boxId)}\n          className="border-2 border-dashed border-slate-300 p-4 w-48 min-h-[250px] rounded-xl bg-slate-50"\n        >\n          <h4 className="font-bold mb-4 uppercase text-slate-500 text-xs tracking-wider">{boxId}</h4>\n          {boxes[boxId].map(item => (\n            <div\n              key={item}\n              draggable\n              onDragStart={(e) => onDragStart(e, item, boxId)}\n              className="bg-white p-3 mb-2 shadow-sm rounded-lg cursor-move border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all"\n            >\n              {item}\n            </div>\n          ))}\n        </div>\n      ))}\n    </div>\n  );\n}`
  },
  {
    id: 'cc-12',
    category: Category.React,
    title: 'Recursive Treeview',
    difficulty: Difficulty.Medium,
    description: 'Build a recursive Treeview component that handles nested data of depth n. Implement expand/collapse functionality for nodes with children.',
    tags: ['Recursion', 'Components'],
    starterCode: `import React, { useState } from 'react';\n\nconst data = [\n  { \n    name: 'Root',\n    children: [\n      { name: 'Child 1' },\n      { name: 'Child 2', children: [{ name: 'Grandchild' }] }\n    ]\n  }\n];\n\nexport default function TreeView() {\n  return <div>{/* Implement Tree */}</div>;\n}`,
    solutionCode: `import React, { useState } from 'react';\n\nconst treeData = [\n  {\n    name: 'src',\n    children: [\n      { name: 'components', children: [{ name: 'Header.js' }, { name: 'Footer.js' }] },\n      { name: 'utils', children: [{ name: 'api.js' }, { name: 'helpers.js' }] },\n      { name: 'App.js' }\n    ]\n  },\n  { name: 'package.json' },\n  { name: 'README.md' }\n];\n\nfunction TreeNode({ node }) {\n  const [expanded, setExpanded] = useState(false);\n  const hasChildren = node.children && node.children.length > 0;\n\n  return (\n    <div className="ml-4 select-none">\n      <div \n        className="cursor-pointer hover:bg-slate-100 p-1.5 rounded flex items-center gap-2 text-slate-700"\n        onClick={() => setExpanded(!expanded)}\n      >\n        <span className="w-4 flex justify-center">\n            {hasChildren ? (expanded ? '📂' : '📁') : '📄'}\n        </span>\n        <span className="font-medium text-sm">{node.name}</span>\n      </div>\n      {hasChildren && expanded && (\n        <div className="border-l border-slate-200 ml-2.5 pl-1">\n          {node.children.map((child, i) => <TreeNode key={i} node={child} />)}\n        </div>\n      )}\n    </div>\n  );\n}\n\nexport default function TreeView() {\n  return (\n    <div className="p-8 max-w-sm mx-auto">\n        <div className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">\n            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-slate-600 text-sm">\n                Project Explorer\n            </div>\n            <div className="p-4">\n                {treeData.map((node, i) => <TreeNode key={i} node={node} />)}\n            </div>\n        </div>\n    </div>\n  );\n}`
  },
  {
    id: 'cc-13',
    category: Category.React,
    title: 'Lifecycle Logging',
    difficulty: Difficulty.Easy,
    description: 'Create a Parent component with 2 Children. Log messages to the console during mounting and unmounting of each. Add a button to unmount the Parent to demonstrate the cleanup phase.',
    tags: ['useEffect', 'Lifecycle'],
    starterCode: `import React, { useEffect, useState } from 'react';\n\nfunction Child({ name }) {\n  // Log mount/unmount here\n  return <div>{name}</div>;\n}\n\nexport default function Parent() {\n  return (\n    <div>\n      <Child name="Child 1" />\n      <Child name="Child 2" />\n    </div>\n  );\n}`,
    solutionCode: `import React, { useEffect, useState } from 'react';\n\nfunction LoggerComponent({ name }) {\n  useEffect(() => {\n    console.log(\`Mounted <\${name}> Component\`);\n    return () => console.log(\`Un-mounted <\${name}> Component\`);\n  }, [name]);\n\n  return (\n    <div className="p-3 border border-slate-200 m-2 rounded bg-white shadow-sm">\n        <span className="font-mono text-xs text-slate-500 block mb-1">Component</span>\n        <span className="font-bold text-slate-800">{name}</span>\n    </div>\n  );\n}\n\nexport default function App() {\n  const [mounted, setMounted] = useState(true);\n\n  return (\n    <div className="p-8 text-center flex flex-col items-center">\n      <h3 className="font-bold text-xl mb-6 text-slate-800">Console Lifecycle Logger</h3>\n      \n      {mounted ? (\n        <div className="p-6 border-2 border-blue-200 rounded-xl bg-blue-50 w-full max-w-md">\n          <div className="mb-4 text-sm text-blue-600 font-semibold uppercase tracking-wider">Parent Container</div>\n          <LoggerComponent name="Parent" />\n          <div className="flex justify-center mt-2">\n             <LoggerComponent name="child-1" />\n             <LoggerComponent name="child-2" />\n          </div>\n          <button \n            onClick={() => setMounted(false)}\n            className="mt-6 bg-red-500 text-white px-6 py-2.5 rounded-lg shadow hover:bg-red-600 font-medium transition-colors"\n          >\n            Unmount Parent\n          </button>\n        </div>\n      ) : (\n        <div className="p-10 border border-slate-200 rounded-xl bg-white shadow-sm max-w-md">\n          <h2 className="text-xl font-bold mb-2 text-slate-800">Redirected</h2>\n          <p className="text-slate-500 mb-6">Open your browser console to see the "Un-mounted" logs.</p>\n          <button \n            onClick={() => setMounted(true)}\n            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 font-medium transition-colors"\n          >\n            Mount Components\n          </button>\n        </div>\n      )}\n    </div>\n  );\n}`
  },
  {
    id: 'cc-14',
    category: Category.React,
    title: 'Custom Hook: useDebounce',
    difficulty: Difficulty.Medium,
    description: 'Implement a custom hook `useDebounce` that delays updating a value until a specified time has passed since the last change. Create a demo component with a search input to verify it.',
    tags: ['Custom Hooks', 'Async', 'Effects'],
    starterCode: `import React, { useState, useEffect } from 'react';\n\n// Implement hook\nfunction useDebounce(value, delay) {\n  // ...\n}\n\nexport default function App() {\n  const [text, setText] = useState('');\n  const debouncedText = useDebounce(text, 500);\n\n  return (\n    <div className="p-4">\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <p>Debounced: {debouncedText}</p>\n    </div>\n  );\n}`,
    solutionCode: `import React, { useState, useEffect } from 'react';\n\nfunction useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n\n    return () => {\n      clearTimeout(handler);\n    };\n  }, [value, delay]);\n\n  return debouncedValue;\n}\n\nexport default function App() {\n  const [text, setText] = useState('');\n  const debouncedText = useDebounce(text, 500);\n\n  return (\n    <div className="p-8 text-center max-w-md mx-auto">\n      <h2 className="text-lg font-bold mb-4">Debounce Demo</h2>\n      <input\n        className="border border-slate-300 rounded p-2 w-full mb-4"\n        placeholder="Type quickly..."\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n      />\n      <div className="space-y-2">\n        <p className="text-sm text-slate-500">Real-time: <span className="font-mono text-slate-900">{text}</span></p>\n        <p className="text-sm text-green-600 font-bold">Debounced (500ms): <span className="font-mono">{debouncedText}</span></p>\n      </div>\n    </div>\n  );\n}`
  },
  {
    id: 'cc-15',
    category: Category.React,
    title: 'Context API Setup',
    difficulty: Difficulty.Easy,
    description: 'Create a basic Context API setup. Create a `UserContext` with a user object and a toggle function. Wrap a child component with the Provider and consume the context in the child to display and update the user status.',
    tags: ['Context', 'State Management'],
    starterCode: `import React, { createContext, useContext, useState } from 'react';\n\nconst UserContext = createContext();\n\nexport default function App() {\n  return (\n    // Wrap with Provider\n    <Child />\n  );\n}\n\nfunction Child() {\n  // Consume Context\n  return <div>User Info</div>;\n}`,
    solutionCode: `import React, { createContext, useContext, useState } from 'react';\n\n// 1. Create Context\nconst UserContext = createContext();\n\n// 2. Main App with Provider\nexport default function App() {\n  const [user, setUser] = useState({ name: 'Guest', isLoggedIn: false });\n\n  const toggleLogin = () => {\n    setUser(prev => ({\n      name: prev.isLoggedIn ? 'Guest' : 'Alice',\n      isLoggedIn: !prev.isLoggedIn\n    }));\n  };\n\n  return (\n    <UserContext.Provider value={{ user, toggleLogin }}>\n      <div className="p-10 flex justify-center">\n        <UserProfile />\n      </div>\n    </UserContext.Provider>\n  );\n}\n\n// 3. Child Component Consuming Context\nfunction UserProfile() {\n  const { user, toggleLogin } = useContext(UserContext);\n\n  return (\n    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 text-center w-64">\n      <div className={\`w-16 h-16 mx-auto rounded-full mb-4 flex items-center justify-center text-xl font-bold \${user.isLoggedIn ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}\`}>\n        {user.name[0]}\n      </div>\n      <h3 className="font-bold text-lg mb-1">{user.name}</h3>\n      <p className="text-xs text-slate-400 mb-4">{user.isLoggedIn ? 'Online' : 'Offline'}</p>\n      <button\n        onClick={toggleLogin}\n        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"\n      >\n        {user.isLoggedIn ? 'Logout' : 'Login'}\n      </button>\n    </div>\n  );\n}`
  },
  {
    id: 'cc-16',
    category: Category.React,
    title: 'Filterable Product Table',
    difficulty: Difficulty.Hard,
    description: 'Build a table displaying products grouped by category. Implement search, "In Stock" filter, inline Edit, and Delete functionality. **Requirement:** Persist changes (edits/deletes) to `localStorage` so they remain after a page reload.',
    tags: ['State', 'Forms', 'Persistence'],
    starterCode: `import React, { useState } from 'react';\n\nconst DATA = [\n  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },\n  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' }\n];\n\nexport default function ProductTable() {\n  return <div>Build Table Here</div>;\n}`,
    solutionCode: `import React, { useState, useEffect } from 'react';\n\n/* \n  Persistence Strategy:\n  1. Initialize state lazy-ly by reading from localStorage.\n  2. Use useEffect to write to localStorage whenever products change.\n*/\n\nconst DEFAULT_DATA = [\n  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },\n  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },\n  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },\n  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },\n  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },\n  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },\n];\n\nexport default function ProductTable() {\n  // Load from local storage or use default\n  const [products, setProducts] = useState(() => {\n    try {\n      const saved = localStorage.getItem('product_challenge_data');\n      return saved ? JSON.parse(saved) : DEFAULT_DATA;\n    } catch (e) { return DEFAULT_DATA; }\n  });\n  \n  const [filterText, setFilterText] = useState('');\n  const [inStockOnly, setInStockOnly] = useState(false);\n  const [editingName, setEditingName] = useState(null);\n  const [editForm, setEditForm] = useState({});\n\n  // Save to local storage on change\n  useEffect(() => {\n    localStorage.setItem('product_challenge_data', JSON.stringify(products));\n  }, [products]);\n\n  const handleDelete = (name) => {\n    if(window.confirm('Delete ' + name + '?')) {\n        setProducts(prev => prev.filter(p => p.name !== name));\n    }\n  };\n\n  const startEdit = (product) => {\n    setEditingName(product.name);\n    setEditForm({ ...product });\n  };\n\n  const saveEdit = () => {\n    setProducts(prev => prev.map(p => p.name === editingName ? editForm : p));\n    setEditingName(null);\n  };\n\n  // Filter logic\n  const filteredProducts = products.filter(product => {\n    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return false;\n    if (inStockOnly && !product.stocked) return false;\n    return true; // Match found\n  });\n\n  // Group by category\n  const categories = {};\n  filteredProducts.forEach(p => {\n    if (!categories[p.category]) categories[p.category] = [];\n    categories[p.category].push(p);\n  });\n\n  return (\n    <div className="p-6 font-sans max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 mt-4">\n      <h2 className="text-xl font-bold mb-4 text-slate-800">Inventory Manager</h2>\n      \n      {/* Controls */}\n      <div className="mb-6 space-y-3 bg-slate-50 p-4 rounded-lg">\n        <input \n          type="text" \n          placeholder="Search products..." \n          value={filterText}\n          onChange={(e) => setFilterText(e.target.value)}\n          className="border border-slate-300 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"\n        />\n        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">\n          <input \n            type="checkbox" \n            checked={inStockOnly} \n            onChange={(e) => setInStockOnly(e.target.checked)} \n            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"\n          />\n          Only show products in stock\n        </label>\n      </div>\n\n      {/* Table */}\n      <div className="overflow-x-auto">\n      <table className="w-full text-left text-sm">\n        <thead>\n          <tr className="border-b-2 border-slate-100">\n            <th className="font-bold py-2 text-slate-600">Name</th>\n            <th className="font-bold py-2 text-slate-600">Price</th>\n            <th className="font-bold py-2 text-slate-600 w-32 text-right">Actions</th>\n          </tr>\n        </thead>\n        <tbody>\n          {Object.keys(categories).length === 0 && (\n             <tr><td colSpan="3" className="text-center py-8 text-slate-400">No products found.</td></tr>\n          )}\n          {Object.keys(categories).map(category => (\n            <React.Fragment key={category}>\n              <tr>\n                <th colSpan="3" className="font-bold text-center py-2 bg-slate-100 text-slate-700 mt-2 rounded">\n                    {category}\n                </th>\n              </tr>\n              {categories[category].map(product => (\n                <tr key={product.name} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">\n                  <td className={\`p-3 \${!product.stocked ? 'text-red-500' : 'text-slate-700'}\`}>\n                    {editingName === product.name ? (\n                        <input \n                            value={editForm.name} \n                            onChange={e => setEditForm({...editForm, name: e.target.value})}\n                            className="border p-1 w-full rounded"\n                        />\n                    ) : product.name}\n                  </td>\n                  <td className="p-3 text-slate-600">\n                    {editingName === product.name ? (\n                        <input \n                            value={editForm.price} \n                            onChange={e => setEditForm({...editForm, price: e.target.value})}\n                            className="border p-1 w-16 rounded"\n                        />\n                    ) : product.price}\n                  </td>\n                  <td className="p-3 flex gap-2 justify-end">\n                    {editingName === product.name ? (\n                        <button onClick={saveEdit} className="text-green-600 font-bold hover:underline">Save</button>\n                    ) : (\n                        <>\n                            <button onClick={() => startEdit(product)} className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">Edit</button>\n                            <button onClick={() => handleDelete(product.name)} className="text-red-600 hover:bg-red-50 px-2 py-1 rounded">Del</button>\n                        </>\n                    )}\n                  </td>\n                </tr>\n              ))}\n            </React.Fragment>\n          ))}\n        </tbody>\n      </table>\n      </div>\n      <div className="mt-4 text-xs text-slate-400 text-center">\n        Changes are persisted to localStorage.\n      </div>\n    </div>\n  );\n}`
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
  },
  // --- TypeScript Challenges ---
  {
      id: 'ts-1',
      category: Category.TypeScript,
      title: 'Implement Partial',
      difficulty: Difficulty.Medium,
      description: 'Implement your own version of the `Partial<T>` utility type.',
      tags: ['Utility Types', 'Mapped Types'],
      starterCode: `// Implement MyPartial<T>\ntype MyPartial<T> = any;\n\ninterface User { name: string; age: number; }\nconst u: MyPartial<User> = { name: 'John' }; // Should not error`,
      solutionCode: `// Mapped type iterating over keys of T and making them optional\ntype MyPartial<T> = {\n  [P in keyof T]?: T[P];\n};\n\n// Usage:\ninterface User { name: string; age: number; }\nconst u: MyPartial<User> = { name: 'John' };`
  },
  {
      id: 'ts-2',
      category: Category.TypeScript,
      title: 'Implement Pick',
      difficulty: Difficulty.Medium,
      description: 'Implement your own version of the `Pick<T, K>` utility type.',
      tags: ['Utility Types', 'Mapped Types'],
      starterCode: `// Implement MyPick<T, K>\ntype MyPick<T, K extends keyof T> = any;\n\ninterface User { name: string; age: number; email: string; }\ntype NameOnly = MyPick<User, 'name'>;`,
      solutionCode: `type MyPick<T, K extends keyof T> = {\n  [P in K]: T[P];\n};\n\ninterface User { name: string; age: number; email: string; }\ntype NameOnly = MyPick<User, 'name'>; // { name: string }`
  },
  {
      id: 'ts-3',
      category: Category.TypeScript,
      title: 'Tuple to Union',
      difficulty: Difficulty.Easy,
      description: 'Convert a tuple type to a union type of its values.',
      tags: ['Tuples', 'Unions'],
      starterCode: `type TupleToUnion<T extends any[]> = any;\n\ntype T = [1, 2, '3'];\ntype U = TupleToUnion<T>; // 1 | 2 | '3'`,
      solutionCode: `type TupleToUnion<T extends any[]> = T[number];\n\ntype T = [1, 2, '3'];\ntype U = TupleToUnion<T>; // Expected: 1 | 2 | '3'`
  },
  {
      id: 'ts-4',
      category: Category.TypeScript,
      title: 'Deep Readonly',
      difficulty: Difficulty.Hard,
      description: 'Create a type that makes all properties of an object (and its nested objects) readonly.',
      tags: ['Recursion', 'Modifiers'],
      starterCode: `type DeepReadonly<T> = any;\n\ninterface User { profile: { name: string } }\nconst u: DeepReadonly<User>;\n// u.profile.name = 'Jane'; // Should Error`,
      solutionCode: `type DeepReadonly<T> = {\n  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];\n};\n\ninterface User { profile: { name: string } }\nconst u: DeepReadonly<User> = { profile: { name: 'John' } };\n// u.profile.name = 'Jane'; // Error: Cannot assign to 'name' because it is a read-only property.`
  }
];

export const CODING_CHALLENGES = [...BASE_CHALLENGES];
