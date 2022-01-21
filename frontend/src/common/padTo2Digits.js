// FORMAT A NUMBER WITH 2 DIGITS
export default (num) => {
    return num.toString().padStart(2, '0');
}