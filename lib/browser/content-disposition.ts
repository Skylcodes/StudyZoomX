const defaultFileName = 'download';
const fileNameToken = "filename*=UTF-8''";

export function extractFilenameFromContentDispositionHeader(
  header: string
): string {
  for (const part of header.split(';')) {
    if (part.trim().indexOf(fileNameToken) === 0) {
      return decodeURIComponent(part.trim().replace(fileNameToken, ''));
    }
  }

  return defaultFileName;
}
