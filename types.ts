export interface ISocketRes {
  block: string
  data: {
    [key: string]: string
  }
  status: {
    [key: string]: boolean
  }
}

export interface IFormInput {
  label: string
  placeholder: string
}

export interface IBlock {
  block: string
  status: boolean
}