<template>
    <div class="game-controls">
        <h1>Game Controls</h1>
        <button @click="nextStepHandler">Próximo paso</button>
        <button @click="teamAHandler">Dibujar Equipo A</button>
        <button @click="teamBHandler">Dibujar Equipo B</button>
        <button @click="teamCHandler">Dibujar Equipo C</button>
        <button @click="team0Handler">Borrar</button>
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

        return {
            ...toRefs(state),
            nextStepHandler,
            teamAHandler,
            teamBHandler,
            team0Handler,
            teamCHandler,
        };
    },
});
</script>

<style lang="scss" scoped></style>
