def CDN_DIR = '/srv/testA/picc'
def DELIVERY_PATH = '/srv/delivery/picc'

node() {

    stage('Variable'){
        sh "echo changeLogSets = $currentBuild.changeSets"
        sh "echo changeLogSets = $currentBuild.description"
        sh "echo changeLogSets = $currentBuild.changeSets"
        sh "echo changeLogSets = $currentBuild.currentResult"

        sh "echo INSTALL = ${params.INSTALL}"
        sh "echo PROJECT = ${params.PROJECT}"
        sh "echo ENV = ${params.ENV}"
        sh "echo FORCE = ${params.FORCE}"
        sh "echo INIT = ${params.INIT}"

        sh "echo WORKSPACE = $WORKSPACE"
        sh "echo BUILD_ID = A-$BUILD_ID"

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

        sh 'git status'
        sh 'git branch'
    }

    stage('Checkout'){
        git branch: 'testA-server', url: 'ssh://git@139.224.151.200:22022/Aibao/AiClaim/picc-shenzhen-lossAssessment.git'
        sh 'git status'
        sh 'git branch -a'
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

    stage('testA build'){
        sh "npm run build:test"
    }

    // jenkins task workspace 归档zip
    stage('archive') {
    //     sh "mkdir -p ${WORKSPACE}/archive"
    //     sh "mkdir -p ${WORKSPACE}/archive/A-${BUILD_ID}"
    //     sh "zip -r ${WORKSPACE}/archive/A-${BUILD_ID}/${JOB_NAME}-A-${BUILD_ID}.zip ${WORKSPACE}/dist/*"
    //     archiveArtifacts artifacts: 'archive/**/*.zip', onlyIfSuccessful: true
    //     archiveArtifacts artifacts: "archive/A-${BUILD_ID}/*.zip", onlyIfSuccessful: true
    }

    // 发布到测试服务器
    stage('Publish') {
        sh "mkdir -p /srv"
        sh "mkdir -p ${CDN_DIR}/${params.PROJECT}"
        sh "cp -r ${WORKSPACE}/dist/. ${CDN_DIR}/${params.PROJECT}/"
    }

    stage('delivery build'){
        sh "npm run build:release"
    }

    // delivery 归档ID
    stage('Move file') {
        sh "mkdir -p ${DELIVERY_PATH}/${params.PROJECT}/current/placeholder"
        sh "rm -rf ${DELIVERY_PATH}/${params.PROJECT}/current/*"

        sh "mkdir -p ${DELIVERY_PATH}/${params.PROJECT}/A-$BUILD_ID/"
        sh "cp -r ${WORKSPACE}/dist/. ${DELIVERY_PATH}/${params.PROJECT}/current/"
        sh "cp -r ${WORKSPACE}/dist/. ${DELIVERY_PATH}/${params.PROJECT}/A-$BUILD_ID/"
    }

    // 发布到 Gitlab Bucket
    stage('Delivery') {
        dir(DELIVERY_PATH){
            sh 'git status'
            sh 'git config user.email "56833517@qq.com"'
            sh 'git config user.name "delivery"'
            sh 'git add -A'
            sh 'git commit -am ${BUILD_ID}'
            sh 'git pull origin master'
            sh 'git push origin master'
        }
    }
}
