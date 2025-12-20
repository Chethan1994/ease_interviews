
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/browse" className="flex items-center gap-2 mb-4 group">
              <div className="bg-primary-600 p-1.5 rounded-lg group-hover:bg-primary-700 transition-colors">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">InterviewPrep</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering developers to ace technical interviews with high-quality content and interactive tools.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary-700 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/browse" className="text-slate-500 hover:text-primary-600 transition-colors">Question Bank</Link></li>
              <li><Link to="/coding-challenges" className="text-slate-500 hover:text-primary-600 transition-colors">Coding Challenges</Link></li>
              <li><Link to="/study" className="text-slate-500 hover:text-primary-600 transition-colors">Flashcards</Link></li>
              <li><Link to="/contribute" className="text-slate-500 hover:text-primary-600 transition-colors">Submit Content</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/privacy" className="text-slate-500 hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-primary-600 transition-colors">Terms of Service</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {currentYear} Interview Prep Hub. All rights reserved. Built for developers, by developers.
          </p>
          <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
