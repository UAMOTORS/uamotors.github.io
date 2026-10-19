import rss from "@astrojs/rss";
import { withBase } from "../utils/helpers";
import siteConfig from "../site.config";
import logrosData from "../data/logros.json";

export async function GET(context) {
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site + withBase("/"),
    trailingSlash: false,
    items: logrosData.es.map((post) => ({
      title: post.title,
      pubDate: new Date(post.pubDate),
      description: post.description,
      link: withBase("/logros"),
    })),
    customData: `<language>es-MX</language>`,
    stylesheet: withBase("/pretty-feed-v3.xsl"),
  });
}
