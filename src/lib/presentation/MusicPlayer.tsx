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
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { IColorPalette } from '../domain/colorPalette/IColorPalette';
import style from './MusicPlayer.module.scss';

export const MusicPlayer = observer(() => {
    const imageUrl = 'https://i.scdn.co/image/ab67616d00001e02e07e6833b024bdb852b96338';
    const colorPalette = useInjection<IColorPalette>(IColorPalette.$);

    useEffect(() => {
        colorPalette.from(imageUrl).then(() => document.body.style.setProperty('--text', colorPalette.vibrant));
    }, [colorPalette]);

    return (
        <>
            <div className={style['background']} />
            <div
                className={style['background-image']}
                style={{
                    backgroundImage: `
                linear-gradient(to bottom, ${colorPalette.light}44, ${colorPalette.dark}),
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
});
