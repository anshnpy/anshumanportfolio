# INCIDENT RESPONSE & INVESTIGATION PLATFORM

## Project Type
SOC / Incident Response / Investigation / DFIR.

## Short Answer
Incident Response Platform is a SOC analyst workspace built around Wazuh telemetry, Cloudflare Workers and Cloudflare D1 for moving from incident detection through investigation, response and reporting.

## Overview
The platform is designed as a unified analyst workflow:

Detection -> Investigation -> Response -> Reporting.

## Key Features
- Live Wazuh incidents and alerts
- Analyst-owned investigation cases
- Entity investigation
- Evidence investigation
- MITRE ATT&CK mapping
- Findings
- Response actions
- Threat intelligence views
- Playbook execution
- Operational reports
- Global search
- Cloudflare D1 persistence

## Investigation Workflow
Wazuh Telemetry
-> Incident Detection
-> Case Creation
-> Investigation
-> Evidence + Entities + MITRE
-> Findings
-> Response / Playbooks
-> Operational Reports

## Case Management
Cases persist in Cloudflare D1 with information such as severity, status, risk score, owner, affected assets, source incident references and case activity.

## Response
The platform supports case-scoped response actions and sequential playbook execution with persistent execution state.

## Technology
- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion
- Lucide React
- Cloudflare Workers
- Cloudflare D1
- OpenNext
- Wazuh

## Security
The project is designed for controlled SOC, cybersecurity lab and demonstration environments, with credentials and secrets kept outside source control.

## Portfolio Status
COMPLETED.

## GitHub
https://github.com/anshnpy/incident-response-platform

## Detailed Answer
The project combines live security telemetry with analyst-owned cases and an investigation workspace. An analyst can move from a detected security event into a case, inspect entities and evidence, map activity to MITRE ATT&CK, record findings, perform response actions and execute playbooks before generating operational reports.

## Interview Explanation
I built an incident response workspace to connect detection with the actual investigation process. The platform uses Wazuh telemetry for incidents and alerts, Cloudflare D1 for persistent case data, and a structured workflow covering investigation, evidence, MITRE mapping, findings, response actions and reporting.