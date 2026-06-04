import type { Provider } from './provider';
import { claudeProvider } from './claude';

const providers: readonly Provider[] = [claudeProvider];

const matchesHost = (provider: Provider, host: string): boolean =>
  provider.hosts.some((h) => host === h || host.endsWith(`.${h}`));

/** The provider matching the current page, or null if the site is unsupported. */
export function getActiveProvider(): Provider | null {
  return providers.find((p) => matchesHost(p, location.hostname)) ?? null;
}

/** True if any registered provider handles `hostname` (exact or subdomain match). */
export function isSupportedHost(hostname: string): boolean {
  return providers.some((p) => matchesHost(p, hostname));
}
