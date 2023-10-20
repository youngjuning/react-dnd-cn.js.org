import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['https://cdn.jsdelivr.net/gh/youngjuning/images@main/1687963061740.png'],
  autoAlias: false,
  themeConfig: {
    name: 'React DnD',
    logo: 'https://cdn.jsdelivr.net/gh/youngjuning/images@main/1687963061740.png',
    prefersColor: { default: 'auto' },
    socialLinks: {
      github: 'https://github.com/youngjuning/react-dnd-cn.js.org',
      twitter: 'https://twitter.com/luozhu2021'
    },
    hd: { rules: [] },
    footer: 'Made with ❤️ by <a href="https://youngjuning.js.org/" target="_blank" nofollow>紫竹翻译计划</a>'
  },
  theme: {
    '@c-primary': '#4078c0',
  },
  publicPath: '/',
  analytics: {
    ga_v2: 'G-H3HDXX75PH',
  },
  sitemap: {
    hostname: 'https://react-dnd.beautymems.com',
  },
  hash: true,
  exportStatic: {},
  ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),
  headScripts: [
    {src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7029815294762181', async: true, crossorigin: 'anonymous'},
  ]
});
