export const basePost = () => {
    return {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
}

export const checkTokenHeader = (token) => {
    return {
        ...basePost(),
        'Authorization' : `Bearer ${token}`
    }
}

export const postHeader = (token) => {
    return checkTokenHeader(token);
}

export const getHeader = (token) => {
    return checkTokenHeader(token);
}

export const putHeader = (token) => {
    return checkTokenHeader(token);
}