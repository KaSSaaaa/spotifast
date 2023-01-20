<script lang="ts">
    import Fa from 'svelte-fa';
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
    import { autorun } from 'mobx';
    import { getInjection } from '../../svelte-inversify';
    import { IColorPalette } from '../../domain/colorPalette/IColorPalette';
    import { IPlayer } from '../../domain/player/IPlayer';

    let light: string;
    let dark: string;

    const colorPalette = getInjection<IColorPalette>(IColorPalette.$);
    const player = getInjection<IPlayer>(IPlayer.$);
    console.log(colorPalette);

    let imageUrl = 'https://i.scdn.co/image/ab67616d00001e02e07e6833b024bdb852b96338';

    $: autorun(async () => {
        await colorPalette.from(imageUrl);
        light = colorPalette.light + '44';
        dark = colorPalette.dark;

        document.body.style.setProperty('--text', colorPalette.vibrant);
    });
</script>

<div
    style="
    --light: {light};
    --dark: {dark};
"
/>
<div class="background" />
<div
    class="background-image"
    style="background-image: linear-gradient(to bottom, {light}, {dark}), url('{imageUrl}')"
/>
<div class="foreground">
    <header>
        <Fa icon={faMagnifyingGlass} size="lg" />
        <span class="bold">My title</span>
        <Fa icon={faGear} size="lg" />
    </header>
    <main>
        <div class="audio-player-time-container">
            <input type="range" min={0} max={100} />
            <div class="audio-player-times">
                <span>0:00</span>
                <span>4:00</span>
            </div>
        </div>
        <div class="audio-player-icons">
            <Fa icon={faShuffle} size={'lg'} />
            <Fa icon={faBackwardStep} size={'2x'} />
            <Fa icon={faCirclePlay} size={'3x'} />
            <Fa icon={faForwardStep} size={'2x'} />
            <Fa icon={faRepeat} size={'lg'} />
        </div>
        <div class="audio-player-volume-container">
            <Fa icon={faVolumeHigh} />
            <input type="range" class="audio-player-volume" min={0} max={100} />
        </div>
    </main>
</div>

<style lang="scss">
    header {
        display: flex;
        justify-content: space-between;
        padding: 0 0.5em;
    }

    span {
        filter: drop-shadow(0.1em 0.1em 0.3em black);

        &.bold {
            font-weight: bold;
        }
    }

    .background {
        position: absolute;
        height: 100%;
        width: 100%;
        max-width: 400px;
        max-height: 170px;
        background: var(--background);
        z-index: -2;
    }

    .background-image {
        position: absolute;
        height: 100%;
        width: 100%;
        max-width: 400px;
        max-height: 170px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: -1;
    }

    .foreground {
        padding: 8px;
    }

    main {
        display: flex;
        flex-direction: column;
        padding: 1em 0;

        .audio-player-time-container {
            display: flex;
            flex-direction: column;

            .audio-player-times {
                display: flex;
                justify-content: space-between;
                padding: 0 0.3em;
                font-size: 0.85em;
            }
        }

        .audio-player-icons {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0.5em 1em;
        }

        .audio-player-volume-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .audio-player-volume {
                margin-left: 0.5em;
                width: 7em;
            }
        }
    }
</style>
