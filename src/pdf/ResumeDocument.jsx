import {
    Document,
    Page,
    StyleSheet,
    Text,
    View,
    Image,
    Svg,
    Circle,
    Path,
} from '@react-pdf/renderer';

// Material-icon SVG paths (24x24 viewBox), used inside section title badges.
const ICON_PATHS = {
    Software:
        'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
    Professional:
        'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
    Strengths:
        'M20.2 4h-2.39c.13-.31.19-.65.19-1 0-1.66-1.34-3-3-3-1.06 0-1.99.55-2.53 1.37L12 2.46l-.47-.59C10.99.55 10.06 0 9 0 7.34 0 6 1.34 6 3c0 .35.07.69.19 1H4l-2 9c0 1.1.9 2 2 2v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6c1.1 0 2-.9 2-2l-1.8-9zM15 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm9 18H6v-6h12v6zm2-8H4l1.21-6h13.58L20 12z',
    Languages:
        'M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
    Work:
        'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
    Education:
        'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
    Phone:
        'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    Email:
        'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    Address:
        'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    Website:
        'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z',
    LinkedIn:
        'M19 3H5c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.89 2-2V5c0-1.11-.9-2-2-2zM9 17H6.48v-7H9v7zM7.74 8.74c-.83 0-1.5-.68-1.5-1.5s.67-1.5 1.5-1.5 1.5.68 1.5 1.5-.67 1.5-1.5 1.5zM18 17h-2.5v-3.94c0-.94-.39-1.27-.89-1.27-.51 0-1.11.34-1.11 1.29V17H11v-7h2.39v.97c.24-.45.97-1.21 2.04-1.21 1.16 0 2.57.68 2.57 2.94V17z',
    Cake:
        'M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12c0-1.66-1.34-3-3-3z',
};

/**
 * Custom PDF document for the resume.
 *
 * Designed independently of the on-screen layout so we have full control over
 * A4 page geometry, page breaks, typography sizing, and color rendering.
 *
 * All sizes are in PDF points (1pt = 1/72 inch). A4 = 595.28 x 841.89 pt.
 *
 * The `theme` object (palette + layout) is passed in so the PDF picks up any
 * tweaks made to `src/theme.js`.
 */

// Helvetica is built into PDF — no font registration required.

/* eslint-disable react-refresh/only-export-components */
export const PDF_PAGE = {
    width: 595.28, // A4 portrait
    height: 841.89,
};

export function buildPdfStyles(theme) {
    const accent = theme?.palette?.accent?.main ?? '#4bc5c9';
    const accentSoft = theme?.palette?.accent?.soft ?? '#2b8b9c';
    const heroBg = theme?.palette?.hero?.bg ?? '#030303';
    const heroFg = theme?.palette?.hero?.fg ?? '#FFFFFF';
    const heroMuted = '#cfcfcf';
    const bandLight = theme?.palette?.band?.light ?? '#dadada';
    const chipBg = theme?.palette?.chip?.main ?? '#2d2d2d';
    const chipFg = theme?.palette?.chip?.contrastText ?? '#FFFFFF';
    const textPrimary = theme?.palette?.text?.primary ?? '#1A1A1A';
    const textSecondary = theme?.palette?.text?.secondary ?? '#5a5a5a';

    return {
        accent,
        accentSoft,
        heroBg,
        heroFg,
        heroMuted,
        bandLight,
        chipBg,
        chipFg,
        textPrimary,
        textSecondary,
    };
}

