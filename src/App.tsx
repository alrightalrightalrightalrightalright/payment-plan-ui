import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CreditArchitect } from './pages/CreditArchitect';
import { TermDepositCalculator } from './pages/TermDepositCalculator';
import { Language } from './utils/translations';

function App() {
  const [language, setLanguage] = useState<Language>('tr');

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout language={language} setLanguage={setLanguage} />}>
          <Route index element={<CreditArchitect />} />
          <Route path="deposit" element={<TermDepositCalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


