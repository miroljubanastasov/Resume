import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Box, Chip, CircularProgress, Fab, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import TranslateIcon from '@mui/icons-material/Translate';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import resumeDataEn from './data/resume.json';
import resumeDataDe from './data/resume.de.json';

const DATA_BY_LOCALE = {
    en: resumeDataEn,
    de: resumeDataDe,
};

const UI_STRINGS = {
    en: {
        workExperience: 'Work experience',
        education: 'Education & Certificates',
        languages: 'Languages',
        responsibilities: 'Responsibilities',
        notableProjects: 'Notable projects',
        achievements: 'Achievements',
        categories: {
            Software: 'Software',
            Professional: 'Professional',
            Strengths: 'Strengths',
        },
        downloadPdf: 'Download PDF',
    },
    de: {
        workExperience: 'Berufserfahrung',
        education: 'Ausbildung & Zertifikate',
        languages: 'Sprachen',
        responsibilities: 'Aufgaben',
        notableProjects: 'Wichtige Projekte',
        achievements: 'Erfolge',
        categories: {
            Software: 'Software',
            Professional: 'Fachlich',
            Strengths: 'Stärken',
        },
        downloadPdf: 'PDF herunterladen',
    },
};

const CATEGORY_ICONS = {
    Software: <BuildIcon sx={{ fontSize: 16 }} />,
    Professional: <WorkIcon sx={{ fontSize: 16 }} />,
    Strengths: <EmojiEventsIcon sx={{ fontSize: 16 }} />,
};

const PRINT_COLOR = {
    WebkitPrintColorAdjust: 'exact',
    printColorAdjust: 'exact',
};

/* ---------------- Shared atoms ---------------- */

function SectionTitle({ icon, children, dark }) {
    return (
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.5 }}>
            <Box
                sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'accent.main',
                    color: 'accent.contrastText',
                }}
            >
                {icon}
            </Box>
            <Typography
                variant="overline"
                sx={{
                    color: dark ? 'hero.fg' : 'text.primary',
                    fontSize: '0.82rem',
                }}
            >
                {children}
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    height: '1px',
                    bgcolor: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
                }}
            />
        </Stack>
    );
}

function ContactRow({ icon, value, dark }) {
    if (!value) return null;
    return (
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 0.6 }}>
            <Box sx={{ color: 'accent.main', display: 'flex', alignItems: 'center' }}>{icon}</Box>
            <Typography
                variant="body2"
                sx={{
                    color: dark ? 'hero.fgMuted' : 'text.primary',
                    fontSize: '0.82rem',
                    wordBreak: 'break-word',
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
}

function TimelineSubsection({ label, children }) {
    return (
        <Box sx={{ mt: 1 }}>
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: 'accent.soft',
                    fontSize: '0.68rem',
                    mb: 0.3,
                }}
            >
                {label}
            </Typography>
            {children}
        </Box>
    );
}

