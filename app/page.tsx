'use client'

import { useEffect, useState } from 'react'
import PortfolioChatbot from "../components/PortfolioChatbot";
import { ArrowDownRight, ArrowUpRight, ChevronDown, GitBranch, Mail, Menu, MoveUpRight, Users, X } from 'lucide-react'

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experiments', 'Journey', 'Contact']
const skillGroups = [
  { number: '01', name: 'NETWORKING', skills: 'TCP/IP Â· DNS Â· HTTP Â· WIRESHARK Â· PACKET ANALYSIS' },
  { number: '02', name: 'LINUX', skills: 'BASH Â· HARDENING Â· LOGS Â· PERMISSIONS Â· SYSTEMS' },
  { number: '03', name: 'PYTHON', skills: 'AUTOMATION Â· PARSING Â· SOCKETS Â· SCRIPTS Â· APIs' },
  { number: '04', name: 'SECURITY', skills: 'THREAT MODELING Â· IOCS Â· OSINT Â· INCIDENT RESPONSE' },
  { number: '05', name: 'SIEM', skills: 'LOG ANALYSIS Â· DETECTION Â· ALERTS Â· SPLUNK Â· ELASTIC' },
  { number: '06', name: 'WEB', skills: 'HTTP Â· AUTH Â· OWASP Â· JAVASCRIPT Â· APIS' },
]
const projects = [
  { number: '01', title: 'SOC HOME LAB', description: 'A practical Security Operations environment for monitoring, detection and incident investigation.', tags: 'SOC / MONITORING / BLUE TEAM', type: 'soc' },
  { number: '02', title: 'WINDOWS EVENT LOG ANALYSIS', description: 'Windows security event investigation focused on authentication activity and suspicious events.', tags: 'WINDOWS / EVENT LOGS / ANALYSIS', type: 'windows' },
  { number: '03', title: 'NETWORK TRAFFIC ANALYSIS', description: 'Packet analysis and network investigation using Wireshark and TCP/IP concepts.', tags: 'WIRESHARK / TCP-IP / PACKETS', type: 'network' },
  { number: '04', title: 'PHISHING EMAIL ANALYSIS', description: 'Email investigation, header analysis and indicator-of-compromise identification.', tags: 'EMAIL / IOCS / INVESTIGATION', type: 'mail' },
  { number: '05', title: 'SIEM LOG ANALYSIS', description: 'Security log collection, searching, correlation and detection workflow practice.', tags: 'SIEM / LOGS / DETECTION', type: 'siem' },
  { number: '06', title: 'LINUX SECURITY PRACTICE', description: 'Linux security fundamentals including permissions, SSH, logs, hardening and system configuration.', tags: 'LINUX / SSH / BASH', type: 'linux' },
]

