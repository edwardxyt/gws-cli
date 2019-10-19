def CDN_DIR = '/srv/devStatic/website2018'
node() {

    stage('Checkout'){
        sh "echo PROJECT = ${params.PROJECT}"
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

        git branch: 'dev-gateway-demo', url: 'ssh://git@139.224.151.200:22022/front/website2018.git'
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

    stage('Preparation') {
        sh "npm run tree"
    }

    stage('build'){
        sh "npm run compile --ENTRY=${params.PROJECT} --ENV=${params.ENV}"
    }

    stage('archive') {
      sh "mkdir -p ${WORKSPACE}/archive"
      sh "mkdir -p ${WORKSPACE}/archive/${BUILD_ID}"
      sh "zip -r ${WORKSPACE}/archive/${BUILD_ID}/${JOB_NAME}-${BUILD_ID}.zip ${WORKSPACE}/dist/*"
      archiveArtifacts artifacts: 'archive/**/*.zip', onlyIfSuccessful: true
      // archiveArtifacts artifacts: "archive/${BUILD_ID}/*.zip", onlyIfSuccessful: true
    }

    stage('Publish') {
        sh "mkdir -p /srv"
        sh "mkdir -p ${CDN_DIR}/${params.PROJECT}"
        sh "cp -r ${WORKSPACE}/dist/. ${CDN_DIR}/"
    }
}
