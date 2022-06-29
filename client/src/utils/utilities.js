export const currencyFormatter = value => {
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
};

export const currencyParser = value => {
    try {
        // for when the input gets clears
        if (typeof value === "string" && !value.length) {
            value = "0.0";
            return value;
        }
        return value.replace(/\$\s?|(,*)/g, '')
    } catch (error) {
        console.error(error);
    }
};