import { useState, type FormEvent } from 'react';
import { useLanguage } from './i18n';

type Props = { onLogin: (username: string, password: string) => Promise<void> };

export function LoginView({ onLogin }: Props) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await onLogin(username, password);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : t('auth.invalid'));
    } finally {
      setBusy(false);
    }
  }

  return <main className="login-shell">
    <section className="login-card" aria-labelledby="login-title">
      <div className="login-brand">a</div>
      <p className="eyebrow">aaaaalan · 本地 AI 图片工作台</p>
      <h1 id="login-title">{t('auth.title')}</h1>
      <p className="login-subtitle">{t('auth.subtitle')}</p>
      <form onSubmit={submit}>
        <label className="field"><span>{t('auth.username')}</span><input value={username} onChange={event => setUsername(event.target.value)} autoComplete="username" required /></label>
        <label className="field"><span>{t('auth.password')}</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        {error && <p className="login-error" role="alert">{error}</p>}
        <button className="button primary login-submit" type="submit" disabled={busy}>{busy ? t('auth.loggingIn') : t('auth.login')}</button>
      </form>
    </section>
  </main>;
}
