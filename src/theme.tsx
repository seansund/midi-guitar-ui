'use client';

import {Geist} from "next/font/google";
import {createTheme} from '@mui/material/styles';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const theme = createTheme({
    colorSchemes: {light: true, dark: true},
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    typography: {
        fontFamily: geistSans.style.fontFamily,
    },
});

export default theme;
