export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

export const toLowerFirstChar = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toLowerCase();
};
