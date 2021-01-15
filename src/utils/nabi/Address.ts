import { AddressParameter } from './AddressParameter';
import Nabi from "@/utils/nabi/index";

export class Address {
  public origin = '';
  public pathname = '';
  private inParams = [] as AddressParameter[];

  constructor(setNowAddress: boolean) {
    if (setNowAddress) {
      this.origin = location.origin;
      this.pathname = location.pathname;
      const search = location.search;
      if (search.startsWith('?') && search.length > 1) {
        this.inParams = search.substring(1).split('&').filter((e) => e.indexOf('=') !== -1)
          .map((e) => new AddressParameter(e.substring(0, e.indexOf('=')), e.substring(e.indexOf('=') + 1)));
      }
    }
  }

  public setPathname(pathname: string): Address {
    this.pathname = pathname;
    return this;
  }

  public getParameters(name: string): string[] {
    return this.inParams.filter((e) => e.name === name).map((e) => e.value);
  }

  public getParameter(name: string): string|null {
    const vals = this.inParams.filter((e) => e.name === name).map((e) => e.value);
    return vals.length > 0 ? vals[0] : null;
  }

  public getIntParameter(name: string, defaultValue = 0): number {
    const val = Number(this.getParameter(name));
    return isNaN(val) ? defaultValue : val;
  }

  public deleteParameter(args: string|string[]): Address {
    if (typeof args === 'string') {
      this.inParams = this.inParams.filter((e) => e.name !== args);
    } else {
      this.inParams = this.inParams.filter((e) => args.indexOf(e.name) === -1);
    }
    return this;
  }

  public filterParameter(args: string[]|((name: string, value: string) => void)): Address {
    if (Array.isArray(args)) {
      this.inParams = this.inParams.filter((e) => args.indexOf(e.name) !== -1);
    } else {
      this.inParams = this.inParams.filter((e) => args(e.name, e.value));
    }
    return this;
  }

  public clearParameter(): Address {
    this.inParams = [];
    return this;
  }

  public addParameter(name: string, value: any): Address {
    this.inParams.push(new AddressParameter(name, value.toString()));
    return this;
  }

  public setParameter(name: string, value: any): Address {
    return this.deleteParameter(name).addParameter(name, value);
  }

  public get search(): string {
    const rv = this.inParams.map((e) => e.query).join('&');
    return rv.length !== 0 ? `?${rv}` : '';
  }

  public get url(): string {
    return this.origin + this.pathname + this.search;
  }

  public get href(): string {
    return this.pathname + this.search;
  }
}
