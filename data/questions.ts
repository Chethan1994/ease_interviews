
import { Category, Difficulty, Question } from '../types';

// High-quality hand-curated questions (The "Head" of the data)
const BASE_QUESTIONS: Question[] = [
  // --- React ---
  {
    id: 'r-1',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Explain the difference between useEffect and useLayoutEffect.',
    answer: '`useEffect` runs asynchronously after the render is committed to the screen. `useLayoutEffect` runs synchronously immediately after DOM mutations but before the browser has a chance to paint. Use `useLayoutEffect` if you need to measure DOM elements or make visual changes that should be visible immediately to avoid flickering.',
    codeSnippet: `// Runs after paint\nuseEffect(() => {\n  console.log("Effect");\n}, []);\n\n// Runs before paint\nuseLayoutEffect(() => {\n  console.log("Layout Effect");\n}, []);`
  },
  {
    id: 'r-2',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'What is React Fiber?',
    answer: 'React Fiber is the reimplementation of the React reconciliation algorithm. Its main goal is to enable incremental rendering of the virtual DOM. It allows React to pause work, assign priority to different types of updates, and reuse previously completed work.',
  },
  {
    id: 'r-3',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'What are keys in React and why are they important?',
    answer: 'Keys are special string attributes you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed. They should be stable, unique among siblings, and predictable.',
  },
  {
    id: 'r-4',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is the Virtual DOM?',
    answer: 'The Virtual DOM (VDOM) is a programming concept where a virtual representation of the UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called reconciliation.',
  },
  {
    id: 'r-5',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'Explain the concept of Higher-Order Components (HOCs).',
    answer: 'A Higher-Order Component is a function that takes a component and returns a new component. It is a pattern derived from React\'s compositional nature, often used for cross-cutting concerns like logging, access control, or data fetching.',
    codeSnippet: `function withLogging(WrappedComponent) {\n  return function(props) {\n    console.log('Rendered');\n    return <WrappedComponent {...props} />;\n  }\n}`
  },
  {
    id: 'r-6',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What are React Portals?',
    answer: 'Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This is useful for modals, tooltips, and hovercards that need to break out of their container\'s overflow or z-index context.',
  },
  {
    id: 'r-7',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'What is the difference between state and props?',
    answer: 'Props (short for properties) are read-only and passed from a parent to a child. State is managed within the component (or by a state manager) and can change over time. When state changes, the component re-renders.',
  },
  {
    id: 'r-8',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is the Context API?',
    answer: 'The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It is designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language.',
  },
  {
    id: 'r-9',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'What are Error Boundaries?',
    answer: 'Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.',
  },
  {
    id: 'r-10',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Explain Synthetic Events in React.',
    answer: 'SyntheticEvent is a cross-browser wrapper around the browser’s native event. It has the same interface as the native event, including `stopPropagation()` and `preventDefault()`, except the events work identically across all browsers.',
  },

  // --- Node.js ---
  {
    id: 'node-1',
    category: Category.NodeJS,
    difficulty: Difficulty.Hard,
    question: 'Explain the Node.js Event Loop.',
    answer: 'The Event Loop is what allows Node.js to perform non-blocking I/O operations despite being single-threaded. It offloads operations to the system kernel whenever possible. The phases include Timers, Pending Callbacks, Idle/Prepare, Poll, Check (setImmediate), and Close Callbacks.',
  },
  {
    id: 'node-2',
    category: Category.NodeJS,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between process.nextTick() and setImmediate()?',
    answer: '`process.nextTick()` fires immediately on the same phase of the event loop (before the event loop continues). `setImmediate()` fires on the following iteration or "tick" of the event loop (specifically in the Check phase). Use `nextTick` for urgent recursive deferrals, but beware of starving I/O.',
  },
  {
    id: 'node-3',
    category: Category.NodeJS,
    difficulty: Difficulty.Medium,
    question: 'What are Streams in Node.js?',
    answer: 'Streams are objects that let you read data from a source or write data to a destination in continuous chunks. There are four types: Readable, Writable, Duplex (both), and Transform (modify data as it is written/read). They are memory efficient for handling large files.',
    codeSnippet: `const fs = require('fs');\nconst readStream = fs.createReadStream('file.txt');\nreadStream.on('data', chunk => console.log(chunk));`
  },
  {
    id: 'node-4',
    category: Category.NodeJS,
    difficulty: Difficulty.Easy,
    question: 'What is a Buffer?',
    answer: 'Buffer is a global class used to handle binary data. Since JavaScript historically didn\'t have a mechanism for reading or manipulating streams of binary data, Buffer was introduced to interact with octet streams in TCP streams, file system operations, etc.',
  },
  {
    id: 'node-5',
    category: Category.NodeJS,
    difficulty: Difficulty.Medium,
    question: 'What is the role of Libuv in Node.js?',
    answer: 'Libuv is a multi-platform C library that provides support for asynchronous I/O based on event loops. It handles the File System, DNS, network, child processes, pipes, signal handling, polling, and streaming. It is the core engine behind Node\'s non-blocking I/O.',
  },
  {
    id: 'node-6',
    category: Category.NodeJS,
    difficulty: Difficulty.Medium,
    question: 'Explain the Cluster module.',
    answer: 'Node.js is single-threaded. The Cluster module allows you to create child processes (workers) that run simultaneously and share the same server port. This allows Node.js applications to take advantage of multi-core systems.',
  },
  {
    id: 'node-7',
    category: Category.NodeJS,
    difficulty: Difficulty.Easy,
    question: 'What is Middleware in Express?',
    answer: 'Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can execute code, make changes to req/res, and end the cycle or call next().',
  },
  {
    id: 'node-8',
    category: Category.NodeJS,
    difficulty: Difficulty.Hard,
    question: 'What are Worker Threads?',
    answer: 'The `worker_threads` module enables the use of threads that execute JavaScript in parallel. Unlike `cluster` or `child_process`, worker threads share memory. They are useful for performing CPU-intensive JavaScript operations without blocking the main event loop.',
  },
  {
    id: 'node-9',
    category: Category.NodeJS,
    difficulty: Difficulty.Medium,
    question: 'How do you handle errors in async code in Node.js?',
    answer: 'In callbacks, check the first argument (err). In Promises, use `.catch()`. In `async/await`, wrap code in `try/catch` blocks. Unhandled promise rejections should be caught globally using `process.on("unhandledRejection")` to prevent unexpected crashes or memory leaks.',
  },
  {
    id: 'node-10',
    category: Category.NodeJS,
    difficulty: Difficulty.Easy,
    question: 'What is the difference between "require" and "import"?',
    answer: '`require()` is CommonJS (synchronous, dynamic, used in older Node). `import` is ES Modules (asynchronous, static, standard in modern JS/Node). Node.js now supports ES Modules by using `.mjs` extension or `"type": "module"` in package.json.',
  },

  // --- JavaScript ---
  {
    id: 'js-1',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function.',
    codeSnippet: `function makeFunc() {\n  const name = 'Mozilla';\n  function displayName() {\n    alert(name);\n  }\n  return displayName;\n}\n\nconst myFunc = makeFunc();\nmyFunc();`
  },
  {
    id: 'js-2',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'Explain Event Delegation.',
    answer: 'Event Delegation is a pattern where you attach a single event listener to a parent element to manage events for all of its children (including those added dynamically). It leverages the concept of Event Bubbling, where events triggered on a child element bubble up to the parent.',
  },
  {
    id: 'js-3',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'Explain the Event Loop.',
    answer: 'The Event Loop is a mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded. It monitors the Call Stack and the Callback Queue. If the Call Stack is empty, it will take the first event from the queue and push it to the stack.',
  },
  {
    id: 'js-4',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between "==" and "==="?',
    answer: 'The `==` operator checks for abstract equality and performs type coercion if the types are different. The `===` operator checks for strict equality and does not perform type coercion; the values must have the same type to be equal.',
  },
  {
    id: 'js-5',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'What is "hoisting" in JavaScript?',
    answer: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top. Variables defined with `var` are hoisted and initialized with `undefined`. Variables defined with `let` and `const` are hoisted but not initialized (Temporal Dead Zone). Function declarations are fully hoisted.',
  },
  {
    id: 'js-6',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'Explain the "this" keyword.',
    answer: 'The value of `this` depends on how a function is called. In a method, `this` refers to the owner object. Alone, it refers to the global object. In a function, it refers to the global object (or undefined in strict mode). In an event, it refers to the element that received the event.',
  },

  // --- CSS ---
  {
    id: 'css-1',
    category: Category.CSS,
    difficulty: Difficulty.Medium,
    question: 'Explain the Box Model.',
    answer: 'The CSS Box Model is a box that wraps around every HTML element. It consists of: Content (the actual image/text), Padding (transparent area around content), Border (goes around the padding and content), and Margin (transparent area outside the border).',
  },
  {
    id: 'css-2',
    category: Category.CSS,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between specificities of class and id?',
    answer: 'ID selectors have a higher specificity than class selectors. An ID selector has a weight of 1-0-0, while a class selector has a weight of 0-1-0. If both target the same element with conflicting styles, the ID style wins.',
  },
  {
    id: 'css-3',
    category: Category.CSS,
    difficulty: Difficulty.Easy,
    question: 'What is Flexbox?',
    answer: 'Flexbox (Flexible Box Layout) is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.',
  },
  {
    id: 'css-4',
    category: Category.CSS,
    difficulty: Difficulty.Hard,
    question: 'What is the difference between "rem" and "em"?',
    answer: '`em` is relative to the font-size of its direct or nearest parent. `rem` (root em) is relative to the font-size of the root element (`<html>`). `rem` is generally preferred for consistency.',
  },
  
  // --- HTML ---
  {
    id: 'h-1',
    category: Category.HTML,
    difficulty: Difficulty.Easy,
    question: 'What does DOCTYPE do?',
    answer: 'The `<!DOCTYPE>` declaration is an instruction to the web browser about what version of HTML the page is written in. It ensures the browser renders the page in "standards mode" rather than "quirks mode".',
  },
  {
    id: 'h-2',
    category: Category.HTML,
    difficulty: Difficulty.Medium,
    question: 'What are Semantic Elements?',
    answer: 'Semantic elements clearly describe their meaning to both the browser and the developer. Examples include `<form>`, `<table>`, and `<article>`, which are more meaningful than generic tags like `<div>` and `<span>`.',
  }
];

