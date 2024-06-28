export class Somit {
	constructor({ ignoreError=false, lazyTime=1500, debug=false }={}) {
		this.ignoreError = ignoreError ?? false;
		this.lazyTime = lazyTime ?? 1500;
		this.mittGroup = {};
		this.lazyGroup = {};
		this.debug = debug;
	}
	on(event, callback) {
		if (this.debug) console.log(`【Somit】debug::call on(event, callback)`, event, callback);
		if (callback) {
			if (typeof event === "string" || typeof event === "symbol") {
				if (this.mittGroup[event]) {
					return this.mittGroup[event].push(callback);
				} else {
					this.mittGroup[event] = [callback];
				}
			} else if (Array.isArray(event)) {
				return event.reduce((o, i) => (o.push(this.on(i, callback)), o), []);
			}
		}
	}
	off(event, callback) {
		if (this.debug) console.log(`【Somit】debug::call off(event, callback)`, event, callback);
		if (typeof event === "string" || typeof event === "symbol") {
			if (this.mittGroup[event]) {
				if (callback !== void 0) {
					let index = this.mittGroup[event].findIndex(cb => cb === callback);
					if (index !== -1) {
						this.mittGroup[event].splice(index, 1);
						return true;
					}
				} else {
					delete this.mittGroup[event];
				}
			} else if (!this.ignoreError) {
				throw new Error(`event '${String(event)}' it doesn't exist`);
			}
		} else if (Array.isArray(event)) {
			return event.reduce((o, i) => (o.push(this.off(i, callback)), o), []);
		}
	}
	emit(event, ...args) {
		if (this.debug) console.log(`【Somit】debug::call emit(event, args...)`, event, ...args);
		if (typeof event === "string" || typeof event === "symbol") {
			if (this.mittGroup[event]) {
				let results = this.mittGroup[event].map(cb => cb(...args));
				if (results.length > 1) return results;
				else return results[0];
			} else if(!this.ignoreError) {
				throw new Error(`event '${String(event)}' it doesn't exist`);
			}
		} else if (Array.isArray(event)) {
			return event.reduce((o, i) => (o.push(this.emit(i, ...args)), o), []);
		}
	}
	lazyEmit(event, ...args) {
		if (this.debug) console.log(`【Somit】debug::call lazyEmit(event, args...)`, event, ...args);
		return new Promise(res => {
			if (this.lazyGroup[event]) {
				clearTimeout(this.lazyGroup[event].timer);
				this.lazyGroup[event] = null;
			}
			if (this.mittGroup[event]) {
				this.lazyGroup[event] = { fn: this.emit.bind(this, event, ...args) };
				this.lazyGroup[event].timer = setTimeout(() => res(this.lazyGroup[event].fn()), this.lazyTime);
			} else if (!this.ignoreError) {
				throw new Error(`event '${String(event)}' it doesn't exist`);
			}
		});
	}
}

export default Somit;