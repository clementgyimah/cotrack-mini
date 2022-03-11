// reset all inputs
export const resetInput = (props) => {
    for (const setValue in props) {
        props[setValue]('');
    }
}