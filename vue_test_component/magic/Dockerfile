# NOTE:
# 此 Dockerfile 仅为发布 NPM 包提供 Node 相关环境，不产生有用镜像
FROM harbor.leaniot.cn/lib/vue-cli
WORKDIR /app

COPY package*.json ./

RUN SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install --registry=https://registry.npm.taobao.org && \
    npm install --only=dev npm-login-cmd --registry=https://registry.npm.taobao.org

COPY . .
# 根据 tag 修改版本
ARG VERSION
RUN npm version $VERSION
RUN mv ./README-npm.md ./README.md; \
    npm run build

# 登录私有 NPM 仓库发布
# TODO: 在 .gitlab-ci.yml 中用 --build-arg 和环境变量指定密码
ARG NPM_USER=admin
ARG NPM_PASS=AAbb123456
ARG NPM_EMAIL=admin@txiiot.cn
RUN echo "registry=http://npm.txiiot.cn" > .npmrc && \
    npm config set unsafe-perm true && \
    npx npm-login-cmd && \
    npm publish --registry http://npm.txiiot.cn

