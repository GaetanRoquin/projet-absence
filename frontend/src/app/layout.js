import { GlobalStatsProvider } from '@/context/GlobalStatsContext';
import { FiltersProvider }     from '@/context/FiltersContext';
import './globals.css';

export const metadata = { title: 'Dashboard Absentéisme' };

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <body className='bg-gray-100 text-gray-900'>
        <GlobalStatsProvider>
          <FiltersProvider>
            {children}
          </FiltersProvider>
        </GlobalStatsProvider>
      </body>
    </html>
  );
}