function makeSheet(c) {
    return StyleSheet.create({
        page: {
            backgroundColor: '#FFFFFF',
            color: c.textPrimary,
            fontFamily: 'Helvetica',
            fontSize: 9.5,
            lineHeight: 1.4,
            paddingTop: 48,
            paddingBottom: 48,
        },

        /* HERO */
        hero: {
            flexDirection: 'row',
            backgroundColor: c.heroBg,
            color: c.heroFg,
            marginTop: -48, // cancel Page paddingTop so hero bleeds to the top edge
            position: 'relative',
        },
        heroLightener: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0)',
        },
        heroLeft: {
            flex: 1.15,
            paddingVertical: 28,
            paddingHorizontal: 32,
            justifyContent: 'center',
        },
        heroQr: {
            position: 'absolute',
            top: 10,
            right: 10,
            width: 46,
            height: 46,
            padding: 3,
            backgroundColor: '#0a0a0a',
            borderRadius: 3,
        },
        heroQrImage: {
            width: '100%',
            height: '100%',
        },
        heroRight: {
            flex: 1,
            position: 'relative',
            backgroundColor: '#0c0c0c',
            alignSelf: 'stretch',
        },
        heroPhoto: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover',
            objectPosition: 'center top',
        },
        title: {
            color: c.accent,
            fontFamily: 'Helvetica-Bold',
            fontSize: 8.5,
            letterSpacing: 3,
            marginBottom: 12,
        },
        name: {
            color: c.heroFg,
            fontFamily: 'Helvetica-Bold',
            fontSize: 32,
            letterSpacing: -1.0,
            marginBottom: 32,
        },
        rule: {
            width: 48,
            height: 2.5,
            backgroundColor: c.accent,
            marginBottom: 12,
        },
        summary: {
            color: c.heroMuted,
            fontSize: 8.5,
            lineHeight: 1.45,
            marginBottom: 8,
            maxWidth: 320,
        },
        contactRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3,
        },
        contactIcon: {
            width: 10,
            height: 10,
            marginRight: 6,
        },
        contactText: {
            color: c.heroMuted,
            fontSize: 9,
        },

        /* SKILLS BAND */
        skillsBand: {
            flexDirection: 'row',
            backgroundColor: c.bandLight,
            paddingVertical: 18,
            paddingHorizontal: 28,
        },
        skillsCol: {
            flex: 1,
            paddingHorizontal: 5,
        },
        sectionTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        sectionRule: {
            flex: 1,
            height: 1,
            marginLeft: 8,
            backgroundColor: 'rgba(0,0,0,0.12)',
        },
        sectionLabel: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 9,
            letterSpacing: 1.8,
            color: c.textPrimary,
            textTransform: 'uppercase',
            marginLeft: 7,
        },
        skillRow: { marginBottom: 3 },
        skillTopRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
        },
        skillName: { fontSize: 8 },
        skillSegments: {
            flexDirection: 'row',
            gap: 2,
        },
        skillSegment: {
            flex: 1,
            height: 2.5,
            borderRadius: 1,
        },
        chipRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        chip: {
            backgroundColor: c.chipBg,
            color: c.chipFg,
            fontSize: 7,
            fontFamily: 'Helvetica-Bold',
            paddingTop: 2,
            paddingBottom: 2,
            paddingHorizontal: 5,
            borderRadius: 8,
            marginRight: 3,
            marginBottom: 3,
            lineHeight: 1,
        },
        langRow: { marginBottom: 4 },
        langTopRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
        },
        langDots: { flexDirection: 'row', gap: 2 },
        langDot: {
            flex: 1,
            height: 2.5,
            borderRadius: 1,
        },
        cefrChip: {
            backgroundColor: c.chipBg,
            color: c.chipFg,
            fontSize: 7,
            fontFamily: 'Helvetica-Bold',
            paddingTop: 2,
            paddingBottom: 2,
            paddingHorizontal: 5,
            borderRadius: 8,
            lineHeight: 1,
        },

        /* BODY (experience + education) */
        body: {
            paddingVertical: 32,
            paddingLeft: 32,
            paddingRight: 32,
            backgroundColor: '#FFFFFF',
        },
        bodySection: {
            marginBottom: 32,
        },
        timelineItem: {
            position: 'relative',
            paddingLeft: 14,
            marginBottom: 8,
        },
        timelineDot: {
            position: 'absolute',
            left: 0,
            top: 3,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: c.accent,
        },
        timelineLine: {
            position: 'absolute',
            left: 2.5,
            top: 12,
            bottom: 0,
            width: 1,
            backgroundColor: 'rgba(0,0,0,0.12)',
        },
        // Small upward stub above the dot. Rendered on every non-first item so
        // that when wrap={false} pushes an item to a new page, this stub sits
        // in the new page's top padding and signals a continued timeline.
        timelineLineTop: {
            position: 'absolute',
            left: 2.5,
            top: -8,
            height: 11,
            width: 1,
            backgroundColor: 'rgba(0,0,0,0.12)',
        },
        period: {
            color: c.accentSoft,
            fontFamily: 'Helvetica-Bold',
            fontSize: 7.5,
            letterSpacing: 1.2,
            marginBottom: 1,
        },
        roleTitle: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 10,
            color: c.textPrimary,
            marginBottom: 1,
        },
        orgLine: {
            color: c.textSecondary,
            fontSize: 8.5,
            marginBottom: 2,
        },
        bullet: {
            flexDirection: 'row',
            marginBottom: 1,
        },
        bulletDot: {
            width: 6,
            color: c.textSecondary,
            fontSize: 8.5,
        },
        bulletText: {
            flex: 1,
            fontSize: 8.5,
            color: c.textPrimary,
            lineHeight: 1.4,
        },
        subLabel: {
            color: c.accentSoft,
            fontFamily: 'Helvetica-Bold',
            fontSize: 7,
            letterSpacing: 1.1,
            textTransform: 'uppercase',
            marginTop: 3,
            marginBottom: 1,
        },
        subBody: {
            fontSize: 8.5,
            color: c.textPrimary,
            lineHeight: 1.4,
        },
        subColumns: {
            flexDirection: 'row',
            marginTop: 2,
        },
        subColLeft: {
            flex: 1,
            paddingRight: 8,
        },
        subColRight: {
            flex: 1,
            paddingLeft: 8,
        },

        /* PAGE NUMBER (top-right, non-first pages only) */
        pageNum: {
            position: 'absolute',
            top: 24,
            right: 32,
            fontSize: 7.5,
            color: c.textSecondary,
            letterSpacing: 0.8,
        },
    });
}

