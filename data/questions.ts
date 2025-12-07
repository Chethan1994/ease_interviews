
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

  // --- Next.js ---
  {
    id: 'next-1',
    category: Category.NextJS,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between getStaticProps and getServerSideProps?',
    answer: '`getStaticProps` runs at build time to pre-render a page. It is used for Static Site Generation (SSG). `getServerSideProps` runs on every request to render the page on the server. It is used for Server-Side Rendering (SSR) when data must be up-to-date for every request.',
  },
  {
    id: 'next-2',
    category: Category.NextJS,
    difficulty: Difficulty.Medium,
    question: 'Explain the difference between the App Router and Pages Router.',
    answer: 'The Pages Router uses a file-system based router built on the `pages` directory. The App Router (introduced in v13) uses the `app` directory and features Server Components by default, nested layouts, streaming, and better support for data fetching co-location.',
  },
  {
    id: 'next-3',
    category: Category.NextJS,
    difficulty: Difficulty.Hard,
    question: 'What are React Server Components (RSC) in Next.js?',
    answer: 'Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client. They have direct access to the backend infrastructure (databases, files) and do not support client-side hooks like useState or useEffect unless marked with "use client".',
  },
  {
    id: 'next-4',
    category: Category.NextJS,
    difficulty: Difficulty.Easy,
    question: 'How does the Image component in Next.js optimize images?',
    answer: 'The `next/image` component automatically serves correctly sized images for each device, uses modern formats like WebP/AVIF, prevents Layout Shift, and lazy loads images by default.',
  },
  {
    id: 'next-5',
    category: Category.NextJS,
    difficulty: Difficulty.Medium,
    question: 'What is ISR (Incremental Static Regeneration)?',
    answer: 'ISR allows you to create or update static pages after you’ve built your site. By setting a `revalidate` time in `getStaticProps`, Next.js can regenerate the page in the background when a request comes in, allowing static content to be dynamic.',
  },
  {
    id: 'next-6',
    category: Category.NextJS,
    difficulty: Difficulty.Medium,
    question: 'How do Dynamic Routes work in Next.js?',
    answer: 'Dynamic routes are defined by wrapping a folder or file name in brackets, e.g., `pages/post/[id].js` or `app/blog/[slug]/page.js`. The parameters are then accessible via the router query object or props.',
  },
  {
    id: 'next-7',
    category: Category.NextJS,
    difficulty: Difficulty.Easy,
    question: 'What is the purpose of the "use client" directive?',
    answer: 'The "use client" directive declares a boundary between Server and Client Component modules graph. When placed at the top of a file, it tells Next.js that this module and its dependencies should be run on the client, enabling hooks like `useState` and event listeners.',
  },
  {
    id: 'next-8',
    category: Category.NextJS,
    difficulty: Difficulty.Medium,
    question: 'What is Middleware in Next.js?',
    answer: 'Middleware allows you to run code before a request is completed. Based on the incoming request, you can rewrite, redirect, modify the request or response headers, or respond directly. It runs on the Edge runtime.',
  },
  {
    id: 'next-9',
    category: Category.NextJS,
    difficulty: Difficulty.Hard,
    question: 'How does Next.js handle API Routes?',
    answer: 'Next.js allows you to build a public API within the application using the `pages/api` directory (Pages Router) or Route Handlers in `app/api/.../route.js` (App Router). These run as serverless functions (Lambdas) in production.',
  },
  {
    id: 'next-10',
    category: Category.NextJS,
    difficulty: Difficulty.Easy,
    question: 'How do you navigate between pages in Next.js?',
    answer: 'You use the `<Link>` component from `next/link`. It enables client-side transitions between routes, meaning the browser does not reload the page. For programmatic navigation, you use the `useRouter` hook.',
  },

  // --- TypeScript ---
  {
    id: 'ts-1',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'When would you use an interface over a type, and vice-versa, in a large-scale application?',
    answer: 'Use `interface` for defining public APIs of libraries or when you need declaration merging (extending existing types). Use `type` for unions, intersections, primitives, tuples, or complex computed types. In general, `type` is more flexible, while `interface` is better for OOP-style class implementation.',
  },
  {
    id: 'ts-2',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you merge two interfaces? Can you merge two types?',
    answer: 'Interfaces with the same name in the same scope automatically merge (Declaration Merging). Types cannot be merged this way; attempting to define the same type name twice throws an error. However, types can be combined using Intersection (`&`).',
    codeSnippet: `// Interface Merging\ninterface User { name: string }\ninterface User { age: number }\n// User now has both name and age\n\n// Type Intersection\ntype A = { x: number };\ntype B = { y: number };\ntype C = A & B;`
  },
  {
    id: 'ts-3',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'What are Partial<T>, Pick<T>, Omit<T>, and Record<K,T>?',
    answer: '`Partial<T>` makes all properties optional. `Pick<T, K>` selects specific keys. `Omit<T, K>` removes specific keys. `Record<K, T>` creates an object type with keys K and values T.',
    codeSnippet: `interface User { id: number; name: string; email: string; }\n\ntype UpdateUser = Partial<User>; // For patch requests\ntype UserSummary = Pick<User, 'id' | 'name'>; // For lists\ntype UserWithoutSensitive = Omit<User, 'email'>;\ntype UserCache = Record<number, User>; // ID -> User map`
  },
  {
    id: 'ts-4',
    category: Category.TypeScript,
    difficulty: Difficulty.Hard,
    question: 'How do you create a type-safe API response model for nested objects?',
    answer: 'You can use generics to define a standard wrapper around variable data types.',
    codeSnippet: `interface ApiResponse<T> {\n  status: 'success' | 'error';\n  code: number;\n  data: T;\n  error?: string;\n}\n\n// Usage\ntype UserResponse = ApiResponse<{ user: User }>;`
  },
  {
    id: 'ts-5',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you create a type for a dynamic object where keys come from an enum?',
    answer: 'You can use a Mapped Type with the `in` operator iterating over the keys of the enum.',
    codeSnippet: `enum Status { Pending, Active, Inactive }\n\ntype StatusLabels = {\n  [key in Status]: string;\n};\n\nconst labels: StatusLabels = {\n  [Status.Pending]: 'Waiting...',\n  [Status.Active]: 'Online',\n  [Status.Inactive]: 'Offline',\n};`
  },
  {
    id: 'ts-6',
    category: Category.TypeScript,
    difficulty: Difficulty.Hard,
    question: 'How do you define a type that ensures at least one property is required from a set?',
    answer: 'You can use a utility type that intersects `Partial<T>` with a union of types where at least one key is required.',
    codeSnippet: `type RequireAtLeastOne<T> = {\n  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>\n}[keyof T];\n\ninterface Config { text: string; color: string; }\ntype ValidConfig = RequireAtLeastOne<Config>;`
  },
  {
    id: 'ts-7',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you create a type that excludes null and undefined?',
    answer: 'The `NonNullable<T>` utility type removes `null` and `undefined` from a type T.',
    codeSnippet: `type MaybeString = string | null | undefined;\ntype DefinitelyString = NonNullable<MaybeString>; // string`
  },
  {
    id: 'ts-8',
    category: Category.TypeScript,
    difficulty: Difficulty.Easy,
    question: 'What are generics and why are they useful? Provide a practical example.',
    answer: 'Generics allow you to create reusable components/functions that work with a variety of types while retaining type safety.',
    codeSnippet: `// API Service\nasync function get<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  return res.json();\n}\n\n// React Component\ninterface Props<T> { items: T[], render: (item: T) => React.ReactNode }\nfunction List<T>({ items, render }: Props<T>) { ... }`
  },
  {
    id: 'ts-9',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you create a generic constraint?',
    answer: 'Use the `extends` keyword to restrict the types a generic can accept.',
    codeSnippet: `interface HasId { id: number; }\n\nfunction getKey<T extends HasId>(item: T): number {\n  return item.id;\n}`
  },
  {
    id: 'ts-10',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you write a generic function that accepts an array and returns the first element with the correct type?',
    answer: 'Define the generic type `T` for the array elements and return type.',
    codeSnippet: `function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst n = first([1, 2, 3]); // number`
  },
  {
    id: 'ts-11',
    category: Category.TypeScript,
    difficulty: Difficulty.Easy,
    question: 'What is type narrowing? Show examples.',
    answer: 'Type narrowing is the process of moving from a less precise type to a more precise type within a conditional block.',
    codeSnippet: `function process(val: string | number) {\n  if (typeof val === 'string') {\n    val.toUpperCase(); // string\n  } else {\n    val.toFixed(2); // number\n  }\n}\n\n// 'in' operator\nif ('role' in user) { ... }\n\n// instanceof\nif (date instanceof Date) { ... }`
  },
  {
    id: 'ts-12',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you write a type guard function for checking API success response vs error response?',
    answer: 'Use a custom type guard with the `is` keyword return type.',
    codeSnippet: `interface Success { data: string }\ninterface Error { error: string }\ntype Response = Success | Error;\n\nfunction isSuccess(res: Response): res is Success {\n  return (res as Success).data !== undefined;\n}`
  },
  {
    id: 'ts-13',
    category: Category.TypeScript,
    difficulty: Difficulty.Hard,
    question: 'Explain function overloading in TypeScript.',
    answer: 'Function overloading allows you to define multiple function signatures for a single implementation to handle different parameter combinations type-safely.',
    codeSnippet: `function getUser(id: number): User;\nfunction getUser(email: string): User;\nfunction getUser(param: number | string): User {\n  if (typeof param === 'number') return findById(param);\n  return findByEmail(param);\n}`
  },
  {
    id: 'ts-14',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you enforce type safety for function arguments coming from external data?',
    answer: 'TypeScript types disappear at runtime, so you need runtime validation. Libraries like Zod, Yup, or manual "User Defined Type Guards" validate that the external data matches the expected TS type.',
  },
  {
    id: 'ts-15',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you use private, protected, and public in a real application?',
    answer: '`public` (default) allows access anywhere. `private` restricts access to the class itself. `protected` allows access to the class and its subclasses.',
    codeSnippet: `class Service {\n  private apiKey: string;\n  constructor(key: string) { this.apiKey = key; }\n  \n  public async fetchData() {\n    // Can access this.apiKey\n  }\n}`
  },
  {
    id: 'ts-16',
    category: Category.TypeScript,
    difficulty: Difficulty.Easy,
    question: 'What is the practical use of readonly fields?',
    answer: 'The `readonly` modifier ensures that a property can only be assigned during initialization or in the constructor, preventing accidental mutation of immutable data.',
  },
  {
    id: 'ts-17',
    category: Category.TypeScript,
    difficulty: Difficulty.Hard,
    question: 'How do you implement dependency injection patterns using classes?',
    answer: 'Define dependencies as interfaces, then inject concrete classes via the constructor. This decouples logic and makes testing easier.',
    codeSnippet: `interface ILogger { log(msg: string): void }\n\nclass UserService {\n  constructor(private logger: ILogger) {}\n  \n  save() {\n    this.logger.log('Saved');\n  }\n}`
  },
  {
    id: 'ts-18',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do abstract classes differ from interfaces?',
    answer: 'Interfaces only define the contract (structure). Abstract classes can define the contract AND provide implementation details for some methods. You cannot instantiate an abstract class directly.',
  },
  {
    id: 'ts-19',
    category: Category.TypeScript,
    difficulty: Difficulty.Easy,
    question: 'What is the purpose of tsconfig.json?',
    answer: 'It specifies the root files and the compiler options required to compile the project, such as target JavaScript version, strictness settings, and module resolution strategies.',
  },
  {
    id: 'ts-20',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'What does strict: true enable, and why is it recommended?',
    answer: '`strict: true` enables a suite of strict type checking options, including `noImplicitAny`, `strictNullChecks`, and `strictFunctionTypes`. It guarantees higher type safety and catches more bugs at compile time.',
  },
  {
    id: 'ts-21',
    category: Category.TypeScript,
    difficulty: Difficulty.Hard,
    question: 'What is the difference between "module": "esnext" and "moduleResolution": "node"?',
    answer: '`module: esnext` controls the output format of the modules (using `import`/`export`). `moduleResolution: node` tells the compiler how to find imported modules (following Node.js resolution logic, looking in `node_modules`).',
  },
  {
    id: 'ts-22',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'How do you set up path aliases in TypeScript and why?',
    answer: 'Path aliases are configured in `tsconfig.json` under `compilerOptions.paths`. They allow you to import files using absolute paths (e.g., `@components/Button`) instead of relative paths (`../../components/Button`), making refactoring easier.',
    codeSnippet: `"paths": {\n  "@components/*": ["src/components/*"],\n  "@utils/*": ["src/utils/*"]\n}`
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
  {
    id: 'js-7',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is a self-invoking (IIFE) function in JavaScript, and where is it used?',
    answer: 'An Immediately Invoked Function Expression (IIFE) is a JavaScript function that runs as soon as it is defined. It is primarily used to create a private scope for variables to avoid polluting the global namespace.',
    codeSnippet: `(function () {\n  var privateVar = 'I am private';\n  console.log(privateVar);\n})();\n\n// console.log(privateVar); // Uncaught ReferenceError`
  },
  {
    id: 'js-8',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'What are throttle and debounce? Explain the difference.',
    answer: 'Debouncing ensures that a function is not called again until a certain amount of time has passed since the last call (e.g., waiting for a user to stop typing before searching). Throttling ensures that a function is called at most once in a specified time period (e.g., firing a scroll event handler only every 100ms).',
  },
  {
    id: 'js-9',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is memoization in JavaScript?',
    answer: 'Memoization is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.',
    codeSnippet: `const memoizedAdd = () => {\n  let cache = {};\n  return (n) => {\n    if (n in cache) return cache[n];\n    else {\n      let result = n + 10;\n      cache[n] = result;\n      return result;\n    }\n  }\n}`
  },
  {
    id: 'js-10',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between CommonJS (CJS) and ES Modules (ESM)?',
    answer: 'CommonJS (CJS) is the default in Node.js and uses `require()` and `module.exports` (synchronous loading). ES Modules (ESM) is the standard for JavaScript modules, using `import` and `export` (asynchronous, tree-shakeable). .mjs files explicitly denote ESM in Node.js.',
  },
  {
    id: 'js-11',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'What are the major differences between ES5 and ES6?',
    answer: 'ES6 introduced significant improvements: `let` and `const` for block scoping, Arrow functions (`=>`), Template Literals (`` ` ``), Default Parameters, Destructuring Assignment, Modules (`import/export`), Promises, and Classes.',
  },
  {
    id: 'js-12',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'Explain the defer and async attributes in the <script> tag.',
    answer: '`async` downloads the script in parallel to HTML parsing and executes it as soon as it loads (blocking HTML parsing during execution). `defer` also downloads in parallel but waits to execute the script until after the HTML parsing is complete. Use `defer` for scripts that rely on the DOM.',
  },
  {
    id: 'js-13',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'How can you abort an API call while it is still in progress?',
    answer: 'You can use the `AbortController` interface. Create a controller instance, pass its `signal` property to the fetch request options, and call `controller.abort()` when you want to cancel the request.',
    codeSnippet: `const controller = new AbortController();\nconst signal = controller.signal;\n\nfetch('/api/data', { signal })\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('Fetch aborted');\n  });\n\n// Cancel request\ncontroller.abort();`
  },
  {
    id: 'js-14',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between prototype properties and instance properties?',
    answer: 'Instance properties are defined inside the constructor and are unique to each object instance. Prototype properties are defined on the `prototype` object and are shared across all instances of that class, saving memory.',
  },
  {
    id: 'js-15',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'Explain inheritance in JavaScript and the role of constructor functions.',
    answer: 'In ES5, inheritance is achieved via the Prototype Chain. A Child constructor calls the Parent constructor using `Parent.call(this, args)` to inherit properties. Methods are inherited by linking prototypes: `Child.prototype = Object.create(Parent.prototype)`.',
  },
  {
    id: 'js-16',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'How many ways can you define a function in JavaScript?',
    answer: 'Common ways include: Function Declaration (`function foo(){}`), Function Expression (`const foo = function(){}`), Arrow Function (`const foo = () => {}`), Constructor (`new Function()`), and Method definition inside objects/classes.',
  },
  {
    id: 'js-17',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'What causes memory leaks in JavaScript and how does garbage collection work?',
    answer: 'Memory leaks occur when objects are no longer needed but are still referenced (e.g., global variables, uncleared intervals, closures, detached DOM nodes). JavaScript uses a "Mark-and-Sweep" algorithm: it starts from the root (window/global) and marks reachable objects; anything unreachable is garbage collected.',
  },
  {
    id: 'js-18',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is callback hell and what are the solutions?',
    answer: 'Callback hell refers to deeply nested callbacks (the "Pyramid of Doom") making code hard to read and debug. Solutions include: Modularization (named functions), Promises (`.then()` chaining), and modern `async/await`.',
  },
  {
    id: 'js-19',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'Give a real-world example of a closure.',
    answer: 'Closures are often used for data privacy (emulating private methods) and partial application. For example, an event handler needing access to variables from its parent scope even after the parent function has returned.',
    codeSnippet: `function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`
  },
  {
    id: 'js-20',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'Explain call(), apply(), and bind().',
    answer: '`call()` invokes a function with a specific `this` context and arguments passed individually. `apply()` is similar but takes arguments as an array. `bind()` returns a NEW function with `this` permanently bound, without invoking it immediately.',
    codeSnippet: `const person = { name: 'Alice' };\nfunction say(greeting) { console.log(greeting, this.name); }\n\nsay.call(person, 'Hello');\nsay.apply(person, ['Hi']);\nconst boundSay = say.bind(person);\nboundSay('Hola');`
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
    [Category.NextJS]: [
        'App Router Directory Structure', 'Loading UI', 'Streaming', 'Data Fetching Caching',
        'Static Site Generation (SSG)', 'Dynamic Routes', 'API Routes', 'Middleware Matchers',
        'Next.js Config', 'Environment Variables', 'Image Component Props', 'Font Optimization',
        'Script Component', 'Metadata API (SEO)', 'Route Handlers', 'Edge Runtime',
        'Server Actions', 'TurboPack', 'Client vs Server Components', 'Hydration',
        'Parallel Routes', 'Intercepting Routes', 'Internationalization (i18n)', 'Deployment on Vercel',
        'next/navigation hooks', 'Global CSS vs CSS Modules', 'Tailwind with Next.js'
    ],
    [Category.TypeScript]: [
        'Interfaces vs Types', 'Generics', 'Utility Types (Partial, Pick)', 'Type Guards',
        'Enums vs Const Objects', 'Module augmentation', 'Decorators', 'Mixins',
        'Abstract Classes', 'readonly modifier', 'keyof operator', 'typeof operator',
        'Mapped Types', 'Conditional Types', 'Infer keyword', 'Tuple types',
        'Unknown vs Any', 'Never type', 'Void vs Never', 'Definite Assignment Assertion (!)',
        'Optional Chaining', 'Nullish Coalescing', 'Type assertions (as)', 'Namespace vs Module'
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