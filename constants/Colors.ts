/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Modern indigo color scheme for photography app
 */

const tintColorLight = '#ff0000ff'; // Modern indigo
const tintColorDark = '#ffffffff';  // Lighter indigo for dark mode

export const Colors = {
  light: {
    text: '#111827',           // Dark gray
    background: '#FFFFFF',     // White
    tint: tintColorLight,      // Indigo
    icon: '#6B7280',           // Medium gray
    tabIconDefault: '#9CA3AF', // Cool gray
    tabIconSelected: tintColorLight,
    border: '#E5E7EB',         // Light gray border
    card: '#F9FAFB',           // Very light gray for cards
    primary: '#6366F1',        // Indigo
    secondary: '#6B7280',      // Gray
    accent: '#8B5CF6',         // Purple accent
    success: '#10B981',        // Emerald green
    warning: '#F59E0B',        // Amber
    error: '#EF4444',          // Red
  },
  dark: {
    text: '#F9FAFB',           // Light gray
    background: '#111827',     // Dark blue-gray
    tint: tintColorDark,
    icon: '#ffffffff',           // Light gray
    tabIconDefault: '#9CA3AF', // Cool gray
    tabIconSelected: tintColorDark,
    border: '#374151',         // Dark border
    card: '#1F2937',           // Dark card background
    primary: '#818CF8',        // Light indigo
    secondary: '#9CA3AF',      // Medium gray
    accent: '#A78BFA',         // Light purple accent
    success: '#34D399',        // Light emerald
    warning: '#FBBF24',        // Light amber
    error: '#F87171',          // Light red
  },
};