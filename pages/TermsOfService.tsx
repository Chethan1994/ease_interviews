
import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white my-8 rounded-2xl shadow-sm border border-slate-100">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
      <p className="text-slate-500 mb-8">Effective Date: May 24, 2024</p>
      
      <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Agreement to Terms</h2>
          <p>By accessing our website at ease-interviews.vercel.app, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on Interview Prep Hub's website for personal, non-commercial transitory viewing only.</p>
          <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Interview Prep Hub at any time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Disclaimer</h2>
          <p>The materials on Interview Prep Hub's website are provided on an 'as is' basis. Interview Prep Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Limitations</h2>
          <p>In no event shall Interview Prep Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Interview Prep Hub's website.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Accuracy of Materials</h2>
          <p>The materials appearing on Interview Prep Hub's website could include technical, typographical, or photographic errors. Interview Prep Hub does not warrant that any of the materials on its website are accurate, complete or current.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Links</h2>
          <p>Interview Prep Hub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Interview Prep Hub of the site. Use of any such linked website is at the user's own risk.</p>
        </section>
      </div>
    </div>
  );
};
