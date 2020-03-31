import {scaleFont} from './mixins';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'OpenSans-Regular';
export const FONT_FAMILY_BOLD = 'OpenSans-Bold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_24 = `${scaleFont(24)}px`;
export const FONT_SIZE_20 = `${scaleFont(20)}px`;
export const FONT_SIZE_18 = `${scaleFont(18)}px`;
export const FONT_SIZE_16 = `${scaleFont(16)}px`;
export const FONT_SIZE_14 = `${scaleFont(14)}px`;
export const FONT_SIZE_12 = `${scaleFont(12)}px`;

export const FONT_REGULAR = `
  font-weight: ${FONT_WEIGHT_REGULAR};
`;

export const FONT_BOLD = `
  font-weight: ${FONT_WEIGHT_BOLD};
`;
