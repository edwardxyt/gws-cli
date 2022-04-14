module.exports = {
    news: {
        demo: {
            env: {
                mock: {
                    api_path: "123123",
                    console: false,
                    cdn_path: "./"
                },
                development: {
                    api_path: "//bizdev.xiayuting.com",
                    console: false,
                    cdn_path: "/devStatic/website2018/news/demo/"
                },
                test: {
                    api_path: "//bizapitest.xiayuting.com",
                    console: false,
                    cdn_path: "./"
                },
                production: {
                    api_path: "//biz.xiayuting.com",
                    console: false,
                    cdn_path: "./"
                }
            }
        }
    }
};
