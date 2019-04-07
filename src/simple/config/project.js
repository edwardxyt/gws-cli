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
                    cdn_path: "/static/website2018/news/demo/"
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
                    cdn_path: "/static/website2018/news/demo/"
                },
                production: {
                    api_path: "//biz.aibao.com",
                    console: false,
                    eslint: false,
                    cdn_path: "/static/website2018/news/demo/"
                }
            }
        },
        swiper: {
            library: ["antd-mobile"],
            console: true,
            mobile: true,
            eslint: false,
            api_path: "//m.9888.cn",
            y_api_path: "//m.9888.cn",
            cdn_path: "/static/news/git/"
        },
        prize: {
            library: ["antd"],
            console: false,
            mobile: false,
            eslint: false,
            api_path: "//m.9888.cn",
            y_api_path: "//m.9888.cn",
            cdn_path: "/"
        },
        hook: {
            library: ["antd"],
            console: false,
            mobile: false,
            eslint: false,
            api_path: "//m.9888.cn",
            y_api_path: "//m.9888.cn",
            cdn_path: "/"
        }
    }
};
