/**
 * PARK Yong Seo
 * default router setting
 */
import { Router } from 'vue-router';


export default class RouterConfiguration {

  private static readonly DEFAULT_TITLE = import.meta.env["VUE_APP_TITLE"];
  private static readonly TRACKING_ID = import.meta.env["VUE_APP_GA_TRACKING_ID"];

  public static bind(router: Router) {

    router.afterEach((to, from) => {
      // set title
      document.title = to.meta.title || RouterConfiguration.DEFAULT_TITLE;
      const path = to.fullPath.indexOf('#') == -1 ? to.fullPath : to.fullPath.substring(0, to.fullPath.indexOf('#'));
      
      // sned google analytics
      const gtag = (window as any).gtag;
      gtag('set', 'title', document.title);
      gtag('js', new Date());
      gtag('config', RouterConfiguration.TRACKING_ID, {'page_path': path});
    });
  }
}
