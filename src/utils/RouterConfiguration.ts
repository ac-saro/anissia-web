/**
 * PARK Yong Seo
 * default router setting
 */
import { Router } from 'vue-router';

export default class RouterConfiguration {

  private static readonly DEFAULT_TITLE = process.env["VUE_APP_TITLE"];
  private static readonly TRACKING_ID = process.env["VUE_APP_GA_TRACKING_ID"];

  public static bind(router: Router) {
    router.afterEach((to, from) => {
      // set title
      document.title = to.meta.title || RouterConfiguration.DEFAULT_TITLE;
      
      // sned google analytics
      const gtag = (window as any).gtag;
      gtag('set', 'title', document.title);
      gtag('js', new Date());
      gtag('config', RouterConfiguration.TRACKING_ID, {'page_path': to.fullPath});
    });
  }
}
