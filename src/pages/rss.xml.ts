import rss from "@astrojs/rss";
import { withBase } from "../utils/helpers";
import siteConfig from "../site.config";
import esLogros from "../i18n/es/esLogros.json";

export async function GET(context) {
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site + withBase("/"),
    trailingSlash: false,
    items: esLogros.items.map((post) => ({
      title: post.title,
      pubDate: new Date(post.pubDate),
      description: post.description,
      link: withBase("/logros"),
    })),
    customData: `<language>es-MX</language>`,
    stylesheet: withBase("/pretty-feed-v3.xsl"),
  });
}
