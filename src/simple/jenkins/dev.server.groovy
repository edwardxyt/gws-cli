def CDN_DIR = '/srv/dev/picc'
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
        git branch: 'dev-server', url: 'ssh://git@139.224.151.200:22022/Aibao/AiClaim/picc-shenzhen-lossAssessment.git'
        sh 'git fetch'
        sh 'git status'
        sh 'git branch'

        def GIT_RECENT_TAG_HASH = sh (
            script: 'git rev-list --tags --max-count=1',
            returnStdout: true
        ).trim()

        def GIT_RECENT_TAG_NAME = sh (
            script: "git describe --tags ${GIT_RECENT_TAG_HASH}",
            returnStdout: true
        ).trim()

        sh "echo GIT_RECENT_TAG_HASH = $GIT_RECENT_TAG_HASH"
        sh "echo GIT_RECENT_TAG_NAME = $GIT_RECENT_TAG_NAME"
    }

    stage('Initialize'){
        if (params.INSTALL){
            sh "rm -rf node_modules"
            sh "cnpm i"
        }
    }

    stage('build'){
        sh "npm run build:dev"
    }

    stage('Results') {
      // sh "mkdir -p ${WORKSPACE}/archive"
      // sh "mkdir -p ${WORKSPACE}/archive/${BUILD_ID}"
      // sh "zip -r ${WORKSPACE}/archive/${BUILD_ID}/${JOB_NAME}-${BUILD_ID}.zip ${WORKSPACE}/dist/*"
      // archiveArtifacts artifacts: 'archive/**/*.zip', onlyIfSuccessful: true
      // archiveArtifacts artifacts: "archive/${BUILD_ID}/*.zip", onlyIfSuccessful: true
    }

    //stage('SCP 139.224.151.233') {
        // /srv/delivery/picc/optimusH5Rebuild
        // sh "scp -P22022 -r ${WORKSPACE}/dist/*  root@139.224.151.233:${DELIVERY_PATH}/${params.PROJECT}"
    //}

    stage('Publish') {
        sh "mkdir -p /srv"
        sh "mkdir -p ${CDN_DIR}/${params.PROJECT}"
        sh "cp -r ${WORKSPACE}/dist/. ${CDN_DIR}/${params.PROJECT}/"
    }
}