// --- TOPIC POOLS FOR REALISTIC QUESTION GENERATION ---
const TOPIC_POOLS = {
    [Category.React]: [
        'useMemo usage', 'useCallback benefits', 'Prop Drilling solutions', 'React.memo vs useMemo',
        'Controlled vs Uncontrolled components', 'Lifting State Up', 'Error Boundaries', 'React Fragments',
        'Lazy Loading components', 'Code Splitting', 'Server Side Rendering (SSR)', 'Next.js basics',
        'React Router fundamentals', 'Redux core concepts', 'Context API vs Redux', 'Custom Hooks patterns',
        'Rules of Hooks', 'Dependency arrays in useEffect', 'Cleanup functions in effects', 'React.StrictMode',
        'Proptypes vs TypeScript', 'Functional vs Class components', 'Component Lifecycle', 'PureComponent',
        'Ref forwarding', 'DOM Refs', 'Portals use cases', 'Suspense for data fetching', 'Concurrent Mode',
        'Flux architecture', 'State immutability', 'React DevTools', 'Performance optimization', 'Re-renders causes'
    ],
    [Category.JavaScript]: [
        'Prototypal Inheritance', 'ES6 Classes', 'Arrow Functions', 'Destructuring assignment',
        'Spread vs Rest operator', 'Modules (Import/Export)', 'Promise chaining', 'Async/Await error handling',
        'Map vs WeakMap', 'Set vs WeakSet', 'Generator functions', 'Symbol data type', 'Type coercion',
        'NaN properties', 'Null vs Undefined', 'Pass by Value vs Reference', 'Deep copy vs Shallow copy',
        'Debouncing functions', 'Throttling functions', 'Currying', 'Memoization', 'IIFE (Immediately Invoked Function Expressions)',
        'Scope Chain', 'Lexical Scoping', 'Temporal Dead Zone', 'Strict Mode', 'garbage collection',
        'Memory Leaks', 'Event Bubbling', 'Event Capturing', 'preventDefault vs stopPropagation',
        'LocalStorage vs SessionStorage', 'Cookies vs LocalStorage', 'Service Workers', 'Web Workers',
        'XMLHttpRequest vs Fetch'
    ],
    [Category.NodeJS]: [
        'Express.js Middleware', 'REST API Best Practices', 'GraphQL vs REST in Node', 'JWT Authentication',
        'Passport.js', 'Socket.io', 'Mongoose Schemas', 'MongoDB Aggregation', 'SQL vs NoSQL with Node',
        'Environment Variables', 'NPM vs Yarn', 'package-lock.json', 'Semantic Versioning', 'Node.js Security (Helmet)',
        'CORS', 'Rate Limiting', 'Redis Caching in Node', 'Unit Testing with Jest', 'Integration Testing',
        'Debugging Node.js', 'Memory Profiling', 'Garbage Collection in V8', 'Child Processes (spawn/exec)',
        'File System Module (fs)', 'Path Module', 'Crypto Module', 'HTTP/HTTPS Modules', 'Buffer vs Stream',
        'Callback Hell solutions', 'Promise.all vs Promise.allSettled', 'Microservices with Node', 'Serverless Functions'
    ],
    [Category.CSS]: [
        'CSS Grid vs Flexbox', 'Centering a div', 'CSS Specificity calculation', 'Reset vs Normalize CSS',
        'Pseudo-classes vs Pseudo-elements', 'Box Sizing: border-box', 'Z-index context', 'Positioning (relative, absolute, fixed, sticky)',
        'Media Queries', 'Mobile-first design', 'Responsive units (vw, vh, rem, em)', 'CSS Variables (Custom Properties)',
        'BEM naming convention', 'SASS/SCSS benefits', 'CSS Modules', 'Styled Components', 'Shadow DOM encapsulation',
        'Critical CSS', 'CSS Animations vs Transitions', 'Keyframes', 'Floats and clearing', 'Display: none vs Visibility: hidden',
        'Collapsing Margins', 'Block vs Inline elements', 'Inline-block behavior', 'Flex grow/shrink/basis',
        'Grid template areas', 'Object-fit property', 'Aspect-ratio'
    ],
    [Category.HTML]: [
        'Data attributes', 'Canvas vs SVG', 'Video and Audio tags', 'Meta tags for SEO',
        'Accessibility (ARIA roles)', 'Alt text importance', 'Form validation', 'Input types',
        'Iframe security', 'Script async vs defer', 'Link prefetch/preload', 'Responsive images (srcset)',
        'Web Components', 'Semantic HTML5 tags', 'Document Object Model (DOM)', 'Critical Rendering Path',
        'Browser Rendering Engine', 'Cookies attributes (HttpOnly, Secure)', 'Favicon best practices'
    ]
};

