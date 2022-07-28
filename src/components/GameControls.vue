<template>
    <div class="game-controls">
        <h1>Game Controls</h1>
        <button @click="nextStepHandler">Próximo paso</button>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { useGame } from "@/modules/game";

export default defineComponent({
    setup() {
        const gameRef = useGame();

        const state = reactive({
            autorun: false,
        });

        const nextStepHandler = () => {
            gameRef.nextStep();
        };

        return {
            ...toRefs(state),
            nextStepHandler,
        };
    },
});
</script>

<style lang="scss" scoped></style>
