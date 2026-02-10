pipeline {
    agent none
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
    }
    post {
        always {
            node {
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
}
