pipeline {
    agent { label 'game-night-agent' }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Validate') {
            steps {
                sh '''
                    python3 -m py_compile tests/test_game.py
                    test -s game/index.html
                    test -s game/game.js
                    test -s game/style.css
                    test -s Dockerfile
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'python3 -m unittest discover -s tests -v'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                      --tag game-night:${BUILD_NUMBER} \
                      --tag game-night:latest .
                '''
            }
        }

        stage('Deploy Game') {
            steps {
                sh '''
                    docker rm -f game-night-web 2>/dev/null || true
                    docker run -d \
                      --name game-night-web \
                      --restart unless-stopped \
                      -p 8080:80 \
                      game-night:${BUILD_NUMBER}
                '''
            }
        }
    }

    post {
        success {
            echo 'Game Night: tests passed and deployment completed.'
        }
        failure {
            echo 'Pipeline failed. Review the stage logs before retrying.'
        }
    }
}
