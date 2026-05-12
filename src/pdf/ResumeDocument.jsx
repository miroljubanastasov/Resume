import {
    Document,
    Page,
    StyleSheet,
    Text,
    View,
    Image,
    Font,
} from '@react-pdf/renderer';

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
    const textPrimary = theme?.palette?.text?.primary ?? '#1A1A1A';
    const textSecondary = theme?.palette?.text?.secondary ?? '#5a5a5a';

    return {
        accent,
        accentSoft,
        heroBg,
        heroFg,
        heroMuted,
        bandLight,
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
            fontSize: 9,
            lineHeight: 1.4,
        },

        /* HERO */
        hero: {
            flexDirection: 'row',
            backgroundColor: c.heroBg,
            color: c.heroFg,
        },
        heroLeft: {
            flex: 1.15,
            padding: 24,
            justifyContent: 'center',
        },
        heroQr: {
            position: 'absolute',
            top: 12,
            right: 12,
            width: 56,
            height: 56,
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
        },
        heroPhoto: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
        },
        title: {
            color: c.accent,
            fontFamily: 'Helvetica-Bold',
            fontSize: 9,
            letterSpacing: 3,
            marginBottom: 6,
        },
        name: {
            color: c.heroFg,
            fontFamily: 'Helvetica-Bold',
            fontSize: 26,
            letterSpacing: -0.5,
            marginBottom: 12,
        },
        rule: {
            width: 48,
            height: 2.5,
            backgroundColor: c.accent,
            marginBottom: 12,
        },
        summary: {
            color: c.heroMuted,
            fontSize: 9,
            lineHeight: 1.6,
            marginBottom: 14,
            maxWidth: 320,
        },
        contactRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 3,
        },
        contactDot: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: c.accent,
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
            paddingHorizontal: 24,
        },
        skillsCol: {
            flex: 1,
            paddingHorizontal: 6,
        },
        sectionTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        sectionBadge: {
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: c.accent,
            marginRight: 6,
        },
        sectionLabel: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 9,
            letterSpacing: 2,
            color: c.textPrimary,
            textTransform: 'uppercase',
        },
        skillRow: { marginBottom: 6 },
        skillTopRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
        },
        skillName: { fontSize: 8.5 },
        skillSegments: {
            flexDirection: 'row',
            gap: 2,
        },
        skillSegment: {
            flex: 1,
            height: 3,
            borderRadius: 1,
        },
        chipRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        chip: {
            backgroundColor: c.heroBg,
            color: c.heroFg,
            fontSize: 7.5,
            fontFamily: 'Helvetica-Bold',
            paddingVertical: 2,
            paddingHorizontal: 6,
            borderRadius: 9,
            marginRight: 4,
            marginBottom: 4,
        },
        langRow: { marginBottom: 6 },
        langTopRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 3,
        },
        langDots: { flexDirection: 'row' },
        langDot: {
            width: 16,
            height: 3,
            marginRight: 2,
            borderRadius: 1,
        },
        cefrChip: {
            backgroundColor: c.heroBg,
            color: c.heroFg,
            fontSize: 7,
            fontFamily: 'Helvetica-Bold',
            paddingVertical: 1.5,
            paddingHorizontal: 5,
            borderRadius: 8,
        },

        /* BODY (experience + education) */
        body: {
            flexDirection: 'row',
            padding: 24,
            backgroundColor: '#FFFFFF',
        },
        bodyLeft: {
            flex: 1.5,
            paddingRight: 16,
        },
        bodyRight: {
            flex: 1,
            paddingLeft: 16,
        },
        timelineItem: {
            position: 'relative',
            paddingLeft: 14,
            marginBottom: 12,
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
        period: {
            color: c.accentSoft,
            fontFamily: 'Helvetica-Bold',
            fontSize: 7.5,
            letterSpacing: 1.2,
            marginBottom: 2,
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
            marginBottom: 3,
        },
        bullet: {
            flexDirection: 'row',
            marginBottom: 1.5,
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
            lineHeight: 1.45,
        },
    });
}

/* ---------------- atoms ---------------- */

function SectionTitle({ children, styles }) {
    return (
        <View style={styles.sectionTitle}>
            <View style={styles.sectionBadge} />
            <Text style={styles.sectionLabel}>{children}</Text>
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

function SkillCategory({ category, items, styles, colors }) {
    const hasLevels = items.some((i) => typeof i.level === 'number');
    return (
        <View style={styles.skillsCol} wrap={false}>
            <SectionTitle styles={styles}>{category}</SectionTitle>
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

function TimelineItem({ period, title, organization, location, bullets, styles }) {
    return (
        <View style={styles.timelineItem} wrap={false}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <Text style={styles.period}>{period}</Text>
            <Text style={styles.roleTitle}>{title}</Text>
            <Text style={styles.orgLine}>
                {organization}
                {location ? `  ·  ${location}` : ''}
            </Text>
            {bullets?.map((b, i) => (
                <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                </View>
            ))}
        </View>
    );
}

/* ---------------- document ---------------- */

export default function ResumeDocument({ data, theme, photoUrl, qrDataUrl }) {
    const colors = buildPdfStyles(theme);
    const styles = makeSheet(colors);
    const { personal, languages, skills, experience, education } = data;
    const { contact } = personal;

    const contacts = [
        contact?.phone,
        contact?.email,
        contact?.address,
        contact?.website,
        contact?.linkedin,
        contact?.dateOfBirth,
    ].filter(Boolean);

    return (
        <Document
            title={`${personal.fullName} — CV`}
            author={personal.fullName}
            subject="Curriculum Vitae"
        >
            <Page size="A4" style={styles.page}>
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
                            <View key={c} style={styles.contactRow}>
                                <View style={styles.contactDot} />
                                <Text style={styles.contactText}>{c}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.heroRight}>
                        {qrDataUrl && (
                            <View style={styles.heroQr}>
                                <Image src={qrDataUrl} style={styles.heroQrImage} />
                            </View>
                        )}
                        {photoUrl && <Image src={photoUrl} style={styles.heroPhoto} />}
                    </View>
                </View>

                {/* SKILLS BAND */}
                <View style={styles.skillsBand} wrap={false}>
                    {skills?.map((g) => (
                        <SkillCategory
                            key={g.category}
                            category={g.category}
                            items={g.items}
                            styles={styles}
                            colors={colors}
                        />
                    ))}
                    {languages?.length > 0 && (
                        <View style={styles.skillsCol} wrap={false}>
                            <SectionTitle styles={styles}>Languages</SectionTitle>
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

                {/* BODY */}
                <View style={styles.body}>
                    <View style={styles.bodyLeft}>
                        <SectionTitle styles={styles}>Work experience</SectionTitle>
                        {experience.map((e, i) => (
                            <TimelineItem key={i} {...e} styles={styles} />
                        ))}
                    </View>
                    <View style={styles.bodyRight}>
                        <SectionTitle styles={styles}>Education & training</SectionTitle>
                        {education.map((e, i) => (
                            <TimelineItem key={i} {...e} styles={styles} />
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
}
