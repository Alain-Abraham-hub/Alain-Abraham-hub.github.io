import { useEffect, useRef, useState } from "react";

function QuantumAnimation() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 360;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const getCanvasCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * size,
        y: ((e.clientY - rect.top) / rect.height) * size,
      };
    };
    const handleMouseMove = (e) => { mouseRef.current = getCanvasCoords(e); };
    const handleMouseLeave = () => { mouseRef.current = { x: null, y: null }; };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // --- Quantum particles floating in the background ---
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * size,
      y: Math.random() * size,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    }));

    // --- Electron orbital definitions ---
    const orbitals = [
      { rx: 90, ry: 35, tilt: -0.4, speed: 0.018, phase: 0, electrons: 2 },
      { rx: 110, ry: 45, tilt: 0.9, speed: -0.014, phase: 1.2, electrons: 2 },
      { rx: 130, ry: 30, tilt: 2.1, speed: 0.01, phase: 2.8, electrons: 1 },
    ];

    // --- Probability wave rings ---
    const waveRings = Array.from({ length: 4 }, (_, i) => ({
      radius: 0,
      maxRadius: 160,
      speed: 0.4 + i * 0.1,
      delay: i * 80,
      frame: -i * 80,
    }));

    // --- Energy level transitions (photon emissions) ---
    const photons = [];

    let t = 0;
    let animationFrameId;

    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, size, size);

      const { x: mx, y: my } = mouseRef.current;
      const mouseActive = mx != null && my != null;

      // --- Draw faint grid (quantum lattice) ---
      ctx.strokeStyle = "rgba(34, 211, 238, 0.03)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < size; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(size, i);
        ctx.stroke();
      }

      // --- Background particles (quantum field) ---
      particles.forEach((p) => {
        p.phase += p.speed;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = size;
        if (p.x > size) p.x = 0;
        if (p.y < 0) p.y = size;
        if (p.y > size) p.y = 0;

        // Mouse repulsion
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const force = (80 - dist) / 80 * 0.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        const alpha = 0.2 + 0.3 * Math.sin(p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.fill();
      });

      // --- Draw connecting lines between nearby particles (entanglement) ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 50) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 * (1 - dist / 50)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // --- Probability wave rings expanding from center ---
      waveRings.forEach((ring) => {
        ring.frame += 1;
        if (ring.frame < 0) return;
        ring.radius += ring.speed;
        if (ring.radius > ring.maxRadius) ring.radius = 0;

        const alpha = 0.25 * (1 - ring.radius / ring.maxRadius);
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // --- Nucleus glow ---
      const glowPulse = 1 + 0.15 * Math.sin(t * 0.05);
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 * glowPulse);
      gradient.addColorStop(0, "rgba(34, 211, 238, 0.6)");
      gradient.addColorStop(0.3, "rgba(34, 211, 238, 0.2)");
      gradient.addColorStop(0.6, "rgba(139, 92, 246, 0.1)");
      gradient.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 30 * glowPulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner nucleus
      const nucleusGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
      nucleusGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      nucleusGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.7)");
      nucleusGrad.addColorStop(1, "rgba(34, 211, 238, 0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = nucleusGrad;
      ctx.fill();

      // --- Electron orbitals ---
      orbitals.forEach((orb) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(orb.tilt);

        // Draw orbital path (probability cloud)
        const segments = 120;
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const x = Math.cos(angle) * orb.rx;
          const y = Math.sin(angle) * orb.ry;
          // Wave-like probability amplitude modulation
          const wave = 1 + 0.08 * Math.sin(angle * 6 + t * 0.03);
          if (i === 0) ctx.moveTo(x * wave, y * wave);
          else ctx.lineTo(x * wave, y * wave);
        }
        ctx.strokeStyle = "rgba(34, 211, 238, 0.12)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw probability density along orbital (cloud effect)
        for (let i = 0; i < 40; i++) {
          const angle = (i / 40) * Math.PI * 2;
          const x = Math.cos(angle) * orb.rx;
          const y = Math.sin(angle) * orb.ry;
          const prob = 0.5 + 0.5 * Math.sin(angle * 3 + t * 0.02 + orb.phase);
          const cloudAlpha = prob * 0.06;
          ctx.beginPath();
          ctx.arc(x, y, 4 + prob * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${cloudAlpha})`;
          ctx.fill();
        }

        // Draw electrons
        for (let e = 0; e < orb.electrons; e++) {
          const eAngle = t * orb.speed + orb.phase + (e * Math.PI * 2) / orb.electrons;
          const ex = Math.cos(eAngle) * orb.rx;
          const ey = Math.sin(eAngle) * orb.ry;

          // Electron uncertainty cloud
          const uncGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 12);
          uncGrad.addColorStop(0, "rgba(34, 211, 238, 0.5)");
          uncGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.15)");
          uncGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
          ctx.beginPath();
          ctx.arc(ex, ey, 12, 0, Math.PI * 2);
          ctx.fillStyle = uncGrad;
          ctx.fill();

          // Electron core
          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fill();

          // Emit photon occasionally
          if (Math.random() < 0.005) {
            photons.push({
              x: ex,
              y: ey,
              tilt: orb.tilt,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 1,
              decay: 0.015,
            });
          }
        }

        ctx.restore();
      });

      // --- Photon emissions ---
      for (let i = photons.length - 1; i >= 0; i--) {
        const ph = photons[i];
        ph.x += ph.vx;
        ph.y += ph.vy;
        ph.life -= ph.decay;
        if (ph.life <= 0) {
          photons.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ph.tilt);
        const phGrad = ctx.createRadialGradient(ph.x, ph.y, 0, ph.x, ph.y, 6);
        phGrad.addColorStop(0, `rgba(250, 204, 21, ${ph.life * 0.8})`);
        phGrad.addColorStop(1, `rgba(250, 204, 21, 0)`);
        ctx.beginPath();
        ctx.arc(ph.x, ph.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = phGrad;
        ctx.fill();
        ctx.restore();
      }

      // --- Schrödinger wave function (bottom) ---
      ctx.beginPath();
      ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < size; x++) {
        const y = cy + 120 + Math.sin(x * 0.04 + t * 0.03) * 15 * Math.exp(-((x - cx) ** 2) / 8000);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second wave (superposition)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(34, 211, 238, 0.2)";
      ctx.lineWidth = 1;
      for (let x = 0; x < size; x++) {
        const y = cy + 120 + Math.cos(x * 0.05 - t * 0.025) * 12 * Math.exp(-((x - cx) ** 2) / 10000);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // --- Floating Dirac notation symbols ---
      ctx.font = "12px 'Courier New', monospace";
      ctx.fillStyle = `rgba(34, 211, 238, ${0.12 + 0.06 * Math.sin(t * 0.02)})`;
      ctx.fillText("|ψ⟩", 20, 30 + Math.sin(t * 0.015) * 5);
      ctx.fillText("⟨φ|", size - 45, 50 + Math.cos(t * 0.018) * 4);
      ctx.fillText("ℏ", 35, size - 25 + Math.sin(t * 0.02 + 1) * 3);
      ctx.fillText("Ĥ|ψ⟩ = E|ψ⟩", size / 2 - 40, 22 + Math.cos(t * 0.012) * 3);
      ctx.fillStyle = `rgba(139, 92, 246, ${0.1 + 0.05 * Math.sin(t * 0.025)})`;
      ctx.fillText("∫|ψ|²dx = 1", 15, size / 2 - 60 + Math.sin(t * 0.017) * 4);
      ctx.fillText("ΔxΔp ≥ ℏ/2", size - 100, size - 20 + Math.cos(t * 0.02) * 3);

      // --- Measurement collapse effect on click area ---
      if (mouseActive) {
        const collapseGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 40);
        collapseGrad.addColorStop(0, "rgba(250, 204, 21, 0.12)");
        collapseGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.05)");
        collapseGrad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, 40, 0, Math.PI * 2);
        ctx.fillStyle = collapseGrad;
        ctx.fill();

        // Crosshair
        ctx.strokeStyle = "rgba(34, 211, 238, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(mx - 20, my);
        ctx.lineTo(mx + 20, my);
        ctx.moveTo(mx, my - 20);
        ctx.lineTo(mx, my + 20);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-bloch cursor-crosshair">
      <canvas
        ref={canvasRef}
        className="quantum-anim-canvas w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem]"
      />
    </div>
  );
}

export default function App() {
  const emailAddress = "alainabrahamsj@gmail.com";
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const copyTimer = useRef(null);
  const [aboutImgTilt, setAboutImgTilt] = useState({ x: 0, y: 0 });
  const aboutImgRef = useRef(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  // Typewriter effect
  const heroLines = ["hi, welcome to my portfolio", "this is alain abraham"];
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [typePause, setTypePause] = useState(false);

  useEffect(() => {
    const current = heroLines[lineIndex];
    let timeout;

    if (typePause) {
      timeout = setTimeout(() => {
        setTypePause(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setDisplayedText(current.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
      } else {
        setTypePause(true);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(current.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setLineIndex((lineIndex + 1) % heroLines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex, typePause]);
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);

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
    setSelectedCertIndex(null);
    setPreviewType('project');
    setCurrentImageIndex(0);
    setShowImagePreview(true);
  };

  const handleCertImageClick = (certIdx) => {
    setSelectedCertIndex(certIdx);
    setSelectedProjectIndex(null);
    setPreviewType('certification');
    setCurrentImageIndex(0);
    setShowImagePreview(true);
  };

  const handlePrevImage = () => {
    if (previewType === 'project' && selectedProjectIndex !== null) {
      const imgs = (projects[selectedProjectIndex].images && projects[selectedProjectIndex].images.length)
        ? projects[selectedProjectIndex].images
        : (projects[selectedProjectIndex].image ? [projects[selectedProjectIndex].image] : []);
      if (!imgs.length) return;
      setCurrentImageIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
    } else if (previewType === 'certification' && selectedCertIndex !== null) {
      const imgs = (certifications[selectedCertIndex].images && certifications[selectedCertIndex].images.length)
        ? certifications[selectedCertIndex].images
        : (certifications[selectedCertIndex].image ? [certifications[selectedCertIndex].image] : []);
      if (!imgs.length) return;
      setCurrentImageIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (previewType === 'project' && selectedProjectIndex !== null) {
      const imgs = (projects[selectedProjectIndex].images && projects[selectedProjectIndex].images.length)
        ? projects[selectedProjectIndex].images
        : (projects[selectedProjectIndex].image ? [projects[selectedProjectIndex].image] : []);
      if (!imgs.length) return;
      setCurrentImageIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
    } else if (previewType === 'certification' && selectedCertIndex !== null) {
      const imgs = (certifications[selectedCertIndex].images && certifications[selectedCertIndex].images.length)
        ? certifications[selectedCertIndex].images
        : (certifications[selectedCertIndex].image ? [certifications[selectedCertIndex].image] : []);
      if (!imgs.length) return;
      setCurrentImageIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
    }
  };


  const projects = [
    {
      title: "Implementing SQD Algorithm",
      desc: "Implementing the SQD algorithm to find the ground state of a molecule.",
      href: "https://github.com/Alain-Abraham-hub/SQD-Algorithm-Groundstatefinder.git",
      images: ["QC1.png", "QC2.png", "QC3.png", "QC4.png", "Bitstring recovery.png", "bitstring_frequencies.png"]
    },
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
      title: "Ground state finder using VQE",
      desc: "Implementing the VQE algorithm to find the ground state of a molecule.",
      href: "https://github.com/Alain-Abraham-hub/GroundStateFinder.git",
      images: ["/ground state finder.png"],
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

  const certifications = [
    {
      title: "Quantum Diagonalization Algorithms",
      issuer: "IBM Quantum",
      date: "2026-02",
      image: "/Quantum certificate 1.png",
      verifyLink: "https://www.credly.com/badges/d8e94d9b-bc6f-453b-b628-b2b06a238986/linked_in_profile"
    },
    {
      title: "Quantum Machine Learning",
      issuer: "IBM Quantum",
      date: "2026-02",
      image: "/QML certificate.png",
      verifyLink: "https://www.credly.com/badges/835a9210-1679-420c-91b9-c57ece0137b5/public_url"
    },
    {
      title: "AWS Academy Graduate - Cloud Foundations", 
      issuer: "AWS web services",
      date: "2025-04",
      image: "/aws cloud foundation.png",
      verifyLink: "https://www.credly.com/badges/00e33a77-7518-42da-a7f8-af208cc057bf/public_url"
    },
    {
      title: "AWS Academy Graduate - Data Engineering",
      issuer: "AWS web services",
      date: "2025-04",
      image: "/aws data engineering.png",
      verifyLink: "https://www.credly.com/badges/760c2ec1-d8d0-4c01-976d-0347b511468b/public_url"
    },
    {
      title: "Python essentials 2",
      issuer: "Cisco",
      date: "2025-03",
      image: "/python essentials 2.png",
      verifyLink: "https://www.credly.com/badges/4a374ccc-8787-402a-ae55-0a1e4419c53c/public_url"
    },
    {
      title: "Python essentials 1",
      issuer: "Cisco",
      date: "2025-03",
      image: "/python essentials 1.png",
      verifyLink: "https://www.credly.com/badges/50861cad-2b2b-4bef-b5d1-c417a8025c5f/public_url"
    }
  ];

  const education = [
    {
      title: "Bachelor of Technology in Artificial Intelligence and Data Science",
      school: "Karuna Institute of Technology and Sciences",
      date: "Expected 2028",
      logo: "/karunya logo.png",
      link: "http://www.karunya.edu/"  
    },
    {
      title: "Engineering and Science(STEM subjects)",
      school: "SSVM Institutions",
      date: "2024",
      logo: "/ssvm logo.jpeg",
      link: "https://ssvminstitutions.ac.in/"  
    },
  ];

  return (
    <div className="bg-page text-gray-200 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full backdrop-blur-md bg-slate-950/70 border-b border-cyan-500/20 z-50">
        <div className="nav-container">
          <a href="#home" className="text-xl font-semibold tracking-tight text-gray-100 hover:text-cyan-400 transition-colors duration-200">
            <span className="text-cyan-400">/</span> alain's portfolio
          </a>
          <div className="hidden md:flex gap-12">
            <a href="#about" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200">about</a>
            <a href="#work" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200">projects</a>
            <a href="#certifications" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200">certifications</a>
            <a href="#education" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200">education</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200">contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center hero-section">
        <QuantumAnimation />

        {/* Right content */}
        <div className="hero-content">
          <div>
            <p className="hero-tagline text-cyan-400 mb-4 font-mono text-sm tracking-wide opacity-90">&lt; Quantum_dev.init() /&gt;</p>
            <h1 className="hero-title text-white leading-[1.1]">
              {displayedText}<span className="animate-blink text-cyan-400">|</span>
            </h1>
          </div>

          <div className="pt-12 flex justify-center md:justify-start">
            <a href="#about" className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-200 text-xl animate-bounce-arrow">
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
                I'm an undergraduate student passionate about emerging <span className="text-cyan-400">quantum technologies</span>, with a strong interest in <span className="text-cyan-400">quantum algorithms</span> in particular.
              </p>

              <p>
                I actively pursue certifications and hands-on projects focused on <span className="text-cyan-400">quantum algorithms</span>, <span className="text-cyan-400">quantum circuits</span>, and <span className="text-cyan-400">quantum chemistry</span>, and I'm preparing to dive deeper into <span className="text-cyan-400">Quantum Machine Learning</span>. While I'm still in the early stages of my learning journey, I'm committed to building a strong theoretical foundation and practical skill set in this field.
              </p>

            </div>

            <div className="about-image-container">
              <div
                ref={aboutImgRef}
                className="about-image-wrapper"
                onMouseMove={(e) => {
                  const el = aboutImgRef.current;
                  if (!el) return;
                  const rect = el.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  setAboutImgTilt({ x: y * 10, y: -x * 10 });
                }}
                onMouseLeave={() => setAboutImgTilt({ x: 0, y: 0 })}
              >
                <div
                  className="about-image-small absolute inset-0 bg-yellow-400/25 rounded-full blur-2xl animate-pulse"
                  aria-hidden
                />
                <img
                  src="/profile pic.JPG"
                  alt="Alain Abraham"
                  className="about-image-small relative rounded-full border-4 border-yellow-400/40 shadow-xl shadow-yellow-400/30 object-cover transition-transform duration-150 ease-out"
                  style={{
                    transform: `perspective(500px) rotateX(${aboutImgTilt.x}deg) rotateY(${aboutImgTilt.y}deg)`,
                  }}
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
            {projects.slice(0, 9).map((project, idx) => (
              <div 
                key={idx}
                className="group flex flex-col card-project"
              >
                <div 
                  className="card-image-wrap relative h-44 sm:h-48 bg-slate-900 cursor-pointer"
                  onClick={() => handleImageClick(idx)}
                >
                  <img 
                    src={project.images?.length ? project.images[0] : project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col flex-grow p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg font-medium text-gray-100 group-hover:text-cyan-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 font-light text-sm leading-relaxed flex-grow line-clamp-3">
                    {project.desc}
                  </p>
                  
                  <a 
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-500/30 rounded-lg text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200 text-sm font-medium mt-auto"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAllProjects(true)}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-cyan-500/30 rounded-xl text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 text-base font-medium"
            >
              View All Projects ({projects.length})
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-container">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title text-cyan-500">
              <span className="text-cyan-500">/</span> certifications and licenses
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="work-grid">
            {certifications.slice(0, 6).map((cert, idx) => (
              <div 
                key={idx}
                className="group flex flex-col card-cert"
              >
                <div 
                  className="card-image-wrap relative h-44 sm:h-48 bg-slate-900 cursor-pointer"
                  onClick={() => handleCertImageClick(idx)}
                >
                  <img 
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col flex-grow p-5 sm:p-6 space-y-3">
                  <h3 className="text-lg font-medium text-gray-100 group-hover:text-cyan-400 transition-colors duration-200">
                    {cert.title}
                  </h3>
                  
                  <p className="text-cyan-400 font-medium text-sm">
                    {cert.issuer}
                  </p>
                  
                  <p className="text-gray-500 font-light text-sm flex-grow">
                    {cert.date}
                  </p>
                  
                  <a 
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-500/30 rounded-lg text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200 text-sm font-medium mt-auto"
                  >
                    Show credential
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAllCerts(true)}
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-cyan-500/30 rounded-xl text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 text-base font-medium"
            >
              View All Certifications ({certifications.length})
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-container">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title text-cyan-500">
              <span className="text-cyan-500">/</span> education
            </h2>
            <div className="section-divider"></div>
          </div>

          <div className="flex flex-col items-start pl-4">
            {education.map((edu, idx) => (
              <div key={idx} className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                  <div className="logo-placeholder">
                    {edu.logo ? (
                      <img src={edu.logo} alt={edu.school} className="logo-image" />
                    ) : (
                      <div className="logo-empty">{edu.school.substring(0, 1)}</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                      {edu.school}
                    </h3>
                    <p className="text-gray-300 font-light mb-1">
                      {edu.title}
                    </p>
                    <p className="text-gray-500 font-light text-sm mb-2">
                      {edu.date}
                    </p>
                    {edu.description && (
                      <p className="text-gray-400 font-light text-sm mb-2">
                        {edu.description}
                      </p>
                    )}
                    {edu.link && (
                      <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium mt-2 inline-flex items-center gap-1 transition-colors duration-200">
                        Visit Website →
                      </a>
                    )}
                  </div>
                </div>
                {idx < education.length - 1 && (
                  <div className="w-px h-20 bg-gradient-to-b from-cyan-500/50 to-transparent ml-[2.5rem] mt-6 mb-2" aria-hidden />
                )}
              </div>
            ))}
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

          <div className="flex flex-col sm:flex-row gap-8 w-full">
            <div className="flex-[2_1_auto] min-w-0">
              <p className="w-full mt-0 mb-6 text-gray-400 font-light leading-relaxed text-base max-w-xl">
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
                <a 
                  href="https://leetcode.com/Alain_Abraham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link hover:text-cyan-300 hover:border-cyan-500/60"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.596.598c.54.54 1.413.54 1.954 0 .539-.54.539-1.414 0-1.955l-.598-.597a5.183 5.183 0 0 0-1.952-1.103c-.16-.058-.33-.098-.496-.138-.309-.073-.626-.12-.94-.122zM19.48 9.105l-4.276 4.272c-.652.64-.972 1.469-.948 2.263.01.34.078.68.212.995.134.315.328.614.595.88l4.276 4.194c.652.64 1.517.948 2.349.911a2.991 2.991 0 0 0 1.831-.877c.654-.662.96-1.529.92-2.371a3.005 3.005 0 0 0-.873-1.843l-4.276-4.193a1.378 1.378 0 0 0-1.951-.003c-.54.54-.54 1.415-.003 1.955l4.276 4.194c.093.09.15.213.155.343a.446.446 0 0 1-.139.327.446.446 0 0 1-.329.137.452.452 0 0 1-.345-.152l-4.276-4.193a.453.453 0 0 1-.003-.649c.01-.34.078-.68.212-.995a.453.453 0 0 1 .352-.15l4.276-4.272c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003z"/>
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
          </div>
        </div>
      </section>

      {/* Email Popup Modal */}
      {showEmailPopup && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={() => setShowEmailPopup(false)}
            aria-hidden
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
            <div className="bg-slate-900/95 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/5 p-6 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-cyan-400">Email Address</h3>
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-300 mb-4 text-center break-all font-mono text-sm">{emailAddress}</p>
              <button
                onClick={handleCopyEmail}
                className="w-full px-4 py-2.5 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 rounded-lg text-cyan-300 font-medium transition-all duration-200"
              >
                {copyStatus || "Copy"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* All Projects Modal */}
      {showAllProjects && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={() => setShowAllProjects(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="relative bg-slate-900/95 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/5 backdrop-blur-sm w-full max-w-6xl max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-cyan-500/20 shrink-0">
                <h2 className="text-xl font-semibold text-cyan-400">
                  <span className="text-cyan-500">/</span> all projects ({projects.length})
                </h2>
                <button
                  onClick={() => setShowAllProjects(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Scrollable Content */}
              <div className="overflow-y-auto p-5 sm:p-6 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((project, idx) => (
                    <div 
                      key={idx}
                      className="group flex flex-col card-project"
                    >
                      <div 
                        className="card-image-wrap relative h-44 sm:h-48 bg-slate-900 cursor-pointer"
                        onClick={() => handleImageClick(idx)}
                      >
                        <img 
                          src={project.images?.length ? project.images[0] : project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex flex-col flex-grow p-5 sm:p-6 space-y-3">
                        <h3 className="text-lg font-medium text-gray-100 group-hover:text-cyan-400 transition-colors duration-200">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-400 font-light text-sm leading-relaxed flex-grow line-clamp-3">
                          {project.desc}
                        </p>
                        
                        <a 
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-500/30 rounded-lg text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200 text-sm font-medium mt-auto"
                        >
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* All Certifications Modal */}
      {showAllCerts && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={() => setShowAllCerts(false)}
            aria-hidden
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="relative bg-slate-900/95 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/5 backdrop-blur-sm w-full max-w-6xl max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-cyan-500/20 shrink-0">
                <h2 className="text-xl font-semibold text-cyan-400">
                  <span className="text-cyan-500">/</span> all certifications ({certifications.length})
                </h2>
                <button
                  onClick={() => setShowAllCerts(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Scrollable Content */}
              <div className="overflow-y-auto p-5 sm:p-6 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {certifications.map((cert, idx) => (
                    <div 
                      key={idx}
                      className="group flex flex-col card-cert"
                    >
                      <div 
                        className="card-image-wrap relative h-44 sm:h-48 bg-slate-900 cursor-pointer"
                        onClick={() => handleCertImageClick(idx)}
                      >
                        <img 
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex flex-col flex-grow p-5 sm:p-6 space-y-3">
                        <h3 className="text-lg font-medium text-gray-100 group-hover:text-cyan-400 transition-colors duration-200">
                          {cert.title}
                        </h3>
                        
                        <p className="text-cyan-400 font-medium text-sm">
                          {cert.issuer}
                        </p>
                        
                        <p className="text-gray-500 font-light text-sm flex-grow">
                          {cert.date}
                        </p>
                        
                        <a 
                          href={cert.verifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-500/30 rounded-lg text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200 text-sm font-medium mt-auto"
                        >
                          Show credential
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Image Preview Modal */}
      {showImagePreview && (previewType === 'project' ? selectedProjectIndex !== null : selectedCertIndex !== null) && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            onClick={() => setShowImagePreview(false)}
            aria-hidden
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[calc(100%-2rem)] max-w-3xl">
            <div className="relative bg-slate-900/95 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/5 p-4 sm:p-6 backdrop-blur-sm">
              <button
                onClick={() => setShowImagePreview(false)}
                className="absolute top-3 right-3 p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200 z-10"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors bg-black/50 hover:bg-cyan-500/20 rounded-full p-2.5 border border-cyan-500/20"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="modal-image-container">
                <img
                  src={previewType === 'project' 
                    ? (projects[selectedProjectIndex]?.images?.length ? projects[selectedProjectIndex].images[currentImageIndex] : projects[selectedProjectIndex]?.image)
                    : (certifications[selectedCertIndex]?.images?.length ? certifications[selectedCertIndex].images[currentImageIndex] : certifications[selectedCertIndex]?.image)
                  }
                  alt={previewType === 'project' ? projects[selectedProjectIndex]?.title : certifications[selectedCertIndex]?.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
                <div className="modal-image-content">
                  <h3 className="modal-title text-cyan-400 font-semibold">
                    {previewType === 'project' ? projects[selectedProjectIndex]?.title : certifications[selectedCertIndex]?.title}
                  </h3>
                  <p className="modal-description text-gray-400 mt-2">
                    {previewType === 'project' ? projects[selectedProjectIndex]?.desc : `${certifications[selectedCertIndex]?.issuer} - ${certifications[selectedCertIndex]?.date}`}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors bg-black/50 hover:bg-cyan-500/20 rounded-full p-2.5 border border-cyan-500/20"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="text-center mt-3 text-gray-400 text-sm font-medium">
                {currentImageIndex + 1} / {previewType === 'project' 
                  ? ((projects[selectedProjectIndex]?.images?.length) ? projects[selectedProjectIndex].images.length : (projects[selectedProjectIndex]?.image ? 1 : 0))
                  : ((certifications[selectedCertIndex]?.images?.length) ? certifications[selectedCertIndex].images.length : (certifications[selectedCertIndex]?.image ? 1 : 0))
                }
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="footer-container border-t border-cyan-500/10">
        <p className="footer-text text-gray-500">
          :) hope you found this page useful
        </p>
      </footer>
    </div>
  );
}
