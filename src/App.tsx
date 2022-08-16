import './App.scss';
import { Provider } from 'inversify-react';
import { createContainer } from './lib/Container';
import { useEffect } from 'react';
import { addSdkToBody } from './addSdkToBody';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faCirclePlay, faForwardStep, faGear, faMagnifyingGlass, faRepeat, faShuffle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

export function App() {
  useEffect(addSdkToBody, []);

  return (
    <div  style={{
      width: 400,
      height: 150,
      background: "var(--background)",
      padding: "1em"
    }}>
      <Provider container={createContainer}>
        <header>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"/>
          <span>My title</span>
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
      </Provider>
    </div>
  )
}
