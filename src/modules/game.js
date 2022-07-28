import { apiPost } from "@/utils/fetch";
import { reactive, toRefs } from "vue";

const state = reactive({
    board: {
        width: 3,
        state: "100010000",
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

    return {
        ...toRefs(state),
        nextStep,
    };
}
