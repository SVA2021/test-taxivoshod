export interface ISocketRes {
  block: string
  data?: IBlockData
  status?: IBlockStatus
  focus?: string
  blur?: string
}

export interface ISocketState {
  [key: string]: ISocketData
}

export interface ISocketData {
  data: IBlockData
  status: IBlockStatus
}

export interface IBlockData {
  [key: string]: string
}

export interface IBlockStatus {
  [key: string]: boolean
}

export interface IFormInput {
  label: string
  placeholder: string
}

export interface IBlock {
  name: string
  isOpen: boolean
}