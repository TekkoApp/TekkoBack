class WrongSelectedAddress extends Error {
    constructor() {
        super('The selected address is not valid');
    }
}

export default WrongSelectedAddress;
