module.exports = {
    news: {
        git: {
            library: ["antd-mobile"],
            mobile: true,
            externals: {},
            env: {
                mock: {
                    api_path: "",
                    console: false,
                    eslint: false,
                    cdn_path: "/"
                },
                development: {
                    api_path: "//bizdev.aibao.com",
                    console: false,
                    eslint: false,
                    cdn_path: "/devStatic/website2018/news/demo/"
                },
                test: {
                    api_path: "//bizapitest.aibao.com",
                    console: true,
                    eslint: false,
                    cdn_path: "/static/website2018/news/demo/"
                },
                production: {
                    api_path: "//biz.aibao.com",
                    console: false,
                    eslint: false,
                    cdn_path: "./"
                }
            }
        },
        demo: {
            library: ["antd"],
            mobile: false,
            externals: {},
            env: {
                mock: {
                    api_path: "",
                    console: false,
                    eslint: false,
                    cdn_path: "/"
                },
                development: {
                    api_path: "//bizdev.aibao.com",
                    console: false,
                    eslint: false,
                    cdn_path: "/devStatic/website2018/news/demo/"
                },
                test: {
                    api_path: "//bizapitest.aibao.com",
                    console: true,
                    eslint: false,
                    cdn_path: "./"
                },
                production: {
                    api_path: "//biz.aibao.com",
                    console: false,
                    eslint: false,
                    cdn_path: "/static/website2018/news/demo/"
                }
            }
        }
    }
};
