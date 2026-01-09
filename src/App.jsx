export default function App() {
  const technologies = [
    "Qiskit",
    "IBM Quantum",
    "Python",
    "React",
    "Quantum Algorithms",
    "NumPy",
    "JavaScript",
    "Cirq",
    "Git",
    "Linux",
    "Docker",
    "AWS"
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-gray-200 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm bg-slate-950/80 border-b border-cyan-500/20 z-50">
        <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
          <a href="#home" className="text-xl font-light tracking-wide text-gray-100 hover:text-cyan-400 transition-colors">
            <span className="text-cyan-500">/</span> alain
          </a>
          <div className="hidden md:flex gap-12">
            <a href="#about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">about</a>
            <a href="#work" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">work</a>
            <a href="#tech" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">tech</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-4xl w-full space-y-6 animate-fade-in">
          <div>
            <h1 className="text-6xl md:text-7xl font-light tracking-tight leading-tight">
              Alain Abraham
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light mt-4">
              Quantum Computing Engineer & Full-Stack Developer
            </p>
          </div>
          
          <p className="text-lg text-gray-500 max-w-2xl font-light leading-relaxed">
            I build quantum algorithms that solve real-world problems. 
            <span className="block text-gray-400 mt-2">
              Currently exploring quantum optimization on <span className="text-cyan-400">IBM quantum hardware</span>.
            </span>
          </p>

          <div className="pt-8 flex gap-6">
            <a 
              href="#work"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-light flex items-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform">→</span> view work
            </a>
            <a 
              href="mailto:alain@example.com"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-light flex items-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform">→</span> get in touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-8 mb-12">
            <h2 className="text-3xl font-light tracking-wide whitespace-nowrap">
              <span className="text-cyan-500">/</span> about me
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
          </div>

          <div className="space-y-6 text-gray-400 font-light leading-relaxed">
            <p>
              I'm a quantum computing specialist with a passion for understanding how quantum systems can solve 
              computational problems. My journey began with curiosity about quantum mechanics, and evolved into 
              hands-on experience with <span className="text-cyan-400">Qiskit</span> and real <span className="text-cyan-400">IBM quantum processors</span>.
            </p>

            <p>
              Beyond quantum computing, I'm a full-stack developer proficient in modern web technologies. 
              I enjoy building tools that make quantum computing more accessible and create seamless user experiences 
              that bridge the gap between complex quantum theory and practical applications.
            </p>

            <p>
              When I'm not coding, you'll find me reading about quantum algorithms, contributing to open-source projects, 
              or exploring the intersection of physics and software engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-8 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-8 mb-12">
            <h2 className="text-3xl font-light tracking-wide whitespace-nowrap">
              <span className="text-cyan-500">/</span> featured work
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "QAOA Max-Cut Solver",
                desc: "Quantum Approximate Optimization Algorithm implementation for solving maximum cut problems on IBM quantum processors with noise mitigation techniques."
              },
              {
                title: "VQE Molecular Simulator",
                desc: "Hybrid quantum-classical algorithm for computing molecular ground states and energy landscapes. Useful for chemistry simulations and drug discovery."
              },
              {
                title: "Quantum Circuit Visualizer",
                desc: "Interactive web tool for visualizing and simulating quantum circuits in real-time. Includes state vector visualization and measurement statistics."
              }
            ].map((project, idx) => (
              <div 
                key={idx}
                className="group pb-8 border-b border-cyan-500/10 last:border-b-0 hover:border-cyan-500/30 transition-colors duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-light text-gray-100 group-hover:text-cyan-400 transition-colors mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tech" className="py-32 px-8 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-8 mb-12">
            <h2 className="text-3xl font-light tracking-wide whitespace-nowrap">
              <span className="text-cyan-500">/</span> technologies
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map((tech, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group cursor-pointer"
              >
                <span className="text-cyan-500 group-hover:translate-x-1 transition-transform">▸</span>
                <span className="font-light">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-8 mb-12">
            <h2 className="text-3xl font-light tracking-wide whitespace-nowrap">
              <span className="text-cyan-500">/</span> connect
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
          </div>

          <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-2xl">
            I'm always interested in collaborating on quantum computing projects, discussing 
            algorithms, or just talking about the future of quantum computing.
          </p>

          <div className="flex gap-6 flex-wrap">
            <a 
              href="https://github.com/Alain-Abraham-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-light flex items-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform">→</span> github
            </a>
            <a 
              href="https://linkedin.com/in/alain-abraham"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-light flex items-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform">→</span> linkedin
            </a>
            <a 
              href="mailto:alain@example.com"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-light flex items-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform">→</span> email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-cyan-500/10 text-center">
        <p className="text-gray-600 text-sm font-light">
          Built with <span className="text-cyan-400">React</span> & <span className="text-cyan-400">Tailwind CSS</span>
        </p>
      </footer>
    </div>
  );
}
