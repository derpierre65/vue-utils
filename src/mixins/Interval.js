import Vue from 'vue';

const debug = process && process.env && process.env.NODE_ENV === 'development';

export default {
	data() {
		return {
			mixinIntervals: {},
		};
	},
	destroyed() {
		for (let key of Object.keys(this.mixinIntervals)) {
			if (this.mixinIntervals[key]) {
				window.clearInterval(this.mixinIntervals[key]);
			}
		}
	},
	methods: {
		setInterval(name, callback, time, executeOnCreate) {
            console.log('[Vue-Utils.Interval] Created interval ' + name);
			this.clearInterval(name);
			Vue.set(this.mixinIntervals, name, window.setInterval(callback, time));

			if (executeOnCreate) {
                console.log(`[Vue-Utils.Interval] Executed Interval ${name} directly.`);
				callback();
			}
		},
		clearInterval(name) {
			if (this.mixinIntervals[name]) {
				window.clearInterval(this.mixinIntervals[name]);
				Vue.delete(this.mixinIntervals, name);
                console.debug('[Vue-Utils.Interval] Destroyed interval ' + key);
			}
		},
	},
};