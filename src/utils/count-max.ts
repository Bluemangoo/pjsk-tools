import { computed, ref, type Ref } from "vue";

export class CountMaxGuard {
    constructor(
        private curr: Ref<number>,
        private max: Ref<number>,
        private enabled: Ref<boolean> = ref(true)
    ) {}

    check(value: number): Ref<boolean> {
        const self = this;
        return computed(() => {
            if (!self.enabled.value) {
                return true;
            }
            return value + self.curr.value <= self.max.value;
        });
    }
    diff(): Ref<number> {
        const self = this;
        return computed(() => {
            if (!self.enabled.value) {
                return Infinity;
            }
            return self.max.value - self.curr.value;
        });
    }

    withRate(rate: number): SubCountMaxGuard {
        const self = this;
        const subCheck = (value: number) => {
            return self.check(value * rate);
        };
        const subDiff = () => {
            return computed(() => self.diff().value / rate);
        };
        return {
            check: subCheck,
            diff: subDiff
        };
    }
}

export type SubCountMaxGuard = {
    check: (value: number) => Ref<boolean>;
    diff: () => Ref<number>;
};
