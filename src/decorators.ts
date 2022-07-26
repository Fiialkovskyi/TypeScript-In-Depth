export function sealed(parameter: string) {
    return function (constructor: Function) {
        console.log(`Sealing the constructor ${parameter}`);
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log('Creating new instance');
        console.log(constructor);
        this.age = 30;
    };

    newConstructor.prototype = Object.create(constructor.prototype);
    newConstructor.prototype.printLibrarian = function (): void {
        console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        descriptor.writable = isWritable;
        return descriptor;
    };
}

export function timeout(ms: number) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const method = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (window.confirm('are you sure?')) {
                setTimeout(() => {
                    method.apply(this, args);
                }, ms);
            }
        };
        return descriptor;
    };
}

export const logParameter = function (target: any, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;
    (proto[key] ??= []).push(index);
};

export const logMethod = function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor,
): PropertyDescriptor {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
        args.forEach((arg, index) => {
            if (proto[key].includes(index)) {
                console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
            }
        });

        method.apply(this, arguments);
    };
    return descriptor;
};

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T,
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true,
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

export const format = function (pref: string = 'Mr./Mrs') {
    return function (target: any, propertyKey: string) {
        makeProperty(
            target,
            propertyKey,
            value => `${pref} ${value}`,
            value => value,
        );
    };
};

export function positiveInteger(target: any, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const oldSet = descriptor.set;

    descriptor.set = function (value: number) {
        if (value < 0 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        oldSet?.call(this, value);
    };

    return descriptor;
}
