import Vue from 'vue';

const debug = process && process.env && process.env.NODE_ENV === 'development';

export default {
	data() {
		return {
			mixinTimeouts: {},
		};
	},
	destroyed() {
		for (let key of Object.keys(this.mixinTimeouts)) {
			if (this.mixinTimeouts[key]) {
				this.clearTimeout(key);
			}
		}
	},
	methods: {
		setTimeout(callback, time, name, executeOnCreate) {
			this.clearTimeout(name);
			Vue.set(this.mixinTimeouts, name, window.setTimeout(callback, time));

			if ( debug ) {
				console.log('[Vue-Utils.Timeout] Created Timeout ' + name);
			}

			if (executeOnCreate) {
				if ( debug ) {
					console.log(`[Vue-Utils.Timeout] Executed Timeout ${name} directly.`);
				}

				callback();
			}
		},
		clearTimeout(name) {
			if (this.mixinTimeouts[name]) {
				window.clearTimeout(this.mixinTimeouts[name]);
				Vue.delete(this.mixinTimeouts, name);

				if ( debug ) {
					console.debug('[Vue-Utils.Timeout] Destroyed timeout ' + name);
				}
			}
		},
	},
};
