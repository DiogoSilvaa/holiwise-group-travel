import { useMediaQuery } from "@react-hookz/web";

export const useXlViewport = () => ({ isXl: useMediaQuery("(min-width: 1280px)") });
