import store from '@/store'

export default class ColorScheme {

  public static set(colorScheme: string) {
    if (colorScheme === 'light') {
      localStorage.setItem('colorScheme', (store.state.colorScheme = 'light'))
    } else {
      localStorage.setItem('colorScheme', (store.state.colorScheme = 'dark'))
    }
    ColorScheme.apply();
  }

  public static toggle() {
    ColorScheme.set(store.state.colorScheme == 'light' ? 'dark' : 'light');
  }

  public static init() {
    const cs = localStorage.getItem('colorScheme');
    if (cs != null) {
      store.state.colorScheme = cs;
    } else {
      try {
        store.state.colorScheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {
        store.state.colorScheme = 'light';
      }
    }
    ColorScheme.apply();
  }

  public static apply() {
    const css = document.documentElement.classList;
    if (store.state.colorScheme == 'light') {
      css.add('light');
      css.remove('dark');
    } else {
      css.add('dark');
      css.remove('light');
    }
  }
}
