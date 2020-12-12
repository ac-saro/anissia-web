/**
 * PARK Yong Seo
 * default router setting
 */
import VueRouter from 'vue-router';

export default class RouterConfiguration {

  public static bind(router: VueRouter) {
    RouterConfiguration.loadGoogleAnalytics();
    function gtag(a1: string, a2: any) {
      (window as any).dataLayer.push(arguments);
    }

    router.afterEach((to, from) => {
      document.title = to.meta.title || RouterConfiguration.DEFAULT_TITLE;
      gtag('js', new Date());
      gtag('config', RouterConfiguration.TRACKING_ID);
    });
  }

  private static readonly DEFAULT_TITLE = '애니시아';
  private static readonly TRACKING_ID = 'UA-55036751-1';

  private static loadGoogleAnalytics() {
    if (document.getElementById('google-analytics-script') === null) {
      const ga = document.createElement('script');
      ga.id = 'google-analytics-script';
      ga.async = true;
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${this.TRACKING_ID}`;
      (document.querySelector('head') as HTMLHeadElement).appendChild(ga);
    }
    (window as any).dataLayer = (window as any).dataLayer || [];
  }
}
