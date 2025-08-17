import React from "react";

const AboutDev = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-xl rounded-xl border border-secondary">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="text-3xl font-bold text-primary">Rohan Kabir</h2>
        <p className="text-secondary font-medium">
          🚀 MERN Stack Developer | MongoDB • Express.js • React • Node.js
        </p>
        <p className="text-gray-600">
          Email:{" "}
          <a
            href="mailto:rohankabirr061@gmail.com"
            className="text-blue-600 underline"
          >
            rohankabirr061@gmail.com
          </a>
        </p>
        <p className="text-secondary">
          🤝 Team Player | Mentor | Scout | Volleyball Enthusiast
        </p>

        {/* Links */}
        <div className="flex gap-4 mt-4">
          <a
            href="https://github.com/RohanR05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/rohan-batman/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://rohanbatman.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800 transition-colors flex items-center gap-1"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-8 text-gray-700 space-y-4">
        <p>
          I’ve recently completed a comprehensive MERN Stack Developer course,
          gaining hands-on experience building full-stack web applications.
        </p>
        <p>Throughout the course, I built real-world projects covering:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>✅ RESTful API development</li>
          <li>✅ User authentication and authorization (JWT, Firebase)</li>
          <li>✅ CRUD operations</li>
          <li>✅ Responsive frontend design</li>
          <li>✅ Deployment with platforms like Vercel and Render</li>
        </ul>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-primary mb-3">Key Skills</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            MongoDB Database Management – Proficient in NoSQL databases for
            optimized performance.
          </li>
          <li>
            Express.js Backend Development – RESTful APIs, middleware, and route
            security with JWT & Firebase Admin.
          </li>
          <li>
            React.js Frontend Framework – Responsive, component-based UI using
            React, Hooks & Context API.
          </li>
          <li>
            Node.js Server-Side Scripting – Asynchronous operations, API
            integrations, real-time data handling.
          </li>
          <li>
            Firebase Authentication & Authorization – Secure signup/login flows
            with role-based access control.
          </li>
          <li>
            JWT & Token-Based Security – Secure client-server communication
            using token-based auth.
          </li>
          <li>
            TanStack Query (React Query) – Efficient data fetching, caching, and
            synchronization.
          </li>
          <li>
            Responsive Design (HTML, CSS, Tailwind CSS) – Mobile-first,
            pixel-perfect web pages.
          </li>
          <li>
            REST API Design & Integration – Scalable APIs and third-party
            service integration.
          </li>
          <li>
            Version Control with Git & GitHub – Collaboration with branching,
            pull requests, and repo management.
          </li>
          <li>
            Problem Solving & Debugging – Analytical mindset for solving complex
            bugs and optimizing performance.
          </li>
          <li>
            Team Collaboration & Communication – Effective teamwork using GitHub
            Projects, Trello, and documentation.
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-6 text-gray-600">
        <p>
          I'm passionate about clean code, performance optimization, and
          crafting user-friendly experiences. Currently exploring Stripe
          integration, advanced state management, and scalable backend patterns.
        </p>
        <p className="mt-2">
          📫 Let’s connect! I’m open to junior developer roles, internships, or
          freelance projects.
        </p>
      </div>
    </div>
  );
};

export default AboutDev;
