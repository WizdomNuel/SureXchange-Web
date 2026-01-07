
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Shield, History, Settings, Mail, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0B132B]">
        <div className="w-12 h-12 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const creationDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B132B] pt-12 pb-24 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#0B132B] dark:text-white mb-2">My Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your profile and track your exchange activity.</p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-900/30">
            <Shield className="w-4 h-4 text-[#007BFF]" />
            <span className="text-xs font-bold text-[#007BFF] uppercase tracking-wider">Verified Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-[#1C2541] rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/10 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-[#007BFF] rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-200 dark:shadow-none">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-[#1C2541]"></div>
              </div>
              <h3 className="text-xl font-bold text-[#0B132B] dark:text-white mb-1 truncate">{user.email?.split('@')[0]}</h3>
              <p className="text-sm text-gray-400 mb-6 truncate">{user.email}</p>
              
              <div className="space-y-4 text-left border-t border-gray-50 dark:border-white/5 pt-6">
                <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                  <Mail className="w-4 h-4 text-[#007BFF]" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-[#007BFF]" />
                  <span className="text-sm">Joined {creationDate}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0B132B] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#007BFF] rounded-full blur-3xl opacity-20 transition-all group-hover:opacity-40"></div>
              <h4 className="font-bold mb-4 relative z-10">Need Assistance?</h4>
              <p className="text-sm text-gray-400 mb-6 relative z-10 leading-relaxed">Our premium support team is available 24/7 to help with bulk transactions.</p>
              <button className="w-full bg-[#007BFF] py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-white hover:text-[#0B132B] transition-all relative z-10">
                <span>Contact Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Total Exchanges', val: '0', icon: <History className="w-5 h-5" /> },
                { label: 'Active Quotes', val: '0', icon: <ArrowRight className="w-5 h-5" /> },
                { label: 'Saved Currencies', val: '4', icon: <Settings className="w-5 h-5" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-[#1C2541] p-6 rounded-3xl border border-gray-100 dark:border-white/10 flex flex-col justify-between">
                  <div className="text-gray-400 mb-4">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-black text-[#0B132B] dark:text-white">{stat.val}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Placeholder Activity */}
            <div className="bg-white dark:bg-[#1C2541] rounded-[2.5rem] border border-gray-100 dark:border-white/10 overflow-hidden shadow-xl shadow-gray-200/20 dark:shadow-none">
              <div className="p-8 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0B132B] dark:text-white">Recent Activity</h3>
                <button className="text-[#007BFF] text-xs font-bold hover:underline">View All</button>
              </div>
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <History className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                </div>
                <h4 className="text-lg font-bold text-[#0B132B] dark:text-white mb-2">No transactions yet</h4>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mb-8">Start your first currency exchange to see your history here.</p>
                <button 
                  onClick={() => navigate('/rates')}
                  className="inline-flex items-center space-x-2 text-[#007BFF] font-bold hover:underline"
                >
                  <span>Explore Market Rates</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Account Settings Placeholder */}
            <div className="bg-white dark:bg-[#1C2541] rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10">
              <h3 className="text-xl font-bold text-[#0B132B] dark:text-white mb-8">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-[#007BFF]">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm text-[#0B132B] dark:text-white">Security & Password</div>
                      <div className="text-xs text-gray-400">Update your account password</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#007BFF] transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-500">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm text-[#0B132B] dark:text-white">Preference</div>
                      <div className="text-xs text-gray-400">Currency display and notification settings</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
