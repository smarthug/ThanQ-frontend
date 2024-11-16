import { createTheme } from "@mui/material";

// export const theme = createTheme({
//     palette: {
//         primary: {
//             main: "#ff5722",
//         },
//         secondary: {
//             main: "#CDDC39",
//         },
//     },
// });




// export const theme = createTheme({
//     palette: {
//         gradient: {
//             main: "linear-gradient(-39deg, #4991f8 0%, #4bc1ff 100%)",
//             mainChannel: "0 0 0",
//             light: "linear-gradient(135deg, #4aaffd 0%, #4992f8 100%)",
//             lightChannel: "0 0 0",
//             dark: "linear-gradient(135deg, #4cc2ff 0%, #4aa0fa 100%)",
//             darkChannel: "0 0 0",
//             contrastText: "#fff",
//             contrastTextChannel: "0 0 0"
//         }
//     }
// });



// export const theme = createTheme({
//     palette: {
//         gradient: {
//             main: "linear-gradient(-39deg, #4caf50 0%, #66bb6a 100%)", // 녹색 그라데이션
//             mainChannel: "0 0 0",
//             light: "linear-gradient(135deg, #81c784 0%, #66bb6a 100%)", // 밝은 녹색 그라데이션
//             lightChannel: "0 0 0",
//             dark: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)", // 어두운 녹색 그라데이션
//             darkChannel: "0 0 0",
//             contrastText: "#fff", // 대비 텍스트 색상 (흰색 유지)
//             contrastTextChannel: "0 0 0"
//         }
//     }
// });

export const theme = createTheme({
    palette: {
        gradient: {
            main: "linear-gradient(-39deg, #00FFB0 0%, #66FFD2 100%)", // 매우 밝고 생생한 메인 그라데이션
            mainChannel: "0 255 176",
            light: "linear-gradient(135deg, #A0FFE4 0%, #80FFD4 100%)", // 더 밝고 부드러운 그라데이션
            lightChannel: "160 255 228",
            dark: "linear-gradient(135deg, #00E3A0 0%, #00C78B 100%)", // 상대적으로 어두운 톤 추가
            darkChannel: "0 227 160",
            contrastText: "#000", // 대비 텍스트 색상 (밝은 배경에 어두운 텍스트)
            contrastTextChannel: "0 0 0"
        }
    }
});
