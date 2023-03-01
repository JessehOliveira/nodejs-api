import util from 'util'

enum LogLevel {
    WARNING = 'warning',
    CRITICAL = 'critical',
    FATAL = 'fatal',
    DEBUG = 'debug',
    INFO = 'info',
}

enum LogChannel {
    STDOUT = 'stdout',
    REDIS = 'redis',
}

interface LogMetadata {
    timestamp: Date
    level: LogLevel
    message: any
    channel: LogChannel,
    application: string,
    environment: string,
    tags: string[] | undefined
}

export default class Log {

    static warning(message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.WARNING,
                undefined,
                message,
                ...param
            )
        )
    }    

    static taggedWarning(tags: string[], message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.WARNING,
                tags,
                message,
                ...param
            )
        )
    }

    static critical(message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.CRITICAL,
                undefined,
                message,
                ...param
            )
        )
    }    

    static taggedCritical(tags: string[], message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.CRITICAL,
                tags,
                message,
                ...param
            )
        )
    }

    static fatal(message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.FATAL,
                undefined,
                message,
                ...param
            )
        )
    }    

    static taggedFatal(tags: string[], message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.FATAL,
                tags,
                message,
                ...param
            )
        )
    }

    static debug(message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.DEBUG,
                undefined,
                message,
                ...param
            )
        )
    }    

    static taggedDebug(tags: string[], message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.DEBUG,
                tags,
                message,
                ...param
            )
        )
    }

    static info(message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.INFO,
                undefined,
                message,
                ...param
            )
        )
    }    

    static taggedInfo(tags: string[], message: any, ...param: any[]): void {
        Log.log(
            Log.mountMetadata(
                LogLevel.INFO,
                tags,
                message,
                ...param
            )
        )
    }

    private static mountMetadata (level: LogLevel, tags: string[] | undefined, message: any, ...params: any[]): LogMetadata[] {
        let metadatas: LogMetadata[] = []

        const pushMetadata = (newMessage: any) => {
            metadatas.push({
                timestamp: new Date(new Date().toUTCString()),
                level,
                message: newMessage,
                channel: (<any>LogChannel)[String(process.env.LOG_CHANNEL || LogChannel.STDOUT).toUpperCase()],
                application: String(process.env.npm_package_name),
                environment: String(process.env.NODE_ENV),
                tags
            })
        }

        const formatedMessage = (typeof message === 'string' || message instanceof String) ? util.format(message, ...params) : message

        pushMetadata(formatedMessage)

        if (params && formatedMessage === message) {
            for (let param of params) {
                pushMetadata(param)
            }
        }

        return metadatas
    }

    private static log(metadatas: LogMetadata[]): void {
        Log.logToStdOut(metadatas)
    }

    private static logToStdOut(metadatas: LogMetadata[]): void {
        const jsonMetadatas = metadatas.map(metadata => JSON.stringify(metadata))

        if (metadatas[0].level === LogLevel.WARNING) {
            console.warn(...jsonMetadatas)
            return
        }

        if ([LogLevel.FATAL, LogLevel.CRITICAL].includes(metadatas[0].level)) {
            console.error(...jsonMetadatas)
            return
        }

        if (metadatas[0].level === LogLevel.DEBUG) {
            console.debug(...jsonMetadatas)
            return
        }

        console.info(...jsonMetadatas)
    }
}