type CallbackStdOut = {(message?: any, ...optionalParams: any[]): void}

export const warn = (callback: CallbackStdOut) => {
  var originalWarn = console.warn

  console.warn = function() {
    originalWarn(...arguments)
    callback(...arguments)
  }

  return () => {
    console.warn = originalWarn
  };
}

export const debug = (callback: CallbackStdOut) => {
  var originalDebug = console.debug

  console.debug = function() {
    originalDebug(...arguments)
    callback(...arguments)
  }

  return () => {
    console.debug = originalDebug
  };
}

export const error = (callback: CallbackStdOut) => {
  var originalError = console.error

  console.error = function() {
    originalError(...arguments)
    callback(...arguments)
  }

  return () => {
    console.error = originalError
  };
}

export const info = (callback: CallbackStdOut) => {
  var originalInfo = console.info

  console.info = function() {
    originalInfo(...arguments)
    callback(...arguments)
  }

  return () => {
    console.info = originalInfo
  };
}