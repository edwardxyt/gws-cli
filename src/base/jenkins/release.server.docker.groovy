def CDN_DIR = '/workspace/docker/nginx/srv'

node('39.97.233.92') {
    stage('Variable'){
        sh "echo changeLogSets = $currentBuild.changeSets"
        sh "echo changeLogSets = $currentBuild.description"
        sh "echo changeLogSets = $currentBuild.changeSets"
        sh "echo changeLogSets = $currentBuild.currentResult"

        sh "echo IMAGES = ${params.IMAGES}"
        sh "echo CONTAINER = ${params.CONTAINER}"
        sh "echo FIRST = ${params.FIRST}"

        sh "echo GIT = ${params.GIT}"
        sh "echo BRANCH = ${params.BRANCH}"

        sh "echo ENTRY = ${params.ENTRY}"
        sh "echo ENV = ${params.ENV}"

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
    }

    // TODO 传参 git地址和分支
    stage('Checkout'){
        git branch: params.BRANCH, url: params.GIT
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
        sh "rm -rf ${CDN_DIR}/${params.CONTAINER}"

        nodejs(nodeJSInstallationName: 'Node 12.7.0', configId: '') {
            sh "rm -rf node_modules"
            sh "npm install --registry https://registry.npm.taobao.org"
        }

        if (params.FIRST){
            sh "echo For the first time"
        } else {
            sh "docker rm -f ${params.CONTAINER}"
            sh "docker rmi -f ${params.IMAGES}:latest"
        }
    }

    stage('run'){
        sh "docker build -t ${params.IMAGES} ."
        sh "docker run -d --name ${params.CONTAINER} -v ${CDN_DIR}/${params.CONTAINER}:/app/dist -e ENTRY=${params.ENTRY} -e ENV=${params.ENV} ${params.IMAGES}"
    }

    stage('Results') {
        sh "echo ${CDN_DIR}/${params.CONTAINER}/${params.ENTRY}/index.html"

        sh 'docker images'
        sh 'docker ps -a'

        // if (fileExists("${WORKSPACE}/dist/${params.ENTRY}/index.html")){
        //     sh("ls -al ${WORKSPACE}/dist/${params.ENTRY}")
        // }else{
        //     error "webpack compile fail 编译错误！"
        // }
    }
}
