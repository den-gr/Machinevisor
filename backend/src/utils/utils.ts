const isNumber = (number: string): boolean  => {
    return !isNaN(+number);
}


const makeErr = (error_name: string, message: string): Object => {
    return {error_name, message};
}
export {makeErr, isNumber }