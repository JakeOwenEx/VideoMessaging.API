const { uuid } = require('uuidv4');

export function traceIdResolver(): any {
    return {
        before: async (handler : any) => {
            if(!handler.event.headers.hasOwnProperty("traceid")){
                handler.event.headers.traceid = uuid();
            }
            return;
        }
    }
}