function TimelineItem({ period, title, subtitle, location, responsibilities, notableProjects, achievements, labels }) {
    const hasProjects = notableProjects && notableProjects.length > 0;
    const hasAchievements = achievements && achievements.length > 0;
    const hasRightColumn = hasProjects || hasAchievements;
    return (
        <Box className="avoid-break" sx={{ position: 'relative', pl: 3, pb: 2.5, breakInside: 'avoid' }}>
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 6,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: 'accent.main',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    left: 4,
                    top: 18,
                    bottom: 0,
                    width: '2px',
                    bgcolor: 'rgba(0,0,0,0.1)',
                }}
            />
            <Typography
                variant="caption"
                sx={{ color: 'accent.soft', fontWeight: 800, letterSpacing: 1.5 }}
            >
                {period}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'accent.soft', mb: 0.5 }}>
                {subtitle}
                {location && (
                    <Box component="span" sx={{ ml: 1 }}>
                        · {location}
                    </Box>
                )}
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: hasRightColumn ? '1fr 1fr' : '1fr',
                    },
                    columnGap: 3,
                    '@media print': {
                        gridTemplateColumns: hasRightColumn ? '1fr 1fr' : '1fr',
                    },
                }}
            >
                <Box>
                    {responsibilities && (
                        <TimelineSubsection label={labels?.responsibilities ?? 'Responsibilities'}>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                                {responsibilities}
                            </Typography>
                        </TimelineSubsection>
                    )}
                </Box>
                {hasRightColumn && (
                    <Box>
                        {hasProjects && (
                            <TimelineSubsection label={labels?.notableProjects ?? 'Notable projects'}>
                                <Box
                                    component="ul"
                                    sx={{ pl: 2.5, m: 0, '& li': { fontSize: '0.875rem', lineHeight: 1.5 } }}
                                >
                                    {notableProjects.map((p, i) => (
                                        <li key={i}>{p}</li>
                                    ))}
                                </Box>
                            </TimelineSubsection>
                        )}
                        {hasAchievements && (
                            <TimelineSubsection label={labels?.achievements ?? 'Achievements'}>
                                <Box
                                    component="ul"
                                    sx={{ pl: 2.5, m: 0, '& li': { fontSize: '0.875rem', lineHeight: 1.5 } }}
                                >
                                    {achievements.map((a, i) => (
                                        <li key={i}>{a}</li>
                                    ))}
                                </Box>
                            </TimelineSubsection>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

function EducationItem({ period, title, subtitle, location, description }) {
    return (
        <Box className="avoid-break" sx={{ position: 'relative', pl: 3, pb: 2.5, breakInside: 'avoid' }}>
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 6,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: 'accent.main',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    left: 4,
                    top: 18,
                    bottom: 0,
                    width: '2px',
                    bgcolor: 'rgba(0,0,0,0.1)',
                }}
            />
            <Typography
                variant="caption"
                sx={{ color: 'accent.soft', fontWeight: 800, letterSpacing: 1.5 }}
            >
                {period}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'accent.soft', mb: 0.5 }}>
                {subtitle}
                {location && (
                    <Box component="span" sx={{ ml: 1 }}>
                        · {location}
                    </Box>
                )}
            </Typography>
            {description && (
                <Typography variant="body2" sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                    {description}
                </Typography>
            )}
        </Box>
    );
}

function SkillBar({ label, level }) {
    return (
        <Box sx={{ mb: 1.1 }}>
            <Typography variant="body2" sx={{ fontSize: '0.82rem', mb: 0.5 }}>
                {label}
            </Typography>
            <Stack direction="row" spacing={0.5}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 1,
                            bgcolor: i <= level ? 'accent.main' : 'rgba(0,0,0,0.1)',
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
}

function SkillCategory({ category, items, label }) {
    const hasLevels = items.some((i) => typeof i.level === 'number');
    return (
        <Box sx={{ mb: 2.5, minWidth: 0, width: '100%', overflow: 'hidden' }}>
            <SectionTitle icon={CATEGORY_ICONS[category] ?? <BuildIcon sx={{ fontSize: 16 }} />}>
                {label ?? category}
            </SectionTitle>
            {hasLevels ? (
                items.map((it) => <SkillBar key={it.name} label={it.name} level={it.level ?? 0} />)
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, width: '100%' }}>
                    {items.map((it) => (
                        <Chip key={it.name} label={it.name} />
                    ))}
                </Box>
            )}
        </Box>
    );
}

