import '../index.css';
import { useState } from 'react';
import FrenchVocab from './FrenchVocab';

const TABS = ['Verbs', 'Adjectives', 'Nouns', 'Expressions'];

export default function Sidebar() {
    const [activeTab, setActiveTab] = useState('Verbs');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fde68a,_#fbcfe8,_#bfdbfe)] flex">

            {/* Sidebar */}
            <aside
                className={`
                    fixed z-40 inset-y-0 left-0 w-64
                    bg-gradient-to-b from-amber-200/90 via-rose-200/90 to-indigo-200/90
                    backdrop-blur-xl
                    border-r border-white/40
                    shadow-[5px_0_30px_-10px_rgba(0,0,0,0.35)]
                    transform transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:relative md:translate-x-0
                `}
            >
                <div className="p-6">
                    <h2 className="text-lg font-extrabold mb-6 text-gray-800 tracking-wide">
                        📚 Vocabulary
                    </h2>

                    <nav className="space-y-2">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setSidebarOpen(false);
                                }}
                                className={`
                                    w-full text-left px-4 py-3 rounded-xl font-bold transition
                                    ${activeTab === tab
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.02]'
                                        : 'bg-white/40 text-gray-800 hover:bg-white/70'
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                />
            )}

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <FrenchVocab
                    activeTab={activeTab}
                    openSidebar={() => setSidebarOpen(true)}
                />
            </main>
        </div>
    );
}
