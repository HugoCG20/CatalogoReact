const numberFormat = (num: number) => {
    return new Intl.NumberFormat("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(num) || 0);
};

export default numberFormat;
