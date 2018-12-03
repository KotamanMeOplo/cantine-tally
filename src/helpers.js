const roundNumToNumOfDecimals = (num, decimal) => parseFloat(Math.round(num * 100) / 100).toFixed(decimal);

export default roundNumToNumOfDecimals;