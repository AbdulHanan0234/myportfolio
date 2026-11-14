// SSR entry: renders the full app to a static HTML string at build time so
// crawlers that don't execute JavaScript (and Google's first HTML pass) see
// the complete page content.
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './App';

export function render() {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(sheet.collectStyles(<App />));
    const css = sheet.getStyleTags();
    return { html, css };
  } finally {
    sheet.seal();
  }
}
