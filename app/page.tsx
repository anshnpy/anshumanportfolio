'use client'

import { useEffect, useState } from 'react'
import PortfolioChatbot from "../components/PortfolioChatbot";
import { ArrowDownRight, ArrowUpRight, ChevronDown, GitBranch, Mail, Menu, MoveUpRight, Users, X } from 'lucide-react'

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experiments', 'Journey', 'Contact']
const skillGroups = [
  { number: '01', name: 'NETWORKING', skills: 'TCP/IP Â· DNS Â· HTTP Â· WIRESHARK Â· PACKET ANALYSIS', focus: 'NETWORK DEFENSE / PACKET ANALYSIS' },
  { number: '02', name: 'LINUX', skills: 'BASH Â· HARDENING Â· LOGS Â· PERMISSIONS Â· SYSTEMS', focus: 'SYSTEM SECURITY / HARDENING' },
  { number: '03', name: 'PYTHON', skills: 'AUTOMATION Â· PARSING Â· SOCKETS Â· SCRIPTS Â· APIs', focus: 'SECURITY AUTOMATION / SCRIPTING' },
  { number: '04', name: 'SECURITY', skills: 'THREAT MODELING Â· IOCS Â· OSINT Â· INCIDENT RESPONSE', focus: 'DEFENSIVE SECURITY / INVESTIGATION' },
  { number: '05', name: 'SIEM', skills: 'LOG ANALYSIS Â· DETECTION Â· ALERTS Â· SPLUNK Â· ELASTIC', focus: 'SOC / DETECTION / ALERT TRIAGE' },
  { number: '06', name: 'WEB', skills: 'HTTP Â· AUTH Â· OWASP Â· JAVASCRIPT Â· APIS', focus: 'WEB SECURITY / APPLICATIONS' },
]
const projects = [
  { number: '01', title: 'SOC HOME LAB / SIEM DASHBOARD', description: 'A practical Security Operations environment for monitoring, detection, SIEM workflows and incident investigation.', tags: 'SOC / SIEM / MONITORING / BLUE TEAM', type: 'soc', github: 'https://github.com/anshnpy/soc-home-lab', status: 'COMPLETED'  , image: '/projects/01-soc-home-lab.png' },
  { number: '02', title: 'INCIDENT RESPONSE & INVESTIGATION PLATFORM', description: 'A structured platform for alert triage, investigation, evidence handling, timelines, IOCs and incident response workflows.', tags: 'INCIDENT RESPONSE / INVESTIGATION / DFIR', type: 'incident', status: 'BUILDING'  , image: '/projects/02-incident-response.png' },
  { number: '03', title: 'MALWARE ANALYSIS SANDBOX', description: 'An isolated malware-analysis environment for safe static analysis, behavioral observation, network monitoring and IOC extraction.', tags: 'MALWARE / SANDBOX / ANALYSIS', type: 'malware', status: 'BUILDING'  , image: '/projects/03-malware-analysis.png' },
  { number: '04', title: 'NETWORK IDS & SECURITY MONITORING', description: 'A network-defense lab for traffic visibility, intrusion detection, suspicious activity monitoring and alert investigation.', tags: 'NETWORK / IDS / MONITORING', type: 'network-ids', status: 'BUILDING'  , image: '/projects/04-network-ids.png' },
  { number: '05', title: 'MITRE ATT&CK ATTACK SIMULATION LAB', description: 'An authorized lab for simulating defensive-security scenarios, generating telemetry and mapping observed behavior to MITRE ATT&CK.', tags: 'MITRE ATT&CK / SIMULATION / DETECTION', type: 'mitre', status: 'BUILDING'  , image: '/projects/05-mitre-attack.png' },
  { number: '06', title: 'AI SECURITY ASSISTANT / SOC COPILOT', description: 'An AI-assisted security workspace for alert explanation, log analysis, IOC extraction, investigation guidance and report generation.', tags: 'AI / SOC / SECURITY AUTOMATION', type: 'ai', status: 'BUILDING'  , image: '/projects/06-ai-soc-copilot.png' },
  { number: '07', title: 'DIGITAL FORENSICS & DFIR PLATFORM', description: 'A forensic investigation workflow for evidence handling, artifact analysis, timeline reconstruction and incident reporting.', tags: 'DFIR / FORENSICS / INVESTIGATION', type: 'dfir', status: 'BUILDING'  , image: '/projects/07-dfir.png' },
  { number: '08', title: 'THREAT INTELLIGENCE PLATFORM', description: 'A threat-intelligence workspace for IOC collection, enrichment, scoring, relationships and analyst-focused investigation.', tags: 'THREAT INTEL / IOCS / ENRICHMENT', type: 'network', status: 'BUILDING'  , image: '/projects/08-threat-intel.png' },
  { number: '09', title: 'SOAR / SECURITY AUTOMATION PLATFORM', description: 'A security-automation platform for alert-driven playbooks, enrichment, investigation workflows and repeatable SOC actions.', tags: 'SOAR / AUTOMATION / PLAYBOOKS', type: 'soar', status: 'BUILDING'  , image: '/projects/09-soar.png' },
  { number: '10', title: 'CLOUD SECURITY MONITORING LAB', description: 'A cloud-security monitoring environment focused on identity, activity logs, configuration changes, permissions and suspicious behavior.', tags: 'CLOUD / SECURITY / MONITORING', type: 'cloud', status: 'BUILDING'  , image: '/projects/10-cloud-security.png' },
]

