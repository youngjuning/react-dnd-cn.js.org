import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: [
    'https://cdn.jsdelivr.net/gh/youngjuning/images@main/1687963061740.png',
  ],
  autoAlias: false,
  themeConfig: {
    name: 'React DnD',
    logo: 'https://cdn.jsdelivr.net/gh/youngjuning/images@main/1687963061740.png',
    prefersColor: { default: 'auto' },
    editLink:
      'https://github.com/youngjuning/react-dnd-cn.js.org/edit/main/{filename}',
    socialLinks: {
      github: 'https://github.com/youngjuning/react-dnd-cn.js.org',
      twitter: 'https://twitter.com/luozhu2021',
    },
    hd: { rules: [] },
    footer:
      'Made with ❤️ by <a href="https://github.com/youngjuning" target="_blank">紫升</a><br/><div style="width:180px;margin: 0 auto"><script type="text/javascript" id="clstr_globe" src="//clustrmaps.com/globe.js?d=ljfzkq-EnNph52CirW6-xUzwM3qjD3NAc9n1QTRAGBs"></script></div><span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span></span> | <span id="busuanzi_container_site_uv">本站访客数<span id="busuanzi_value_site_uv"></span></span>',
  },
  theme: {
    '@c-primary': '#4078c0',
  },
  publicPath: '/',
  analytics: {
    ga_v2: 'G-YC1MTC58HP',
  },
  sitemap: {
    hostname: 'https://react-dnd-cn.js.org',
  },
  hash: true,
  exportStatic: {},
  ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),
  headScripts:
    process.env.NODE_ENV !== 'development'
      ? [
          { src: '/adsbygoogle.js', async: true, crossorigin: 'anonymous' },
        ]
      : [],
  scripts: [
    {
      async: true,
      src: 'https://cdn.jsdelivr.net/npm/busuanzi@2.3.0/bsz.pure.mini.js',
      crossorigin: 'anonymous',
    },
  ],
});
