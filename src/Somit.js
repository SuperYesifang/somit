export class Somit {
	constructor({ ingoreError=false, lazyTime=1500 }={}) {
		this.ingoreError = ingoreError ?? false;
		this.lazyTime = lazyTime ?? 1500;
		this.mittGroup = {};
		this.lazyGroup = {};
	}
	on(event, callback) {
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
			} else if (!this.ingoreError) {
				throw new Error(`event '${String(event)}' it doesn't exist`);
			}
		} else if (Array.isArray(event)) {
			return event.reduce((o, i) => (o.push(this.off(i, callback)), o), []);
		}
	}
	emit(event, ...args) {
		if (typeof event === "string" || typeof event === "symbol") {
			if (this.mittGroup[event]) {
				return this.mittGroup[event].map(cb => cb(...args));
			} else if(!this.ingoreError) {
				throw new Error(`event '${String(event)}' it doesn't exist`);
			}
		} else if (Array.isArray(event)) {
			return event.reduce((o, i) => (o.push(this.emit(i, ...args)), o), []);
		}
	}
	lazyEmit(event, ...args) {
		return new Promise(res => {
			if (this.lazyGroup[event]) {
				clearTimeout(this.lazyGroup[event].timer);
				this.lazyGroup[event] = null;
			}
			if (this.mittGroup[event]) {
				this.lazyGroup[event] = { fn: this.emit.bind(this, event, ...args) };
				this.lazyGroup[event].timer = setTimeout(() => res(this.lazyGroup[event].fn()), this.lazyTime);
			} else if (!this.ingoreError) {
				throw new Error(`event '${String(event)}' it doesn't exist`);
			}
		});
	}
}

export default Somit;