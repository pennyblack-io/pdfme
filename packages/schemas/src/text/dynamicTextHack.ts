// Temporary file for our original version of achieving dynamic text.
// This will be removed when we implement an enhanced plugin replacement.

export const PLACEHOLDER_MARKER_LEFT = '{{';
export const PLACEHOLDER_MARKER_RIGHT = '}}';

export const substitutePlaceholdersInContent = (
  fieldName: string,
  content: string | undefined,
  input: string
) => {
  if (!content) {
    // Legacy schema with no content field, or content is empty
    return input;
  }

  // Ensure we add escape characters for anything that could break the regex
  const fieldNameForRegex = fieldName.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp('{{' + fieldNameForRegex + '}}', 'g');

  return content.replace(regex, input);
};