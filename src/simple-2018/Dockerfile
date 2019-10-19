#制定node镜像的版本
FROM node:latest

#声明作者
MAINTAINER robin

#声明用户
USER root

#设置环境变量
ENV ENTRY news/demo
ENV ENV mock

#移动当前目录下面的文件到app目录下
ADD . /app/

#进入到app目录下面，类似cd
WORKDIR /app

#挂载目录
VOLUME ["/app"]

#安装依赖
RUN npm install --registry https://registry.npm.taobao.org

#程序默认启动脚本
# CMD ["/bin/bash", "-c", "echo 'hello cmd!'"]
CMD ["npm", "run", "compile"]

#程序启动执行脚本
# ENTRYPOINT ["echo"]

# 默认
# docker run -d --name website -p 7001:7001 -v ~/workBase/docker/website2018/dist:/app/dist website:latest

# 指定编译项目
# docker run -d --name website -p 7001:7001 -v ~/workBase/docker/website2018/dist:/app/dist -e ENTRY=news/git -e ENV=production website:latest

# note
# let entry = process.env.npm_config_ENTRY || process.env.ENTRY;
# let env = process.env.npm_config_ENV || process.env.ENV || process.env.NODE_ENV;
