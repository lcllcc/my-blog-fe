export interface Article {
    id?: number
    coverImage?: string
    title?: string
    username?: string
    description?: string
    content?: string
    status?: string
    token?: string
    starNum?: number
    viewNum?: number
}

export interface User {
    username?: string
    id?: number
    email?: string
    articleNum?: number
    followerNum?: number
    starNum?: number
    amount?: number
}