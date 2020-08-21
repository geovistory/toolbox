import prettyMilliseconds from 'pretty-ms';
import * as readline from 'readline'

export class Logger {

    static msg(msg: string, intendation = 1) {
        Logger.log(Logger.ind(intendation) + msg);
    }

    static getTime() {
        return new Date().getTime();
    }
    /**
     * print msg and return time
     * @param msg 
     */
    static start(msg: string, intendation = 1) {
        const ind = new Array(intendation + 1).join('      ');
        Logger.log(`${ind}----> ${msg}`);
        return new Date().getTime();
    }
    static itTook(beginMs: number, msg: string, intendation = 1, endLine = true) {
        const ind = new Array(intendation + 1).join('      ');
        const ram = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100
        const diff = new Date().getTime() - beginMs;
        Logger.log(`${ind}    > it took \u{1b}[33m${Logger.passedMs(beginMs)}\u{1b}[0m ${msg} \u{1b}[32m (${ram} mb) \u{1b}[0m`, endLine);
        return diff
    }
    static done(beginMs: number, intendation = 1) {
        const ind = new Array(intendation + 1).join('      ');
        Logger.log(`${ind}    > done in ${Logger.passedMs(beginMs)}`);
    }

    static diffMs(ms: number) {
        return new Date().getTime() - ms
    }
    static passedMs(ms: number) {
        return prettyMilliseconds(Logger.diffMs(ms))
    }

    static ind(x: number) {
        return new Array(x + 2).join('      ');
    }

    static log(msg: any, endLine = true) {
        if (process.env.LOGS === 'OFF') return true
        process.stdout.write(msg);
        if (endLine) Logger.endLine()
    }
    static endLine() {
        process.stdout.write('\n');
    }

    // static printMsg(msg: string, i^tendation = 1) {
    //     Logger.print(Logger.ind(intendation) + msg);
    // }
    // static printClearEntireLine() {
    //     clearLine(process.stdout, 1)
    //     cursorTo(process.stdout, 0)
    // }

    // static print(msg: any) {
    //     if (process.env.LOGS === 'OFF') return true
    //     process.stdout.write(msg);


    // }

    static resetLine() {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
    }

} 