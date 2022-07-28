<template>
    <div>
        <GameBoard />
        <GameControls />
    </div>
</template>

<script>
import GameBoard from "./components/GameBoard.vue";
import GameControls from "./components/GameControls.vue";

export default {
    name: "App",
    components: {
        GameBoard,
        GameControls,
    },
};
</script>

<style></style>
