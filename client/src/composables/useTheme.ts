import { ref } from 'vue';
import axios from 'axios';

const theme = ref<'light' | 'dark'>((localStorage.getItem('theme') as 'light' | 'dark') || 'light');

function applyTheme(value: 'light' | 'dark') {
  theme.value = value;
  document.documentElement.setAttribute('data-theme', value);
  localStorage.setItem('theme', value);
}

// Apply initial theme
applyTheme(theme.value);

export function useTheme() {
  async function loadTheme() {
    try {
      const res = await axios.get('/api/user/settings');
      if (res.data?.theme) {
        applyTheme(res.data.theme);
      }
    } catch {
      // ignore errors
    }
  }

  async function toggleTheme() {
    const next = theme.value === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try {
      await axios.put('/api/user/settings', { theme: next });
    } catch {
      // ignore errors
    }
  }

  return { theme, loadTheme, toggleTheme };
}
