export class Contest {
  constructor(
    public name: string,
    public startAt: Date,
    public endAt: Date,
    public pageUrl: string,
  ){}

  public get key() {
    return `Contest:${this.name}`;
  }


  // モデル全体でいい感じに共通化したい
  public async save() {
    const val = {
      [this.key]: this,
    };
    await chrome.storage.sync.set(val);
  }

  public async remove() {
    await chrome.storage.sync.remove(this.key);
  }

  public static async list(): Promise<Contest[]> {
    const allItems = await chrome.storage.sync.get();
    return Object.entries(allItems).filter(v => {
      const key = v[0];
      return !!key.match(/^Contest:.*/g);
    }).map(v => v[1]);
  }
}