export class AddressParameter {
  public readonly name: string;
  public readonly value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  public get query(): string {
    return `${encodeURIComponent(this.name)}=${encodeURIComponent(this.value)}`;
  }
}
