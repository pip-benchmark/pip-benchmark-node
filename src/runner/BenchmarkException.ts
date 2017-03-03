export class BenchmarkException extends Error {

    public constructor(message?: string, cause?: any) {
        super(message);

        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        (<any>this).__proto__ = BenchmarkException.prototype;

        this.cause = cause;
    }

    public cause: any;

}