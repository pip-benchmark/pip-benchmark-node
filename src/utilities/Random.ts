export class Random {
    private static readonly AllowStringChars 
    	= "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz -";

    public constructor() { }

    public randomStringList(minCount: number, maxCount: number, itemSize: number): string[] {
        let result = [];
        let count = Math.max(0, minCount + Math.random() * (maxCount - minCount));

        for (let index = 0; index < count; index++) 
            result.push(this.randomString(itemSize));

        return result;
    }

    public randomString(size: number): string {
        let text = '';
        for (let index = 0; index < size; index++) {
            text += Random.AllowStringChars.charAt(
                this.randomInteger(0, Random.AllowStringChars.length)
            );
        }

        return text.toString();
    }

    public randomByteArray(size: number): number[] {
        let result = [];
        for (let index = 0; index < size; index++) {
            result.push(this.randomInteger(0, 256));
        }
        return result;
    }

    public randomInteger(minValue: number, maxValue: number): number {
        return Math.ceil(this.randomDouble(minValue, maxValue));
    }

    public randomDouble(minValue: number, maxValue: number): number {
        return minValue + Math.random() * (maxValue - minValue);
    }

    public randomBoolean(): boolean {
        return this.randomDouble(0, 100) >= 50;
    }
}
