pipeline {
    agent any
    stages {
        stage('Build') {
            agent { docker {
                image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                args '--network=host'
                } 
            }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Unit Tests') {
            agent { docker {
                image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                args '--network=host'
                } 
            }
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }
        stage('UI Tests') {
            agent { docker {
                image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                args '--network=host'
                } 
            }
            steps {
                sh 'npm install'
                sh 'npm run test:e2e'
            }
        }
        stage('Docker') {
            when {
                branch 'main'
            }
            agent any
            environment {
                CI_REGISTRY = 'ghcr.io'
                CI_REGISTRY_USER = 'dhekerkr'
                CI_REGISTRY_IMAGE = "${CI_REGISTRY}/${CI_REGISTRY_USER}/chessgame"
                CI_REGISTRY_PASSWORD = credentials('CI_REGISTRY_PASSWORD')
            }
            steps {
                sh 'docker build -t $CI_REGISTRY_IMAGE:latest -t $CI_REGISTRY_IMAGE:build-$BUILD_NUMBER .'
                sh 'docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY'
                sh 'docker push $CI_REGISTRY_IMAGE:latest'
                sh 'docker push $CI_REGISTRY_IMAGE:build-$BUILD_NUMBER'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            environment {
                NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')
            }
            agent { docker {
                image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                args '--network=host'
                } 
            }
            steps {
                sh 'npm install'
                sh 'npx netlify deploy --prod'
            }
        }
    }
    post {
        always {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: false,
                icon: '',
                keepAll: true,
                reportDir: 'html/unit',
                reportFiles: 'index.html',
                reportName: 'VitestReport',
                reportTitles: '',
                useWrapperFileDirectly: true
            ])
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: false,
                icon: '',
                keepAll: true,
                reportDir: 'html/playwright',
                reportFiles: 'index.html',
                reportName: 'PlaywrightReport',
                reportTitles: '',
                useWrapperFileDirectly: true
            ])
        }
    }
}
