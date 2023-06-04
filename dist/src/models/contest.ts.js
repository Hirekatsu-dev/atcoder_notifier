class Contest {
  constructor(name, startAt, endAt, pageUrl) {
    this.name = name;
    this.startAt = startAt;
    this.endAt = endAt;
    this.pageUrl = pageUrl;
  }
  get key() {
    return `Contest:${this.name}`;
  }
  // モデル全体でいい感じに共通化したい
  async save() {
    const val = {
      [this.key]: this
    };
    await chrome.storage.sync.set(val);
  }
  async remove() {
    await chrome.storage.sync.remove(this.key);
  }
  static async list() {
    const allItems = await chrome.storage.sync.get();
    return Object.entries(allItems).filter((v) => {
      const key = v[0];
      return !!key.match(/^Contest:.*/g);
    }).map((v) => v[1]);
  }
}

export { Contest };