function LanguageRow({ label, level, cefr }) {
    return (
        <Box sx={{ mb: 1.4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontSize: '0.82rem' }}>
                    {label}
                </Typography>
                <Chip
                    label={cefr}
                    sx={{
                        height: 18,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        justifySelf: 'end',
                    }}
                />
            </Box>
            <Stack direction="row" spacing={0.5}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 1,
                            bgcolor: i <= level ? 'accent.main' : 'rgba(0,0,0,0.1)',
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
}

/* ---------------- Page ---------------- */

export default function ResumePage({ data }) {
    const [locale, setLocale] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = window.localStorage.getItem('resume.locale');
            if (saved && DATA_BY_LOCALE[saved]) return saved;
        }
        return 'en';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('resume.locale', locale);
            document.documentElement.lang = locale;
        }
    }, [locale]);

    const activeData = data ?? DATA_BY_LOCALE[locale] ?? resumeDataEn;
    const t = UI_STRINGS[locale] ?? UI_STRINGS.en;

    const { personal, languages, skills, experience, education } = activeData;
    const { contact } = personal;

    const theme = useTheme();
    const L = theme.resume.layout;
    const photoUrl = personal.photo
        ? `${import.meta.env.BASE_URL}${personal.photo}`
        : null;

    const [pdfBusy, setPdfBusy] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState(null);
    const qrTarget = contact?.website;

    useEffect(() => {
        if (!qrTarget) return;
        let cancelled = false;
        QRCode.toDataURL(qrTarget, {
            errorCorrectionLevel: 'M',
            margin: 1,
            width: 240,
            color: { dark: '#FFFFFF', light: '#000000' },
        })
            .then((url) => {
                if (!cancelled) setQrDataUrl(url);
            })
            .catch((err) => console.error('QR generation failed', err));
        return () => {
            cancelled = true;
        };
    }, [qrTarget]);

    const handleDownloadPdf = async () => {
        if (pdfBusy) return;
        setPdfBusy(true);
        try {
            const { exportResumePdf } = await import('./pdf/exportResumePdf.jsx');
            await exportResumePdf({
                data: activeData,
                theme,
                photoUrl,
                qrDataUrl,
                strings: {
                    ...t,
                    pageOf:
                        locale === 'de'
                            ? (n, total) => `Seite ${n} von ${total}`
                            : (n, total) => `Page ${n} of ${total}`,
                },
                locale,
            });
        } catch (err) {
            console.error('PDF export failed', err);
        } finally {
            setPdfBusy(false);
        }
    };

    return (
        <Box
            sx={{
                bgcolor: 'band.page',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Language selector (hidden in print) */}
            <Box
                className="no-print"
                sx={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 1300,
                }}
            >
                <ToggleButtonGroup
                    value={locale}
                    exclusive
                    size="small"
                    onChange={(_, next) => next && setLocale(next)}
                    aria-label="language"
                    sx={{
                        bgcolor: 'rgba(0,0,0,0.55)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: 999,
                        '& .MuiToggleButton-root': {
                            color: 'rgba(255,255,255,0.75)',
                            border: 'none',
                            px: 1.6,
                            py: 0.4,
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            letterSpacing: 1.2,
                            borderRadius: 999,
                            '&.Mui-selected': {
                                bgcolor: 'accent.main',
                                color: 'accent.contrastText',
                                '&:hover': { bgcolor: 'accent.main' },
                            },
                        },
                    }}
                >
                    <ToggleButton value="en" aria-label="English">EN</ToggleButton>
                    <ToggleButton value="de" aria-label="Deutsch">DE</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {/* ============ HERO (full-bleed) ============ */}
            <Box
                sx={{
                    bgcolor: 'hero.bg',
                    color: 'hero.fg',
                    width: '100%',
                    '@media print': PRINT_COLOR,
                }}
            >
                <Box
                    className="print-hero"
                    sx={{
                        maxWidth: L.contentMaxWidth,
                        mx: 'auto',
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1.15fr 1fr' },
                        minHeight: L.heroMinHeight,
                        '@media print': { gridTemplateColumns: '1.15fr 1fr', minHeight: 0 },
                    }}
                >
                    {/* Hero LEFT: info on black */}
                    <Box
                        sx={{
                            p: { xs: 4, sm: 6, md: 8 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{ color: 'accent.main', letterSpacing: 4, fontSize: '0.78rem' }}
                        >
                            {personal.title}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                color: 'hero.fg',
                                mt: 1,
                                mb: 2.5,
                                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.4rem' },
                            }}
                        >
                            {personal.fullName}
                        </Typography>

                        <Box
                            sx={{
                                width: L.sectionRuleWidth,
                                height: L.sectionRuleHeight,
                                bgcolor: 'accent.main',
                                mb: 2.5,
                            }}
                        />

                        <Typography
                            sx={{
                                color: 'hero.fgMuted',
                                lineHeight: 1.5,
                                mb: 3,
                                fontSize: { xs: '0.9rem', md: '0.98rem' },
                                maxWidth: 560,
                            }}
                        >
                            {personal.summary}
                        </Typography>

                        <Stack spacing={0.4}>
                            <ContactRow icon={<PhoneIcon fontSize="small" />} value={contact.phone} dark />
                            <ContactRow icon={<EmailIcon fontSize="small" />} value={contact.email} dark />
                            <ContactRow icon={<LocationOnIcon fontSize="small" />} value={contact.address} dark />
                            <ContactRow icon={<LanguageIcon fontSize="small" />} value={contact.website} dark />
                            <ContactRow icon={<LinkedInIcon fontSize="small" />} value={contact.linkedin} dark />
                            <ContactRow icon={<CakeIcon fontSize="small" />} value={contact.dateOfBirth} dark />
                        </Stack>
                    </Box>

                    {/* Hero RIGHT: photo */}
                    <Box
                        className="print-hero-photo"
                        sx={{
                            position: 'relative',
                            minHeight: { xs: 320, sm: 'auto' },
                            backgroundImage: photoUrl ? `url("${photoUrl}")` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center top',
                            backgroundRepeat: 'no-repeat',
                            bgcolor: 'hero.photoBg',
                            '@media print': { ...PRINT_COLOR, minHeight: 0 },
                        }}
                    >
                        {qrDataUrl && (
                            <Tooltip title={qrTarget} placement="left">
                                <Box
                                    component="a"
                                    href={qrTarget}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'none',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={qrDataUrl}
                                        alt="QR code linking to online CV"
                                        sx={{ width: '100%', height: '100%', display: 'block' }}
                                    />
                                </Box>
                            </Tooltip>
                        )}
                        {!photoUrl && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'rgba(255,255,255,0.3)',
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 140 }} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* ============ SKILLS + LANGUAGES band ============ */}
            <Box sx={{ bgcolor: 'band.light', width: '100%', '@media print': PRINT_COLOR }}>
                <Box
                    className="print-band"
                    sx={{
                        maxWidth: L.contentMaxWidth,
                        mx: 'auto',
                        px: L.bandPadX,
                        py: L.bandPadY,
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, minmax(0, 1fr))',
                            md: 'repeat(4, minmax(0, 1fr))',
                        },
                        gap: { xs: 3, md: 4 },
                        '@media print': { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24, py: 24 },
                    }}
                >
                    {skills?.map((group) => (
                        <SkillCategory
                            key={group.category}
                            category={group.category}
                            items={group.items}
                            label={t.categories[group.category] ?? group.category}
                        />
                    ))}
                    {languages && languages.length > 0 && (
                        <Box sx={{ minWidth: 0 }}>
                            <SectionTitle icon={<TranslateIcon sx={{ fontSize: 16 }} />}>
                                {t.languages}
                            </SectionTitle>
                            {languages.map((l) => (
                                <LanguageRow key={l.name} label={l.name} level={l.level} cefr={l.cefr} />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>

            {/* ============ EXPERIENCE + EDUCATION band ============ */}
            <Box sx={{ bgcolor: 'band.page', width: '100%' }}>
                <Box
                    className="print-band"
                    sx={{
                        maxWidth: L.contentMaxWidth,
                        mx: 'auto',
                        px: L.bandPadX,
                        py: L.bandPadY,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 4, md: 5 },
                        '@media print': { gap: 24, py: 24 },
                    }}
                >
                    <Box>
                        <SectionTitle icon={<WorkIcon sx={{ fontSize: 16 }} />}>{t.workExperience}</SectionTitle>
                        {experience.map((e, idx) => (
                            <TimelineItem
                                key={idx}
                                period={e.period}
                                title={e.title}
                                subtitle={e.organization}
                                location={e.location}
                                responsibilities={e.responsibilities}
                                notableProjects={e.notableProjects}
                                achievements={e.achievements}
                                labels={t}
                            />
                        ))}
                    </Box>

                    <Box>
                        <SectionTitle icon={<SchoolIcon sx={{ fontSize: 16 }} />}>
                            {t.education}
                        </SectionTitle>
                        {education.map((e, idx) => (
                            <EducationItem
                                key={idx}
                                period={e.period}
                                title={e.title}
                                subtitle={e.organization}
                                location={e.location}
                                description={e.description}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Floating action buttons (hidden in print) */}
            <Stack
                className="no-print"
                direction="column"
                spacing={1.5}
                sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
            >
                <Tooltip title={t.downloadPdf} placement="left">
                    <Fab
                        color="primary"
                        aria-label="download pdf"
                        onClick={handleDownloadPdf}
                        disabled={pdfBusy}
                    >
                        {pdfBusy ? (
                            <CircularProgress size={22} sx={{ color: 'accent.contrastText' }} />
                        ) : (
                            <PictureAsPdfIcon />
                        )}
                    </Fab>
                </Tooltip>

            </Stack>
        </Box>
    );
}
