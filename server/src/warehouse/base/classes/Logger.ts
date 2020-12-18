import prettyMilliseconds from 'pretty-ms';
import * as readline from 'readline'

export class Logger {
    static err(slug: string, msg: string, intendation = 1) {
        if (process.env.LOGS === 'OFF') return

        Logger.log(Logger.slug(slug) + Logger.ind(intendation) + 'ERR: ' + msg);
    }
    static msg(slug: string, msg: string, intendation = 1) {
        if (process.env.LOGS === 'OFF') return

        Logger.log(Logger.slug(slug) + Logger.ind(intendation) + msg);
    }

    static getTime() {
        return new Date().getTime();
    }
    static slug(msg: string, template = '                           ') {
        const length = template.length;
        const m = msg.substring(0, length)
        return `${(template + m).slice(-length)} | `;
    }
    /**
     * print msg and return time
     * @param msg
     */
    static start(slug: string, msg: string, intendation = 1) {
        if (process.env.LOGS === 'OFF') return new Date().getTime();

        const ind = new Array(intendation + 1).join('      ');
        Logger.log(`${Logger.slug(slug)}${ind}----> ${msg}`);
        return new Date().getTime();
    }
    static itTook(slug: string, beginMs: number, msg: string, intendation = 1, endLine = true) {
        if (process.env.LOGS === 'OFF') return

        const ind = new Array(intendation + 1).join('      ');
        const ram = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100
        const diff = new Date().getTime() - beginMs;
        Logger.log(`${Logger.slug(slug)}${ind}    > it took \u{1b}[33m${Logger.passedMs(beginMs)}\u{1b}[0m ${msg} \u{1b}[32m (${ram} mb) \u{1b}[0m`, endLine);
        return diff
    }
    static done(slug: string, beginMs: number, intendation = 1) {
        if (process.env.LOGS === 'OFF') return

        const ind = new Array(intendation + 1).join('      ');
        Logger.log(`${Logger.slug(slug)}${ind}    > done in ${Logger.passedMs(beginMs)}`);
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

    static log(msg = '', endLine = true) {
        if (process.env.LOGS === 'OFF') return
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
    //     if (process.env.LOGS === 'OFF') return
    //     process.stdout.write(msg);


    // }

    static resetLine() {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
    }

}
