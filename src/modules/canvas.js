import { reactive, toRefs } from "vue";

const state = reactive({
    width: null,
    height: null,
    top: null,
    left: null,
    context: null,
    cellWidth: null,
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

    const init = (element, cellWidth, cellsByRow) => {
        const setParams = () => {
            state.cellWidth = cellWidth;
            state.context = element.getContext("2d");
            state.left = element.offsetLeft;
            state.top = element.offsetTop;
            state.width = element.clientWidth;
            state.height = element.clientHeight;
            state.size = cellWidth * cellsByRow;
            state.initialized = true;
        };

        document.body.onresize = setParams;
        setParams();
    };

    const updateCellWidth = (width) => (state.cellWidth = state.size / width);

    const putCell = (x, y, team, text = false) => {
        if (!state.context) return;
        let color = colors[team] || "#111111";
        const context = state.context;
        const cellWidth = state.cellWidth;

        context.beginPath();
        context.fillStyle = color;
        context.rect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
        context.fill();

        if (text) {
            context.fillStyle = "white";
            context.font = "15px Arial";
            context.fillText(
                `${x},${y}`,
                x * cellWidth + 5,
                y * cellWidth + 25
            );
        }
    };

    const getCellFromPoint = (x, y) => {
        const dx = state.width / state.cellWidth;
        const dy = state.height / state.cellWidth;
        return {
            cellX: Math.floor((x - state.left) / dx),
            cellY: Math.floor((y - state.top) / dy),
        };
    };

    return {
        ...toRefs(state),
        putCell,
        init,
        updateCellWidth,
        getCellFromPoint,
    };
}
