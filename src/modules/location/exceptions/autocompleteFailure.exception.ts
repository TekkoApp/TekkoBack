class AutocompleteFailure extends Error {
    constructor() {
        super('Failed to fetch places autocomplete results');
    }
}

export default AutocompleteFailure;
