module.exports = {
    news: {
        git: {
            mobile: true,
            env: {
                mock: {
                    api_path: "",
                    console: false,
                    eslint: false,
                    cdn_path: "/"
                },
                development: {
                    api_path: "//bizdev.xiayuting.com",
                    console: false,
                    eslint: false,
                    cdn_path: "/devStatic/website2018/news/demo/"
                },
                test: {
                    api_path: "//bizapitest.xiayuting.com",
                    console: true,
                    eslint: false,
                    cdn_path: "/static/website2018/news/demo/"
                },
                production: {
                    api_path: "//biz.xiayuting.com",
                    console: false,
                    eslint: false,
                    cdn_path: "./"
                }
            }
        },
        demo: {
            mobile: false,
            env: {
                mock: {
                    api_path: "",
                    console: false,
                    eslint: false,
                    cdn_path: "/"
                },
                development: {
                    api_path: "//bizdev.xiayuting.com",
                    console: false,
                    eslint: false,
                    cdn_path: "/devStatic/website2018/news/demo/"
                },
                test: {
                    api_path: "//bizapitest.xiayuting.com",
                    console: true,
                    eslint: false,
                    cdn_path: "./"
                },
                production: {
                    api_path: "//biz.xiayuting.com",
                    console: false,
                    eslint: false,
                    cdn_path: "./"
                }
            }
        }
    }
};
