const oss = require("@xiayuting/xiayuting-aly-oss");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

console.log(oss.version);

const projectDir = path.resolve(__dirname, "../");
const distDir = path.join(__dirname, "../", "dist");

const ROOTDIR = process.env.npm_config_ROOTDIR; // '/srv/delivery'
const STAGING = process.env.npm_config_STAGING; // 'picc'
const ENTRY = process.env.npm_config_ENTRY; // 'uat'
const PROJECT = process.env.npm_config_PROJECT; // 'shenzhen'
const ID = process.env.npm_config_ID; // 'current' or 'NO'

const REGION = process.env.npm_config_REGION;
const AK = process.env.npm_config_AK;
const AS = process.env.npm_config_AS;
const BUCKET = process.env.npm_config_BUCKET;

const targetDir = `${ROOTDIR}/${STAGING}/${PROJECT}/${ID}`;  //归档代码库

// 归档是否存在
fs.exists(targetDir, exists => {
  if (exists) {
    console.log(`targetDir: ${targetDir}`);
  } else {
    throw new Error(`文件夹不存在 targetDir: ${targetDir}`);
    return false;
  }
});

// 初始化OSS
let client = new oss({
  region: REGION,
  accessKeyId: AK,
  accessKeySecret: AS,
  bucket: BUCKET
});

// 获取1000个文件，并删除
client
  .list({
    marker: `${ENTRY}/${PROJECT}/`
  })
  .then(data => {
    console.info("获取当前文件列表", data.objects.length);
    if (!data.objects) return null;
    data.objects.map(i => {
      if (i.name.includes(`${ENTRY}/${PROJECT}/`)) {
        console.info(`删除 - ${i.name}`);
        return client.delete(i.name);
      }
    });
  })
  .then(result => {
    // 上传归档目录文件
    glob(
      "**/*.*",
      {
        cwd: targetDir
      },
      async (er, files) => {
        if (!er) {
          let index = 1;
          let results = await files.map(i => {
            client
              .put(`${ENTRY}/${PROJECT}/${i}`, `${targetDir}/${i}`)
              .then(data => {
                if (data) {
                  console.log(`文件: ${data.name}, 编号：${index++}`);
                  return data;
                } else {
                  console.log(`NOT THEN 文件: ${data}`);
                }
              });
          });
          console.log(`上传总数: ${results.length}`);
        } else {
          console.log(`ERR: ${er}`);
        }
      }
    );
  });
