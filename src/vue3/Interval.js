import {onUnmounted, ref} from "vue";
import {generateRandomId} from "./utils";

export default function useInterval(debug = false) {
    const intervals = ref({});

    function clearInterval(name) {
        if (intervals.value[name]) {
            window.clearInterval(intervals.value[name]);
            delete intervals.value[name];

            if (debug) {
                console.debug('[Vue-Utils.Interval] Destroyed Interval ' + name);
            }
        }
    }

    function setInterval(callback, time, name, executeOnCreate) {
        if (typeof name === 'undefined') {
            do {
                name = generateRandomId();
            } while (typeof intervals.value[name] !== 'undefined');
        }

        clearInterval(name);

        intervals.value[name] = window.setInterval(callback, time);

        if (debug) {
            console.log('[Vue-Utils.Interval] Created Interval ' + name);
        }

        if (executeOnCreate) {
            if (debug) {
                console.log(`[Vue-Utils.Interval] Executed Interval ${name} directly.`);
            }

            callback();
        }

        return name;
    }

    onUnmounted(() => {
        for (let key of Object.keys(intervals.value)) {
            if (intervals.value[key]) {
                clearInterval(key);
            }
        }
    });

    return {
        intervals,
        setInterval,
        clearInterval,
    }
}