function SystemVisual({ type = 'hero' }: { type?: string }) {
  if (type === 'network') return <div className="project-visual network-visual"><span className="network-line n1" /><span className="network-line n2" /><span className="network-line n3" /><i className="node node-a" /><i className="node node-b" /><i className="node node-c" /><i className="node node-d" /><div className="visual-label">PACKET FLOW <b>04.21</b></div></div>
  if (type === 'mail') return <div className="project-visual mail-visual"><div className="mail-window"><span>HEADER / ANALYSIS</span><b>auth.results</b><p>spf <em>pass</em></p><p>dkim <em>pass</em></p><p>origin <strong>UNKNOWN</strong></p></div><i className="mail-dot" /></div>
  if (type === 'soc') return <div className="project-visual soc-visual"><div className="soc-chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="soc-readout"><small>EVENTS / 24H</small><strong>1,284</strong><b>+18.4%</b></div><i className="soc-pulse" /><div className="mini-status">ALERTS <b>07</b><br />HEALTH <b>99%</b></div></div>
  if (type === 'windows') return <div className="project-visual windows-visual"><div className="event-top"><span>EVENT VIEWER / SECURITY</span><b>FILTER: AUTH</b></div>{['4624  SUCCESS LOGON', '4625  FAILED LOGON', '4672  ADMIN PRIVILEGE', '4634  LOGOFF'].map((event, index) => <div className="event-row" key={event}><i className={index === 1 ? 'warn' : ''} /><span>{event}</span><small>02:{14 + index}:26</small></div>)}<div className="timeline-line" /></div>
  if (type === 'siem') return <div className="project-visual siem-visual"><div className="siem-head"><span>SIEM / CORRELATION</span><b>LIVE</b></div><div className="log-stack"><p><i /> AUTH_FAILURE <small>HIGH</small></p><p><i /> DNS_ANOMALY <small>MED</small></p><p><i /> PROCESS_START <small>LOW</small></p><p><i /> IOC_MATCH <small>HIGH</small></p></div><div className="siem-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>
  if (type === 'linux') return <div className="project-visual linux-visual"><div className="terminal-head"><span>root@anshuman:~</span><b>SECURE</b></div><div className="terminal-lines"><p><em>$</em> sudo systemctl status ssh</p><p className="lime-line">â— active (running)</p><p><em>$</em> ls -la /secure/logs</p><p>-rw------- <span>auth.log</span></p><p><em>$</em> chmod 700 /home/user</p></div><div className="permission-wheel">700</div></div>
  return <div className="system-visual" aria-label="Abstract active digital network system"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="network-globe">{Array.from({ length: 34 }, (_, index) => <i className={`globe-node globe-node-${index + 1}`} key={index} />)}<div className="globe-meridian meridian-one" /><div className="globe-meridian meridian-two" /><div className="globe-latitude latitude-one" /><div className="globe-latitude latitude-two" /><i className="globe-signal signal-one" /><i className="globe-signal signal-two" /><i className="globe-signal signal-three" /></div><div className="globe-hud-ring"><span>NETWORK</span><span>SECURE</span><span>LIVE</span></div><i className="globe-data-packet packet-one" /><i className="globe-data-packet packet-two" /><i className="globe-data-packet packet-three" /><i className="data-point point-one" /><i className="data-point point-two" /><i className="data-point point-three" /><div className="system-grid" /><div className="system-card card-top"><span className="status-dot" /> SYSTEM STATUS <b>ACTIVE</b></div><div className="system-clock"><span>LOCAL TIME</span><strong id="live-clock">00:00:00</strong><small>DELHI / INDIA</small></div><div className="system-card card-bottom">SECURING SYSTEMS<br />BUILDING SOLUTIONS<br />CREATING IMPACT</div><span className="axis axis-x">X / 04</span><span className="axis axis-y">Y / 09</span></div>
}

export default function Page() {
  const [intro, setIntro] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [activeSkill, setActiveSkill] = useState(0)
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false })

  useEffect(() => {
   const timer = window.setTimeout(() => setIntro(false), 5000)
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    reveals.forEach((element) => observer.observe(element))
    const moveCursor = (event: MouseEvent) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }))
    const updateClock = () => { const clock = document.getElementById('live-clock'); if (clock) clock.textContent = new Intl.DateTimeFormat('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true,timeZone:'Asia/Kolkata'}).format(new Date()) }; updateClock(); const clockTimer = window.setInterval(updateClock,1000); const overInteractive = (event: MouseEvent) => setCursor((current) => ({ ...current, active: (event.target as HTMLElement).closest('a, button') !== null }))
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', overInteractive)
    return () => { window.clearTimeout(timer); observer.disconnect(); window.removeEventListener('mousemove', moveCursor); window.removeEventListener('mouseover', overInteractive); window.clearInterval(clockTimer) }
  }, [])

  return <><div className={`cursor ${cursor.active ? 'cursor-active' : ''}`} style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />
    <header className="site-nav"><a className="brand" href="#top" aria-label="Back to top">AP<span>.</span></a><nav>{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav><a className="talk-link" href="#contact">LET&apos;S TALK <ArrowUpRight size={14} /></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>
    <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}<ArrowUpRight size={16} /></a>)}</div>

    <PortfolioChatbot />
    <main id="top">
      <section id="home" className="hero page-pad"><div className="hero-copy reveal"><div className="eyebrow"><span className="lime-dot" /> HELLO, I&apos;M</div><h1>ANSHUMAN<br /><span>PANDEY</span></h1><p className="hero-intro">I build digital experiences, security systems and things that shouldn&apos;t look boring.</p><div className="hero-actions"><a className="lime-button" href="#projects">EXPLORE WORK <ArrowUpRight size={16} /></a><a className="text-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">DOWNLOAD CV <ArrowDownRight size={16} /></a></div><div className="identity-labels"><span>CYBERSECURITY</span><span>SECURITY OPERATIONS</span><span>CREATIVE TECHNOLOGY</span></div></div><div className="hero-art reveal"><SystemVisual /></div><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16} /></div></section>
      <section className="stats page-pad reveal"><div><strong>06<span>+</span></strong><small>SECURITY PROJECTS</small></div><div><strong>06</strong><small>CORE SKILL AREAS</small></div><div><strong>100<span>%</span></strong><small>HANDS-ON FOCUS</small></div><div><strong>∞</strong><small>ALWAYS LEARNING</small></div><div><strong>24<span>/7</span></strong><small>CURIOSITY MODE</small></div></section>
      <section id="about" className="about page-pad section-pad"><div className="section-kicker reveal"><span>01</span><span>ABOUT / THE PERSON BEHIND THE SYSTEM</span></div><div className="about-grid"><div className="about-heading reveal">
  <h2>I LIKE BUILDING<br />THINGS THAT<br />MAKE PEOPLE<br />LOOK <span>TWICE.</span></h2>

  <p className="about-intro">
    I&apos;m a BCA graduate focused on Cybersecurity and SOC operations.
    I enjoy analyzing threats, investigating incidents, and building
    practical security solutions.
  </p>

  <div className="about-tags">
    <span>SOC ANALYST</span>
    <span>THREAT DETECTION</span>
    <span>INCIDENT RESPONSE</span>
    <span>ALWAYS LEARNING</span>
  </div>