// Templates to create natural sounding questions
const QUESTION_TEMPLATES = [
    (topic: string) => `Can you explain the concept of ${topic} and when you would use it?`,
    (topic: string) => `What are the primary benefits and drawbacks of using ${topic}?`,
    (topic: string) => `How does ${topic} work under the hood?`,
    (topic: string) => `In a production environment, what common issues might arise with ${topic}?`,
    (topic: string) => `Compare ${topic} with its alternatives. Why would you choose one over the other?`,
    (topic: string) => `Describe a scenario where implementing ${topic} would be the optimal solution.`,
    (topic: string) => `What best practices should be followed when working with ${topic}?`,
    (topic: string) => `How would you explain ${topic} to a junior developer?`
];

// Helper to generate realistic questions
const generateNaturalQuestions = (category: Category, startId: number, count: number): Question[] => {
    const questions: Question[] = [];
    const topics = TOPIC_POOLS[category] || TOPIC_POOLS[Category.React]; // Fallback
    const difficulties = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard];

    for (let i = 0; i < count; i++) {
        const topic = topics[i % topics.length];
        const template = QUESTION_TEMPLATES[i % QUESTION_TEMPLATES.length];
        const diff = difficulties[i % 3];

        questions.push({
            id: `${category.toLowerCase()}-${startId + i}`,
            category: category,
            difficulty: diff,
            question: template(topic),
            answer: `[Detailed Answer for: ${topic}]\n\nWhen discussing ${topic}, it is important to understand its core purpose in the ecosystem. \n\n1. Definition: Start by defining ${topic} clearly.\n2. Use Case: Explain that it is typically used when you need to handle specific architectural or logic requirements efficiently.\n3. Best Practice: Ensure you follow standard conventions to maintain code readability and performance.\n\n(Note: In a real interview, provide a concrete example from your past experience here.)`
        });
    }
    return questions;
};

// Generate 100 questions per category
const generateFullDataset = (): Question[] => {
    let allQuestions = [...BASE_QUESTIONS];
    
    Object.values(Category).forEach(cat => {
        const existingCount = BASE_QUESTIONS.filter(q => q.category === cat).length;
        const needed = 100 - existingCount;
        if (needed > 0) {
            allQuestions = [...allQuestions, ...generateNaturalQuestions(cat, existingCount + 1, needed)];
        }
    });

    return allQuestions;
};

export const ALL_QUESTIONS = generateFullDataset();