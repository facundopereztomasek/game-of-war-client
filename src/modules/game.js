import { apiPost } from "@/utils/fetch";
import { reactive, toRefs } from "vue";

const state = reactive({
    board: {
        width: 50,
        state: "0".repeat(50 * 50),
        teams: "ABCDEFGHIJ".split(""),
    },
    draw: {
        team: "A",
    },
    showText: false,
});

export function useGame() {
    const nextStep = () => {
        return apiPost({ url: "/step", data: { board: state.board } }).then(
            ({ data }) => {
                state.board = data.board;
            }
        );
    };

    const _randomCell = (teamsAmount, population) => {
        const teams = [...Array(Number(teamsAmount)).keys()].map((_) =>
            String.fromCharCode(_ + 65)
        );

        const living = Math.ceil(Math.random() * population) === 1;
        const [team] = teams.sort(() => Math.random() - 0.5);
        return living ? team : "0";
    };

    const _neighborsFree = (board, x, y, team) => {
        const padding = 2;
        const sliceFromY = Math.max(y - padding, 0);
        const sliceFromX = Math.max(x - padding, 0);
        const sliceToY = Math.min(y + 1 + padding, board.length);
        const sliceToX = Math.min(x + 1 + padding, board[0].length);

        const focusedMatrix = board
            .slice(sliceFromY, sliceToY)
            .map((row) => row.slice(sliceFromX, sliceToX))
            .flat();

        const noNeighbors =
            focusedMatrix.find((cell) => cell !== team && cell !== "0") ===
            undefined;
        console.log(focusedMatrix, noNeighbors);

        return noNeighbors;
    };

    const generateRandomBoard = (
        teamsAmount = 1,
        width = 50,
        population = 1
    ) => {
        state.board.width = width;
        const board = [];

        for (let j = 0; j < width; j++) {
            board[j] = [];
            for (let i = 0; i < width; i++) {
                const newCell = _randomCell(teamsAmount, population);
                board[j][i] = _neighborsFree(board, i, j, newCell)
                    ? newCell
                    : "0";
            }
        }
        state.board.width = width;
        state.board.state = board.flat().join("");
    };

    const setDrawTeam = (team) => {
        state.draw.team = team;
    };

    const getMatrixFromBoardState = () => {
        return state.board.state
            .match(new RegExp(`.{1,${state.board.width}}`, "g"))
            .map((_) => _.split(""));
    };

    const updateCell = (cellX, cellY) => {
        const matrix = getMatrixFromBoardState();
        matrix[cellY][cellX] = state.draw.team;
        state.board.state = matrix.flat().join("");
    };

    return {
        ...toRefs(state),
        nextStep,
        generateRandomBoard,
        setDrawTeam,
        getMatrixFromBoardState,
        updateCell,
    };
}
