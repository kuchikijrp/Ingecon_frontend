// export const isAuthenticated = () => true;


export const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    let auth;

    token ? (
        auth = true
    ):(
        auth = false
    )

    return auth;
};