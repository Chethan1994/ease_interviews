import { CodingChallenge, Difficulty, Category } from '../../types';

export const CSS_CHALLENGES: CodingChallenge[] = [
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