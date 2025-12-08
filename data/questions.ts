
import { Category, Difficulty, Question } from '../types';

// New User Requested React Questions (Exact wording)
const NEW_REACT_QUESTIONS: Question[] = [
  {
    id: 'r-user-1',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'What is the use of function component compared to class component?',
    answer: 'Function components are simpler JavaScript functions that accept props and return React elements. Unlike class components, they do not have instances (`this`) or lifecycle methods (like `componentDidMount`), but with **Hooks** (introduced in React 16.8), they can manage state and side effects. They typically have less boilerplate and are easier to read and test.',
  },
  {
    id: 'r-user-2',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is HOC? Explain with an example. Have you used any inbuilt HOCs of react?',
    answer: 'A Higher-Order Component (HOC) is a function that takes a component and returns a new component, primarily used for reusing component logic.\n\n**Example**: `React.memo` is a built-in HOC used for performance optimization by memoizing a component based on its props. Other examples include `withRouter` (React Router v5) or `connect` (Redux).',
    codeSnippet: `const EnhancedComponent = higherOrderComponent(WrappedComponent);\n\n// Example: React.memo\nconst MyComponent = React.memo(function MyComponent(props) {\n  /* render using props */\n});`
  },
  {
    id: 'r-user-3',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'How do you handle error in react?',
    answer: 'React uses **Error Boundaries** to handle errors in the component tree. An Error Boundary is a class component that implements `static getDerivedStateFromError()` (to render a fallback UI) and `componentDidCatch()` (to log error info).\n\nNote: Error Boundaries do not catch errors inside event handlers, asynchronous code, or server-side rendering; standard `try/catch` is used there.',
    codeSnippet: `class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) { \n    logError(error, info); \n  }\n  render() {\n    return this.state.hasError ? <h1>Error.</h1> : this.props.children;\n  }\n}`
  },
  {
    id: 'r-user-4',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'Write a syntax for calling a POST API through any convenient library',
    answer: 'Using the native `fetch` API is a common way to make POST requests.',
    codeSnippet: `const postData = async (url, data) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  return response.json();\n};`
  },
  {
    id: 'r-user-5',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What are context APIs? When to use context API over redux?',
    answer: '**Context API** provides a way to pass data through the component tree without having to pass props down manually at every level.\n\n**Use Context** when: Data needs to be accessible by many components at different nesting levels (e.g., Theme, User Auth, Locale) and updates are low-frequency.\n**Use Redux** when: You have complex state logic, high-frequency updates, need middleware, time-travel debugging, or a single source of truth for a large application.',
  },
  {
    id: 'r-user-6',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'What is useref? Explain with syntax. Will useref re-render the component when updated?',
    answer: '`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument. It persists for the full lifetime of the component.\n\n**No**, updating `ref.current` does **not** trigger a re-render. It is commonly used to access DOM elements directly or store mutable values that don\'t affect the render output.',
    codeSnippet: `const inputRef = useRef(null);\nconst count = useRef(0);\n\n// Accessing DOM\n<input ref={inputRef} />\n\n// Updating value (no re-render)\ncount.current += 1;`
  },
  {
    id: 'r-user-7',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What method you follow to build responsive UI',
    answer: '1. **CSS Media Queries**: The standard way to apply styles based on viewport width.\n2. **Flexbox & Grid**: For fluid layouts.\n3. **Relative Units**: Using `rem`, `em`, `%`, `vw`, `vh` instead of fixed `px`.\n4. **CSS Frameworks**: Tailwind CSS or Bootstrap.\n5. **Mobile-First Approach**: Designing for mobile and scaling up.\n6. **React Hooks**: `useMediaQuery` for conditional rendering logic in JS (less preferred for layout than CSS).',
  },
  {
    id: 'r-user-8',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is webpack? Why is it used? What is the advantage?',
    answer: '**Webpack** is a static module bundler for modern JavaScript applications. It processes your application and builds a dependency graph, mapping every module your project needs and generating one or more bundles.\n\n**Advantages**:\n- Code Splitting (load chunks on demand).\n- Loaders (transform non-JS files like CSS, images, JSX).\n- Plugins (optimization, minification).\n- Hot Module Replacement (HMR) during development.',
  },
  {
    id: 'r-user-9',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is the advantage of using react query? Write a simple code to explain this',
    answer: 'React Query (TanStack Query) simplifies data fetching, caching, synchronization, and server state updates. It handles loading, error states, and automatic refetching out of the box, reducing the need for `useEffect` and global state for server data.',
    codeSnippet: `import { useQuery } from '@tanstack/react-query';\n\nfunction App() {\n  const { isLoading, error, data } = useQuery({\n    queryKey: ['repoData'],\n    queryFn: () =>\n      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>\n        res.json()\n      ),\n  });\n\n  if (isLoading) return 'Loading...';\n  return <div>{data.name}</div>;\n}`
  },
  {
    id: 'r-user-10',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between controlled and uncontrolled components? How do you modify DOM in both cases, explain with example',
    answer: '**Controlled**: Form data is handled by React component state. The source of truth is the state. DOM is updated via React render.\n**Uncontrolled**: Form data is handled by the DOM itself. You access values using Refs.',
    codeSnippet: `// Controlled\nconst [val, setVal] = useState('');\n<input value={val} onChange={e => setVal(e.target.value)} />\n\n// Uncontrolled\nconst inputRef = useRef();\n<input ref={inputRef} />\n// Access via inputRef.current.value`
  },
  {
    id: 'r-user-11',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is virtual DOM? What is diffing?',
    answer: '**Virtual DOM** is a programming concept where a virtual representation of the UI is kept in memory and synced with the "real" DOM. \n\n**Diffing** is the heuristic algorithm React uses to compare the new Virtual DOM tree with the previous one. React calculates the minimum number of steps needed to update the real DOM to match the new tree (Reconciliation).',
  },
  {
    id: 'r-user-12',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'What is react-fiber, explain the concepts of react-fiber',
    answer: '**React Fiber** is the new reconciliation engine in React 16. Its main goal is to enable **incremental rendering**.\n\n**Concepts**:\n- **Time Slicing**: Splitting work into chunks to avoid blocking the main thread.\n- **Prioritization**: Assigning priority to different types of updates (e.g., user input > data fetch).\n- **Suspense**: Ability to pause rendering while waiting for data.',
  },
  {
    id: 'r-user-13',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Difference between useeffect and uselayouteffect',
    answer: '- **useEffect**: Runs asynchronously **after** the render is painted to the screen. Good for data fetching, subscriptions.\n- **useLayoutEffect**: Runs synchronously **after** DOM mutations but **before** the browser paints. Good for measuring DOM layout (width/height) to avoid visual flickering.',
  },
  {
    id: 'r-user-14',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'Write a syntax for useTransition and explain the use of it',
    answer: '`useTransition` is a hook for Concurrent Mode that lets you update the state without blocking the UI. It marks state updates as "transitions" (low priority), allowing urgent updates (like typing) to interrupt them.',
    codeSnippet: `const [isPending, startTransition] = useTransition();\n\nfunction handleClick() {\n  startTransition(() => {\n    // This state update is marked as a transition\n    setTab('posts');\n  });\n}\n\nreturn isPending ? <Spinner /> : <TabContent />;`
  },
  {
    id: 'r-user-15',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'With syntax explain the use of React.memo, usememo and usecallback',
    answer: '- **React.memo**: HOC that memoizes a component to prevent re-renders if props don\'t change.\n- **useMemo**: Hook that memoizes a computed **value**.\n- **useCallback**: Hook that memoizes a **function** definition.',
    codeSnippet: `// React.memo\nconst MyComponent = React.memo((props) => <div>{props.data}</div>);\n\n// useMemo\nconst expensiveValue = useMemo(() => compute(a, b), [a, b]);\n\n// useCallback\nconst handleClick = useCallback(() => console.log('Click'), []);`
  },
  {
    id: 'r-user-16',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'How do you handle componentWillUnmount life cycle phase in function component',
    answer: 'You use the **cleanup function** returned by the `useEffect` hook. This function runs when the component unmounts (or before the effect re-runs).',
    codeSnippet: `useEffect(() => {\n  // ComponentDidMount logic\n  const timer = setInterval(() => {}, 1000);\n\n  // ComponentWillUnmount logic\n  return () => clearInterval(timer);\n}, []);`
  },
  {
    id: 'r-user-17',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Explain redux toolkit? What are the hooks used in it?',
    answer: '**Redux Toolkit (RTK)** is the official, opinionated toolset for efficient Redux development. It wraps the core Redux logic to reduce boilerplate (e.g., `configureStore`, `createSlice` which uses Immer for immutable updates).\n\n**Hooks** (from react-redux):\n- `useSelector`: Reads data from the store.\n- `useDispatch`: Returns the dispatch function.',
  },
  {
    id: 'r-user-18',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is the use of extrareducers in toolkit and write a syntax of the same',
    answer: '`extraReducers` allows a slice to respond to action types defined outside of its own reducers (e.g., actions from another slice or async thunks generated by `createAsyncThunk`).',
    codeSnippet: `const usersSlice = createSlice({\n  name: 'users',\n  initialState,\n  reducers: {},\n  extraReducers: (builder) => {\n    builder.addCase(fetchUser.fulfilled, (state, action) => {\n      state.users.push(action.payload);\n    });\n  },\n});`
  },
  {
    id: 'r-user-19',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'How does createAsynthunk work in toolkit?',
    answer: '`createAsyncThunk` accepts an action type string and a promise-returning callback. It automatically generates action creators for the promise lifecycle: `pending`, `fulfilled`, and `rejected`, which you can handle in your reducers.',
    codeSnippet: `const fetchUser = createAsyncThunk(\n  'users/fetchById',\n  async (userId) => {\n    const response = await api.getUser(userId);\n    return response.data;\n  }\n);`
  },
  {
    id: 'r-user-20',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'Which middlewear do you select between thunk and saga? Why?',
    answer: '- **Thunk**: Best for simple async logic (standard AJAX calls). Included in Redux Toolkit by default. Easier to learn.\n- **Saga**: Uses ES6 Generators. Best for complex async flows (e.g., cancelling requests, racing multiple requests, complex retry logic). Select based on complexity requirements.',
  },
  {
    id: 'r-user-21',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Write a code snippet to show how to abort an ongoing API call',
    answer: 'Use the `AbortController` API.',
    codeSnippet: `const controller = new AbortController();\nconst signal = controller.signal;\n\nfetch('/api/data', { signal })\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('Aborted');\n  });\n\n// To abort:\ncontroller.abort();`
  },
  {
    id: 'r-user-22',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between client side rendering and server side rendering?',
    answer: '- **CSR**: Browser downloads a minimal HTML and a large JS bundle. The JS constructs the DOM. Initial load is slower, subsequent navigation is fast.\n- **SSR**: Server generates full HTML for the page and sends it. Browser renders HTML immediately, then "hydrates" it with JS. Better for SEO and initial First Contentful Paint.',
  },
  {
    id: 'r-user-23',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'What is microfrontend? Explain briefly on webpack module federation',
    answer: '**Microfrontends** architecture splits a frontend app into smaller, independent applications (modules) that can be developed and deployed separately.\n\n**Module Federation** (Webpack 5 feature) allows a JavaScript application to dynamically load code from another application at runtime. It enables sharing dependencies (like React) to avoid loading them twice.',
  },
  {
    id: 'r-user-24',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'In package JSON, what is the difference between ~ and ^',
    answer: '- **~ (Tilde)**: Updates to the most recent patch version (e.g., `~1.2.3` matches `1.2.9` but not `1.3.0`).\n- **^ (Caret)**: Updates to the most recent minor version (non-breaking) (e.g., `^1.2.3` matches `1.9.0` but not `2.0.0`).',
  },
  {
    id: 'r-user-25',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is CORS? How to handle it?',
    answer: '**CORS (Cross-Origin Resource Sharing)** is a browser security feature that restricts web pages from making requests to a different domain than the one that served the web page.\n\n**Handling it**: \n1. Server-side: Add `Access-Control-Allow-Origin` headers.\n2. Dev: Use a proxy server.\n3. Client: CORS is a server-side control; the client cannot bypass it securely without server/proxy support.',
  },
  {
    id: 'r-user-26',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Which library do you use to handle application analytics? (explain on azure application insights feature)',
    answer: 'Common libraries include Google Analytics (`react-ga4`) or **Azure Application Insights**.\n\n**Azure App Insights**: Provides performance monitoring, exception tracking, request tracing, and logging. It automatically collects telemetry about dependencies (AJAX calls), page views, and exceptions in React apps via the `@microsoft/applicationinsights-react-js` plugin.',
  },
  {
    id: 'r-user-27',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'How do you handle secrets in your react application?',
    answer: 'React runs on the client, so **no secrets** (private API keys, passwords) are safe in the code. \n- Use environment variables (`REACT_APP_...`) for non-sensitive config (like public API keys).\n- For sensitive secrets, move the logic to a **Backend-for-Frontend (BFF)** or API proxy. The React app calls the backend, and the backend (secure server) calls the external service with the secret.',
  },
  {
    id: 'r-user-28',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'How do you improve the performance of the application while coding',
    answer: '1. **Memoization**: `React.memo`, `useMemo`, `useCallback` to prevent wasted renders.\n2. **Virtualization**: Use `react-window` for large lists.\n3. **Code Splitting**: `React.lazy` and `Suspense` to reduce bundle size.\n4. **Lazy Loading Images**.\n5. **Throttling/Debouncing** event handlers.\n6. **Key Props**: Use stable, unique keys for lists.',
  },
  {
    id: 'r-user-29',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Explain code splitting. What is the difference between lazy loading and useTransition hook',
    answer: '**Code Splitting**: Bundling code into smaller chunks that are loaded on demand (e.g., per route).\n\n**Difference**:\n- **Lazy Loading**: Delays loading the code/component until it is needed (reduces initial load time).\n- **useTransition**: Marks a state update as low priority to keep the UI responsive (improves interaction feel). It doesn\'t manage network loading of code itself.',
  },
  {
    id: 'r-user-30',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'After each new release build, how do you make sure browser reads the latest index file not the cached one',
    answer: '1. **Content Hashing**: Webpack/Vite appends a hash to filenames (e.g., `main.5f3a.js`). If content changes, hash changes.\n2. **Cache-Control Headers**: Configure the web server (Nginx/AWS CloudFront) to serve `index.html` with `Cache-Control: no-cache` or `must-revalidate`, ensuring the browser always checks for a new version of the entry point.',
  },
  {
    id: 'r-user-31',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is docker, how is it useful in deployment?',
    answer: '**Docker** is a platform for developing, shipping, and running applications in containers.\n\n**Usefulness**:\n- **Consistency**: "Works on my machine" guarantees. The container includes OS, libraries, and code.\n- **Isolation**: Apps run in isolated environments.\n- **Scalability**: Containers are lightweight and easy to spin up/down (orchestrated by Kubernetes).',
  },
];

