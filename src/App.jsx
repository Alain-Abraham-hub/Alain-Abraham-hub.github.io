import { useEffect, useRef, useState } from "react";

export default function App() {
  const emailAddress = "alainabrahamsj@gmail.com";
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const copyTimer = useRef(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    navigator.clipboard?.writeText(emailAddress).catch(() => {});
    setCopyStatus("copied!");
    copyTimer.current = setTimeout(() => {
      setCopyStatus("");
    }, 1500);
  };

  const handleImageClick = (projectIdx) => {
    setSelectedProjectIndex(projectIdx);
    setCurrentImageIndex(0);
    setShowImagePreview(true);
  };

  const handlePrevImage = () => {
    if (selectedProjectIndex === null) return;
    const imgs = (projects[selectedProjectIndex].images && projects[selectedProjectIndex].images.length)
      ? projects[selectedProjectIndex].images
      : (projects[selectedProjectIndex].image ? [projects[selectedProjectIndex].image] : []);
    if (!imgs.length) return;
    setCurrentImageIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (selectedProjectIndex === null) return;
    const imgs = (projects[selectedProjectIndex].images && projects[selectedProjectIndex].images.length)
      ? projects[selectedProjectIndex].images
      : (projects[selectedProjectIndex].image ? [projects[selectedProjectIndex].image] : []);
    if (!imgs.length) return;
    setCurrentImageIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  };

  const technologies = [
    "Qiskit",
    "IBM Quantum",
    "Python",
    "React",
    "Quantum Algorithms",
    "NumPy",
    "JavaScript",
    "Docker"
  ];

  const projects = [
    {
      title: "TFIM Quantum Dynamics Simulator",
      desc: "A program to simulate how quantum dynamics are simualted on quantum computer and to observe the average magnetization, interaction and the evloution of hamiltonian energy over time",
      href: "https://github.com/Alain-Abraham-hub/TFIM-Quantum-Dynamics-Simulation.git",
      images: ["/circuit diagram.png","/tfim1.png", "/tfim2.png", "/tfim3.png"],

    },
    {
      title: "QAOA MaxCut",
      desc: "Implementing the QAOA algorithm to find the max-cut of a graph on IBM's quantum processor (ibm_fez)",
      href: "https://github.com/Alain-Abraham-hub/QAOA-MaxCut-QuantumHardware.git",
      images: ["/qaoa circuit.jpeg", "/qaoa graph.jpeg", "qaoa 1.jpeg"],
    },
    {
      title: "QKernels4Molecules",
      desc: "Exploring quantum-inspired feature maps and graph kernels for molecular machine learning.",
      href: "https://github.com/Alain-Abraham-hub/QKernels4Molecules.git",
      image: "/Qkernels.png"
    },     
    {
      title: "CHSH-Game",
      desc: "A simulation of a simple game to demonstrate the advantages of quantum entanglement",
      href: "https://github.com/Alain-Abraham-hub/CHSH-game.git",
      image: "/chsh1.png"
    },
    {
      title: "Super dense coding",
      desc: "An alternative method to teleport information using quantum entanglement",
      href: "https://github.com/Alain-Abraham-hub/Quantum-super-dense-coding.git",
      image: "/Superdensecoding.png"
    },
    {
      title: "Quantum teleportation",
      desc: "A method to teleport information leveraging quantum entanglement",
      href: "https://github.com/Alain-Abraham-hub/Quantum-Teleportation.git",
      image: "/quantum teleportation.png"
    },
    {
      title: "Quantum gates and circuit visualizer",
      desc: "An application to visualize how gates affect the nature of qubits on a circuit",
      href: "https://github.com/Alain-Abraham-hub/Quantum-Gate-Visualiser.git",
      images: ["/circuit visualiser 1.jpeg", "circuit visualiser 2"]
    },
    
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-gray-200 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm bg-slate-950/80 border-b border-cyan-500/20 z-50">
        <div className="nav-container">
          <a href="#home" className="text-xl font-light tracking-wide text-gray-100 hover:text-cyan-400 transition-colors">
            <span className="text-cyan-500">/</span> alain's portfolio
          </a>
          <div className="hidden md:flex gap-16">
            <a href="#about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">about</a>
            <a href="#work" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">projects</a>
            <a href="#tech" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">tech</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center hero-section">
        {/* Bloch Sphere Visualization Left */}
        <div className="hero-bloch relative w-[26rem] h-[26rem]">
          <svg className="absolute w-[22rem] h-[22rem]" viewBox="0 0 300 300">
            {/* Bloch sphere wireframe */}
            <ellipse cx="150" cy="150" rx="100" ry="40" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" className="animate-spin" style={{animationDuration: '10s', transformOrigin: 'center'}} />
            <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" style={{animation: 'spin-reverse 10s linear infinite', transformOrigin: 'center'}} />
            <ellipse cx="150" cy="150" rx="100" ry="100" fill="none" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" transform="rotate(45 150 150)" />
            
            {/* Axes */}
            <line x1="150" y1="50" x2="150" y2="250" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" />
            <line x1="50" y1="150" x2="250" y2="150" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" />
            
            {/* Center */}
            <circle cx="150" cy="150" r="6" fill="#06b6d4" />
            
            {/* Probability amplitudes */}
            <circle cx="220" cy="130" r="3" fill="#06b6d4" opacity="0.6" />
            <circle cx="210" cy="160" r="2.5" fill="#06b6d4" opacity="0.4" />
            <circle cx="180" cy="190" r="2" fill="#06b6d4" opacity="0.3" />
          </svg>
        </div>

        {/* Right content */}
        <div className="hero-content">
          <div>
            <p className="hero-tagline text-cyan-400 mb-4 font-mono">&lt; Quantum_dev.init() /&gt;</p>
            <h1 className="hero-title font-light tracking-tight text-white leading-tight">
              hi, welcome to my portfolio<span className="animate-blink">|</span>
            </h1>
          </div>

          <div className="pt-12 flex justify-center md:justify-start">
            <a href="#about" className="text-cyan-400 hover:text-cyan-300 transition-colors text-2xl animate-bounce-arrow">
              ↓
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-container">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title text-cyan-500">
              <span className="text-cyan-500">/</span> about me
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="about-layout">
            <div className="about-text text-gray-400 font-light leading-relaxed">
              <p>
                I'm an undergraduate student exploring <span className="text-cyan-400">quantum computing</span>. I enjoy working with new concepts, building quantum circuits, and experimenting with algorithms that try to make sense of complex quantum systems and solve problems.
              </p>

              <p>
                I like learning by doing—running simulations, testing ideas, and slowly turning theory into something practical. I'm still early in the journey, but I'm excited to keep building projects and growing in the quantum space.
              </p>
            </div>

            <div className="about-image-container">
              <div className="about-image-wrapper">
                <div className="about-image-small absolute inset-0 bg-yellow-400/25 rounded-full blur-2xl animate-pulse"></div>
                <img
                  src="/433e0922-21cd-46bc-9d24-4222c4b2eeab.jpg"
                  alt="Alain Abraham"
                  className="about-image-small relative rounded-full border-4 border-yellow-400/40 shadow-xl shadow-yellow-400/30 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="section-container">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title text-cyan-500">
              <span className="text-cyan-500">/</span> featured work
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="work-grid">
            {projects.map((project, idx) => (
              <div 
                key={idx}
                className="group flex flex-col border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 bg-slate-900/30 hover:bg-slate-900/60"
              >
                <div 
                  className="relative h-48 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleImageClick(idx)}
                >
                  <img 
                    src={project.images?.length ? project.images[0] : project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex flex-col flex-grow p-6 space-y-4">
                  <h3 className="text-lg font-light text-gray-100 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 font-light text-sm leading-relaxed flex-grow">
                    {project.desc}
                  </p>
                  
                  <a 
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-cyan-500/30 rounded text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all text-sm font-light mt-auto"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tech" className="section-container">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title text-cyan-500">
              <span className="text-cyan-500">/</span> tech stack
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="tech-layout">
            {/* Technologies Grid */}
            <div className="tech-grid">
              {technologies.map((tech, idx) => (
                <div 
                  key={idx}
                  className="tech-grid-item text-gray-400 hover:text-cyan-400 transition-colors duration-300 group cursor-pointer"
                >
                  <span className="text-cyan-500 group-hover:translate-x-1 transition-transform">▸</span>
                  <span className="font-light">{tech}</span>
                </div>
              ))}
            </div>

            {/* Visual Grid */}
            <div className="tech-visual">
              <div className="tech-visual-grid">
                {Array(9).fill(0).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="tech-visual-item animate-blink-box"
                    style={{animationDelay: `${idx * 0.2}s`}}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title text-cyan-500">
              <span className="text-cyan-500">/</span> connect
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="tech-layout">
            <div>
              <p className="text-gray-500 font-light leading-relaxed mb-6 -mt-20 max-w-4xl">
                I'm always interested in collaborating on quantum computing projects, discussing 
                algorithms, or just talking about the future of quantum computing.
              </p>

              <div className="contact-links">
                <a 
                  href="https://github.com/Alain-Abraham-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link hover:text-cyan-300 hover:border-cyan-500/60"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 0 0 8.207 11.387c.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576A12.003 12.003 0 0 0 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/alain-abraham-b91193304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link hover:text-cyan-300 hover:border-cyan-500/60"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.059 20.452H3.558V9h3.501v11.452zM5.308 7.433a2.03 2.03 0 1 1 0-4.059 2.03 2.03 0 0 1 0 4.059zM20.452 20.452h-3.5v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.5V9h3.5v1.573c.503-.777 1.402-1.884 3.413-1.884 2.493 0 4.206 1.574 4.206 4.956v6.807z"/>
                  </svg>
                </a>
                <div className="relative">
                  <button 
                    onClick={() => setShowEmailPopup(!showEmailPopup)}
                    className="contact-link hover:text-cyan-300 hover:border-cyan-500/60"
                    aria-label="Show email"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="tech-visual">
              <svg className="connect-nodes-animation" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
              <line x1="40" y1="40" x2="160" y2="160" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2"/>
              <line x1="160" y1="40" x2="40" y2="160" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2"/>
              
              <circle cx="40" cy="40" r="8" fill="rgba(34, 211, 238, 0.9)" className="connect-node" style={{animationDelay: "0s"}}/>
              <circle cx="160" cy="40" r="8" fill="rgba(59, 130, 246, 0.9)" className="connect-node-bright" style={{animationDelay: "0.3s"}}/>
              <circle cx="100" cy="100" r="9" fill="rgba(96, 165, 250, 0.95)" className="connect-node-center" style={{animationDelay: "0.6s"}}/>
              <circle cx="40" cy="160" r="8" fill="rgba(34, 211, 238, 0.9)" className="connect-node" style={{animationDelay: "0.9s"}}/>
              <circle cx="160" cy="160" r="8" fill="rgba(100, 150, 200, 0.8)" className="connect-node-muted" style={{animationDelay: "1.2s"}}/>
            </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Email Popup Modal */}
      {showEmailPopup && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShowEmailPopup(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-slate-900 border border-cyan-500/40 rounded-lg shadow-2xl p-6 min-w-[320px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-light text-cyan-400">Email Address</h3>
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-300 mb-4 text-center break-all">{emailAddress}</p>
              <button
                onClick={handleCopyEmail}
                className="w-full px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded text-cyan-300 transition-all"
              >
                {copyStatus || "Copy"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Image Preview Modal */}
      {showImagePreview && selectedProjectIndex !== null && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShowImagePreview(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="relative bg-slate-900 border border-cyan-500/40 rounded-lg shadow-2xl p-6 max-w-2xl">
              {/* Close button */}
              <button
                onClick={() => setShowImagePreview(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-cyan-400 transition-colors z-10"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous button */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors bg-black/50 rounded-full p-2"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Image */}
              <div className="modal-image-container">
                <img
                  src={projects[selectedProjectIndex]?.images?.length ? projects[selectedProjectIndex].images[currentImageIndex] : projects[selectedProjectIndex]?.image}
                  alt={projects[selectedProjectIndex]?.title}
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                />
                <div className="modal-image-content">
                  <h3 className="modal-title text-cyan-400 font-light">{projects[selectedProjectIndex]?.title}</h3>
                  <p className="modal-description text-gray-400 mt-2">{projects[selectedProjectIndex]?.desc}</p>
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors bg-black/50 rounded-full p-2"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image counter */}
              <div className="text-center mt-2 text-white text-sm">
                {currentImageIndex + 1} / {(projects[selectedProjectIndex]?.images?.length) ? projects[selectedProjectIndex].images.length : (projects[selectedProjectIndex]?.image ? 1 : 0)}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="footer-container border-t border-cyan-500/10">
        <p className="footer-text text-gray-600 font-light">
          :) hope you found this page useful
        </p>
      </footer>
    </div>
  );
}
