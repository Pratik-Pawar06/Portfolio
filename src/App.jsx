import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaCertificate,
  FaJava,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiMysql,
  SiMongodb,
  SiReact,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

function StarBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let stars = [];

    const STAR_COUNT = 140;
    const CURSOR_RADIUS = 90;
    const STAR_TO_STAR_RADIUS = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
      }));
    };

    const drawStar = (x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.5, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.5, y);
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();
    };

    const drawLine = (x1, y1, x2, y2, opacity) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(110, 168, 255, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
      });

      stars.forEach((star, i) => {
        let nearCursor = false;

        if (mouseRef.current.active) {
          const dx = star.x - mouseRef.current.x;
          const dy = star.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CURSOR_RADIUS) {
            nearCursor = true;
            drawLine(star.x, star.y, mouseRef.current.x, mouseRef.current.y, 0.25);
          }
        }

        if (nearCursor) {
          for (let j = i + 1; j < stars.length; j++) {
            const other = stars[j];

            const dxMouse = other.x - mouseRef.current.x;
            const dyMouse = other.y - mouseRef.current.y;
            const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (mouseDist < CURSOR_RADIUS) {
              const dx = star.x - other.x;
              const dy = star.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < STAR_TO_STAR_RADIUS) {
                drawLine(star.x, star.y, other.x, other.y, 0.15);
              }
            }
          }
        }

        drawStar(star.x, star.y, star.size);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-canvas" />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const technologies = [
    { name: "Java", icon: <FaJava /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "React", icon: <SiReact /> },
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss3 /> },
  ];

  const projects = [
    {
      title: "Handwritten to Braille Converter",
      points: [
        "Uses OCR to detect handwritten text accurately.",
        "Converts handwritten text into Braille for accessibility.",
        "Generates audio output using speech synthesis.",
        "Helps visually impaired users access written content easily.",
      ],
    },
    {
      title: "PashuMitra Livestock Management System",
      points: [
        "Monitors livestock health and daily activities efficiently.",
        "Tracks feeding schedules and farm-related data.",
        "Improves management through organized digital records.",
        "Provides a simple and user-friendly interface for farmers.",
      ],
    },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell">
      <StarBackground />

      <div className="container">
        <nav className="navbar">
          <div className="logo">Pratik Pawar</div>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#technologies" onClick={closeMenu}>Technologies</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#education" onClick={closeMenu}>Education</a>
            <a href="#certifications" onClick={closeMenu}>Certifications</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
        </nav>

        <section className="hero">
          <p className="hero-intro">Hi 👋, I am</p>
          <h1>Pratik Pawar</h1>
          <h2>Computer Engineering Student | Java Developer</h2>
        </section>

        <section id="about" className="section">
          <h1 className="section-title">ABOUT ME</h1>
          <p className="section-text">
            I am a Computer Engineering student with a strong interest in software
            development, problem solving, and building applications that create
            real value for users. I enjoy learning new technologies and applying
            them to practical projects that solve meaningful problems. My focus is
            on improving my development skills and creating useful, user-friendly
            software solutions.
          </p>
        </section>

        <section id="skills" className="section">
          <h1 className="section-title">SKILLS</h1>
          <div className="cards">
            <div className="card">
              <h3>Programming Languages</h3>
              <p>Java, C++</p>
              <p>
                Comfortable with object-oriented programming, problem solving, and
                writing efficient code.
              </p>
            </div>

            <div className="card">
              <h3>Frontend Development</h3>
              <p>HTML, CSS, React</p>
              <p>
                Able to build responsive, clean, and user-friendly web
                interfaces.
              </p>
            </div>

            <div className="card">
              <h3>Database Technologies</h3>
              <p>MySQL, MongoDB</p>
              <p>
                Skilled in storing, managing, and retrieving structured and
                unstructured data.
              </p>
            </div>

            <div className="card">
              <h3>Core Computer Science</h3>
              <p>Data Structures and Algorithms, OOP, DBMS</p>
              <p>
                Strong understanding of programming fundamentals and logical
                problem solving.
              </p>
            </div>
          </div>
        </section>

        <section id="technologies" className="section">
          <h1 className="section-title">TECHNOLOGIES</h1>
          <div className="tech-container">
            {technologies.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-icon">{tech.icon}</div>
                <p>{tech.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h1 className="section-title">PROJECTS</h1>
          <div className="cards">
            {projects.map((project, index) => (
              <div key={index} className="card">
                <h3>{project.title}</h3>
                <ul className="project-points">
                  {project.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <h1 className="section-title">EDUCATION</h1>
          <div className="cards education-cards">
            <div className="card">
              <h3>Bachelor of Engineering in Computer Engineering</h3>
              <p>PCCOER, Pune</p>
              <p>CGPA: 8.95</p>
              <p>
                Focused on software development, database systems, web
                technologies, and problem solving.
              </p>
            </div>

            <div className="card">
              <h3>Higher Secondary Education (12th)</h3>
              <p>Hutatma Rajguru Mahavidyalay</p>
              <p>Percentage: 78.33%</p>
              <p>
                Built a strong academic foundation in mathematics, science, and
                logical reasoning.
              </p>
            </div>

            <div className="card">
              <h3>Secondary Education (SSC)</h3>
              <p>Shridharrao Wable Patil Vidyalay</p>
              <p>Percentage: 88.20%</p>
              <p>
                Developed discipline, consistency, and strong fundamentals in core
                subjects.
              </p>
            </div>
          </div>
        </section>

        <section id="certifications" className="section">
          <h1 className="section-title">CERTIFICATIONS</h1>
          <div className="cards">
            <div className="card cert-card">
              <FaCertificate className="cert-icon" />
              <h3>NPTEL</h3>
              <p>Programming in Java</p>
            </div>

            <div className="card cert-card">
              <FaCertificate className="cert-icon" />
              <h3>NPTEL</h3>
              <p>Programming in Modern C++</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <h1 className="section-title">CONTACT</h1>
          <div className="icons">
            <a
              href="https://github.com/Pratik-Pawar06"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/pratik-pawar-464971374"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a href="mailto:pratikpawar2506@gmail.com">
              <FaEnvelope />
            </a>

            <a
              href="https://leetcode.com/u/pratikpawar2506/"
              target="_blank"
              rel="noreferrer"
            >
              <FaCode />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
