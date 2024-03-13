export interface Article {
    id?: number
    coverImage?: string
    title?: string
    username?: string
    description?: string
    content?: string
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