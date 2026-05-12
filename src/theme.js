import { createTheme } from '@mui/material/styles';

/**
 * Single source of truth for the resume's visual identity.
 *
 * - Custom palette slots live under `palette.resume.*` and `palette.hero.*`.
 * - Layout tokens (max width, paddings, accent line, etc.) live under
 *   `theme.resume.layout`.
 * - Component-level defaults are configured via `components` so MUI primitives
 *   (Chip, LinearProgress, Typography overline) inherit the look automatically.
 *
 * Adjust the values below to re-skin the whole CV.
 */

const palette = {
    hero: {
        bg: '#030303',
        fg: '#FFFFFF',
        fgMuted: 'rgba(255,255,255,0.78)',
        photoBg: '#0c0c0c',
    },
    accent: {
        main: '#4bc5c9', // warm gold
        contrastText: '#ffffff',
        soft: '#2b8b9c', // darker variant for period labels on light bg
    },
    band: {
        light: '#dadada', // skills/languages band
        page: '#FFFFFF', // experience/education band
    },
    text: {
        primary: '#1A1A1A',
        secondary: '#5a5a5a',
    },
};

const layout = {
    contentMaxWidth: 1200,
    heroMinHeight: { xs: 320, sm: 460 },
    bandPadY: { xs: 4, sm: 6 },
    bandPadX: { xs: 3, sm: 6, md: 8 },
    sectionRuleWidth: 64,
    sectionRuleHeight: 3,
    // Work experience is wider; adjust the ratio here to control proportions
    experienceEducationColumns: '1.5fr 1fr',
};

const theme = createTheme({
    typography: {
        fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
        h2: {
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.5px',
        },
        overline: {
            fontWeight: 800,
            letterSpacing: 3,
        },
    },
    palette: {
        primary: { main: palette.accent.main, contrastText: palette.accent.contrastText },
        secondary: { main: palette.hero.bg, contrastText: palette.hero.fg },
        text: palette.text,
        background: { default: palette.band.page },
        // Custom slots:
        hero: palette.hero,
        accent: palette.accent,
        band: palette.band,
    },
    resume: {
        layout,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: { margin: 0, backgroundColor: palette.band.page },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0,0,0,0.08)',
                },
                bar: { backgroundColor: palette.accent.main },
            },
        },
        MuiChip: {
            defaultProps: { size: 'small' },
            styleOverrides: {
                root: {
                    fontSize: '0.72rem',
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
