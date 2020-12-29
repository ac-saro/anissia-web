export default class PageData<T> {

  public static cast<T>(object: any, mapContent: (object: any) => T = e => e): PageData<T> {
    const page: PageData<T> = Object.assign(new PageData<T>(), object);
    page.content = page.content.map(mapContent);
    return page;
  }

  public static empty<T>(): PageData<T> {
    return PageData.cast<T>([], e => e);
  }

  public content = new Array<T>() as T[];
  public number = 0;
  public totalElements = 0;
  public totalPages = 0;
  public empty = true;
}
