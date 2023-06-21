// theme.js

import { deepMerge } from "grommet/utils";

const customTheme = {
    global: {
        font: {
            family: "Arial, sans-serif",
            size: "14px",
        },
        colors: {
            brand: "#0077FF",
        },
    },
};
export default deepMerge(customTheme);
