/**
 * 模拟Promise
 * 但是每次then没有返回新的promise
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
const noop = function() {}

function MyPromise(resolver) {
  if (!(this instanceof MyPromise)) {
    throw new TypeError(`Please use the 'new' operator`)
  }

  this._state = undefined
  this._value = undefined
  this._subscribers = []
  this._isRunning = false

  initializePromise.bind(this)(resolver)
}

function initializePromise(resolver) {
  try {
    this._state = PENDING
    resolver(resolve.bind(this), reject.bind(this))
  } catch (error) {
    throw new TypeError('[MyPromise] ' + error.message)
  }
}

function resolve(value) {
  this._state = FULFILLED
  this._value = value
  setTimeout(() => {
    asyncRun.bind(this)()
  }, 0)
}

function reject(value) {
  this._state = REJECTED
  this._value = value
  setTimeout(() => {
    asyncRun.bind(this)()
  }, 0)
}

function asyncRun() {
  if (this._isRunning) return
  this._isRunning = true
  let context = this
  for (const { type, fn } of this._subscribers) {
    if (context._state === type) {
      if (context._state === FULFILLED) {
        try {
          let value = fn(context._value)
          if (value instanceof MyPromise) {
            context = value
            value = context._value
          }
          resolve.bind(context)(value)
        } catch (error) {
          reject.bind(context)(error)
        }
      } else if (context._state === REJECTED && fn !== noop) {
        resolve.bind(context)(fn(context._value))
      }
    }
  }
  if (this._state === REJECTED) {
    throw this._value
  }
}

MyPromise.prototype.then = function(onFulfilled = noop, onRejected = noop) {
  this._subscribers.push({ type: REJECTED, fn: onRejected })
  this._subscribers.push({ type: FULFILLED, fn: onFulfilled })
  return this
}

MyPromise.prototype.catch = function(onRejected = noop) {
  this._subscribers.push({ type: REJECTED, fn: onRejected })
  return this
}

window.MyPromise = MyPromise
