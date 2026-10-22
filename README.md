# Game Night — Space Shooter

A browser-based arcade game and Jenkins CI/CD learning project.

## Play locally

Open `game/index.html` in a modern browser.

## Controls

- Left / Right arrows or A / D: move
- Space: shoot
- Avoid asteroids and survive

## Planned CI/CD

1. GitHub source control
2. Jenkins controller
3. Separate Jenkins agent
4. Automated validation and tests
5. Docker image build
6. Deployment after successful checks

## Project goals

Demonstrate a real Jenkins agent, a declarative Jenkins pipeline,
automated testing, Docker packaging, and continuous deployment.

## CI/CD pipeline

The `Jenkinsfile` uses an agent labelled `game-night-agent` and runs:
1. Source validation
2. Automated Python tests
3. Docker image build
4. Container deployment on port 8080

The Jenkins agent must have Python 3, Docker access, and permission to run
the pipeline. Configure the agent label in Jenkins before running the job.
