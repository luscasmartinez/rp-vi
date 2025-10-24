import { User, Mail, Calendar, LogOut, Trophy, BookOpen, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';

export default function ProfileTab() {
  const { userProfile, signOut } = useAuth();
  const { teams, provas, reviewRequests } = useGame();

  const userTeam = teams.find(team => team.members.includes(userProfile?.uid || ''));
  
  // Calcular estatísticas do usuário
  const userSubmissions = provas.flatMap(prova => 
    prova.submissions.filter(sub => sub.studentId === userProfile?.uid)
  );
  const evaluatedSubmissions = userSubmissions.filter(sub => sub.points !== undefined && sub.isGradeVisible);
  const totalPoints = evaluatedSubmissions.reduce((acc, sub) => acc + (sub.points || 0), 0);
  const userReviewRequests = reviewRequests.filter(review => review.createdBy === userProfile?.uid);

  return (
    <div className="p-4 space-y-6 tab-content-padding">
      {/* Header do Perfil */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              {userProfile?.displayName || 'Usuário'}
            </h2>
            <p className="text-gray-600">{userProfile?.email}</p>
            {userTeam && (
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: userTeam.color }}
                />
                <span className="text-sm text-gray-600">{userTeam.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Estatísticas Pessoais */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{totalPoints}</p>
            <p className="text-xs text-gray-600">Pontos</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{userSubmissions.length}</p>
            <p className="text-xs text-gray-600">Atividades</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <AlertTriangle className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-800">{userReviewRequests.length}</p>
            <p className="text-xs text-gray-600">Revisões</p>
          </div>
        </div>
      </div>

      {/* Informações da Conta */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          Informações da Conta
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-800">{userProfile?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Função</p>
              <p className="font-medium text-gray-800 capitalize">{userProfile?.role}</p>
            </div>
          </div>
          {userTeam && (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: userTeam.color }}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">Equipe</p>
                <p className="font-medium text-gray-800">{userTeam.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ações da Conta */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações</h3>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
        >
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
