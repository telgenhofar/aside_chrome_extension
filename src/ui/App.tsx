import { mountInShadow } from './mount';
import { asides, tooltip, viewer } from './store';
import { Tooltip } from './Tooltip';
import { Modal } from './Modal';
import { MarginIcons } from './MarginIcons';
import { TextViewer } from './TextViewer';
import { ImageLightbox } from './ImageLightbox';
import asideCss from './aside.css?inline';
import type { ProviderTheme } from '../providers/provider';

/** Root of Aside's UI layer. Renders whichever pieces the store currently wants. */
function App() {
  const t = tooltip.value;
  const all = asides.value;
  const v = viewer.value;
  return (
    <>
      {t && <Tooltip {...t} />}
      {all
        .filter((a) => a.open)
        .map((a) => (
          <Modal key={a.id} aside={a} />
        ))}
      <MarginIcons entries={all.filter((a) => !a.open)} />
      {v?.kind === 'text' && <TextViewer attachment={v.attachment} />}
      {v?.kind === 'image' && <ImageLightbox attachment={v.attachment} />}
    </>
  );
}

/** Mount Aside's UI once, inside a style-isolated Shadow DOM. */
export function mountApp(theme: ProviderTheme) {
  mountInShadow(<App />, asideCss, theme);
}
