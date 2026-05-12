import { pdf } from '@react-pdf/renderer';
import ResumeDocument from './ResumeDocument.jsx';

/**
 * Build a PDF blob from the resume data + current MUI theme and trigger a
 * browser download. Keeps the heavy @react-pdf/renderer code out of the
 * critical render path because callers can dynamic-import this module.
 */
export async function exportResumePdf({ data, theme, photoUrl, fileName }) {
    const doc = (
        <ResumeDocument data={data} theme={theme} photoUrl={photoUrl} />
    );
    const blob = await pdf(doc).toBlob();

    const safeName =
        fileName ||
        `${(data?.personal?.fullName || 'Resume').replace(/\s+/g, '_')}_CV.pdf`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = safeName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Give the browser a tick to start the download before revoking.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
