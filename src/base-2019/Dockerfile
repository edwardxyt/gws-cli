#制定node镜像的版本
FROM node:latest

#声明作者
MAINTAINER robin

#声明用户
USER root

#设置环境变量
ENV ENTRY news/demo
ENV ENV production

#移动当前目录下面的文件到app目录下
ADD . /app/

#进入到app目录下面，类似cd
WORKDIR /app

#挂载目录
VOLUME ["/app/dist"]

#安装依赖
# RUN npm install --registry https://registry.npm.taobao.org

#程序默认启动脚本
# CMD ["/bin/bash", "-c", "echo 'hello cmd!'"]
CMD ["npm", "run", "compile"]

#程序启动执行脚本
# ENTRYPOINT ["echo"]

# 编译镜像
# docker build -t ed-gws:latest .

# 默认
#

# 指定编译项目
# docker run -d --name ed-gws-git -v /workspace/docker/nginx/srv/ed-gws-git:/app/dist -e ENTRY=news/git -e ENV=production ed-gws:latest
# docker run -d --name ed-gws-demo -v /workspace/docker/nginx/srv/ed-gws-demo:/app/dist -e ENTRY=news/demo -e ENV=production ed-gws:latest

# copy 数据
# docker cp ed-gws-demo:/app/dist /workspace/docker/nginx/srv

# note
# let entry = process.env.npm_config_ENTRY || process.env.ENTRY;
# let env = process.env.npm_config_ENV || process.env.ENV || process.env.NODE_ENV;
