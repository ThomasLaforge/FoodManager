export class CustomError extends Error {
    customErrorConstructorName: string
    isCustomError = true
    assignedLocalData: any
    silent?: any
    constructor(props?, customErrorConstructorName?: string) {
        super(props.message);
        this.message = props.message;
        // delete props.message;

        this.silent = props.silent;
        delete props.silent;
        // Error.captureStackTrace && Error.captureStackTrace(this, (this as any).constructor);
        // console.log('creating custom error', props, typeof props, props instanceof Error, props instanceof CustomError);


        //we need to understand if we are duplicating or not
        const isError = props instanceof Error;
        if (props.customErrorConstructorName || isError) {
            //duplicating
            //use getOwnPropertyNames to get hidden Error props
            let keys = Object.getOwnPropertyNames(props);
            // if (isError) {
            //     keys = keys.concat(['fileName', 'stack', 'lineNumber', 'type']);
            // }
            // console.log('duplicating error', keys, props.stack);
            for (var index = 0; index < keys.length; index++) {
                var k = keys[index];
                if (!props[k] || typeof props[k] === 'function') continue;
                // console.log('assigning', k, props[k], this[k]);
                this[k] = props[k];
            }
        } else {
            // console.log('creating new CustomError', props);
            this.assignedLocalData = props;
        }

        if (!this.customErrorConstructorName) {
            this.customErrorConstructorName = customErrorConstructorName || (this as any).constructor.name; // OR (<any>this).constructor.name;
        }
    }

    localData = () => {
        var res = {};
        for (let key in this.assignedLocalData) {
            res[key] = this.assignedLocalData[key];
        }
        return res;
    }

    toJSON = () => {
        var error = { message: this.message };
        Object.getOwnPropertyNames(this).forEach((key) => {
            if (typeof this[key] !== 'function') {
                error[key] = this[key];
            }
        });
        return error;
    }
    toData = () => {
        return JSON.stringify(this.toJSON());
    }
    toString = () => {
        return this.message || this.stack;
    }
}

export class NotInDbError extends CustomError {
    dbid: string
    dbName: string
    constructor(props) {
        super(Object.assign({ message: 'not_in_db' }, props), 'NotInDbError');
    }
}