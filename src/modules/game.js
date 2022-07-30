import { apiPost } from "@/utils/fetch";
import { reactive, toRefs } from "vue";

const state = reactive({
    board: {
        width: 12,
        // state: "00000000000000000A0000000A0000AAA0000000000000000",
        // state: `00000000000000A000000000000A000000000AAA0000000000000000000000000000000000000000000000000000000000000000BBB000000000B000000000000B00000000000000`,
        state: `000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
        teams: ["A", "B", "C"],
    },
    draw: {
        team: "A",
    },
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
        population = 10
    ) => {
        const board = [];
        const teams = [...Array(teamsAmount).keys()].map((_) =>
            String.fromCharCode(_ + 65)
        );

        for (let j = 0; j < width; j++) {
            board[j] = [];
            for (let i = 0; i < width; i++) {
                const living = Math.floor(Math.random() * population) === 0;
                const [team] = teams.sort(() => Math.random() - 0.5);
                board[j][i] = living ? team : "0";
            }
        }
        state.board.width = width;
        console.log(board);
        state.board.state = board.join("");
    };

    const setDrawTeam = (team) => {
        state.draw.team = team;
    };

    return {
        ...toRefs(state),
        nextStep,
        generateRandomBoard,
        setDrawTeam,
    };
}