function SystemVisual({ type = 'hero' }: { type?: string }) {
  if (type === 'network' || type === 'network-ids') return <div className="project-visual network-visual"><div className="network-head"><span>NETWORK / IDS</span><b>LIVE</b></div><div className="network-path"><span className="net-node n-internet">INTERNET</span><i className="net-link" /><span className="net-node n-firewall">FIREWALL</span><i className="net-link" /><span className="net-node n-ids">IDS</span><i className="net-link" /><span className="net-node n-network">NETWORK</span></div><div className="network-alert"><small>THREAT DETECTION</small><strong>24</strong><b>ALERTS</b></div><div className="network-packets"><i /><i /><i /><i /><i /></div><div className="network-footer"><span>PACKETS <b>1.2K</b></span><span>STATUS <b>MONITORING</b></span><span>HEALTH <b>86%</b></span></div></div>

  if (type === 'siem') return <div className="project-visual siem-visual"><div className="siem-head"><span>SIEM / CORRELATION</span><b>LIVE</b></div><div className="log-stack"><p><i /> AUTH_FAILURE <small>HIGH</small></p><p><i /> DNS_ANOMALY <small>MED</small></p><p><i /> PROCESS_START <small>LOW</small></p><p><i /> IOC_MATCH <small>HIGH</small></p></div><div className="siem-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>

  if (type === 'incident') return <div className="project-visual incident-visual"><div className="incident-head"><span>INCIDENT / RESPONSE</span><b>ACTIVE</b></div><div className="incident-side"><small>ACTIVE INCIDENTS</small><strong>03</strong><b>PRIORITY / HIGH</b></div><div className="incident-track"><span className="incident-line" /><span className="incident-node is-done"><i /><b>01</b><small>DETECTION</small></span><span className="incident-node is-done"><i /><b>02</b><small>ANALYSIS</small></span><span className="incident-node is-current"><i /><b>03</b><small>CONTAINMENT</small></span><span className="incident-node"><i /><b>04</b><small>ERADICATION</small></span><span className="incident-node"><i /><b>05</b><small>RECOVERY</small></span></div><div className="incident-foot"><span>LAST UPDATE <b>10:36:11</b></span><span>IMPACT <b>CRITICAL SYSTEMS</b></span></div></div>

  if (type === 'malware') return <div className="project-visual malware-visual"><div className="malware-head"><span>MALWARE / SANDBOX</span><b>ISOLATED</b></div><div className="malware-file"><small>SUBMITTED FILE</small><strong>sample.exe</strong><b>PE32</b></div><div className="malware-box"><i className="malware-bio">☣</i><span>SANDBOX</span><b>RUNNING</b></div><div className="malware-process"><span>PROCESS</span><i>sample.exe</i><i>↳ powershell</i><i>↳ network.dll</i></div><div className="malware-signals"><span>PROCESS <b>12</b></span><span>NETWORK <b>07</b></span><span>FILES <b>05</b></span></div><div className="malware-footer"><span>ANALYSIS <b>IN PROGRESS</b></span><span>THREAT <b>HIGH</b></span></div></div>

  if (type === 'mitre') return <div className="project-visual mitre-visual"><div className="mitre-head"><span>MITRE ATT&CK / SIMULATION</span><b>BUILDING</b></div><div className="mitre-chain"><span className="mitre-step"><i>⌘</i><small>INITIAL ACCESS</small><b>T1190</b></span><em>→</em><span className="mitre-step active"><i>⚙</i><small>EXECUTION</small><b>T1059</b></span><em>→</em><span className="mitre-step"><i>↗</i><small>PRIV ESC</small><b>T1068</b></span><em>→</em><span className="mitre-step"><i>→</i><small>LATERAL</small><b>T1021</b></span><em>→</em><span className="mitre-step"><i>◎</i><small>IMPACT</small><b>T1486</b></span></div><div className="mitre-stats"><span><small>TECHNIQUES</small><b>12</b></span><span><small>DETECTIONS</small><b>08</b></span><span><small>COVERAGE</small><b>67%</b></span></div><div className="mitre-detection"><span>ACTIVE STEP</span><b>EXECUTION / T1059</b><i /><i /><i /><i /><i /></div></div>

  if (type === 'ai') return <div className="project-visual ai-visual"><div className="ai-head"><span>AI / SOC COPILOT</span><b>ONLINE</b></div><div className="ai-core-layout"><div className="ai-inputs"><span><i>!</i><b>ALERTS</b><small>1.2K</small></span><span><i>+</i><b>LOGS</b><small>24K</small></span><span><i>□</i><b>ENDPOINTS</b><small>156</small></span><span><i>◎</i><b>THREAT INTEL</b><small>892 IOC</small></span></div><div className="ai-core-orbit"><i className="ai-core-dot d1" /><i className="ai-core-dot d2" /><i className="ai-core-dot d3" /><i className="ai-core-dot d4" /><strong>AI</strong><small>SOC COPILOT</small></div><div className="ai-output"><span><i>~</i><b>THREAT ANALYSIS</b><small>ACTIVE</small></span><span><i>◎</i><b>THREAT SCORE</b><strong>78</strong><small>/100</small></span><span><i>✓</i><b>RECOMMENDATION</b><small>READY</small></span></div></div><div className="ai-insights"><span>POWERSHELL <b>DETECTED</b></span><span>LATERAL MOVEMENT <b>FLAGGED</b></span><span>MALICIOUS IP <b>FOUND</b></span></div><div className="ai-footer"><span>ALERTS <b>1.2K</b></span><span>THREATS <b>156</b></span><span>ACCURACY <b>92%</b></span><span>RESPONSE <b>2.4M</b></span></div></div>
  if (type === 'dfir') return <div className="project-visual dfir-visual"><div className="dfir-head"><span>DFIR / CASE INVESTIGATION</span><b>BUILDING</b></div><div className="dfir-evidence"><span><i>▣</i><b>DISK IMAGE</b><small>142 GB</small></span><span><i>⌁</i><b>MEMORY DUMP</b><small>8.4 GB</small></span><span><i>□</i><b>EVENT LOGS</b><small>32 FILES</small></span><span><i>◌</i><b>BROWSER DATA</b><small>18 ARTIFACTS</small></span></div><div className="dfir-core"><small>CASE / DFIR-007</small><strong>EVIDENCE</strong><span>CHAIN OF CUSTODY</span></div><div className="dfir-findings"><span><small>FINDINGS</small><b>08</b></span><span><small>SUSPICIOUS</small><b>03</b></span><span><small>CONFIRMED</small><b>02</b></span></div><div className="dfir-events"><span>11:15&nbsp; POWERSHELL EXECUTION</span><span>11:42&nbsp; EXTERNAL CONNECTION</span><span>12:05&nbsp; SENSITIVE FILE ACCESS</span></div></div>

  if (type === 'threat-intel') return <div className="project-visual threatintel-visual"><div className="threatintel-head"><span>THREAT INTEL / IOC GRAPH</span><b>ENRICHED</b></div><div className="ti-network"><i className="ti-link l1" /><i className="ti-link l2" /><i className="ti-link l3" /><i className="ti-link l4" /><i className="ti-link l5" /><span className="ti-node ti-ip"><b>IP</b><small>203.0.113.45</small></span><span className="ti-node ti-domain"><b>DOMAIN</b><small>evil.example</small></span><span className="ti-node ti-hash"><b>HASH</b><small>SHA256</small></span><span className="ti-node ti-actor"><b>ACTOR</b><small>APT-X</small></span><span className="ti-core-new"><strong>IOC</strong><small>ENRICHED</small><i /></span><span className="ti-node ti-malware"><b>MALWARE</b><small>LOADER</small></span></div><div className="ti-risk"><small>RISK SCORE</small><strong>82</strong><b>/100</b></div><div className="ti-enrichment"><span>OSINT <b>READY</b></span><span>RELATIONS <b>14</b></span><span>CONFIDENCE <b>91%</b></span></div></div>

  if (type === 'soar') return <div className="project-visual soar-visual"><div className="soar-head"><span>SOAR / PLAYBOOK AUTOMATION</span><b>AUTOMATED</b></div><div className="soar-trigger"><i>⚡</i><small>TRIGGER</small><b>ALERT RECEIVED</b></div><div className="soar-connector c1" /><div className="soar-step s1"><i>□</i><small>ENRICH</small><b>IOC / URL</b></div><div className="soar-connector c2" /><div className="soar-step s2"><i>⌕</i><small>ANALYZE</small><b>THREAT INTEL</b></div><div className="soar-connector c3" /><div className="soar-branches"><span><i>✓</i><small>CONTAIN</small><b>BLOCK IOC</b></span><span><i>↗</i><small>NOTIFY</small><b>ALERT TEAM</b></span><span><i>✕</i><small>ERADICATE</small><b>REMOVE THREAT</b></span></div><div className="soar-footer"><span>RUNS <b>156</b></span><span>SUCCESS <b>92%</b></span><span>AVG TIME <b>1m 42s</b></span></div></div>

  if (type === 'cloud') return <div className="project-visual cloud-visual"><div className="cloud-head"><span>CLOUD / SECURITY MONITORING</span><b>ACTIVE</b></div><div className="cloud-sources"><span><i>☁</i><b>CLOUD</b><small>AWS / AZURE</small></span><span><i>◎</i><b>IAM</b><small>ACCESS</small></span><span><i>⌁</i><b>API</b><small>ACTIVITY</small></span></div><div className="cloud-core"><strong>SEC</strong><small>CLOUD GUARD</small><i className="cloud-ring r1" /><i className="cloud-ring r2" /></div><div className="cloud-findings"><span><small>MISCONFIG</small><b>04</b></span><span><small>ALERTS</small><b>18</b></span><span><small>RISK</small><b>HIGH</b></span></div><div className="cloud-footer"><span>LOGS <b>24K</b></span><span>ASSETS <b>86</b></span><span>HEALTH <b>94%</b></span></div></div>

  if (type === 'soc') return <div className="project-visual soc-visual soc-showcase"><div className="soc-showcase-head"><span>01</span><b>SOC / LIVE MONITOR</b></div><div className="soc-showcase-core"><div className="soc-radar-grid" /><div className="soc-ring ring-a" /><div className="soc-ring ring-b" /><div className="soc-ring ring-c" /><div className="soc-signal-line" /><i className="soc-signal-point p1" /><i className="soc-signal-point p2" /><i className="soc-signal-point p3" /><i className="soc-signal-point p4" /><strong>1,284</strong><small>EVENTS / 24H</small></div><div className="soc-showcase-stats"><span><small>ALERTS</small><b>07</b></span><span><small>HEALTH</small><b>99%</b></span><span><small>STATUS</small><b>LIVE</b></span></div><div className="soc-showcase-footer">DETECTING <b>THREATS</b><i /></div></div>

  if (type === 'windows') return <div className="project-visual windows-visual"><div className="event-top"><span>EVENT VIEWER / SECURITY</span><b>FILTER: AUTH</b></div>{['4624  SUCCESS LOGON', '4625  FAILED LOGON', '4672  ADMIN PRIVILEGE', '4634  LOGOFF'].map((event, index) => <div className="event-row" key={event}><i className={index === 1 ? 'warn' : ''} /><span>{event}</span><small>02:{14 + index}:26</small></div>)}<div className="timeline-line" /></div>

  return <div className="system-visual" aria-label="Abstract active digital network system"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="network-globe">{Array.from({ length: 34 }, (_, index) => <i className={`globe-node globe-node-${index + 1}`} key={index} />)}<div className="globe-meridian meridian-one" /><div className="globe-meridian meridian-two" /><div className="globe-latitude latitude-one" /><div className="globe-latitude latitude-two" /><i className="globe-signal signal-one" /><i className="globe-signal signal-two" /><i className="globe-signal signal-three" /></div><div className="globe-hud-ring"><span>NETWORK</span><span>SECURE</span><span>LIVE</span></div><i className="globe-data-packet packet-one" /><i className="globe-data-packet packet-two" /><i className="globe-data-packet packet-three" /><i className="data-point point-one" /><i className="data-point point-two" /><i className="data-point point-three" /><div className="system-grid" /><div className="system-card card-top"><span className="status-dot" /> SYSTEM STATUS <b>ACTIVE</b></div><div className="system-clock"><span>LOCAL TIME</span><strong id="live-clock">00:00:00</strong><small>DELHI / INDIA</small></div><div className="system-card card-bottom">SECURING SYSTEMS<br />BUILDING SOLUTIONS<br />CREATING IMPACT</div><span className="axis axis-x">X / 04</span><span className="axis axis-y">Y /09</span></div>
}

