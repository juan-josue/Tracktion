import { createTheme } from '@mui/material';

const theme = createTheme({
	priority: {
		high: '#AFEB7F',
		medium: '#AFEB7F',
		low: '#AFEB7F',
	},
	palette: {
		mode: 'dark',
		primary: {
			main: '#382e7a',
		},
		secondary: {
			main: '#e0def2',
		},
		accent: {
			main: '#826b9e',
		},
		typography: {
			dark: '#16151A',
			main: '#e0def2',
		},
		bg: {
			main: '#0E0D12',
			light: '#15131B'
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
		accent: Palette['primary'];
	}

	interface PaletteOptions {
		typography: PaletteOptions['primary'];
		bg: PaletteOptions['primary'];
		accent: PaletteOptions['primary'];
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
