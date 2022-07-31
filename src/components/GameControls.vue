<template>
    <div class="game-controls">
        <h1>Game Controls</h1>
        <button @click="generateRandomBoardHandler">Generar</button>
        <input type="number" max="10" min="0" v-model="teams" />
        <input type="number" max="50" min="10" v-model="size" />
        <input type="number" max="3" min="1" v-model="population" />
        <button @click="nextStepHandler">Próximo paso</button>
        <button @click="teamAHandler">Dibujar Equipo A</button>
        <button @click="teamBHandler">Dibujar Equipo B</button>
        <button @click="teamCHandler">Dibujar Equipo C</button>
        <button @click="team0Handler">Borrar</button>
        <input type="checkbox" v-model="showText" />
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useGame } from "@/modules/game";
import { useCanvas } from "@/modules/canvas";

export default defineComponent({
    setup() {
        const gameRef = useGame();
        const canvasRef = useCanvas();

        const state = reactive({
            autorun: false,
            showText: false,
            teams: 3,
            size: 50,
            population: 1,
        });

        const generateRandomBoardHandler = () => {
            const { teams, size, population } = state;
            canvasRef.updateCanvasSize(size);

            gameRef.generateRandomBoard(teams, size, population);
        };
        const nextStepHandler = () => {
            gameRef.nextStep();
        };
        const teamAHandler = () => {
            gameRef.setDrawTeam("A");
        };
        const teamBHandler = () => {
            gameRef.setDrawTeam("B");
        };
        const teamCHandler = () => {
            gameRef.setDrawTeam("C");
        };
        const team0Handler = () => {
            gameRef.setDrawTeam("0");
        };

        watch(
            () => state.showText,
            () => {
                gameRef.showText.value = state.showText;
            }
        );

        return {
            ...toRefs(state),
            nextStepHandler,
            teamAHandler,
            generateRandomBoardHandler,
            teamBHandler,
            team0Handler,
            teamCHandler,
        };
    },
});
</script>

<style lang="scss" scoped></style>
