<template>
    <div class="game-board">
        <h1>Game Board</h1>
        <div>
            <canvas
                ref="boardCanvas"
                :width="canvasSize"
                :height="canvasSize"
            ></canvas>
            <pre>{{ board }}</pre>
        </div>
    </div>
</template>

<script>
import {
    computed,
    defineComponent,
    onMounted,
    reactive,
    toRefs,
    watchEffect,
} from "vue";
import { useGame } from "@/modules/game";

export default defineComponent({
    setup() {
        const gameRef = useGame();
        // gameRef.nextStep();

        onMounted(() => {
            state.boardContext = state.boardCanvas.getContext("2d");
        });

        const state = reactive({
            board: computed(() => gameRef.board),
            unitSize: 10,
            boardCanvas: null,
            boardContext: null,
        });

        const getMatrixFromBoardState = (board) => {
            return board.state
                .match(new RegExp(`.{1,${board.width}}`, "g"))
                .map((_) => _.split("").map((_) => Number(_)));
        };

        watchEffect(() => {
            const boardContext = state.boardContext;
            const board = state.board?.value;
            const unitSize = state.unitSize;
            const canvasSize = board.width * unitSize;

            if (!boardContext) return;
            const matrix = getMatrixFromBoardState(board);

            boardContext.clearRect(0, 0, canvasSize, canvasSize);
            boardContext.fillStyle = "black";

            for (let i = 0; i < board.width; i++) {
                for (let j = 0; j < board.width; j++) {
                    let color = matrix[i][j] === 1 ? "black" : "white";

                    boardContext.beginPath();
                    boardContext.fillStyle = color;
                    boardContext.rect(
                        i * unitSize,
                        j * unitSize,
                        unitSize,
                        unitSize
                    );
                    boardContext.fill();
                }
            }
        });

        return {
            ...toRefs(state),
        };
    },
});
</script>

<style lang="scss" scoped></style>
