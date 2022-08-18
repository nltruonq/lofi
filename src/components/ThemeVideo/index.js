import styles from './ThemeVideo.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';

const cx = classNames.bind(styles);

const themeVideo = {
    dayTheme: 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/honolulu/Honolulu+Balcony+Day.mp4',
    dayStormTheme: 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/honolulu/Honolulu+Balcony+Rainy+Day.mp4',
    nightTheme: 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/honolulu/Honolulu+Balcony+Night.mp4',
    nightStormTheme:
        'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/honolulu/Honolulu+Balcony+Rainy+Night.mp4',
};

function ThemeVideo({ themeDefault, isStorm }) {
    const dayRef = useRef();
    const dayStormRef = useRef();
    const nightRef = useRef();
    const nightStormRef = useRef();

    if (!dayRef.current) {
    } else if (themeDefault && !isStorm) {
        dayRef.current.style.opacity = '1';

        dayStormRef.current.style.opacity = '0';
        nightRef.current.style.opacity = '0';
        nightStormRef.current.style.opacity = '0';
    } else if (themeDefault && isStorm) {
        dayStormRef.current.style.opacity = '1';

        dayRef.current.style.opacity = '0';
        nightRef.current.style.opacity = '0';
        nightStormRef.current.style.opacity = '0';
    } else if (!themeDefault && !isStorm) {
        nightRef.current.style.opacity = '1';

        dayRef.current.style.opacity = '0';
        dayStormRef.current.style.opacity = '0';
        nightStormRef.current.style.opacity = '0';
    } else {
        nightStormRef.current.style.opacity = '1';

        dayStormRef.current.style.opacity = '0';
        nightRef.current.style.opacity = '0';
        dayRef.current.style.opacity = '0';
    }

    return (
        <>
            <video
                autoPlay
                muted
                loop
                preload="auto"
                playsInline
                className={cx('video-bg')}
                style={{ opacity: 1 }}
                ref={dayRef}
            >
                <source src={themeVideo.dayTheme} type="video/mp4" />
            </video>
            <video autoPlay muted loop playsInline className={cx('video-bg')} style={{ opacity: 0 }} ref={dayStormRef}>
                <source src={themeVideo.dayStormTheme} type="video/mp4" />
            </video>
            <video autoPlay muted loop playsInline className={cx('video-bg')} style={{ opacity: 0 }} ref={nightRef}>
                <source src={themeVideo.nightTheme} type="video/mp4" />
            </video>
            <video
                autoPlay
                muted
                loop
                playsInline
                className={cx('video-bg')}
                style={{ opacity: 0 }}
                ref={nightStormRef}
            >
                <source src={themeVideo.nightStormTheme} type="video/mp4" />
            </video>
        </>
    );
}

export default ThemeVideo;
