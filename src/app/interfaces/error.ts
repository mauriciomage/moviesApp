export interface ErrorModel { 
  error: Error,
  message: string,
  name: string,
  ok: boolean,
  status: number,
  statusText: string,
  url: string
}

export interface Error {
  status_code: number,
  status_message: string,
  success: boolean
}