/* ---------------- atoms ---------------- */

function SectionTitle({ children, icon, styles, colors }) {
    const size = 16;
    return (
        <View style={styles.sectionTitle}>
            <Svg viewBox="0 0 24 24" style={{ width: size, height: size }}>
                <Circle cx="12" cy="12" r="12" fill={colors.accent} />
                {icon && (
                    <Path
                        d={icon}
                        fill={colors.heroFg}
                        transform="translate(4 4) scale(0.667)"
                    />
                )}
            </Svg>
            <Text style={styles.sectionLabel}>{children}</Text>
            <View style={styles.sectionRule} />
        </View>
    );
}

function SkillBar({ name, level, styles, colors }) {
    const lvl = Math.max(0, Math.min(5, level ?? 0));
    return (
        <View style={styles.skillRow}>
            <Text style={[styles.skillName, { marginBottom: 2 }]}>{name}</Text>
            <View style={styles.skillSegments}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <View
                        key={i}
                        style={[
                            styles.skillSegment,
                            { backgroundColor: i <= lvl ? colors.accent : 'rgba(0,0,0,0.12)' },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

function SkillCategory({ category, label, items, styles, colors }) {
    const hasLevels = items.some((i) => typeof i.level === 'number');
    return (
        <View style={styles.skillsCol} wrap={false}>
            <SectionTitle styles={styles} colors={colors} icon={ICON_PATHS[category]}>
                {label ?? category}
            </SectionTitle>
            {hasLevels ? (
                items.map((it) => (
                    <SkillBar
                        key={it.name}
                        name={it.name}
                        level={it.level ?? 0}
                        styles={styles}
                        colors={colors}
                    />
                ))
            ) : (
                <View style={styles.chipRow}>
                    {items.map((it) => (
                        <Text key={it.name} style={styles.chip}>
                            {it.name}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
}

function LanguageRow({ name, level, cefr, styles, colors }) {
    return (
        <View style={styles.langRow}>
            <View style={styles.langTopRow}>
                <Text style={styles.skillName}>{name}</Text>
                <Text style={styles.cefrChip}>{cefr}</Text>
            </View>
            <View style={styles.langDots}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <View
                        key={i}
                        style={[
                            styles.langDot,
                            { backgroundColor: i <= level ? colors.accent : 'rgba(0,0,0,0.12)' },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

function TimelineItem({
    period,
    title,
    organization,
    location,
    responsibilities,
    notableProjects,
    achievements,
    styles,
    labels,
    isFirst,
}) {
    const hasProjects = notableProjects && notableProjects.length > 0;
    const hasAchievements = achievements && achievements.length > 0;
    const hasRightColumn = hasProjects || hasAchievements;
    return (
        <View style={styles.timelineItem} wrap={false}>
            {!isFirst && <View style={styles.timelineLineTop} />}
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <Text style={styles.period}>{period}</Text>
            <Text style={styles.roleTitle}>{title}</Text>
            <Text style={styles.orgLine}>
                {organization}
                {location ? `  ·  ${location}` : ''}
            </Text>
            <View style={styles.subColumns}>
                <View style={styles.subColLeft}>
                    {responsibilities ? (
                        <>
                            <Text style={styles.subLabel}>{labels?.responsibilities ?? 'Responsibilities'}</Text>
                            <Text style={styles.subBody}>{responsibilities}</Text>
                        </>
                    ) : null}
                </View>
                {hasRightColumn && (
                    <View style={styles.subColRight}>
                        {hasProjects && (
                            <>
                                <Text style={styles.subLabel}>{labels?.notableProjects ?? 'Notable projects'}</Text>
                                {notableProjects.map((p, i) => (
                                    <View key={i} style={styles.bullet}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{p}</Text>
                                    </View>
                                ))}
                            </>
                        )}
                        {hasAchievements && (
                            <>
                                <Text style={styles.subLabel}>{labels?.achievements ?? 'Achievements'}</Text>
                                {achievements.map((a, i) => (
                                    <View key={i} style={styles.bullet}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{a}</Text>
                                    </View>
                                ))}
                            </>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

function EducationItem({ period, title, organization, location, description, styles, isFirst }) {
    return (
        <View style={styles.timelineItem} wrap={false}>
            {!isFirst && <View style={styles.timelineLineTop} />}
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <Text style={styles.period}>{period}</Text>
            <Text style={styles.roleTitle}>{title}</Text>
            <Text style={styles.orgLine}>
                {organization}
                {location ? `  ·  ${location}` : ''}
            </Text>
            {description ? <Text style={styles.subBody}>{description}</Text> : null}
        </View>
    );
}

/* ---------------- document ---------------- */

export default function ResumeDocument({ data, theme, photoUrl, qrDataUrl, strings }) {
    const colors = buildPdfStyles(theme);
    const styles = makeSheet(colors);
    const { personal, languages, skills, experience, education } = data;
    const { contact } = personal;

    const t = strings ?? {
        workExperience: 'Work experience',
        education: 'Education & training',
        languages: 'Languages',
        responsibilities: 'Responsibilities',
        notableProjects: 'Notable projects',
        achievements: 'Achievements',
        pageOf: (n, total) => `Page ${n} of ${total}`,
        categories: {},
    };

    const contacts = [
        { kind: 'Phone', value: contact?.phone },
        { kind: 'Email', value: contact?.email },
        { kind: 'Address', value: contact?.address },
        { kind: 'Website', value: contact?.website },
        { kind: 'LinkedIn', value: contact?.linkedin },
        { kind: 'Cake', value: contact?.dateOfBirth },
    ].filter((c) => c.value);

    return (
        <Document
            title={`${personal.fullName} — CV`}
            author={personal.fullName}
            subject="Curriculum Vitae"
        >
            <Page size="A4" style={styles.page}>

                {/* PAGE NUMBER (top-right, hidden on page 1 so hero stays clean) */}
                <Text
                    style={styles.pageNum}
                    fixed
                    render={({ pageNumber, totalPages }) =>
                        pageNumber > 1
                            ? t.pageOf
                                ? t.pageOf(pageNumber, totalPages)
                                : `Page ${pageNumber} of ${totalPages}`
                            : ''
                    }
                />

                {/* HERO */}
                <View style={styles.hero}>
                    <View style={styles.heroLeft}>
                        <Text style={styles.title}>{personal.title}</Text>
                        <Text style={styles.name}>{personal.fullName}</Text>
                        <View style={styles.rule} />
                        {personal.summary && (
                            <Text style={styles.summary}>{personal.summary}</Text>
                        )}
                        {contacts.map((c) => (
                            <View key={c.value} style={styles.contactRow}>
                                <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
                                    <Path d={ICON_PATHS[c.kind]} fill={colors.accent} />
                                </Svg>
                                <Text style={styles.contactText}>{c.value}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.heroRight}>
                        {photoUrl && <Image src={photoUrl} style={styles.heroPhoto} />}
                        {qrDataUrl && (
                            <View style={styles.heroQr}>
                                <Image src={qrDataUrl} style={styles.heroQrImage} />
                            </View>
                        )}
                    </View>
                    {/* Print-friendly lightener: 25% white overlay on top of hero */}
                    <View style={styles.heroLightener} />
                </View>

                {/* SKILLS BAND */}
                <View style={styles.skillsBand} wrap={false}>
                    {skills?.map((g) => (
                        <SkillCategory
                            key={g.category}
                            category={g.category}
                            label={t.categories?.[g.category] ?? g.category}
                            items={g.items}
                            styles={styles}
                            colors={colors}
                        />
                    ))}
                    {languages?.length > 0 && (
                        <View style={styles.skillsCol} wrap={false}>
                            <SectionTitle styles={styles} colors={colors} icon={ICON_PATHS.Languages}>
                                {t.languages}
                            </SectionTitle>
                            {languages.map((l) => (
                                <LanguageRow
                                    key={l.name}
                                    name={l.name}
                                    level={l.level}
                                    cefr={l.cefr}
                                    styles={styles}
                                    colors={colors}
                                />
                            ))}
                        </View>
                    )}
                </View>

                {/* BODY: Work experience then Education, one after the other */}
                <View style={styles.body}>
                    <View style={styles.bodySection}>
                        <View wrap={false}>
                            <SectionTitle styles={styles} colors={colors} icon={ICON_PATHS.Work}>
                                {t.workExperience}
                            </SectionTitle>
                            {experience.length > 0 && (
                                <TimelineItem {...experience[0]} isFirst styles={styles} labels={t} />
                            )}
                        </View>
                        {experience.slice(1).map((e, i) => (
                            <TimelineItem key={i} {...e} styles={styles} labels={t} />
                        ))}
                    </View>
                    <View style={styles.bodySection}>
                        <View wrap={false}>
                            <SectionTitle styles={styles} colors={colors} icon={ICON_PATHS.Education}>
                                {t.education}
                            </SectionTitle>
                            {education.length > 0 && (
                                <EducationItem {...education[0]} isFirst styles={styles} />
                            )}
                        </View>
                        {education.slice(1).map((e, i) => (
                            <EducationItem key={i} {...e} styles={styles} />
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
}
