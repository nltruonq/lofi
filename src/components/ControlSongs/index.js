import styles from './ControlSongs.module.scss';
import classNames from 'classnames/bind';

import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

const playpause = {
    pause: 'https://app.lofi.co/static/media/pause.ac7490b3bef8fffb1bfd2550201f4836.svg',
    play: 'https://app.lofi.co/static/media/play.18d46dd90ca12db32170bea8b2d46404.svg',
};

const listSongs = {
    songs: [
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_1.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_2.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_4.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_5.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_6.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_7.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_8.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_9.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_10.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_11.mp3',
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_13.mp3',
    ],
    keyboard: 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/effects/keyboard.mp3',
    storm: 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/effects/summer_storm.mp3',
    ocean: 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/effects/ocean.mp3',
};

function ControlSongs({ isStorm, isKeyboard }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const [trackIndex, setTrackIndex] = useState(0);

    const playRef = useRef();
    const stormRef = useRef();
    const keyboardRef = useRef();

    if (!stormRef.current) {
    } else if (isStorm && isKeyboard) {
        stormRef.current.play();
        keyboardRef.current.play();
    } else if (isStorm) {
        stormRef.current.play();
        keyboardRef.current.pause();
    } else if (isKeyboard) {
        keyboardRef.current.play();
        stormRef.current.pause();
    } else {
        keyboardRef.current.pause();
        stormRef.current.pause();
    }

    const handlePrevious = () => {
        if (trackIndex > 0) {
            setTrackIndex(trackIndex - 1);
        } else {
            setTrackIndex(listSongs.songs.length - 1);
        }
    };

    const handlePlay = () => {
        setIsPlaying(!isPlaying);

        if (isPlaying) {
            playRef.current.pause();
        } else {
            playRef.current.play();
        }
    };

    const handleNext = () => {
        if (trackIndex < listSongs.songs.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };
    return (
        <div className={cx('control')}>
            <img
                src="https://app.lofi.co/static/media/previous.3b3474665d6b8d95bb081b41d67270fe.svg"
                alt="previous"
                className={cx('previous')}
                onClick={handlePrevious}
            />
            <img
                src={isPlaying ? playpause.pause : playpause.play}
                alt="play"
                className={cx('play')}
                onClick={handlePlay}
            />
            <img
                src="https://app.lofi.co/static/media/next.9551d6f2d952cb6759a725aac878ab09.svg"
                alt="next"
                className={cx('next')}
                onClick={handleNext}
            />
            <audio
                src={listSongs.songs[trackIndex]}
                autoPlay
                onEnded={handleNext}
                className={cx('song')}
                ref={playRef}
            />
            <audio src={listSongs.storm} autoPlay loop className={cx('song')} ref={stormRef} />
            <audio src={listSongs.keyboard} autoPlay loop className={cx('song')} ref={keyboardRef} />
        </div>
    );
}

export default ControlSongs;
