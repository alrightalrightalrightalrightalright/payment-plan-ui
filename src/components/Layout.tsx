import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Language, translations } from '../utils/translations';

interface LayoutProps {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

export const Layout: React.FC<LayoutProps> = ({ language, setLanguage }) => {
    const t = translations[language];
    const location = useLocation();

    return (
        <div className="container" style={{ position: 'relative' }}>
            <div style={{
                gridColumn: '1 / -1',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1rem',
                background: 'var(--bg-color)',
                borderRadius: 'var(--clay-radius)',
                boxShadow: 'var(--clay-shadow)'
            }}>
                <nav style={{ display: 'flex', gap: '1rem' }}>
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            color: location.pathname === '/' ? 'var(--primary-color)' : 'var(--text-color)',
                            fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                        }}
                    >
                        {t.navCredit}
                    </Link>
                    <Link
                        to="/deposit"
                        style={{
                            textDecoration: 'none',
                            color: location.pathname === '/deposit' ? 'var(--primary-color)' : 'var(--text-color)',
                            fontWeight: location.pathname === '/deposit' ? 'bold' : 'normal'
                        }}
                    >
                        {t.navDeposit}
                    </Link>
                </nav>

                <button
                    onClick={() => setLanguage(prev => prev === 'tr' ? 'en' : 'tr')}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '1rem',
                        border: 'none',
                        background: 'var(--bg-color)',
                        boxShadow: 'var(--clay-shadow)',
                        color: 'var(--primary-color)',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    {language === 'tr' ? 'EN' : 'TR'}
                </button>
            </div>

            <Outlet context={{ language }} />
        </div>
    );
};
