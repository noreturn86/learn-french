import '../index.css';
import { frenchVerbs } from '../assets/verbList';
import { useState, useEffect } from 'react';

const TABS = ['Verbs', 'Adjectives', 'Nouns', 'Expressions'];

export default function FrenchVerbs() {
    const [displayedWordIndex, setDisplayedWordIndex] = useState(null);
    const [translationShowing, setTranslationShowing] = useState(false);
    const [learnedWordIndices, setLearnedWordIndices] = useState([]);
    const [englishFirst, setEnglishFirst] = useState(true);

    const [activeTab, setActiveTab] = useState('Verbs');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Now frenchVerbs is an array of objects
    const french = frenchVerbs.map(v => v.infinitiveFr);
    const english = frenchVerbs.map(v => v.infinitiveEn);

    useEffect(() => {
        goToNextWord();
    }, []);

    function goToNextWord() {
        const availableIndices = french
            .map((_, i) => i)
            .filter(i => !learnedWordIndices.includes(i));

        if (availableIndices.length === 0) return;

        const randomIndex =
            availableIndices[Math.floor(Math.random() * availableIndices.length)];

        setDisplayedWordIndex(randomIndex);
        setTranslationShowing(false);
    }

    function addToLearnedList() {
        if (
            displayedWordIndex !== null &&
            !learnedWordIndices.includes(displayedWordIndex)
        ) {
            setLearnedWordIndices(prev => [...prev, displayedWordIndex]);
            goToNextWord();
        }
    }

    function removeFromLearned(index) {
        setLearnedWordIndices(prev => prev.filter(i => i !== index));
    }

    function showLearnedWord(index) {
        setDisplayedWordIndex(index);
        setTranslationShowing(false);
    }

    const primaryWord =
        displayedWordIndex !== null
            ? englishFirst
                ? english[displayedWordIndex]
                : french[displayedWordIndex]
            : '';

    const secondaryWord =
        displayedWordIndex !== null
            ? englishFirst
                ? french[displayedWordIndex]
                : english[displayedWordIndex]
            : '';

    const isFrenchPrimary = !englishFirst;
    const isFrenchSecondary = englishFirst && translationShowing;

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
                                    ${
                                        activeTab === tab
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

            {/* Main */}
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="relative w-full max-w-3xl rotate-[0.5deg] bg-gradient-to-br from-white via-indigo-50 to-pink-50 rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25)] p-10">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute -left-3 top-6 md:hidden bg-indigo-500 text-white p-3 rounded-full shadow-lg"
                    >
                        ☰
                    </button>

                    <div className="mb-6 text-sm uppercase tracking-widest text-gray-500">
                        {activeTab}
                    </div>

                    {/* Word card */}
                    <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-inner border border-white mb-8 text-center">

                        <div className="flex items-center justify-center gap-3 mb-4">
                            <h2 className="text-6xl font-extrabold text-gray-800">
                                {primaryWord}
                            </h2>

                            {isFrenchPrimary && (
                                <span className="text-3xl text-gray-500">🔊</span>
                            )}
                        </div>

                        <div
                            className={`flex items-center justify-center gap-3 text-2xl font-semibold transition-all duration-500 ${
                                translationShowing
                                    ? 'opacity-100 scale-100 text-emerald-700'
                                    : 'opacity-0 scale-95'
                            }`}
                        >
                            {translationShowing && (
                                <>
                                    <span>{secondaryWord}</span>
                                    {isFrenchSecondary && (
                                        <span className="text-2xl">🔊</span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
                        <button
                            onClick={() => setTranslationShowing(s => !s)}
                            className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 px-6 py-4 font-bold text-white shadow-lg hover:scale-105 transition"
                        >
                            {translationShowing ? 'Hide' : 'Reveal'}
                        </button>

                        <button
                            onClick={goToNextWord}
                            className="rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 px-6 py-4 font-bold text-white shadow-lg hover:scale-105 transition"
                        >
                            Next →
                        </button>

                        <button
                            onClick={addToLearnedList}
                            className="rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 px-6 py-4 font-bold text-white shadow-lg hover:scale-105 transition"
                        >
                            ✓ Learned
                        </button>

                        <button
                            onClick={() => {
                                setEnglishFirst(s => !s);
                                setTranslationShowing(false);
                            }}
                            className="rounded-2xl bg-gradient-to-br from-rose-500 to-pink-400 px-6 py-4 font-bold text-white shadow-lg hover:scale-105 transition"
                        >
                            ⇄ Switch
                        </button>
                    </div>

                    {/* Learned list */}
                    <div className="bg-white/60 backdrop-blur rounded-3xl p-6 shadow-inner">
                        <h3 className="text-sm uppercase tracking-widest text-gray-600 mb-4">
                            Learned ({learnedWordIndices.length})
                        </h3>

                        <div className="max-h-40 overflow-y-auto flex flex-wrap gap-3 pr-2">
                            {learnedWordIndices.map(i => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-pink-200 via-amber-200 to-lime-200 text-gray-800 shadow-md"
                                >
                                    <button
                                        onClick={() => showLearnedWord(i)}
                                        className="hover:underline"
                                    >
                                        {french[i]}
                                    </button>

                                    <button
                                        onClick={() => removeFromLearned(i)}
                                        className="text-gray-600 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
