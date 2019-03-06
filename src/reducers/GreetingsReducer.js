const greetings = {
    'english': 'Hello',
    'german': 'Halo',
    'spanish': 'Hola',
    'french': 'Bonjour'
};

export default (state = {}, action) => {
    switch (action.type) {
        case 'RENDER_GREETINGS':
            const language = action.payload.language;
            const names = action.payload.names;
            if(!language){
                return {
                    greets: []
                }
            }else{
                let greets = names.filter(name=>name.length>0).map(name => `${greetings[language]} ${name}`);
                console.log(greets);
                return {
                    greetings: greets
                };
            }
        default:
            return state
    }
}
