import { apiPost } from "@/utils/fetch";
import { reactive, toRefs } from "vue";

const state = reactive({
    board: {
        width: 50,
        // state: "00000000000000000A0000000A0000AAA0000000000000000",
        // state: `00000000000000A000000000000A000000000AAA0000000000000000000000000000000000000000000000000000000000000000BBB000000000B000000000000B00000000000000`,
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

    const generateRandomBoard = (
        teamsAmount = 1,
        width = 20,
        population = 3
    ) => {
        state.board.width = width;
        const board = [];
        const teams = [...Array(Number(teamsAmount)).keys()].map((_) =>
            String.fromCharCode(_ + 65)
        );

        for (let j = 0; j < width; j++) {
            board[j] = [];
            for (let i = 0; i < width; i++) {
                const living = Math.ceil(Math.random() * population) === 1;
                const [team] = teams.sort(() => Math.random() - 0.5);
                board[j][i] = living ? team : "0";
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
