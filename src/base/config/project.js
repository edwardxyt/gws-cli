module.exports = {
    news: {
        demo: {
            mobile: false,
            env: {
                mock: {
                    api_path: "123123",
                    console: true,
                    cdn_path: "./"
                },
                development: {
                    api_path: "//bizdev.aibao.com",
                    console: false,
                    cdn_path: "/devStatic/website2018/news/demo/"
                },
                test: {
                    api_path: "//bizapitest.aibao.com",
                    console: true,
                    cdn_path: "./"
                },
                production: {
                    api_path: "//biz.aibao.com",
                    console: false,
                    cdn_path: "./"
                }
            }
        }
    }
};
