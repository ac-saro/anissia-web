/**
 * Noti (use snotify)
 */
export default class Noti {
  public static bind(snotify: any) {
    (window as any)._anissia_noti_ = snotify;
  }
  public static info(text: string) {
    (window as any)._anissia_noti_.info(text);
  }

  public static async(action: (resolve: (msg: any) => void, reject: (msg: any) => void) => void) {
    Noti.asyncDetail('', '', new Promise(action));
  }
  public static asyncDetail(msg: string, title: string, action: Promise<any>) {
    (window as any)._anissia_noti_.async(msg, title, () => action);
  }
  public static asyncBox(msg?: string|null, title?: string|null) {
    return ({
      title: title || '',
      body: msg || '',
      config: {
        timeout: 3000,
        closeOnClick: true,
      },
    });
  }
}
