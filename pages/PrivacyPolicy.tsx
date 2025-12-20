
import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white my-8 rounded-2xl shadow-sm border border-slate-100">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
      <p className="text-slate-500 mb-8">Last updated: May 24, 2024</p>
      
      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introduction</h2>
          <p className="text-slate-600">Welcome to Interview Prep Hub. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Data We Collect</h2>
          <p className="text-slate-600">We may collect, use, store and transfer different kinds of personal data about you, including:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
            <li><strong>Identity Data:</strong> Includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> Includes email address.</li>
            <li><strong>Technical Data:</strong> Includes IP address, login data, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data:</strong> Includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">3. How We Use Your Data</h2>
          <p className="text-slate-600">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-600">
            <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
            <li>To manage your Account: to manage your registration as a user of the Service.</li>
            <li>To provide you with news, special offers and general information about other goods, services and events which we offer.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Advertising and Cookies</h2>
          <p className="text-slate-600">We use Google AdSense to serve advertisements. Google uses cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
          <p className="mt-4 text-slate-600 font-medium">Users may opt out of personalized advertising by visiting Ads Settings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Contact Us</h2>
          <p className="text-slate-600">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
          <p className="mt-2 text-primary-600 font-bold">privacy@ease-interviews.vercel.app</p>
        </section>
      </div>
    </div>
  );
};
