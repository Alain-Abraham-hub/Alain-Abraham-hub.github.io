const projects = [
  {
    title: "QAOA Max-Cut Solver",
    desc: "Implementing the QAOA algorithm to find the max-cut of a graph on IBM's quantum processor (ibm_fez)",
    href: "https://github.com/Alain-Abraham-hub/QAOA-MaxCut-QuantumHardware.git",
    image: "https://alain-abraham-hub.github.io/project1.png",
  },
  {
    title: "QKernels4Molecules",
    desc: "Exploring quantum-inspired feature maps and graph kernels for molecular machine learning.",
    href: "https://github.com/Alain-Abraham-hub/QKernels4Molecules.git",
    image: "https://alain-abraham-hub.github.io/project2.jpg",
  },
  {
    title: "CHSH-Game",
    desc: "A simulation of a simple game to demonstrate the advantages of quantum entanglement",
    href: "https://github.com/Alain-Abraham-hub/CHSH-game.git",
    image: "https://alain-abraham-hub.github.io/project3.png",
  },
  {
    title: "Super dense coding",
    desc: "An alternative method to teleport information using quantum entanglement",
    href: "https://github.com/Alain-Abraham-hub/Quantum-super-dense-coding.git",
    image: "https://alain-abraham-hub.github.io/project4.png",
  },
  {
    title: "Quantum teleportation",
    desc: "A method to teleport information leveraging quantum entanglement",
    href: "https://github.com/Alain-Abraham-hub/Quantum-Teleportation.git",
    image: "https://alain-abraham-hub.github.io/project5.png",
  },
  {
    title: "Quantum gates and circuit visualizer",
    desc: "An application to visualize how gates affect the nature of qubits on a circuit",
    href: "https://github.com/Alain-Abraham-hub/Quantum-Gate-Visualiser.git",
    image: "https://alain-abraham-hub.github.io/project6.jpg",
  },
  {
    title: "VQE Ground State Finder",
    desc: "An advanced VQE algorithm to find the ground state of molecule with error mitigation using ZNE",
    href: "https://github.com/Kukyos/GroundStateFinder.git",
    image: undefined,
  },
];

const techStack = [
  "Qiskit",
  "IBM Quantum",
  "Python",
  "React",
  "Quantum Algorithms",
  "NumPy",
  "JavaScript",
  "TypeScript",
  "CSS",
  "Git",
];

export default function App() {
  return (
    <div className="bg-slate-950 text-gray-200 min-h-screen">
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-cyan-500/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="text-lg font-light tracking-wide text-gray-100">
            / alain's portfolio
          </a>
          <div className="hidden md:flex gap-10 text-sm text-gray-400">
            <a href="#home" className="hover:text-cyan-400 transition-colors">home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">about</a>
            <a href="#work" className="hover:text-cyan-400 transition-colors">project</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        <section id="home" className="py-24 md:py-28">
          <p className="text-cyan-400 text-sm mb-3">&lt; Quantum_dev.init() /&gt;</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-100 mb-6">
            hi, welcome to my portfolio|
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Hi, I'm Alain Abraham — a tech enthusiast with a strong interest in quantum computing, full-stack
            development, and problem-solving. I enjoy building hands-on projects, exploring how systems work under the hood,
            and experimenting with new technologies.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mt-4">
            I'm especially curious about combining theory with real-world implementation, whether that's working with quantum algorithms or
            designing clean, functional web applications. I enjoy learning continuously, improving my skills through practice, and turning
            ideas into solutions that are both efficient and intuitive.
          </p>
        </section>

        <section id="about" className="py-16 border-t border-cyan-500/10">
          <div className="flex flex-col gap-10 md:flex-row md:items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-light text-gray-100 mb-6"><span className="text-cyan-400">/</span> about me</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Hi, I'm Alain Abraham — a tech enthusiast with a strong interest in quantum computing, full-stack development, and problem-solving.
                I enjoy building hands-on projects, exploring how systems work under the hood, and experimenting with new technologies.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I'm especially curious about combining theory with real-world implementation, whether that's working with quantum algorithms or designing
                clean, functional web applications. I enjoy learning continuously, improving my skills through practice, and turning ideas into solutions
                that are both efficient and intuitive.
              </p>
            </div>
            <div className="md:w-72 md:shrink-0">
              <img
                src="https://alain-abraham-hub.github.io/profile.jpg"
                alt="Alain Abraham"
                className="w-full rounded-lg border border-cyan-500/20 shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="work" className="py-16 border-t border-cyan-500/10">
          <h2 className="text-2xl font-light text-gray-100 mb-8"><span className="text-cyan-400">/</span> featured work</h2>
          <div className="space-y-10">
            {projects.map((project) => (
              <article key={project.title} className="grid gap-6 md:grid-cols-3 md:items-center border border-cyan-500/10 rounded-xl p-5 hover:border-cyan-500/30 transition-colors">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-light text-gray-100 mb-2">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{project.desc}</p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                  >
                    View on GitHub →
                  </a>
                </div>
                {project.image ? (
                  <div className="md:justify-self-end">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full md:w-56 rounded-lg border border-cyan-500/20 shadow-md object-cover"
                    />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="tech" className="py-16 border-t border-cyan-500/10">
          <h2 className="text-2xl font-light text-gray-100 mb-6"><span className="text-cyan-400">/</span> tech stack</h2>
          <div className="flex flex-wrap gap-4 text-gray-300">
            {techStack.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-sm">
                ▸{tech}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16 border-t border-cyan-500/10">
          <h2 className="text-2xl font-light text-gray-100 mb-4"><span className="text-cyan-400">/</span> connect</h2>
          <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">
            I'm always interested in collaborating on quantum computing projects, discussing algorithms, or just talking about the future of quantum computing.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://github.com/Alain-Abraham-hub"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alain-abraham-b91193304"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">:) hope you found this page useful</p>
        </section>

        <section className="py-12 border-t border-cyan-500/10 text-gray-500 text-sm">
          <h3 className="text-base text-gray-300 mb-3">Additional Links</h3>
          <div className="flex flex-wrap gap-3">
            <a href="#home" className="text-cyan-400 hover:text-cyan-300">/ alain's portfolio</a>
            <a href="#home" className="text-cyan-400 hover:text-cyan-300">home</a>
            <a href="#about" className="text-cyan-400 hover:text-cyan-300">about</a>
            <a href="#work" className="text-cyan-400 hover:text-cyan-300">project</a>
            <a href="#contact" className="text-cyan-400 hover:text-cyan-300">contact</a>
          </div>
        </section>
      </main>
    </div>
  );
}