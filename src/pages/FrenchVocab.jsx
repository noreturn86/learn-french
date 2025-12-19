import '../index.css';
import { frenchVerbs } from '../assets/verbList';
import { frenchAdjectives } from '../assets/adjectiveList';
import { useState, useEffect } from 'react';

export default function FrenchVocab({ activeTab, openSidebar }) {
    const [displayedWordIndex, setDisplayedWordIndex] = useState(null);
    const [translationShowing, setTranslationShowing] = useState(false);
    const [learnedVerbIndices, setLearnedVerbIndices] = useState([]);
    const [learnedAdjectiveIndices, setLearnedAdjectiveIndices] = useState([]);
    const [learnedNounIndices, setLearnedNounIndices] = useState([]);
    const [englishFirst, setEnglishFirst] = useState(false);
    const [listInUse, setListInUse] = useState(frenchVerbs);
    const [learnedWordsInUse, setLearnedWordsInUse] = useState(learnedVerbIndices);

    useEffect(() => {
        goToNextWord();
    }, []);

    function goToNextWord() {
        //filter out learned words
        const availableIndices = listInUse
            .map((_, i) => i)
            .filter(i => !learnedWordsInUse.includes(i));

        //all words have been lerned
        if (availableIndices.length === 0) return;

        //pick a random unlearned word
        const randomIndex =
            availableIndices[Math.floor(Math.random() * availableIndices.length)];

        setDisplayedWordIndex(randomIndex);
        setTranslationShowing(false);
    }

    function addToLearnedList() {
        if (
            displayedWordIndex !== null &&
            !learnedWordsInUse.includes(displayedWordIndex)
        ) {
            //add index to learned list
            setLearnedWordsInUse(prev => [...prev, displayedWordIndex]);
            goToNextWord();
        }
    }

    function removeFromLearned(index) {
        setLearnedWordsInUse(prev => prev.filter(i => i !== index));
    }

    function showLearnedWord(index) {
        setDisplayedWordIndex(index);
        setTranslationShowing(false);
    }

    const primaryWord =
        displayedWordIndex !== null
            ? englishFirst
                ? frenchVerbs[displayedWordIndex].infinitiveEn
                : frenchVerbs[displayedWordIndex].infinitiveFr
            : '';

    const secondaryWord =
        displayedWordIndex !== null
            ? englishFirst
                ? frenchVerbs[displayedWordIndex].infinitiveFr
                : frenchVerbs[displayedWordIndex].infinitiveEn
            : '';

    const isFrenchPrimary = !englishFirst;
    const isFrenchSecondary = englishFirst && translationShowing;

    return (
        <div className="relative w-full max-w-3xl rotate-[0.5deg] bg-gradient-to-br from-white via-indigo-50 to-pink-50 rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.25)] p-10">

            {/* Mobile menu button */}
            <button
                onClick={openSidebar}
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
                    English ⇄ French
                </button>
            </div>

            {/* Learned list */}
            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 shadow-inner">
                <h3 className="text-sm uppercase tracking-widest text-gray-600 mb-4">
                    Learned ({learnedWordsInUse.length})
                </h3>

                <div className="max-h-40 overflow-y-auto flex flex-wrap gap-3 pr-2">
                    {learnedWordsInUse.map(i => (
                        <div
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-pink-200 via-amber-200 to-lime-200 text-gray-800 shadow-md"
                        >
                            <button
                                onClick={() => showLearnedWord(i)}
                                className="hover:underline"
                            >
                                {listInUse[i].infinitiveFr}
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
    );
}
