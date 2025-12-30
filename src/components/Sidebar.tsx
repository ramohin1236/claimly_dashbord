import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navItems = [
    { icon: '/dashbord.svg', label: 'Dashboard', path: '/' },
    { icon: '/manageUser.svg', label: 'Manage Users', path: '/manage_users' },
    { icon: '/manageClaims.svg', label: 'Manage Claims', path: '/manage_claims' },
    { icon: '/claimlyGuides.svg', label: 'Claimly Guides', path: '/claimly_guides' },
    { icon: '/manageFaq.svg', label: 'Manage FAQ', path: '/manage_faq' },
    { icon: '/termsCondition.svg', label: 'Terms & Conditions', path: '/terms_conditions' },
    { icon: '/privacyPolicy.svg', label: 'Privacy Policy', path: '/privacy_policy' },
    { icon: '/manageProgile.svg', label: 'Manage Profile', path: '/manage_profile' }
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 text-slate-800">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Claimly
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                ? 'bg-[#2563EB] border border-blue-100'
                : 'hover:bg-slate-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'bg-white' : 'bg-gradient-to-r from-[#1E293B] to-[#2563EB]'}`}
                  style={{
                    maskImage: `url(${item.icon})`,
                    WebkitMaskImage: `url(${item.icon})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain'
                  }}
                />
                <span className={`font-medium ${isActive ? 'text-white' : 'bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div >
  );
}
