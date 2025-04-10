// @ts-check
import { defineConfig } from 'astro/config';
import charm from "astro-charm";

export default defineConfig({
  site: "http://localhost:4321",
  integrations: [charm({
    config: {
      "lang": "en",
      "title": "Charm",
      "description": "Time Flows Like a Stream",
      "author": "Sam Smith",
      "licenseId": "CC-BY-4.0",
      "side": {
        "title": "似水流年",
        "sub": "代码与诗意的交织",
        "bio": "文艺青年一枚，热爱编程，用代码书写逻辑之美，用文字记录生活之光。在技术与艺术间寻找平衡，创造属于自己的独特风景。",
        "navHome": {
          "title": "Home"
        },
        "footer": [
          {
            "title": "GitHub",
            "link": "https://github.com/yuhanawa/astro-charm",
            "icon": "simple-icons:github"
          },
          {
            "title": "Linux",
            "link": "https://linux.do/",
            "icon": "simple-icons:linux"
          },
          {
            "title": "Twitter",
            "link": "https://x.com/",
            "icon": "simple-icons:twitter"
          },
          {
            "title": "Facebook",
            "link": "https://facebook.com/",
            "icon": "simple-icons:facebook"
          },
          {
            "title": "RSS",
            "link": "/rss.xml",
            "icon": "simple-icons:rss"
          }
        ]
      }
    }
  })
  ],
  devToolbar: {
    enabled: false
  }
});
