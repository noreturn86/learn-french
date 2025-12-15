import { frenchVerbs } from '../assets/verbList';
import { useState, useEffect } from 'react';

export default function FrenchVerbs() {
    const [displayedWordIndex, setDisplayedWordIndex] = useState(null);
    const [translationShowing, setTranslationShowing] = useState(false);
    const [learnedWordIndices, setLearnedWordIndices] = useState([]);

    useEffect(() => {
        goToNextWord();
    }, []);

    const french = Object.keys(frenchVerbs);
    const english = Object.values(frenchVerbs);

    function goToNextWord() {
        const randomIndex = Math.floor(Math.random() * french.length);
        setDisplayedWordIndex(randomIndex);
    }

    function addToLearnedList() {
        if (!learnedWordIndices.includes(displayedWordIndex)) {
            setLearnedWordIndices(prev => [...prev, displayedWordIndex]);
        }
    }

    return (
        <div>
            <h2>{french[displayedWordIndex]}</h2>
            <div className='flex items-center gap-4'>
                {
                    !translationShowing && (
                        <button
                            className='border-2 rounded-lg bg-blue-400'
                            onClick={() => setTranslationShowing(true)}
                        >
                            Show answer
                        </button>
                    )
                }
                <button
                    className='border-2 rounded-lg bg-blue-400'
                    onClick={goToNextWord}
                >
                    Next
                </button>
                <button
                    className='border-2 rounded-lg bg-blue-400'
                    onClick={addToLearnedList()}
                >
                    Mark as learned
                </button>
            </div>
            <div>
                {translationShowing ? english[displayedWordIndex] : ''}
            </div>
            <div className='flex items-center gap-4'>
                {
                    learnedWordIndices.map(i => (
                        <h2>{french[i]}</h2>
                    ))
                }
            </div>
        </div>

    );
}
