def DELIVERY_PATH = '/srv/delivery/website2018'

node() {

    stage('echo'){
        sh "echo ENTRY = ${params.ENTRY}"
        sh "echo ROOTDIR = ${params.ROOTDIR}"
        sh "echo STAGING = ${params.STAGING}"
        sh "echo ID = ${params.ID}"
        sh "echo BUCKET = ${params.BUCKET}"
        sh "echo INSTALL = ${params.INSTALL}"
        sh "echo ENV = ${params.ENV}"
        sh "echo FORCE = ${params.FORCE}"
        sh "echo INIT = ${params.INIT}"

        sh "echo WORKSPACE = $WORKSPACE"
        sh "echo BUILD_ID = $BUILD_ID"

        sh 'pwd'

        sh "echo BUILD_NUMBER = $BUILD_NUMBER"
        sh "echo JOB_NAME = $JOB_NAME"
        sh "echo JOB_BASE_NAME = $JOB_BASE_NAME"
        sh "echo BUILD_TAG = $BUILD_TAG"
        sh "echo EXECUTOR_NUMBER = $EXECUTOR_NUMBER"
        sh "echo NODE_NAME = $NODE_NAME"
        sh "echo NODE_LABELS = $NODE_LABELS"
        sh "echo JENKINS_HOME = $JENKINS_HOME"
        sh "echo JENKINS_URL = $JENKINS_URL"
        sh "echo BUILD_URL = $BUILD_URL"
        sh "echo JOB_URL = $JOB_URL"

        sh "echo $PATH"
        sh "node -v"
        sh "npm -v"
    }

    stage('Publish') {
      dir(DELIVERY_PATH){
          sh 'git status'
          sh 'git config user.email "56833517@qq.com"'
          sh 'git config user.name "delivery"'
          // sh 'git add -A'
          // sh 'git commit -am "no comment"'
          sh 'git pull origin master'
          // sh 'git push origin master'
      }
    }

    stage('Checkout'){
        git branch: 'release-server', url: 'ssh://git@139.224.151.200:22022/Aibao/SimDamageApproval/frontSimManage.git'
        sh 'git status'
        sh 'git branch'

    }

    stage('Initialize'){
        if (params.INSTALL){
          sh "rm -rf node_modules"
            sh "cnpm i"
        }
    }

    stage('oss'){
        sh "npm run oss --ROOTDIR=${params.ROOTDIR} --STAGING=${params.STAGING} --ENTRY=${params.ENTRY} --ID=${params.ID} --REGION=${params.REGION} --AK=${params.AK} --AS=${params.AS} --BUCKET=${params.BUCKET} "
    }
}
