module.exports = {
    // single page application
    pages: {
        main: {
            entry: 'src/main.ts',
            template: 'public/index.html',
            filename: 'index.html'
        },
    },
    // dev server configuration
    devServer: {
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_API_HOST,
                ws: true,
                changeOrigin: true
            }
        }
    },
    pwa: {
      icons: [
          {
            "src": "icon/favicon.png",
            "sizes": "32x32",
            "type": "image/png"
          },
      ],
      iconPaths: {
          favicon32: 'icon/favicon.png',
      },
    },
};