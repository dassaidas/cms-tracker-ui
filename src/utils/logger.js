const isProd = process.env.NODE_ENV === "production";

const logger = {
  info: (...args) => {
    if (!isProd) {
      console.groupCollapsed(`🟢 [INFO]: ${args[0]}`);
      if (args.length > 1) console.log(...args.slice(1));
      console.groupEnd();
    }
  },
  warn: (...args) => {
    console.groupCollapsed(`🟡 [WARN]: ${args[0]}`);
    if (args.length > 1) console.warn(...args.slice(1));
    console.groupEnd();
  },
  error: (...args) => {
    console.groupCollapsed(`🔴 [ERROR]: ${args[0]}`);
    if (args.length > 1) console.error(...args.slice(1));
    console.groupEnd();
    // Optionally send to remote logging service here
  },
};

export default logger;
