import './App.scss';
import { Provider } from 'inversify-react';
import { createContainer } from './lib/Container';
import { useEffect, useState } from 'react';
import { addSdkToBody } from './addSdkToBody';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Vibrant from 'node-vibrant';
import { faBackwardStep, faCirclePlay, faForwardStep, faGear, faMagnifyingGlass, faRepeat, faShuffle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

export function App() {
  useEffect(addSdkToBody, []);
  const imageUrl = "https://i.scdn.co/image/ab67616d00001e02e07e6833b024bdb852b96338";
  const [color, setColor] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    Vibrant.from(imageUrl).getPalette()
      .then((val) => {
        setTextColor(val.LightVibrant?.getHex()!);
        setColor(val.DarkVibrant?.getHex()!);
        document.body.style.setProperty('--text', val.Vibrant?.getHex()!);
      })
  }, []);

  return (
    <Provider container={createContainer}>
      <div className="background"/>
      <div className="background-image" style={{
        backgroundImage: `
        linear-gradient(to bottom, ${textColor}44, ${color}),
        url("${imageUrl}")`
      }}/>
      <div className="foreground">
        <header>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/>
          <span className="bold">My title</span>
          <FontAwesomeIcon icon={faGear} size="lg"/>
        </header>
        <main>
          <div className="audio-player-time-container">
            <input type="range" className="slider" min={0} max={100}/>
            <div className="audio-player-times">
              <span>0:00</span>
              <span>4:00</span>
            </div>
          </div>
          <div className="audio-player-icons">
            <FontAwesomeIcon icon={faShuffle} size={"lg"}/>
            <FontAwesomeIcon icon={faBackwardStep} size={"2x"}/>
            <FontAwesomeIcon icon={faCirclePlay} size={"3x"} className="primary"/>
            <FontAwesomeIcon icon={faForwardStep} size={"2x"}/>
            <FontAwesomeIcon icon={faRepeat} size={"lg"}/>
          </div>
          <div className="audio-player-volume-container">
            <FontAwesomeIcon icon={faVolumeHigh}/>
            <input type="range" className="slider audio-player-volume" min={0} max={100}/>
          </div>
        </main>
      </div>
    </Provider>
  )
}
