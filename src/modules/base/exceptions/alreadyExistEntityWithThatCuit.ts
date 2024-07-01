class AlreadyExistsEntityWithThatCuit extends Error {
    constructor() {
        super('Entity already exist with that cuit');
    }
}

export default AlreadyExistsEntityWithThatCuit;
