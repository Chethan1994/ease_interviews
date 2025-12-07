import { CodingChallenge, Difficulty, Category } from '../../types';

export const NEXT_CHALLENGES: CodingChallenge[] = [
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
  }
];