</div><div className="about-side reveal"><div className="profile-portrait"><img src="/anshuman-profile.png" alt="Portrait of Anshuman Pandey" /><div className="portrait-scan" /><span>PROFILE / 2026</span><i /></div><div className="about-description"><span>CYBERSECURITY / SOC</span><p className="profile-intro"><span>01 / SYSTEM STATUS</span><strong>DEFENDING THE<br />DIGITAL LAYER.</strong><em>Monitoring signals. Investigating threats.<br />Learning how attacks move — and how to stop them.</em><small>STATUS: BUILDING&nbsp;&nbsp; // &nbsp;&nbsp;MODE: BLUE TEAM</small></p></div><div className="profile-data"><div><small>BASED IN</small><b>DELHI, INDIA</b></div><div><small>FOCUS</small><b>CYBERSECURITY / SOC</b></div><div><small>CURRENTLY</small><b>BUILDING &amp; LEARNING</b></div><div><small>EDUCATION</small><b>BCA GRADUATE</b></div></div></div></div></section>
      <section id="skills" className="skills page-pad section-pad"><div className="section-kicker reveal"><span>02</span><span>TOOLS / THE WORKBENCH</span></div><div className="skills-head reveal"><h2>WHAT I<br /><span>WORK WITH</span></h2><p>Curious by default. Practical by design.<br />Always one layer deeper.</p></div><div className="skill-list reveal">{skillGroups.map((skill, index) => <button key={skill.name} className={`skill-row ${activeSkill === index ? 'skill-active' : ''}`} onMouseEnter={() => setActiveSkill(index)} onFocus={() => setActiveSkill(index)} onClick={() => setActiveSkill(index)}><span>{skill.number}</span><strong>{skill.name}</strong><em>{activeSkill === index ? skill.skills : 'EXPLORE'}</em><ChevronDown size={18} /></button>)}</div></section>
      <section id="projects" className="projects page-pad section-pad"><div className="section-kicker reveal"><span>03</span><span>SELECTED WORK / RECENT BUILDS</span></div><div className="section-title reveal"><h2>SELECTED <span>WORK.</span></h2><a href="#contact">VIEW ALL WORK <ArrowUpRight size={16} /></a></div><div className="project-grid">{projects.map((project) => <a className="project-card reveal" href="#contact" key={project.number}><div className="project-art"><SystemVisual type={project.type} /></div><div className="project-meta"><span>{project.number}</span><span>{project.tags}</span><MoveUpRight size={18} /></div><h3>{project.title}</h3><p>{project.description}</p></a>)}</div></section>
      <section id="experiments" className="experiments page-pad section-pad"><div className="section-kicker reveal"><span>04</span><span>EXPERIMENTS / VISIBLE LEARNING</span></div><div className="experiment-intro reveal"><h2>BUILD.<br /><span>BREAK.</span><br />LEARN.</h2><p>Small systems, interfaces and security experiments.<br />Because learning should be visible.</p></div><div className="experiment-list reveal">{['SECURITY DASHBOARD', 'NETWORK VISUALIZER', 'THREAT MONITOR', 'TERMINAL INTERFACE'].map((item, index) => <a href="#contact" key={item}><span>0{index + 1}</span><strong>{item}</strong><i><ArrowUpRight size={18} /></i></a>)}</div></section>
      <section id="journey" className="journey page-pad section-pad"><div className="section-kicker reveal"><span>05</span><span>JOURNEY / THE NEXT LAYER</span></div><div className="journey-grid"><h2 className="reveal">ALWAYS<br /><span>LEARNING.</span></h2><div className="learning-list reveal"><p>CURRENTLY EXPLORING</p>{['THREAT HUNTING', 'BLUE TEAM OPERATIONS', 'MALWARE ANALYSIS', 'CLOUD SECURITY'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={16} /></div>)}</div></div></section>
      <section id="contact" className="contact page-pad section-pad"><div className="contact-content reveal"><div className="section-kicker"><span>06</span><span>CONTACT / START A CONVERSATION</span></div><h2>LET&apos;S MAKE<br />SOMETHING <span>INTERESTING.</span></h2><button className="lime-button contact-button" type="button" onClick={() => setContactOpen(true)}>LET&apos;S CONNECT <ArrowUpRight size={18} /></button></div><div className="contact-links reveal"><a href="mailto:anshn.py@gmail.com"><Mail size={18} /><span>EMAIL</span><b>anshn.py@gmail.com</b><ArrowUpRight size={18} /></a><a href="https://www.linkedin.com/in/anshuman-pandey-b847b5287" target="_blank" rel="noreferrer"><Users size={18} /><span>LINKEDIN</span><b>CONNECT WITH ME</b><ArrowUpRight size={18} /></a><a href="https://github.com/anshnpy" target="_blank" rel="noreferrer"><GitBranch size={18} /><span>GITHUB</span><b>SEE THE BUILDS</b><ArrowUpRight size={18} /></a><div className="contact-location"><span>LOCATION</span><b>DELHI, INDIA</b></div></div></section>      {contactOpen && (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Quick contact">
          <button className="contact-modal-backdrop" type="button" aria-label="Close contact" onClick={() => setContactOpen(false)} />
          <div className="contact-modal-window">
            <div className="contact-modal-head">
              <span>QUICK CONTACT</span>
              <button type="button" onClick={() => setContactOpen(false)}>CLOSE ×</button>
            </div>
            <p>OPEN CHANNEL / SEND A MESSAGE DIRECTLY.</p>
            <form className="contact-modal-form" onSubmit={async (e) => { e.preventDefault(); const form = e.currentTarget; const response = await fetch("https://formspree.io/f/mvkpbayg", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } }); if (response.ok) { form.reset(); setContactSent(true); const audioContext = new AudioContext(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.type = "triangle"; oscillator.frequency.setValueAtTime(520, audioContext.currentTime); oscillator.frequency.setValueAtTime(780, audioContext.currentTime + 0.09); gain.gain.setValueAtTime(0.0001, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.055, audioContext.currentTime + 0.015); gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.09); gain.gain.setValueAtTime(0.0001, audioContext.currentTime + 0.09); gain.gain.exponentialRampToValueAtTime(0.065, audioContext.currentTime + 0.105); gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.22); oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + 0.22); setTimeout(() => { setContactSent(false); audioContext.close(); }, 3500); } }}>
              <input name="name" type="text" placeholder="YOUR NAME" required />
              <input name="email" type="email" placeholder="YOUR EMAIL" required />
              <textarea name="message" placeholder="YOUR MESSAGE" required />
              <input type="hidden" name="_subject" value="New Portfolio Message — Anshuman Pandey" />
              <button type="submit">SEND MESSAGE ↗</button>{contactSent && <div className="contact-success">✓ MESSAGE SENT SUCCESSFULLY</div>}
            </form>
          </div>
        </div>
      )}</main>
    <footer className="footer page-pad"><a className="brand" href="#top">AP<span>.</span></a><span>BUILT WITH CURIOSITY. SECURED WITH INTENT.</span><span>Â© 2026 ANSHUMAN PANDEY</span></footer>
  </>
}



































