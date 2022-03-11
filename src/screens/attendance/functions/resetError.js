// reset all errors

export const resetError = (props) => {
    for (const error in props) {
        props[error](false);
    }
}