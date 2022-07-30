<template>
    <div class="game-board">
        <h1>Game Board</h1>
        <div>
            <canvas
                @click="drawHandler"
                ref="boardCanvas"
                :width="canvasSize"
                :height="canvasSize"
            ></canvas>
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
        // gameRef.generateRandomBoard(2, 50, 0);
        const colors = { A: "cyan", B: "red", C: "blue" };

        onMounted(() => {
            state.boardContext = state.boardCanvas.getContext("2d");
        });

        const state = reactive({
            board: computed(() => gameRef.board),
            draw: computed(() => gameRef.draw),
            unitSize: 50,
            boardCanvas: null,
            boardContext: null,
        });

        state.canvasSize = state.board.value.width * state.unitSize;

        const getMatrixFromBoardState = (board) => {
            return board.state
                .match(new RegExp(`.{1,${board.width}}`, "g"))
                .map((_) => _.split(""));
        };

        watchEffect(() => {
            const boardContext = state.boardContext;
            const board = state.board?.value;
            const unitSize = state.unitSize;
            const canvasSize = board.width * unitSize;

            if (!boardContext) return;
            const matrix = getMatrixFromBoardState(board);

            boardContext.clearRect(0, 0, canvasSize, canvasSize);

            for (let j = 0; j < board.width; j++) {
                for (let i = 0; i < board.width; i++) {
                    let color = colors[matrix[j][i]] || "black";

                    boardContext.beginPath();
                    boardContext.fillStyle = color;
                    boardContext.rect(
                        i * unitSize,
                        j * unitSize,
                        unitSize,
                        unitSize
                    );
                    boardContext.fill();
                    boardContext.fillStyle = "white";
                    boardContext.font = "15px Arial";
                    boardContext.fillText(
                        `${i},${j}`,
                        i * unitSize + 5,
                        j * unitSize + 25
                    );
                }
            }
        });

        const drawHandler = (e) => {
            const x = e.clientX - state.boardCanvas.offsetLeft;
            const y = e.clientY - state.boardCanvas.offsetTop;
            const unitX = Math.floor(x / state.unitSize);
            const unitY = Math.floor(y / state.unitSize);
            const matrix = getMatrixFromBoardState(state.board.value);
            console.log(matrix);
            matrix[unitY][unitX] = state.draw.value.team;
            state.board.value.state = matrix.flat().join("");
        };

        return {
            ...toRefs(state),
            drawHandler,
        };
    },
});
</script>

<style scoped>
canvas {
    width: 600px;
    height: 600px;
    cursor: crosshair;
}
</style>
