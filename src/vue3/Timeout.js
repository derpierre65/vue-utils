import {onUnmounted, ref} from "vue";
import {generateRandomId} from "./utils";

export default function useTimeout(debug = false) {
    const timeouts = ref({});

    function clearTimeout(name) {
        if (timeouts.value[name]) {
            window.clearTimeout(timeouts.value[name]);
            delete timeouts.value[name];

            if (debug) {
                console.debug('[Vue-Utils.Timeout] Destroyed timeout ' + name);
            }
        }
    }

    function setTimeout(callback, time, name, executeOnCreate) {
        if (typeof name === 'undefined') {
            do {
                name = generateRandomId();
            } while (typeof timeouts.value[name] !== 'undefined');
        }

        clearTimeout(name);

        timeouts.value[name] = window.setTimeout(() => {
            delete timeouts.value[name];
            callback();
        }, time);

        if (debug) {
            console.log('[Vue-Utils.Timeout] Created Timeout ' + name);
        }

        if (executeOnCreate) {
            if (debug) {
                console.log(`[Vue-Utils.Timeout] Executed Timeout ${name} directly.`);
            }

            callback();
        }

        return name;
    }

    onUnmounted(() => {
        for (let key of Object.keys(timeouts.value)) {
            if (timeouts.value[key]) {
                clearTimeout(key);
            }
        }
    });

    return {
        timeouts,
        setTimeout,
        clearTimeout,
    }
}
