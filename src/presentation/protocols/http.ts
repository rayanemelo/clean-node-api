export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any // opcional pois nem sempre vai ter o body, ex: get
}
