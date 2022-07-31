<template>
    <div class="game-board">
        <h1>Game Board</h1>
        <div>
            <canvas
                @click="drawHandler"
                ref="boardCanvas"
                :width="`${canvasSize}`"
                :height="`${canvasSize}`"
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
    watch,
} from "vue";
import { useGame } from "@/modules/game";
import { useCanvas } from "@/modules/canvas";

export default defineComponent({
    setup() {
        const size = 50;
        const gameRef = useGame();
        const canvasRef = useCanvas();

        onMounted(() => {
            canvasRef.init(state.boardCanvas, size);
            canvasRef.context = state.boardCanvas.getContext("2d");
            requestAnimationFrame(updateCanvas);
        });

        const state = reactive({
            board: computed(() => gameRef.board),
            draw: computed(() => gameRef.draw),
            showText: computed(() => gameRef.showText),
            canvasSize: computed(() => canvasRef.width.value),
            boardCanvas: null,
        });

        const updateCanvas = () => {
            if (!canvasRef.initialized.value) return;
            const board = state.board?.value;

            const matrix = gameRef.getMatrixFromBoardState();

            for (let j = 0; j < board.width; j++) {
                for (let i = 0; i < board.width; i++) {
                    canvasRef.putCell(i, j, matrix[j][i], state.showText.value);
                }
            }
        };

        watch(() => state.board.value.state, updateCanvas);

        const drawHandler = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            const { cellX, cellY } = canvasRef.getCellFromPoint(x, y);
            gameRef.updateCell(cellX, cellY);
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
    cursor: crosshair;
    width: 600px;
    aspect-ratio: 1;
}
</style>
