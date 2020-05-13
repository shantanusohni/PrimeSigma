pipeline {
    agent any
    environment {
        PROJECT_ID = 'skilled-display-260316'
        CLUSTER_NAME = 'kube-cluster'
        LOCATION = 'us-central1-c'
        CREDENTIALS_ID = 'skilled-display-260316'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("cooldsachin/sigma-react:${env.BUILD_ID}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }        
        stage('Deploy to GKE Cluster') {
            steps{
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'app-deployment.yml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])                
                
            }
        }
    }    
}
