export class AddressParameter {
  public readonly name: string;
  public readonly value: string;

  constructor(name: string, value: string) {
    this.name = decodeURIComponent(name);
    this.value = decodeURIComponent(value);
  }

  public get query(): string {
    return `${encodeURIComponent(this.name)}=${encodeURIComponent(this.value)}`;
  }
}
