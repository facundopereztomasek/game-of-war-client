<template>
    <div class="board">
        <h1>GameBoard</h1>
        <pre>{{ board }}</pre>
    </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useGame } from "@/modules/game";

export default defineComponent({
    setup() {
        const gameRef = useGame();
        gameRef.nextStep();

        const state = reactive({
            board: computed(() => gameRef.board),
        });

        return {
            ...toRefs(state),
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
