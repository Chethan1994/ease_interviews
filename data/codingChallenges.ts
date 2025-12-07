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
    starterCode: `import React, { useState } from 'react';\n\nconst data = [\n  { \n    name: 'Root',\n    children: [\n      { name: 'Child 1' },\n      { name: 'Child 2', children: [{ name: 'Grandchild' }] }\n    ]\n  }\n];\n\nexport default function TreeView() {\n  return <div>{