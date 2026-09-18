# SOC HOME LAB

## Project Type
Defensive Cybersecurity / Security Operations / SIEM.

## Short Answer
SOC Home Lab is a hands-on Security Operations Center project built around Wazuh for security monitoring, investigation, incident management, threat intelligence and MITRE ATT&CK analysis.

## Overview
The project integrates Wazuh security data into a web-based SOC dashboard designed around practical monitoring and investigation workflows.

## Key Features
- Security alert monitoring
- Wazuh agent and endpoint visibility
- Incident monitoring
- Threat indicators
- MITRE ATT&CK integration
- Case management
- Reports
- SOC activity
- Threat intelligence
- Playbooks
- Network visibility
- Responsive SOC dashboard

## Application Modules
Alerts, Cases, Endpoints, Incidents, MITRE, Network, Playbooks, Reports, Settings, Threat Intelligence and Threats.

## Wazuh Integration
Dedicated API routes expose Wazuh-related activity, agents, alerts, cases, incidents, indicators, MITRE information, reports and summaries.

Sensitive Wazuh credentials are handled through server-side environment variables rather than hardcoded application source.

## Technology
- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- React Leaflet
- Leaflet
- Lucide React
- Wazuh
- OpenNext
- Cloudflare
- Wrangler
- Undici

## Workflow
Endpoint -> Wazuh Agent -> Wazuh Manager -> Wazuh Indexer -> API Layer -> SOC Dashboard.

The project demonstrates a workflow around monitoring security events, reviewing alerts, investigating incidents, correlating information and considering defensive response actions.

## Skills Demonstrated
- SOC monitoring
- SIEM concepts
- Log analysis
- Security investigation
- Threat detection
- Incident response
- Wazuh integration
- MITRE ATT&CK
- Threat intelligence
- API integration
- Cloud deployment concepts

## Validation
The repository documents successful production build validation, dashboard testing, Wazuh data verification, navigation testing, SOC module testing, API checks and responsive UI testing.

## Portfolio Status
COMPLETED.

## GitHub
https://github.com/anshnpy/soc-home-lab

## Detailed Answer
SOC Home Lab was built to practice realistic SOC workflows instead of only studying security concepts theoretically. Wazuh telemetry is integrated into a web-based environment where security alerts, endpoints, incidents, cases, threat indicators and investigation-related information can be reviewed.

The project demonstrates practical exposure to security monitoring, SIEM concepts, incident investigation, MITRE ATT&CK, threat intelligence and defensive-security workflows.

## Interview Explanation
I built a SOC Home Lab around Wazuh to practice the workflow of a Security Operations environment. The project focuses on monitoring security alerts and endpoints, investigating incidents, correlating security information and understanding how a SOC analyst can move from detection toward an appropriate defensive response.