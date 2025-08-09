const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About This Project
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A production-ready MERN stack application showcasing DevOps best practices
        </p>
      </header>

      {/* Project Overview */}
      <section className="card p-8 mb-12 animate-slide-up">
        <h2 className="text-2xl font-semibold text-primary-600 mb-4">
          📋 Project Overview
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-yellow-50 leading-relaxed">
          <p>
            This Quotes API is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) 
            and enhanced with modern DevOps practices. It serves as a demonstration of production-ready development, 
            deployment, and operational excellence.
          </p>
          <p>
            The application provides inspirational quotes through a RESTful API with features like categorization, 
            pagination, and real-time data fetching. It's designed to showcase both development skills and 
            infrastructure automation capabilities.
          </p>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primary-600 mb-6 text-center">
          🛠️ Technology Stack
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend Card */}
          <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-4 text-center">💻</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-yellow-200 mb-3 text-center">Frontend</h3>
            <ul className="text-sm text-gray-600 dark:text-yellow-50 space-y-2">
              <li>• React 18 with Vite</li>
              <li>• Tailwind CSS for styling</li>
              <li>• TanStack Query for data fetching</li>
              <li>• React Router for navigation</li>
              <li>• Responsive design</li>
              <li>• Modern animations</li>
            </ul>
          </div>

          {/* Backend Card */}
          <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-4 text-center">⚙️</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-yellow-200 mb-3 text-center">Backend</h3>
            <ul className="text-sm text-gray-600 dark:text-yellow-50 space-y-2">
              <li>• Node.js with Express.js</li>
              <li>• MongoDB with Mongoose</li>
              <li>• RESTful API design</li>
              <li>• Error handling & logging</li>
              <li>• Security middleware</li>
              <li>• API documentation</li>
            </ul>
          </div>

          {/* DevOps Card */}
          <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-4xl mb-4 text-center">🚀</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-yellow-200 mb-3 text-center">DevOps</h3>
            <ul className="text-sm text-gray-600 dark:text-yellow-50 space-y-2">
              <li>• Docker containerization</li>
              <li>• GitHub Actions CI/CD</li>
              <li>• Terraform infrastructure</li>
              <li>• Monitoring & logging</li>
              <li>• Automated testing</li>
              <li>• Cloud deployment ready</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="card p-8 mb-12">
        <h2 className="text-2xl font-semibold text-primary-600 mb-6">
          ✨ Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-yellow-200 mb-2">🏗️ Production-Ready Architecture</h3>
            <p className="text-gray-600 dark:text-yellow-50 text-sm leading-relaxed">
              Implements industry best practices including error handling, logging, security headers, 
              rate limiting, and comprehensive testing.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-yellow-200 mb-2">🔄 Modern DevOps Pipeline</h3>
            <p className="text-gray-600 dark:text-yellow-50 text-sm leading-relaxed">
              Features automated CI/CD with GitHub Actions, Docker containerization, 
              infrastructure as code with Terraform, and monitoring setup.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-yellow-200 mb-2">⚡ Performance Optimized</h3>
            <p className="text-gray-600 dark:text-yellow-50 text-sm leading-relaxed">
              Utilizes code splitting, lazy loading, database indexing, 
              and response compression for optimal user experience.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-yellow-200 mb-2">👨‍💻 Developer Experience</h3>
            <p className="text-gray-600 dark:text-yellow-50 text-sm leading-relaxed">
              Includes hot module replacement, automated testing, code quality checks, 
              and comprehensive documentation for efficient workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="card p-8 mb-12">
        <h2 className="text-2xl font-semibold text-primary-600 mb-4">
          🎯 Learning Outcomes
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-yellow-50 leading-relaxed">
          <p>
            This project demonstrates proficiency in full-stack JavaScript development, containerization strategies, 
            CI/CD pipeline design, infrastructure automation, monitoring implementation, and production deployment practices.
          </p>
          <p>
            Perfect for showcasing skills in DevOps and Site Reliability Engineering interviews, 
            this application represents a complete understanding of modern software development lifecycle.
          </p>
        </div>
      </section>

      {/* GitHub Link */}
      <section className="text-center">
        <a
          href="https://github.com/your-username/quotes-api"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 btn-primary hover:shadow-lg"
        >
          <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>View on GitHub</span>
        </a>
      </section>
    </div>
  )
}

export default About