import React from 'react';
import { WifiOff } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface OfflineBannerProps {
  isOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline }) => {
  const { t } = useThemeLanguage();

  if (isOnline) return null;

  return (
    <div className="bg-amber-500/20 border-b border-amber-500/30 text-amber-200 px-4 py-2 text-xs flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="font-medium">{t('offline_badge')}</span>
        <span className="text-amber-300/70 hidden sm:inline">
          · {t('offline_text')}
        </span>
      </div>
    </div>
  );
};
