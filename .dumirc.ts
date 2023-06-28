import { defineConfig } from 'dumi';

export default defineConfig({
  // TODO 替换为新的 favicons
  favicons: ['https://cdn.jsdelivr.net/gh/youngjuning/images@main/1680450378978.png'],
  autoAlias: false,
  themeConfig: {
    // TODO 替换为新的的 name
    name: 'dumi-site-template',
    // TODO 替换为新的的 logo
    logo: 'https://cdn.jsdelivr.net/gh/youngjuning/images@main/1680450378978.png',
    prefersColor: { default: 'auto' },
    socialLinks: {
      github: 'https://github.com/youngjuning/youngjuning.js.org',
      twitter: 'https://twitter.com/luozhu2021'
    },
    hd: { rules: [] },
    footer: 'Made with ❤️ by <a href="https://youngjuning.js.org" target="_blank" nofollow>@洛竹</a>'
  },
  theme: {
    // TODO 替换为自己的主题色
    '@c-primary': '#13aa52',
  },
  publicPath:
    process.env.NODE_ENV === 'production'
    // TODO 替换为新的的仓库名
      ? 'https://cdn.jsdelivr.net/gh/youngjuning/youngjuning.js.org@gh-pages/'
      : '/',
  analytics: {
    // TODO 替换为新的的 Google Analytics 代码
    // ga_v2: '',
  },
  sitemap: {
    // TODO 配置为新的域名
    hostname: 'https://youngjuning.js.org',
  },
  hash: true,
  exportStatic: {},
  ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),
  headScripts: [
    {src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7029815294762181', async: true, crossorigin: 'anonymous'},
  ]
});
