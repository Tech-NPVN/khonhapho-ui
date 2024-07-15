import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Light mode
        background_l: '#ECF1F2',
        background_l_2: '#F3F4F6',
        primary_text_l: '#344142',
        secondary_text_l: 'rgba(52, 65, 66, 0.5)',
        link_text_l: '#1677FF',
        color_l: '#3FB44B',
        color_l_2: '#A1EC02',
        color_l_3: '#006941',
        mess_l: '#D2E5D3',
        mess_l_2: '#E4FFE7',
        primary_color_l: '#FFFFFF',
        button_l: '#E0FFE0',
        error_l: '#E3223C',
        divider_l: 'rgba(0, 0, 0, 0.1)',
        tiertiary_input_color_l: '#E5E6E8',
        frame_blur_l: 'rgba(40, 40, 40, 0.7)',

        // Dark mode
        background_d: '#151E2F',
        primary_text_d: '#DAEFFF',
        primary_text_d_2: '#FFFFFF',
        secondary_text_d: 'rgba(218, 239, 255, 0.5)',
        link_text_d: '#5BB6E8',
        mess_d: '#44722B',
        primary_color_d: '#2F3643',
        error_d: '#FF7D7F',
        divider_d: '#6B6C6D',
        account_d: '#374665',
        frame_blur_d: 'rgba(56, 56, 56, 0.6)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: '#app',
};
export default config;
