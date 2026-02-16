🚀 DevOps Full-Stack Deployment Project
📌 Project Overview

This project demonstrates a production-style DevOps workflow for deploying a full-stack web application using:

Frontend: React (Vite + TypeScript + TailwindCSS)

Backend: Node.js + Express

Database: MongoDB Atlas

Containerization: Docker

Reverse Proxy: Nginx

Cloud: AWS EC2

CI/CD: GitHub Actions

Container Registry: Docker Hub

The application is fully containerized and automatically deployed to AWS EC2 using a CI/CD pipeline.

🏗 Architecture Overview
Developer Push
      ↓
GitHub Actions CI
      ↓
Build Docker Images
      ↓
Push Images to Docker Hub
      ↓
SSH into EC2
      ↓
Pull Latest Images
      ↓
Restart Containers (docker-compose)
      ↓
Live Application via Nginx

🔧 Tech Stack
Layer	Technology
Frontend	React + Vite + TypeScript
Backend	Node.js + Express
Database	MongoDB Atlas
Containerization	Docker
Reverse Proxy	Nginx
Cloud	AWS EC2
CI/CD	GitHub Actions
Image Registry	Docker Hub
🐳 Docker Setup

The project uses Docker to containerize:

Backend service

Frontend service

Nginx reverse proxy

Each service runs in its own container within a shared Docker network.

☁ AWS Deployment

EC2 instance created

Security Groups configured (Port 22 & 80)

Elastic IP attached (static public IP)

Docker & Docker Compose installed

Application deployed using container images

🔁 CI/CD Pipeline (GitHub Actions)

The pipeline automatically:

Builds backend Docker image

Builds frontend Docker image

Pushes both images to Docker Hub

SSHs into EC2

Pulls latest images

Restarts containers

Deployment happens automatically on every push to main branch.

📁 Project Structure
.
├── backend/
│   ├── Dockerfile
│   └── source code
│
├── frontend/
│   ├── Dockerfile
│   └── source code
│
├── nginx/
│   └── nginx.conf
│
├── docker-compose.yml
└── .github/
    └── workflows/
        └── deploy.yml

🌐 Reverse Proxy Configuration

Nginx is configured to:

Serve frontend application

Proxy /api requests to backend service

Expose application on port 80

🔐 Security Practices

MongoDB credentials stored as environment variables

SSH private key stored securely in GitHub Secrets

Docker Hub credentials stored in GitHub Secrets

No secrets committed to repository

🚀 How Deployment Works

To deploy:

git push origin main


GitHub Actions automatically:

Builds images

Pushes to Docker Hub

Deploys to EC2

No manual SSH required.

📈 DevOps Concepts Implemented

Containerization

Reverse Proxy

Infrastructure Networking

Elastic IP management

CI/CD automation

Image registry workflow

Production-style deployment separation (Build vs Runtime)

🎯 Future Improvements (Optional)

HTTPS with Let's Encrypt

Terraform for Infrastructure as Code

Monitoring with Prometheus & Grafana

Blue/Green deployment strategy

Image version tagging & rollback

👨‍💻 Author

Aayush Shah
Backend Developer transitioning to DevOps Engineer
1.6 years experience in Node.js

⭐ Key Takeaway

This project demonstrates end-to-end DevOps implementation from development to automated cloud deployment using modern tools and best practices.