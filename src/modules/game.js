import { apiPost } from "@/utils/fetch";
import { reactive, toRefs } from "vue";

const state = reactive({
    board: {
        width: 8,
        state: "100010000110010100101101001000110000110101110100100011011010100111",
    },
});

export function useGame() {
    const encodeBoard = (board) => {
        console.log(board);
        const binaryBytes = board.match(/.{1,8}/g);
        const bytes = binaryBytes.map((_) => parseInt(_, 2));

        const text = bytes.map((_) => String.fromCharCode(_)).join("");
        const encodedBoard = window.btoa(text);
        return encodedBoard;
    };

    const decodeBoard = (encodedBoard) => {
        console.log(encodeBoard);
        const decoded = window.atob(encodedBoard);
        const binaryBytes2 = decoded.split("").map((_) => _.charCodeAt());
        const board = binaryBytes2
            .map((_) => _.toString(2).padStart(8, 0))
            .join("");

        return board;
    };

    const nextStep = () => {
        const board = {
            state: encodeBoard(state.board.state),
            width: state.board.width,
        };
        return apiPost({ url: "/step", data: { board } }).then(({ data }) => {
            console.log(decodeBoard(data.board.state));
            state.board = decodeBoard(data.board.state);
        });
    };

    return {
        ...toRefs(state),
        nextStep,
        encodeBoard,
        decodeBoard,
    };
}
