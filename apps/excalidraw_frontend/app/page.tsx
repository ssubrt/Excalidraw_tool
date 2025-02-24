
import React from 'react';
import { 
  Pencil, 
  Share2, 
  Users, 
  Cloud, 
  Shapes, 
  Palette,
  ArrowRight,
  Github,
} from 'lucide-react';
import Link from 'next/link';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header/Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shapes className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">
                Excalidraw Clone
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/signin">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Collaborate and Create
              <span className="text-indigo-600"> Beautiful Diagrams</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The simplest way to create and share diagrams, wireframes, and
              illustrations. No account required.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                <span>Try Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </button>
            </div>
          </div>
          <div className="mt-12 rounded-xl overflow-hidden shadow-2xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80"
              alt="Excalidraw Interface"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Create
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features that help you bring your ideas to life with ease
              and precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Pencil className="w-6 h-6 text-indigo-600" />,
                title: "Intuitive Drawing",
                description:
                  "Simple and powerful drawing tools that feel natural and responsive.",
              },
              {
                icon: <Share2 className="w-6 h-6 text-indigo-600" />,
                title: "Easy Sharing",
                description:
                  "Share your drawings with a simple link, no account required.",
              },
              {
                icon: <Users className="w-6 h-6 text-indigo-600" />,
                title: "Real-time Collaboration",
                description:
                  "Work together with your team in real-time, see changes instantly.",
              },
              {
                icon: <Cloud className="w-6 h-6 text-indigo-600" />,
                title: "Auto-Save",
                description:
                  "Never lose your work with automatic saving to the cloud.",
              },
              {
                icon: <Shapes className="w-6 h-6 text-indigo-600" />,
                title: "Smart Shapes",
                description:
                  "Perfect shapes every time with our smart drawing assistance.",
              },
              {
                icon: <Palette className="w-6 h-6 text-indigo-600" />,
                title: "Custom Styling",
                description:
                  "Customize colors, fonts, and styles to match your brand.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Creating Your Diagrams Today
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their diagramming
            needs.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shapes className="w-8 h-8 text-indigo-500" />
              <span className="text-xl font-bold text-white">
                Excalidraw Clone
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 Excalidraw Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;