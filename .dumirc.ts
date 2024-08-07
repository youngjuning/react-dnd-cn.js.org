import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: ['https://react-dnd.github.io/react-dnd/icons/icon-48x48.png'],
  autoAlias: false,
  themeConfig: {
    name: 'React DnD',
    logo: 'https://cdn.jsdelivr.net/gh/youngjuning/images@main/1687963061740.png',
    metas: [
      { name: 'keywords', content: 'react dnd, 紫升, react, 前端, 拖拽' },
      {
        name: 'description',
        content:
          'React DnD 是一组React 高阶组件，使用的时候只需要使用对应的API 将目标组件进行包裹，即可实现拖动或接受拖动元素的功能。',
      },
    ],
    prefersColor: { default: 'auto' },
    editLink:
      'https://github.com/youngjuning/react-dnd-cn.js.org/edit/main/{filename}',
    socialLinks: {
      github: 'https://github.com/youngjuning/react-dnd-cn.js.org',
      twitter: 'https://twitter.com/luozhu2021',
    },
    hd: { rules: [] },
    footer: `Made with ❤️ by <a href="https://github.com/youngjuning" target="_blank">紫升</a><br/><div style="width:180px;margin: 0 auto"><script async type="text/javascript" id="clstr_globe" src="//clustrmaps.com/globe.js?d=ljfzkq-EnNph52CirW6-xUzwM3qjD3NAc9n1QTRAGBs"></script></div>`,
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
          {
            src: '/adsbygoogle.js',
            async: true,
            crossorigin: 'anonymous',
          },
        ]
      : [],
});
