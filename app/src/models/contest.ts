export class Contest {
  public id: string
  public name: string
  public url: string
  public startAt: number
  public endAt: number

  constructor(
    id: string,
    name: string,
    url: string,
    startAt: number,
    endAt: number
  ) {
    this.id = id
    this.name = name
    this.url = url
    this.startAt = startAt
    this.endAt = endAt
  }

  get status() {
    const now = new Date().getTime()

    if (now < this.startAt) {
      return 'reserved'
    } else if (now < this.endAt) {
      return 'doing'
    } else {
      return 'done'
    }
  }
}
