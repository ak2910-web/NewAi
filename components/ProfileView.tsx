import React from 'react';
import { UserIcon } from './icons/UserIcon';

interface ProfileViewProps {
    onLogout: () => void;
}

const ProfileField: React.FC<{label: string; value: string;}> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3">
        <span className="text-sm text-zinc-500">{label}</span>
        <div className="flex items-center">
            <span className="text-sm font-medium text-zinc-800">{value}</span>
            <button className="ml-4 text-xs font-semibold text-amber-600 hover:underline">Change</button>
        </div>
    </div>
);


export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
        <header className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-zinc-200 mb-4 flex items-center justify-center">
                <UserIcon className="w-16 h-16 text-zinc-400" />
            </div>
            <h1 className="text-xl font-bold">Arjun Sharma</h1>
            <p className="text-sm text-zinc-500">Vedic Scholar</p>
            <button className="mt-4 px-5 py-2 bg-amber-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-amber-600 transition-colors">
                Edit Profile
            </button>
        </header>

        <section className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm divide-y divide-zinc-200">
             <h2 className="text-base font-semibold p-2">Account</h2>
             <ProfileField label="Email" value="arjun.sharma@email.com" />
             <ProfileField label="Phone" value="+91 98765 43210" />
             <ProfileField label="Password" value="••••••••" />
        </section>

        <section className="mt-6 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm divide-y divide-zinc-200">
            <h2 className="text-base font-semibold p-2">Settings</h2>
            <div className="py-3 flex justify-between items-center">
                <span className="text-sm text-zinc-500">Notifications</span>
                 <input type="checkbox" className="toggle toggle-warning" defaultChecked />
            </div>
             <div className="py-3 flex justify-between items-center">
                <span className="text-sm text-zinc-500">Dark Mode</span>
                 <input type="checkbox" className="toggle toggle-warning" />
            </div>
        </section>

        <button 
            onClick={onLogout}
            className="w-full mt-8 py-3 text-red-600 font-semibold bg-white border border-zinc-200 rounded-lg shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
        >
            Logout
        </button>
    </div>
  );
};