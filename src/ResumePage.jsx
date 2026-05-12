import { Avatar, Box, Chip, Divider, LinearProgress, Stack, Typography } from '@mui/material';
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

const SIDE_BG = '#1F4E79';
const SIDE_FG = '#FFFFFF';
const ACCENT = '#2E75B6';

const CATEGORY_ICONS = {
    Software: <BuildIcon sx={{ fontSize: 16 }} />,
    Professional: <WorkIcon sx={{ fontSize: 16 }} />,
    Strengths: <EmojiEventsIcon sx={{ fontSize: 16 }} />,
};

function SectionTitle({ icon, children, light }) {
    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <Box
                sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: light ? 'rgba(255,255,255,0.15)' : ACCENT,
                    color: light ? SIDE_FG : '#fff',
                }}
            >
                {icon}
            </Box>
            <Typography
                variant="overline"
                sx={{
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: light ? SIDE_FG : ACCENT,
                    fontSize: '0.8rem',
                }}
            >
                {children}
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    height: '1px',
                    bgcolor: light ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.12)',
                }}
            />
        </Stack>
    );
}

function SideInfoRow({ icon, label, value }) {
    if (!value) return null;
    return (
        <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.2 }}>
            <Box sx={{ color: 'rgba(255,255,255,0.85)', mt: '2px' }}>{icon}</Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)', display: 'block', lineHeight: 1.2 }}>
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ color: SIDE_FG, wordBreak: 'break-word' }}>
                    {value}
                </Typography>
            </Box>
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
                    bgcolor: 'rgba(0,0,0,0.08)',
                }}
            />
            <Typography variant="caption" sx={{ color: ACCENT, fontWeight: 700, letterSpacing: 1 }}>
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
                <Box component="ul" sx={{ pl: 2.5, m: 0, '& li': { fontSize: '0.875rem', lineHeight: 1.5 } }}>
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
        <Box sx={{ mb: 1.2 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.3 }}>
                <Typography variant="body2" sx={{ color: SIDE_FG }}>
                    {label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {level}/5
                </Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={(level / 5) * 100}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.15)',
                    '& .MuiLinearProgress-bar': { bgcolor: '#FFD966' },
                }}
            />
        </Box>
    );
}

function SkillCategory({ category, items }) {
    const hasLevels = items.some((i) => typeof i.level === 'number');
    return (
        <Box sx={{ mt: 3 }}>
            <SectionTitle icon={CATEGORY_ICONS[category] ?? <BuildIcon sx={{ fontSize: 16 }} />} light>
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
                                bgcolor: 'rgba(255,255,255,0.15)',
                                color: SIDE_FG,
                                fontSize: '0.7rem',
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
        <Box sx={{ mb: 1.2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" sx={{ color: SIDE_FG }}>
                    {label}
                </Typography>
                <Chip
                    label={cefr}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: SIDE_FG, height: 20, fontSize: '0.7rem' }}
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
                            bgcolor: i <= level ? '#FFD966' : 'rgba(255,255,255,0.15)',
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
}

export default function ResumePage({ data = resumeData }) {
    const { personal, languages, skills, experience, education } = data;
    const { contact } = personal;

    return (
        <Box
            sx={{
                bgcolor: { xs: '#fff', sm: '#eceff1' },
                minHeight: '100vh',
                py: { xs: 0, sm: 4 },
                '@media print': {
                    bgcolor: '#fff',
                    py: 0,
                },
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
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '230px 1fr' },
                    '@media print': {
                        width: '210mm',
                        minHeight: '297mm',
                        boxShadow: 'none',
                        gridTemplateColumns: '230px 1fr',
                    },
                }}
            >
                {/* ============ SIDEBAR ============ */}
                <Box
                    sx={{
                        bgcolor: SIDE_BG,
                        color: SIDE_FG,
                        p: 3,
                        '@media print': { WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' },
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Avatar
                            src={personal.photo || undefined}
                            sx={{
                                width: 140,
                                height: 140,
                                border: '4px solid rgba(255,255,255,0.25)',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                fontSize: '3rem',
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.6)' }} />
                        </Avatar>
                    </Box>

                    <Typography variant="h6" align="center" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                        {personal.fullName}
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        sx={{ display: 'block', color: 'rgba(255,255,255,0.75)', letterSpacing: 2, mb: 2 }}
                    >
                        {personal.title}
                    </Typography>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />

                    <SectionTitle icon={<PersonIcon sx={{ fontSize: 16 }} />} light>
                        Contact
                    </SectionTitle>
                    <SideInfoRow icon={<PhoneIcon fontSize="small" />} label="Phone" value={contact.phone} />
                    <SideInfoRow icon={<EmailIcon fontSize="small" />} label="Email" value={contact.email} />
                    <SideInfoRow icon={<LocationOnIcon fontSize="small" />} label="Address" value={contact.address} />
                    <SideInfoRow icon={<LanguageIcon fontSize="small" />} label="Website" value={contact.website} />
                    <SideInfoRow icon={<LinkedInIcon fontSize="small" />} label="LinkedIn" value={contact.linkedin} />
                    <SideInfoRow
                        icon={<CakeIcon fontSize="small" />}
                        label="Date of birth"
                        value={contact.dateOfBirth}
                    />

                    {languages && languages.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <SectionTitle icon={<TranslateIcon sx={{ fontSize: 16 }} />} light>
                                Languages
                            </SectionTitle>
                            {languages.map((l) => (
                                <LanguageRow key={l.name} label={l.name} level={l.level} cefr={l.cefr} />
                            ))}
                        </Box>
                    )}

                    {skills?.map((group) => (
                        <SkillCategory key={group.category} category={group.category} items={group.items} />
                    ))}
                </Box>

                {/* ============ MAIN ============ */}
                <Box sx={{ p: { xs: 3, sm: 4 } }}>
                    <SectionTitle icon={<PersonIcon sx={{ fontSize: 16 }} />}>About me</SectionTitle>
                    <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: 'text.secondary' }}>
                        {personal.summary}
                    </Typography>

                    <SectionTitle icon={<WorkIcon sx={{ fontSize: 16 }} />}>Work experience</SectionTitle>
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

                    <Box sx={{ mt: 1 }}>
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
