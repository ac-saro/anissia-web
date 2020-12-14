import PageData from "@/models/PageData";

export default class Result<T> {
  constructor(st: string = '', msg: string = '', data: T | null = null) {
    this.st = st;
    this.msg = msg;
    this.data = data;
  }

  public st: string;
  public msg: string;
  public data: T | null;

  public static assign<T>(obj: any): Result<T> {
    return Object.assign(new Result<T>(), obj);
  }

  public static assignPage<T>(obj: any): Result<PageData<T>> {
    return Object.assign(new Result<PageData<T>>(), obj);
  }
}