// High-quality hand-curated questions (The "Head" of the data)
const BASE_QUESTIONS: Question[] = [
  // --- New React Questions First ---
  ...NEW_REACT_QUESTIONS,

  // --- JavaScript Top 30 (User Requested) ---
  {
    id: 'js-top-1',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. Closures are created every time a function is created, at function creation time.',
    codeSnippet: `function init() {\n  var name = "Mozilla"; // name is a local variable created by init\n  function displayName() { // displayName() is the inner function, a closure\n    alert(name); // use variable declared in the parent function\n  }\n  displayName();\n}\ninit();`
  },
  {
    id: 'js-top-2',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'Explain the Event Loop? Explain with examples',
    answer: 'The Event Loop is a mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded. It monitors the Call Stack and the Callback Queue. If the Call Stack is empty, it takes the first event from the queue and pushes it to the stack. It prioritizes Microtasks (Promises) over Macrotasks (setTimeout).',
  },
  {
    id: 'js-top-3',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is "hoisting" in JavaScript? – Example',
    answer: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of the current scope. Variables defined with `var` are hoisted and initialized with `undefined`. Variables defined with `let` and `const` are hoisted but remain in the "Temporal Dead Zone" until declared. Function declarations are fully hoisted.',
    codeSnippet: `console.log(x); // undefined\nvar x = 5;\n\nconsole.log(y); // ReferenceError\nlet y = 5;`
  },
  {
    id: 'js-top-4',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is a self-invoking (IIFE) function in JavaScript, and where is it used?',
    answer: 'An Immediately Invoked Function Expression (IIFE) is a function that runs as soon as it is defined. It is used to avoid polluting the global namespace, create a private scope for variables, and execute async code immediately.',
    codeSnippet: `(function () {\n  var privateVar = 'Secret';\n  console.log('Executed!');\n})();`
  },
  {
    id: 'js-top-5',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is generator function, why is it used?',
    answer: 'A generator function is a function that can pause execution and resume later, retaining its context. It is declared with `function*` and uses `yield` to pause. Generators are useful for implementing iterators, handling asynchronous streams, and managing state machines.',
    codeSnippet: `function* idMaker() {\n  var index = 0;\n  while (true)\n    yield index++;\n}\nvar gen = idMaker();\nconsole.log(gen.next().value); // 0`
  },
  {
    id: 'js-top-6',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'What are throttle and debounce? Explain the difference',
    answer: 'Both limit the rate of function execution.\n\n**Debounce**: Groups a sudden burst of events (like typing) into a single event. It waits for a pause before executing.\n\n**Throttle**: Ensures a function is called at most once in a specified time period (like scrolling), regardless of how often the event fires.',
  },
  {
    id: 'js-top-7',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'Explain call(), apply(), and bind().',
    answer: 'These methods allow you to set the `this` context for a function.\n- `call(thisArg, arg1, arg2)`: Invokes function immediately with arguments comma-separated.\n- `apply(thisArg, [args])`: Invokes function immediately with arguments as an array.\n- `bind(thisArg)`: Returns a NEW function with `this` permanently bound, without invoking it.',
  },
  {
    id: 'js-top-8',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is closure? Give a real world scenario where you can use closures',
    answer: 'Real-world scenarios for closures include:\n1. **Data Privacy**: Emulating private methods (Module Pattern).\n2. **Function Factories**: Creating functions with preset arguments (Currying).\n3. **Event Handlers**: Maintaining state in an asynchronous callback without global variables.',
    codeSnippet: `const makeCounter = () => {\n  let count = 0;\n  return () => count++; // 'count' is preserved\n};`
  },
  {
    id: 'js-top-9',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is event bubbling and event capturing',
    answer: '**Bubbling**: The event starts at the target element and bubbles up to the root (default behavior).\n**Capturing**: The event starts at the root and trickles down to the target.\n\nYou can control this using the third argument in `addEventListener` (`{capture: true}`).',
  },
  {
    id: 'js-top-10',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'What are spread and rest operators, explain with syntax',
    answer: 'Both use `...` syntax but for opposite purposes.\n\n**Spread**: Expands an iterable (array/string) into individual elements. Used in function calls or array literals.\n`[...arr1, ...arr2]`\n\n**Rest**: Collects multiple elements into a single array. Used in function parameter definitions.\n`function(a, ...args) { }`',
  },
  {
    id: 'js-top-11',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is shallow and deep copy? How can this be achieved?',
    answer: '**Shallow Copy**: Copies the top-level properties. Nested objects are still references. Achieved via `Object.assign({}, obj)` or `...` spread.\n\n**Deep Copy**: Recursively copies all levels, creating entirely new objects. Achieved via `JSON.parse(JSON.stringify(obj))` or `structuredClone(obj)`.',
  },
  {
    id: 'js-top-12',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is promise? What are the methods used?',
    answer: 'A Promise represents the eventual completion (or failure) of an asynchronous operation. \n\n**Methods**:\n- `.then()`: Handles success.\n- `.catch()`: Handles errors.\n- `.finally()`: Runs regardless of outcome.\n- `Promise.all()`: Waits for all.\n- `Promise.race()`: Waits for first.',
  },
  {
    id: 'js-top-13',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What are protypes?',
    answer: 'Prototypes are the mechanism by which JavaScript objects inherit features from one another. Every object has a prototype (accessible via `__proto__`), and the chain ends at `Object.prototype`. When accessing a property, JS looks up this chain.',
  },
  {
    id: 'js-top-14',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'Difference between let, var and char (scoping)',
    answer: 'Assuming "char" refers to `const` or typo (JS has no char type, only String). \n\n- **var**: Function scoped. Can be redeclared. Hoisted with `undefined`.\n- **let**: Block scoped. Cannot be redeclared in same scope. Hoisted but in TDZ.\n- **const**: Block scoped. Immutable reference (value can mutate if object). Hoisted but in TDZ.',
  },
  {
    id: 'js-top-15',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'Explain different time functions',
    answer: '1. `setTimeout(fn, ms)`: Executes a function once after a delay.\n2. `setInterval(fn, ms)`: Repeatedly executes a function with a fixed delay.\n3. `setImmediate(fn)`: Executes code at the end of the current event loop cycle (Node.js mostly).\n4. `requestAnimationFrame(fn)`: Schedules an update before the next repaint (Browser).',
  },
  {
    id: 'js-top-16',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What are the kinds of storages available?',
    answer: '1. **LocalStorage**: Persistent storage (5-10MB), survives browser restart.\n2. **SessionStorage**: Cleared when tab closes (5MB).\n3. **Cookies**: Sent with HTTP requests (4KB), has expiration.\n4. **IndexedDB**: Large-scale NoSQL storage for objects.',
  },
  {
    id: 'js-top-17',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'Difference between setInterval and setImmediate',
    answer: '`setInterval` schedules execution repeatedly after a minimum delay (time-based). `setImmediate` (Node.js specific) executes a callback after the current I/O phase of the event loop is completed, essentially "as soon as possible" but after the current code block, similar to `setTimeout(..., 0)` but distinct in the loop phase.',
  },
  {
    id: 'js-top-18',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'Give any 5 improvements in ES6 compared to ES5',
    answer: '1. Block scoping (`let`, `const`).\n2. Arrow Functions (`=>`).\n3. Template Literals (backticks).\n4. Destructuring Assignment.\n5. Modules (`import`/`export`).\n6. Classes.\n7. Promises.',
  },
  {
    id: 'js-top-19',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is temporal dead zone, give an example',
    answer: 'TDZ is the period between the start of a scope and the point where a variable is declared (for `let` and `const`). Accessing the variable in this zone throws a ReferenceError.',
    codeSnippet: `console.log(a); // ReferenceError (TDZ)\nlet a = 3;`
  },
  {
    id: 'js-top-20',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'What is garbage collection',
    answer: 'Garbage collection is the process of automatic memory management. The engine (like V8) finds objects that are no longer reachable from the "roots" (global variables, stack) and reclaims their memory. The common algorithm used is "Mark-and-Sweep".',
  },
  {
    id: 'js-top-21',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'How do you tackle memory leak issues?',
    answer: '1. Avoid global variables.\n2. Clear timers (`clearInterval`/`clearTimeout`) when done.\n3. Remove event listeners when elements are removed.\n4. Nullify references to large objects/DOM nodes.\n5. Use WeakMap/WeakSet for cache-like structures.',
  },
  {
    id: 'js-top-22',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'Difference between preventDefault and stopPropogation',
    answer: '`preventDefault()` stops the browser\'s default behavior for an event (e.g., stopping a form submission or a link navigation). `stopPropagation()` prevents the event from bubbling up the DOM tree, so parent handlers won\'t be notified.',
  },
  {
    id: 'js-top-23',
    category: Category.JavaScript,
    difficulty: Difficulty.Easy,
    question: 'Logical Reasoning: What is the use of async keyword? Normally Async returns promise response, then what is the output of below function?',
    answer: 'The output is a **Promise**. Even if an async function returns a static string, it is automatically wrapped in `Promise.resolve("Hello World")`. You must `await` it or use `.then()` to access the string value.',
    codeSnippet: `const getData = async () => "Hello World";\n// returns Promise<"Hello World">`
  },
  {
    id: 'js-top-24',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'What is the output of below code? Explain why?',
    codeSnippet: `console.log('Start');\nsetTimeout(() => console.log('setTimeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\n(async () => {\n  await Promise.resolve();\n  console.log('async/await');\n})();\nconsole.log('End');`,
    answer: '**Order**: Start -> End -> Promise -> async/await -> setTimeout.\n\n**Reason**: Synchronous code runs first ("Start", "End"). Then Microtasks (Promises, async/await resume) run before Macrotasks (setTimeout).',
  },
  {
    id: 'js-top-25',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is the output of below code where variable and function has same name as “val”?',
    codeSnippet: `var val = 1;\nfunction val() { console.log("ok") }\nval();`,
    answer: '**Output**: TypeError: val is not a function.\n\n**Reason**: Function declarations are hoisted first. Then `var val` is hoisted. During execution, `val` is assigned `1` (number). Trying to call `1()` throws a TypeError. If `let` was used, it would throw a SyntaxError for redeclaration in the same scope.',
  },
  {
    id: 'js-top-26',
    category: Category.JavaScript,
    difficulty: Difficulty.Hard,
    question: 'What would be output of above code? Explain.',
    codeSnippet: `function getData() { console.log("Value is " + this.value) }\nconst data1 = getData();\nconst data2 = new getData();`,
    answer: '`getData()`: `this` refers to global window (or undefined in strict mode), likely logs "Value is undefined".\n`new getData()`: `this` refers to the new object instance being created. Logs "Value is undefined" (since value isn\'t set on the instance) but `data2` becomes an empty object `{}`.',
  },
  {
    id: 'js-top-27',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is the difference between promise.all and promise.allsettled, explain with example',
    answer: '`Promise.all` fails fast; if one promise rejects, the entire call rejects. `Promise.allSettled` waits for all promises to finish regardless of success or failure, and returns an array of objects describing the outcome of each.',
  },
  {
    id: 'js-top-28',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is DOM? How does it work? What is a tree traverse?',
    answer: 'DOM (Document Object Model) is a tree-like representation of the HTML document. The browser parses HTML into DOM nodes. JavaScript manipulates this tree. Tree traversal refers to navigating between nodes (parent, child, sibling) using properties like `parentNode`, `childNodes`, `nextSibling`.',
  },
  {
    id: 'js-top-29',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'What is the output of below line of code',
    codeSnippet: `NaN === NaN // false\n"" === 0 // false (strict)\n"1" + "1" // "11"\n1 + "1" // "11"\n'b' + 'a' + + 'a' + 'a' // "baNaNa"`,
    answer: '1. NaN is not equal to anything, even itself.\n2. Strict equality checks type.\n3. String concatenation.\n4. Number is coerced to string.\n5. `+ + "a"` coerces "a" to NaN. Result: "b" + "a" + NaN + "a".',
  },
  {
    id: 'js-top-30',
    category: Category.JavaScript,
    difficulty: Difficulty.Medium,
    question: 'hat is a self-invoking (IIFE) function in JavaScript, and where is it used?',
    answer: '(Duplicate of Q4) An IIFE is a function that runs as soon as it is defined. It creates a lexical scope for variables to prevent global namespace pollution.',
    codeSnippet: `(function(){})();`
  },

  // --- Other JavaScript Questions ---
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

  // --- React (Existing Questions, pushed down) ---
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
  {
    id: 'r-11',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'What is a bundler, and how do Webpack and Vite differ?',
    answer: 'A bundler compiles JS/CSS modules into a single (or few) files for the browser. Webpack bundles the entire application before serving, which can be slow for large apps. Vite uses native ES Modules (ESM) to serve files on demand during development (instant start) and uses Rollup for highly optimized production builds.',
  },
  {
    id: 'r-12',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Which compiler is used internally by React?',
    answer: 'React itself doesn\'t have a built-in compiler, but it relies on **Babel** (or SWC/TypeScript) to transform JSX syntax into `React.createElement` calls (or `_jsx` calls in modern runtimes) that browsers can understand.',
  },
  {
    id: 'r-13',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What does "type": "module" in package.json indicate?',
    answer: 'It instructs Node.js to treat `.js` files as **ES Modules** (using `import`/`export`) instead of CommonJS (using `require`/`module.exports`). This aligns the backend environment closer to modern browser standards.',
  },
  {
    id: 'r-14',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'What do the ^ and ~ symbols mean in package.json version numbers?',
    answer: '`^` (caret) allows upgrades that do not change the left-most non-zero digit (compatible with minor updates, e.g., ^1.2.3 allows 1.3.0 but not 2.0.0). `~` (tilde) allows upgrades to the patch version only (e.g., ~1.2.3 allows 1.2.9 but not 1.3.0).',
  },
  {
    id: 'r-15',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is the purpose of createRoot in react-dom?',
    answer: '`createRoot` is the entry point for React 18+. Unlike the legacy `render`, it enables **Concurrent Mode** features (like automatic batching, `useTransition`, and `Suspense`), allowing React to interrupt rendering to handle high-priority events.',
    codeSnippet: `// Old\nReactDOM.render(<App />, root);\n\n// New (React 18)\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<App />);`
  },
  {
    id: 'r-16',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What are controlled vs uncontrolled components?',
    answer: 'In **Controlled** components, form data is handled by React state (single source of truth). In **Uncontrolled** components, form data is handled by the DOM itself, accessed via Refs. Use Controlled for validation/dynamic inputs; Uncontrolled for simple forms or integrating with non-React libs.',
    codeSnippet: `// Controlled\n<input value={val} onChange={e => setVal(e.target.value)} />\n\n// Uncontrolled\n<input ref={inputRef} />`
  },
  {
    id: 'r-17',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'When would you use useReducer over useState?',
    answer: 'Use `useReducer` when state logic is complex, involves multiple sub-values, or when the next state depends on the previous one. It is also cleaner for state transitions based on specific actions (similar to Redux) rather than raw value setters.',
  },
  {
    id: 'r-18',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'Explain the diffing algorithm used during reconciliation.',
    answer: 'React compares the new Virtual DOM tree with the old one. It uses heuristics to be O(n): 1. Two elements of different types produce different trees (full teardown). 2. The developer can hint which child elements may be stable across renders using a `key` prop.',
  },
  {
    id: 'r-19',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Why is the entry point a JS file calling render instead of an HTML file?',
    answer: 'React is a JavaScript-driven library (Single Page Application). The HTML file is just a static shell (container). JavaScript takes over to dynamically generate and manipulate the DOM nodes inside that shell based on the application state.',
  },
  {
    id: 'r-20',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'In an uncontrolled component, do we modify the real DOM or Virtual DOM?',
    answer: 'Uncontrolled components interact directly with the **Real DOM**. When you use a Ref to get a value (`ref.current.value`), you are querying the browser\'s actual DOM node, bypassing React\'s state management/Virtual DOM for that specific interaction.',
  },
  {
    id: 'r-21',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is Redux and why is it needed?',
    answer: 'Redux is a pattern and library for managing and updating application state using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, solving the "prop drilling" problem.',
  },
  {
    id: 'r-22',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What are the three core principles of Redux?',
    answer: '1. **Single Source of Truth**: The state of the whole app is stored in an object tree within a single store.\n2. **State is Read-Only**: The only way to change the state is to emit an action.\n3. **Changes are made with Pure Functions**: Reducers specify how the state tree is transformed by actions.',
  },
  {
    id: 'r-23',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'Difference between Redux state management and React Context?',
    answer: 'Context is designed for dependency injection (passing data down) and can lead to performance issues if not optimized (renders all consumers on change). Redux is a state management tool offering middleware, time-travel debugging, dev tools, and performance optimizations (selectors) out of the box.',
  },
  {
    id: 'r-24',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What problem does Redux Toolkit (RTK) solve?',
    answer: 'RTK addresses the three common concerns about Redux: "Configuring a store is too complicated", "I have to add a lot of packages (Thunk, Immer, DevTools)", and "Redux requires too much boilerplate code". It provides standardized best practices.',
  },
  {
    id: 'r-25',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'Why does RTK allow mutating state inside reducers?',
    answer: 'RTK uses **Immer** internally. Immer detects changes to a "draft state" and produces a brand new immutable state based on those changes. This allows you to write simpler "mutating" logic (`state.value = 123`) while keeping Redux strictly immutable under the hood.',
  },
  {
    id: 'r-26',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is createAsyncThunk?',
    answer: '`createAsyncThunk` is a function that accepts a Redux action type string and a callback function that returns a promise. It automatically generates action creators for `pending`, `fulfilled`, and `rejected` states to handle async logic standardly.',
    codeSnippet: `const fetchUser = createAsyncThunk(\n  'users/fetchById',\n  async (userId, thunkAPI) => {\n    const response = await userAPI.fetchById(userId)\n    return response.data\n  }\n)`
  },
  {
    id: 'r-27',
    category: Category.React,
    difficulty: Difficulty.Easy,
    question: 'What is the difference between useSelector and useDispatch?',
    answer: '`useSelector` is a hook to read data from the Redux store state (subscribing to updates). `useDispatch` returns the store\'s dispatch function to let you dispatch actions to trigger state changes.',
  },
  {
    id: 'r-28',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'What is the purpose of memoization in useSelector?',
    answer: '`useSelector` runs after every dispatch. If it returns a new object reference every time, it forces the component to re-render. Memoization (using libraries like Reselect) ensures the selector only recalculates if the input arguments change, preventing unnecessary re-renders.',
  },
  {
    id: 'r-29',
    category: Category.React,
    difficulty: Difficulty.Medium,
    question: 'What is Redux Middleware?',
    answer: 'Middleware provides a third-party extension point between dispatching an action and the moment it reaches the reducer. Examples include logging, crash reporting, performing asynchronous tasks (Thunks/Sagas), and routing.',
  },
  {
    id: 'r-30',
    category: Category.React,
    difficulty: Difficulty.Hard,
    question: 'What is Redux Saga and how does it differ from Thunk?',
    answer: 'Redux Thunk allows action creators to return a function (for simple async promises). Redux Saga uses ES6 **Generators** to make asynchronous flows easier to read, write, and test. Sagas are better for complex logic like "cancel previous request if new one comes in" (debouncing/throttling effects).',
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
    codeSnippet: `// Interface: Better for Objects/Classes & Merging\ninterface IPoint { x: number; y: number; }\n\n// Type: Better for Unions/Primitives\ntype ID = string | number;\ntype Coordinate = [x: number, y: number];`
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
    codeSnippet: `function isUser(data: unknown): data is User {\n  return (\n    typeof data === 'object' &&\n    data !== null &&\n    'id' in data &&\n    typeof (data as User).id === 'number'\n  );\n}\n\n// Usage\nconst data = await api.get();\nif (isUser(data)) { ... }`
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
    codeSnippet: `interface Config {\n  readonly apiUrl: string;\n}\n\nconst config: Config = { apiUrl: 'https://api.com' };\n// config.apiUrl = 'http://localhost'; // Error: Cannot assign to 'apiUrl' because it is a read-only property.`
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
    codeSnippet: `abstract class Payment {\n  // Implementation shared by subclasses\n  validate() { return true; }\n  \n  // Contract subclasses MUST implement\n  abstract process(): void;\n}\n\nclass Stripe extends Payment {\n  process() { console.log('Stripe'); }\n}`
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
  {
    id: 'ts-23',
    category: Category.TypeScript,
    difficulty: Difficulty.Medium,
    question: 'In TypeScript, is it possible to override the type of a variable after declaration?',
    answer: 'Strictly speaking, no. If you define `let name: string`, you cannot assign a number to it. However, you can use Type Assertions (`as`) to override the compiler\'s inference. Example: `name = 123 as any`. While `name = 123 as number` is not valid for a string variable, asserting to `any` or `unknown` first allows the assignment, though it defeats type safety.',
    codeSnippet: `let name: string = "Chethan";\n// name = 123; // Error\n\n// Solution (Use with caution):\nname = 123 as unknown as string; // Force compiler to accept`
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
  {
    id: 'node-11',
    category: Category.NodeJS,
    difficulty: Difficulty.Medium,
    question: 'In Express, is there an alternative to defining app.get() and app.post() separately for the same route?',
    answer: 'Yes, you can use `app.route()`. This allows you to create a chainable route handler for a specific path, reducing redundancy.',
    codeSnippet: `app.route('/events')\n  .get((req, res) => { ... })\n  .post((req, res) => { ... });\n\n// Or use app.all() for all methods`
  },
  {
    id: 'node-12',
    category: Category.NodeJS,
    difficulty: Difficulty.Medium,
    question: 'Should the common error handler middleware be defined before or after routes?',
    answer: 'Error handling middleware MUST be defined **after** all the route definitions. If defined before, the routes will execute without ever passing control to the error handler (unless specifically called), and errors thrown within routes won\'t be caught by it.',
    codeSnippet: `app.use('/api', routes);\n\n// Error handler comes last\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).send('Something broke!');\n});`
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
