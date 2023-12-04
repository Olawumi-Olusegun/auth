

export interface CurrentUser {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar?: {
        id?: string;
        imgUrl?: string;
    },
    isVerified: boolean;
    message: string;
    success?: boolean;
}


export interface UserState {
    currentUser: CurrentUser |  null,
    isLoading: boolean,
    error: string,
}

export interface SigninPayload {
    currentUser: CurrentUser |  null,
    isLoading: boolean,
    error: "",
}

export interface UpdateUserPayload {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar?: {
        id?: string;
        imgUrl?: string;
    },
    isVerified: boolean;
    message?: string;
    success?: boolean;
}
