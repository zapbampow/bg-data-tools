import React from 'react'
import { useAggregatorContext } from './AggregatorContext';

const width = window.innerWidth;

export default function useInitialAggregatorCards() {
    const { settings, setSettings } = useAggregatorContext();

    React.useEffect(() => {
        if (settings.length === 0) {
            if (width < 640) {
                setSettings(['recordedPlays']);
            } else if (width < 768) {
                setSettings(['recordedPlays', 'playCount']);
            } else if (width < 1024) {
                setSettings(['recordedPlays', 'playCount', 'daysPlayed']);
            } else {
                setSettings(['recordedPlays', 'playCount', 'daysPlayed', 'players']);
            }
        }
    }, [settings, setSettings]);

    return null;

}
