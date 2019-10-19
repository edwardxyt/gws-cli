def DELIVERY_PATH = '/srv/delivery/website2018'

node() {

    stage('Checkout'){
        sh "echo ENTRY = ${params.ENTRY}"
        sh "echo INSTALL = ${params.INSTALL}"
        sh "echo ENV = ${params.ENV}"
        sh "echo FORCE = ${params.FORCE}"
        sh "echo INIT = ${params.INIT}"

        sh "echo WORKSPACE = $WORKSPACE"
        sh "echo BUILD_ID = $BUILD_ID"

        pwd()

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

        git branch: 'release-gateway-demo', url: 'ssh://git@139.224.151.200:22022/front/website2018.git'
        sh 'git status'
        sh 'git branch'

    }

    stage('Initialize'){
      if (params.FORCE){
          sh 'sh $WORKSPACE/init.sh'
          sh "rm -rf node_modules"
          // sh "npm run clean"
          sh "cnpm i"
      }
      if (params.INIT){
          sh 'sh $WORKSPACE/init.sh'
      }
      if (params.INSTALL){
        sh "rm -rf node_modules"
          // sh "npm run clean"
          sh "cnpm i"
      }
    }

    stage('cat'){
      sh "cat /srv/delivery/website2018/news/demo/current/index.html"
      // sh 'cat ${DELIVERY_PATH}/${params.PROJECT}/$BUILD_ID/index.html'
    }

    stage('oss'){
        sh "npm run oss --ROOTDIR=${params.ROOTDIR} --STAGING=${params.STAGING} --ENTRY=${params.ENTRY} --ID=${params.ID} --REGION=${params.REGION} --AK=${params.AK} --AS=${params.AS} --BUCKET=${params.BUCKET} "
    }
}
