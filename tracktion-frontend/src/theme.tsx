import { createTheme } from '@mui/material';


const theme = createTheme({
	priority: {
		high: '#AFEB7F',
		medium: '#AFEB7F',
		low: '#AFEB7F',
	},
	palette: {
		primary: {
			main: '#AFEB7F',
		},
		secondary: {
			main: '#926FB6',
		},
		typography: {
			dark: '#16151A',
			main: '#FFFFFF',
			light: '#8d8c8a',
		},
		bg: {
			dark: '#16151A',
			main: '#1A191D',
			light: '#2F2D36',
			lighter: '#4A4854',
			contrastText: '#FFFFFF',
		},
	},
});

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: React.CSSProperties['color'];
		};
	}

	interface Palette {
		typography: Palette['primary'];
		bg: Palette['primary'];
	}

	interface PaletteOptions {
		typography: PaletteOptions['primary'];
		bg: PaletteOptions['primary'];
	}

	interface PaletteColor {
		lighter?: string;
	}

	interface SimplePaletteColorOptions {
		lighter?: string;
	}

	interface ThemeOptions {
		priority: {
			high: React.CSSProperties['color'];
			medium: React.CSSProperties['color'];
			low: React.CSSProperties['color'];
		};
	}
}

export default theme;