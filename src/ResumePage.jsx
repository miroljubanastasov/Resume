import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
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
import resumeData from './data/resume.json';

const HERO_BG = '#0F0F10';
const HERO_FG = '#FFFFFF';
const ACCENT = '#C9A24B'; // warm gold accent on black
const MUTED_BG = '#F4F4F2';
const TEXT_DARK = '#1A1A1A';

const CATEGORY_ICONS = {
    Software: <BuildIcon sx={{ fontSize: 16 }} />,
    Professional: <WorkIcon sx={{ fontSize: 16 }} />,
    Strengths: <EmojiEventsIcon sx={{ fontSize: 16 }} />,
};

/* ---------------- Shared atoms ---------------- */

function SectionTitle({ icon, children, dark }) {
    return (
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.5, mt: 0 }}>
            <Box
                sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: ACCENT,
                    color: '#000',
                }}
            >
                {icon}
            </Box>
            <Typography
                variant="overline"
                sx={{
                    fontWeight: 800,
                    letterSpacing: 3,
                    color: dark ? HERO_FG : TEXT_DARK,
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
            <Box
                sx={{
                    color: dark ? ACCENT : ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {icon}
            </Box>
            <Typography
                variant="body2"
                sx={{
                    color: dark ? 'rgba(255,255,255,0.9)' : TEXT_DARK,
                    fontSize: '0.82rem',
                    wordBreak: 'break-word',
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
}

function TimelineItem({ period, title, subtitle, location, bullets }) {
    return (
        <Box sx={{ position: 'relative', pl: 3, pb: 2.5, breakInside: 'avoid' }}>
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 6,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: ACCENT,
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
                sx={{ color: '#7a6224', fontWeight: 800, letterSpacing: 1.5 }}
            >
                {period}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                {subtitle}
                {location && (
                    <Box component="span" sx={{ ml: 1 }}>
                        · {location}
                    </Box>
                )}
            </Typography>
            {bullets && bullets.length > 0 && (
                <Box
                    component="ul"
                    sx={{ pl: 2.5, m: 0, '& li': { fontSize: '0.875rem', lineHeight: 1.5 } }}
                >
                    {bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                    ))}
                </Box>
            )}
        </Box>
    );
}

function SkillBar({ label, level }) {
    return (
        <Box sx={{ mb: 1.1 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                <Typography variant="body2" sx={{ color: TEXT_DARK, fontSize: '0.82rem' }}>
                    {label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {level}/5
                </Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={(level / 5) * 100}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'rgba(0,0,0,0.08)',
                    '& .MuiLinearProgress-bar': { bgcolor: ACCENT },
                }}
            />
        </Box>
    );
}

function SkillCategory({ category, items }) {
    const hasLevels = items.some((i) => typeof i.level === 'number');
    return (
        <Box sx={{ mb: 2.5 }}>
            <SectionTitle
                icon={CATEGORY_ICONS[category] ?? <BuildIcon sx={{ fontSize: 16 }} />}
            >
                {category}
            </SectionTitle>
            {hasLevels ? (
                items.map((it) => <SkillBar key={it.name} label={it.name} level={it.level ?? 0} />)
            ) : (
                <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {items.map((it) => (
                        <Chip
                            key={it.name}
                            label={it.name}
                            size="small"
                            sx={{
                                bgcolor: '#000',
                                color: HERO_FG,
                                fontSize: '0.72rem',
                                fontWeight: 600,
                            }}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
}

function LanguageRow({ label, level, cefr }) {
    return (
        <Box sx={{ mb: 1.1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: TEXT_DARK, fontSize: '0.82rem' }}>
                    {label}
                </Typography>
                <Chip
                    label={cefr}
                    size="small"
                    sx={{
                        bgcolor: '#000',
                        color: HERO_FG,
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                    }}
                />
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            flex: 1,
                            height: 4,
                            borderRadius: 1,
                            bgcolor: i <= level ? ACCENT : 'rgba(0,0,0,0.1)',
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
}

/* ---------------- Page ---------------- */

export default function ResumePage({ data = resumeData }) {
    const { personal, languages, skills, experience, education } = data;
    const { contact } = personal;

    return (
        <Box
            sx={{
                bgcolor: { xs: '#fff', sm: '#eceff1' },
                minHeight: '100vh',
                py: { xs: 0, sm: 4 },
                '@media print': { bgcolor: '#fff', py: 0 },
            }}
        >
            <Box
                className="cv-page"
                sx={{
                    width: { xs: '100%', sm: '210mm' },
                    minHeight: { sm: '297mm' },
                    mx: 'auto',
                    bgcolor: '#fff',
                    boxShadow: { xs: 'none', sm: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    '@media print': {
                        width: '210mm',
                        minHeight: '297mm',
                        boxShadow: 'none',
                    },
                }}
            >
                {/* ============ HERO ============ */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1.15fr 1fr' },
                        bgcolor: HERO_BG,
                        color: HERO_FG,
                        '@media print': {
                            WebkitPrintColorAdjust: 'exact',
                            printColorAdjust: 'exact',
                            gridTemplateColumns: '1.15fr 1fr',
                        },
                    }}
                >
                    {/* Hero LEFT: info on black */}
                    <Box sx={{ p: { xs: 3, sm: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: ACCENT,
                                letterSpacing: 4,
                                fontWeight: 700,
                                fontSize: '0.75rem',
                            }}
                        >
                            {personal.title}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.05,
                                letterSpacing: '-0.5px',
                                color: HERO_FG,
                                mt: 0.5,
                                mb: 2,
                                fontSize: { xs: '2rem', sm: '2.6rem' },
                            }}
                        >
                            {personal.fullName}
                        </Typography>

                        <Box
                            sx={{
                                width: 56,
                                height: 3,
                                bgcolor: ACCENT,
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(255,255,255,0.78)',
                                lineHeight: 1.65,
                                mb: 2.5,
                                fontSize: '0.85rem',
                            }}
                        >
                            {personal.summary}
                        </Typography>

                        <Stack spacing={0.2}>
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
                        sx={{
                            position: 'relative',
                            minHeight: { xs: 280, sm: 'auto' },
                            backgroundImage: personal.photo ? `url("${personal.photo}")` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center top',
                            backgroundRepeat: 'no-repeat',
                            bgcolor: '#222',
                            '@media print': {
                                WebkitPrintColorAdjust: 'exact',
                                printColorAdjust: 'exact',
                            },
                        }}
                    >
                        {!personal.photo && (
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
                                <PersonIcon sx={{ fontSize: 120 }} />
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* ============ BODY (two columns) ============ */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1.7fr' },
                        '@media print': { gridTemplateColumns: '1fr 1.7fr' },
                    }}
                >
                    {/* Body LEFT: skills + languages */}
                    <Box
                        sx={{
                            bgcolor: MUTED_BG,
                            p: { xs: 3, sm: 3.5 },
                            '@media print': {
                                WebkitPrintColorAdjust: 'exact',
                                printColorAdjust: 'exact',
                            },
                        }}
                    >
                        {skills?.map((group) => (
                            <SkillCategory key={group.category} category={group.category} items={group.items} />
                        ))}

                        {languages && languages.length > 0 && (
                            <Box>
                                <SectionTitle icon={<TranslateIcon sx={{ fontSize: 16 }} />}>
                                    Languages
                                </SectionTitle>
                                {languages.map((l) => (
                                    <LanguageRow key={l.name} label={l.name} level={l.level} cefr={l.cefr} />
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Body RIGHT: experience + education */}
                    <Box sx={{ p: { xs: 3, sm: 4 } }}>
                        <SectionTitle icon={<WorkIcon sx={{ fontSize: 16 }} />}>
                            Work experience
                        </SectionTitle>
                        {experience.map((e, idx) => (
                            <TimelineItem
                                key={idx}
                                period={e.period}
                                title={e.title}
                                subtitle={e.organization}
                                location={e.location}
                                bullets={e.bullets}
                            />
                        ))}

                        <Box sx={{ mt: 2 }}>
                            <SectionTitle icon={<SchoolIcon sx={{ fontSize: 16 }} />}>
                                Education & training
                            </SectionTitle>
                            {education.map((e, idx) => (
                                <TimelineItem
                                    key={idx}
                                    period={e.period}
                                    title={e.title}
                                    subtitle={e.organization}
                                    location={e.location}
                                    bullets={e.bullets}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Print styling */}
            <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { margin: 0; }
          .cv-page { page-break-after: always; }
        }
      `}</style>
        </Box>
    );
}
