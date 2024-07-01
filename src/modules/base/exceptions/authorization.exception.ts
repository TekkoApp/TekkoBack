class AuthorizationException extends Error {
    constructor() {
        super('You do not have permission to perform the action.');
    }
}

export default AuthorizationException;
