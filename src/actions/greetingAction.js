export const greetingAction = (language, names) => dispatch => {
    dispatch({
        type: 'RENDER_GREETINGS',
        payload: {
            language, names
        }
    })
};