export default function Page() {
  const [intro, setIntro] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [activeSkill, setActiveSkill] = useState(0)
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null)
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
</div><div className="about-side reveal"><div className="profile-portrait"><img src="/anshuman-profile.png" alt="Portrait of Anshuman Pandey" /><div className="portrait-scan" /><span>PROFILE / 2026</span><i /></div><div className="about-description"><span>CYBERSECURITY / SOC</span><p className="profile-intro"><span>01 / SYSTEM STATUS</span><strong>DEFENDING THE<br />DIGITAL LAYER.</strong><em>Monitoring signals. Investigating threats.<br />Learning how attacks move â€” and how to stop them.</em><small>STATUS: BUILDING&nbsp;&nbsp; // &nbsp;&nbsp;MODE: BLUE TEAM</small></p></div><div className="profile-data"><div><small>BASED IN</small><b>DELHI, INDIA</b></div><div><small>FOCUS</small><b>CYBERSECURITY / SOC</b></div><div><small>CURRENTLY</small><b>BUILDING &amp; LEARNING</b></div><div><small>EDUCATION</small><b>BCA GRADUATE</b></div></div></div></div></section>
      <section id="skills" className="skills page-pad section-pad"><div className="section-kicker reveal"><span>02</span><span>TOOLS / THE WORKBENCH</span></div><div className="skills-head reveal"><h2>WHAT I<br /><span>WORK WITH</span></h2><p>Curious by default. Practical by design.<br />Always one layer deeper.</p></div><div className="skill-list reveal">{skillGroups.map((skill, index) => <button key={skill.name} className={`skill-row ${activeSkill === index ? 'skill-active' : ''}`} onMouseEnter={() => setActiveSkill(index)} onFocus={() => setActiveSkill(index)} onClick={() => setActiveSkill(index)}><span>{skill.number}</span><strong>{skill.name}</strong><em>{activeSkill === index ? skill.skills : 'EXPLORE'}</em>{activeSkill === index && <small className="skill-focus">FOCUS: {skill.focus}</small>}<ChevronDown size={18} /></button>)}</div></section>
      <section id="projects" className="projects page-pad section-pad"><div className="section-kicker reveal"><span>03</span><span>SELECTED WORK / RECENT BUILDS</span></div><div className="section-title reveal"><h2>SELECTED <span>WORK.</span></h2><a href="#projects">VIEW ALL WORK <ArrowUpRight size={16} /></a></div><div className="project-grid">{projects.map((project) => <a className="project-card reveal" href="#projects" onClick={(event) => { event.preventDefault(); setActiveProject(project) }} key={project.number}><div className="project-art"><img className="project-card-image" src={project.image} alt={project.title} loading="lazy" /></div><div className="project-meta"><span>{project.number}</span><span>{project.tags}</span><span className="project-meta-status">{project.status}</span><MoveUpRight size={18} /></div><h3>{project.title}</h3><p>{project.description}</p><span className="project-explore">EXPLORE PROJECT <MoveUpRight size={14} /></span></a>)}</div></section>
      <section id="experiments" className="experiments page-pad section-pad"><div className="section-kicker reveal"><span>04</span><span>EXPERIMENTS / VISIBLE LEARNING</span></div><div className="experiment-intro reveal"><h2>BUILD.<br /><span>BREAK.</span><br />LEARN.</h2><p>Small systems, interfaces and security experiments.<br />Because learning should be visible.</p></div><div className="experiment-list reveal">{['SECURITY DASHBOARD', 'NETWORK VISUALIZER', 'THREAT MONITOR', 'TERMINAL INTERFACE'].map((item, index) => <a href="#experiments" onClick={(event) => event.preventDefault()} key={item}><span>0{index + 1}</span><strong>{item}</strong><small className="experiment-status">BUILD QUEUE</small><i><ArrowUpRight size={18} /></i></a>)}</div></section>
      <section id="journey" className="journey page-pad section-pad"><div className="section-kicker reveal"><span>05</span><span>JOURNEY / THE NEXT LAYER</span></div><div className="journey-grid"><h2 className="reveal">ALWAYS<br /><span>LEARNING.</span></h2><div className="learning-list reveal"><p>CURRENT FOCUS / CYBERSECURITY + SOC</p><div className="journey-status"><span>01</span><strong>BLUE TEAM OPERATIONS</strong><small>CURRENTLY LEARNING</small></div><div className="journey-status"><span>02</span><strong>LOG ANALYSIS</strong><small>CURRENTLY LEARNING</small></div><div className="journey-status"><span>03</span><strong>SECURITY FUNDAMENTALS</strong><small>CURRENTLY LEARNING</small></div><p className="journey-next">EXPLORING NEXT</p>{['THREAT HUNTING', 'MALWARE ANALYSIS', 'CLOUD SECURITY'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={16} /></div>)}</div></div></section>
      <section id="contact" className="contact page-pad section-pad"><div className="contact-content reveal"><div className="section-kicker"><span>06</span><span>CONTACT / START A CONVERSATION</span></div><h2>LET&apos;S MAKE<br />SOMETHING <span>INTERESTING.</span></h2><button className="lime-button contact-button" type="button" onClick={() => setContactOpen(true)}>LET&apos;S CONNECT <ArrowUpRight size={18} /></button></div><div className="contact-links reveal"><a href="mailto:anshn.py@gmail.com"><Mail size={18} /><span>EMAIL</span><b>anshn.py@gmail.com</b><ArrowUpRight size={18} /></a><a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><ArrowDownRight size={18} /><span>RESUME</span><b>VIEW / DOWNLOAD CV</b><ArrowUpRight size={18} /></a><a href="https://www.linkedin.com/in/anshuman-pandey-b847b5287" target="_blank" rel="noreferrer"><Users size={18} /><span>LINKEDIN</span><b>CONNECT WITH ME</b><ArrowUpRight size={18} /></a><a href="https://github.com/anshnpy" target="_blank" rel="noreferrer"><GitBranch size={18} /><span>GITHUB</span><b>SEE THE BUILDS</b><ArrowUpRight size={18} /></a><div className="contact-location"><span>LOCATION</span><b>DELHI, INDIA</b></div></div></section>      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label="Project details" onClick={() => setActiveProject(null)}>
          <div className="project-modal-window" onClick={(event) => event.stopPropagation()}>
            <div className="project-modal-head">
              <span>PROJECT / {activeProject.number}</span>
              <button type="button" onClick={() => setActiveProject(null)}>CLOSE Ã—</button>
            </div>

            <div className="project-modal-grid">
              <div className="project-modal-art">
                <img className="project-modal-image" src={activeProject.image} alt={activeProject.title} />
              </div>

              <div className="project-modal-info">
                 <span className="project-modal-status">? BUILDING</span>
                <h2>{activeProject.title}</h2>
                <p>{activeProject.description}</p>

                <div className="project-modal-tags">
                  {activeProject.tags.split(' / ').map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project-modal-note">
                  <span>STATUS</span>
                  <strong>{activeProject.status}</strong>
                  <p>{activeProject.description}</p>

                  {activeProject.github && (
                    <a
                      className="project-github-button"
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW GITHUB <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {contactOpen && (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Quick contact">
          <button className="contact-modal-backdrop" type="button" aria-label="Close contact" onClick={() => setContactOpen(false)} />
          <div className="contact-modal-window">
            <div className="contact-modal-head">
              <span>QUICK CONTACT</span>
              <button type="button" onClick={() => setContactOpen(false)}>CLOSE Ã—</button>
            </div>
            <p>OPEN CHANNEL / SEND A MESSAGE DIRECTLY.</p>
            <form className="contact-modal-form" onSubmit={async (e) => { e.preventDefault(); const form = e.currentTarget; const response = await fetch("https://formspree.io/f/mvkpbayg", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } }); if (response.ok) { form.reset(); setContactSent(true); const audioContext = new AudioContext(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.type = "triangle"; oscillator.frequency.setValueAtTime(520, audioContext.currentTime); oscillator.frequency.setValueAtTime(780, audioContext.currentTime + 0.09); gain.gain.setValueAtTime(0.0001, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.055, audioContext.currentTime + 0.015); gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.09); gain.gain.setValueAtTime(0.0001, audioContext.currentTime + 0.09); gain.gain.exponentialRampToValueAtTime(0.065, audioContext.currentTime + 0.105); gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.22); oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + 0.22); setTimeout(() => { setContactSent(false); audioContext.close(); }, 3500); } }}>
              <input name="name" type="text" placeholder="YOUR NAME" required />
              <input name="email" type="email" placeholder="YOUR EMAIL" required />
              <textarea name="message" placeholder="YOUR MESSAGE" required />
              <input type="hidden" name="_subject" value="New Portfolio Message â€” Anshuman Pandey" />
              <button type="submit">SEND MESSAGE â†—</button>{contactSent && <div className="contact-success">âœ“ MESSAGE SENT SUCCESSFULLY</div>}
            </form>
          </div>
        </div>
      )}</main>
    <footer className="footer page-pad"><a className="brand" href="#top">AP<span>.</span></a><span>BUILT WITH CURIOSITY. SECURED WITH INTENT.</span><span>Â© 2026 ANSHUMAN PANDEY</span></footer>
  </>
}



















































