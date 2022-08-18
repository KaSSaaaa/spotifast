import {
    faMagnifyingGlass,
    faGear,
    faShuffle,
    faBackwardStep,
    faCirclePlay,
    faForwardStep,
    faRepeat,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Vibrant from 'node-vibrant';
import { useState, useEffect } from 'react';
import style from './MusicPlayer.module.scss';

export function MusicPlayer() {
    const imageUrl = 'https://i.scdn.co/image/ab67616d00001e02e07e6833b024bdb852b96338';
    const [color, setColor] = useState('');
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        Vibrant.from(imageUrl)
            .getPalette()
            .then((val) => {
                setTextColor(val.LightVibrant?.getHex()!);
                setColor(val.DarkVibrant?.getHex()!);
                document.body.style.setProperty('--text', val.Vibrant?.getHex()!);
            });
    }, []);

    return (
        <>
            <div className={style['background']} />
            <div
                className={style['background-image']}
                style={{
                    backgroundImage: `
                linear-gradient(to bottom, ${textColor}44, ${color}),
                url("${imageUrl}")`,
                }}
            />
            <div className={style['foreground']}>
                <header>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                    <span className={style.bold}>My title</span>
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </header>
                <main>
                    <div className={style['audio-player-time-container']}>
                        <input type="range" min={0} max={100} />
                        <div className={style['audio-player-times']}>
                            <span>0:00</span>
                            <span>4:00</span>
                        </div>
                    </div>
                    <div className={style['audio-player-icons']}>
                        <FontAwesomeIcon icon={faShuffle} size={'lg'} />
                        <FontAwesomeIcon icon={faBackwardStep} size={'2x'} />
                        <FontAwesomeIcon icon={faCirclePlay} size={'3x'} className="primary" />
                        <FontAwesomeIcon icon={faForwardStep} size={'2x'} />
                        <FontAwesomeIcon icon={faRepeat} size={'lg'} />
                    </div>
                    <div className={style['audio-player-volume-container']}>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                        <input type="range" className={style['audio-player-volume']} min={0} max={100} />
                    </div>
                </main>
            </div>
        </>
    );
}
