import { Users, BookOpen, Trophy, User, AlertTriangle } from 'lucide-react';

interface SideNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  reviewCount?: number;
}

export default function SideNavigation({ activeTab, onTabChange, reviewCount = 0 }: SideNavigationProps) {
  const tabs = [
    {
      id: 'team',
      label: 'Equipe',
      icon: Users,
      color: 'text-blue-600',
      activeColor: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'provas',
      label: 'Provas',
      icon: BookOpen,
      color: 'text-green-600',
      activeColor: 'bg-green-50 border-green-200'
    },
    {
      id: 'ranking',
      label: 'Ranking',
      icon: Trophy,
      color: 'text-yellow-600',
      activeColor: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'reviews',
      label: 'Revisões',
      icon: AlertTriangle,
      color: 'text-orange-600',
      activeColor: 'bg-orange-50 border-orange-200',
      badge: reviewCount > 0 ? reviewCount : undefined
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      color: 'text-purple-600',
      activeColor: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <nav className="hidden md:block w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive 
                    ? `${tab.activeColor} border-l-4 ${tab.color} font-medium` 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? tab.color : 'text-gray-500'}`} />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

