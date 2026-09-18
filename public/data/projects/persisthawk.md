# PERSISTHAWK

## Project Type
Linux Security / Persistence Detection / Defensive Security.

## Short Answer
PersistHawk is a Linux Persistence & LOLBin Hunter designed to detect suspicious persistence mechanisms and support defensive security investigations.

## Goals
- Detect suspicious persistence mechanisms
- Analyze cron jobs
- Analyze systemd services
- Generate structured security findings
- Support defensive security investigations

## Interface
PersistHawk includes a lightweight local web interface for viewing scan findings and investigating individual results.

## Web Features
- Security scan execution
- Findings table
- Severity filtering
- Finding search
- Risk overview
- Investigation details
- Confidence information
- Integrity information

## Operation
The web interface runs locally and uses the existing PersistHawk detection and investigation engine.

## Local Server
The repository documents a Uvicorn-based local server launched with:

uvicorn web.server:app --host 127.0.0.1 --port 8000

## Testing
The repository documents:
- pytest test execution
- pip-audit package auditing

## Skills Demonstrated
- Linux security
- Persistence analysis
- Cron analysis
- Systemd analysis
- LOLBin hunting
- Security findings
- Defensive investigation
- Local security tooling

## Portfolio Status
COMPLETED.

## GitHub
https://github.com/anshnpy/PersistHawk

## Detailed Answer
PersistHawk focuses on a specific Linux security problem: finding persistence mechanisms and suspicious LOLBin usage. It combines detection logic with structured findings and a lightweight local investigation interface so results can be reviewed instead of only printed as raw output.

## Interview Explanation
I built PersistHawk as a focused Linux security utility for identifying suspicious persistence mechanisms and LOLBin activity. The project helped me practice defensive investigation, structured findings and security-focused tooling around Linux systems.