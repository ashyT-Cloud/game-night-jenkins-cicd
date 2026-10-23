# 🎮 Game Night — Space Shooter

A browser-based arcade space shooter built as a hands-on **Jenkins CI/CD project**. The project demonstrates source control, automated validation, unit testing, Docker image creation, and deployment to a separate AWS EC2 Jenkins agent.

## 🚀 Project Overview

Game Night is a simple space shooter where players dodge asteroids, shoot obstacles, and try to achieve the highest score. The game is also used to demonstrate an end-to-end CI/CD pipeline.

## 🕹️ Gameplay

- Move left and right using the **Arrow Keys** or **A / D**
- Press **Space** to shoot
- Avoid asteroids and survive
- Track your score and remaining lives
- Restart and play again

## 🏗️ Architecture

```text
Developer
   |
   v
GitHub Repository
   |
   v
Jenkins Controller (AWS EC2)
   |
   | SSH
   v
Jenkins Build Agent (AWS EC2)
   |
   v
Validate Source Code
   |
   v
Run Python Unit Tests
   |
   v
Build Docker Image
   |
   v
Deploy Container with Nginx
   |
   v
Browser-Based Space Shooter
```

## 🛠️ Technology Stack

- **Game:** HTML5, CSS3, JavaScript
- **Source Control:** Git and GitHub
- **CI/CD:** Jenkins Declarative Pipeline
- **Cloud Infrastructure:** AWS EC2
- **Containerization:** Docker
- **Web Server:** Nginx
- **Testing:** Python `unittest`

## ⚙️ CI/CD Pipeline

The `Jenkinsfile` defines the following stages:

1. **Validate** — checks Python syntax and verifies required game and Docker files.
2. **Test** — runs automated Python unit tests.
3. **Build Docker Image** — packages the game into a Docker image.
4. **Deploy Game** — runs the container and publishes the game on port `8080`.

The pipeline runs on a dedicated Jenkins agent labelled `game-night-agent`.

## 🧪 Test Results

The pipeline includes four automated tests covering:

- Required game files
- HTML references to game assets
- Game controls and mechanics
- Score, lives, and restart functionality

All four tests passed in the successful pipeline run.

## 📁 Repository Structure

```text
game-night-jenkins-cicd/
├── game/
│   ├── index.html
│   ├── game.js
│   └── style.css
├── tests/
│   └── test_game.py
├── Dockerfile
├── Jenkinsfile
└── README.md
```

## 💻 Run Locally

Clone the repository and open the game in your browser:

```bash
git clone https://github.com/ashyT-Cloud/game-night-jenkins-cicd.git
cd game-night-jenkins-cicd
```

Open `game/index.html` in a modern web browser.

To run the automated tests:

```bash
python3 -m unittest discover -s tests -v
```

## 🐳 Run with Docker

Build the image:

```bash
docker build -t game-night:latest .
```

Start the container:

```bash
docker run -d --name game-night -p 8080:80 game-night:latest
```

Open `http://localhost:8080` in your browser.

Stop and remove the container:

```bash
docker rm -f game-night
```

## ☁️ Jenkins and AWS Setup

The CI/CD environment uses two separate AWS EC2 instances:

- **Jenkins controller:** manages jobs and pipeline execution.
- **Jenkins agent:** runs the pipeline stages and Docker deployment.

The agent requires Java for Jenkins remoting, Git for source checkout, Python 3 for tests, and Docker access for image builds and deployment.

The current pipeline is manually triggered through Jenkins. GitHub webhook-based automatic triggering is a planned enhancement.

## 🔮 Future Improvements

- Trigger builds automatically using a GitHub webhook.
- Add deployment health checks and rollback handling.
- Publish screenshots of the Jenkins pipeline and deployed game.
- Improve test coverage for gameplay behavior.

## 👨‍💻 Author

**Ashish Thakur**

- GitHub: [@ashyT-Cloud](https://github.com/ashyT-Cloud)

---

*Built as a practical project to learn Jenkins CI/CD, Docker, AWS EC2, automated testing, and deployment workflows.*
