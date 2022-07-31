import { reactive, toRefs } from "vue";

const state = reactive({
    width: null,
    height: null,
    top: null,
    left: null,
    context: null,
    size: null,
    initialized: false,
});

export function useCanvas() {
    const colors = {
        A: "#E8A49C",
        B: "#3C4CAD",
        C: "#240E8B",
        D: "#F04393",
        E: "#F9C449",
        F: "#581845",
        G: "#900C3F",
        H: "#C70039",
        I: "#FF5733",
        J: "#FFC300",
    };

    const init = (element, size) => {
        state.context = element.getContext("2d");
        state.left = element.offsetLeft;
        state.top = element.offsetTop;
        state.width = element.clientWidth;
        state.height = element.clientHeight;
        state.size = size;
        state.initialized = true;
    };

    const updateCanvasSize = (size) => {
        state.size = size;
    };

    const putCell = (x, y, team, text = false) => {
        if (!state.context) return;
        let color = colors[team] || "#111111";
        const context = state.context;
        const resolution = state.width / state.size;
        context.beginPath();
        context.fillStyle = color;
        context.rect(x * resolution, y * resolution, resolution, resolution);
        context.fill();

        if (text) {
            context.fillStyle = "white";
            context.font = "15px Arial";
            context.fillText(
                `${x},${y}`,
                x * resolution + 5,
                y * resolution + 25
            );
        }
    };

    const getCellFromPoint = (x, y) => {
        const [dx, dy] = [x - state.left, y - state.top];
        return {
            cellX: Math.floor((dx * state.size) / state.width),
            cellY: Math.floor((dy * state.size) / state.height),
        };
    };

    return {
        ...toRefs(state),
        putCell,
        init,
        updateCanvasSize,
        getCellFromPoint,
    };
}
