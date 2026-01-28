/**
 * Server-side logger with configurable log levels.
 * 
 * Log levels (in order of priority):
 * - debug: Detailed debugging information
 * - info: General operational information (default)
 * - warn: Warning messages for potentially harmful situations
 * - error: Error events that might still allow the application to continue
 * 
 * Configure via LOG_LEVEL environment variable.
 * Example: LOG_LEVEL=debug npm run dev
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

const LOG_COLORS: Record<LogLevel, string> = {
    debug: '\x1b[36m', // Cyan
    info: '\x1b[32m',  // Green
    warn: '\x1b[33m',  // Yellow
    error: '\x1b[31m', // Red
};

const RESET = '\x1b[0m';

function getLogLevel(): LogLevel {
    const envLevel = process.env.LOG_LEVEL?.toLowerCase() as LogLevel;
    if (envLevel && LOG_LEVELS[envLevel] !== undefined) {
        return envLevel;
    }
    return 'info'; // Default
}

function shouldLog(level: LogLevel): boolean {
    const currentLevel = getLogLevel();
    return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatTimestamp(): string {
    return new Date().toISOString();
}

function formatMessage(level: LogLevel, context: string, message: string, meta?: Record<string, any>): string {
    const timestamp = formatTimestamp();
    const color = LOG_COLORS[level];
    const levelPadded = level.toUpperCase().padEnd(5);

    let output = `${color}[${timestamp}] [${levelPadded}]${RESET} [${context}] ${message}`;

    if (meta && Object.keys(meta).length > 0) {
        output += ` ${JSON.stringify(meta)}`;
    }

    return output;
}

function log(level: LogLevel, context: string, message: string, meta?: Record<string, any>): void {
    if (!shouldLog(level)) {
        return;
    }

    const formattedMessage = formatMessage(level, context, message, meta);

    switch (level) {
        case 'error':
            console.error(formattedMessage);
            break;
        case 'warn':
            console.warn(formattedMessage);
            break;
        default:
            console.log(formattedMessage);
    }
}

/**
 * Create a logger instance for a specific context (e.g., API route name)
 */
export function createLogger(context: string) {
    return {
        debug: (message: string, meta?: Record<string, any>) => log('debug', context, message, meta),
        info: (message: string, meta?: Record<string, any>) => log('info', context, message, meta),
        warn: (message: string, meta?: Record<string, any>) => log('warn', context, message, meta),
        error: (message: string, meta?: Record<string, any>) => log('error', context, message, meta),
    };
}

/**
 * Default logger instance
 */
export const logger = createLogger('app');

/**
 * Log an API request with standard fields
 */
export function logApiRequest(
    context: string,
    method: string,
    path: string,
    meta?: Record<string, any>
): void {
    log('info', context, `${method} ${path}`, meta);
}

/**
 * Log an API response with timing
 */
export function logApiResponse(
    context: string,
    method: string,
    path: string,
    status: number,
    durationMs: number,
    meta?: Record<string, any>
): void {
    const level: LogLevel = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
    log(level, context, `${method} ${path} → ${status} (${durationMs}ms)`, meta);
}

export default logger;
