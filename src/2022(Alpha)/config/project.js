module.exports = {
  activity: {
    christmas: {
      env: {
        mock: {
          api_path: '123123',
          console: false,
          cdn_path: '/',
        },
        development: {
          api_path: '//:bizdev.xiayuting.com',
          console: false,
          cdn_path: '/',
        },
        test: {
          api_path: '//:bizapitest.xiayuting.com',
          console: false,
          cdn_path: '/',
        },
        production: {
          api_path: '//:biz.xiayuting.com',
          console: false,
          cdn_path: '/dist/activity/christmas/',
        },
      },
    },
  },
};
