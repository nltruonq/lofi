import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

const themeIcon = {
    dayIcon: 'https://app.lofi.co/static/media/night.0e9aec7405cc2f74e26970aeab6cec31.svg',
    nightIcon: 'https://app.lofi.co/static/media/day.5accee77369b956360cc75a7d7a5ea33.svg',
};

const volume = {
    mute: 'https://app.lofi.co/icons/volume-muted.svg',
    unmute: 'https://app.lofi.co/icons/volume-active.svg',
};

function Header({ handleTheme }) {
    const [themeDefault, setThemeDefault] = useState(true); //default is daytheme

    const [mute, setMute] = useState(false);

    const [fullscreen, setFullscreen] = useState(false);

    const btnRef = useRef();

    const handleToggleTheme = () => {
        setThemeDefault(!themeDefault);
        if (!themeDefault) {
            //themeDefault chua doi? nen co dau' !
            btnRef.current.style.backgroundColor = '#f3a952';

            btnRef.current.children[0].style.transform = 'translateX(0px)';
            btnRef.current.children[1].style.transform = 'translateX(0px)';
        } else {
            btnRef.current.style.backgroundColor = '#bfbfbf';

            btnRef.current.children[0].style.transform = 'translateX(30px)';
            btnRef.current.children[1].style.transform = 'translateX(-25px)';
        }
        handleTheme();
    };

    const handleMute = () => {
        setMute(!mute);
        [...document.querySelectorAll('audio, video')].forEach((el) => (el.muted = !mute));
    };

    const handleFullscreen = () => {
        setFullscreen(!fullscreen);
        if (fullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    // time
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Link to="/">
                <img src="https://app.lofi.co/icons/logo.gif" className={cx('image')} alt="lofi" />
            </Link>
            <div className={cx('content')}>
                <div className={cx('time')}>
                    <p>
                        {today.getHours()} : {today.getMinutes()} VN
                    </p>
                </div>
                <button className={cx('theme-toggle')} onClick={handleToggleTheme} ref={btnRef}>
                    <img
                        src={themeDefault ? themeIcon.dayIcon : themeIcon.nightIcon}
                        alt="theme"
                        className={cx('theme-icon')}
                    />
                    <span className={cx('circle-toggle')} />
                </button>
                <div className={cx('actions')}>
                    <img src="https://app.lofi.co/icons/new/share.svg" className={cx('share', 'w-32')} alt="share" />
                    <img
                        src={mute ? volume.mute : volume.unmute}
                        className={cx('volume', 'w-32')}
                        alt="share"
                        onClick={handleMute}
                    />
                    <img
                        src="https://app.lofi.co/icons/new/fullscreen.svg"
                        className={cx('fullscreen', 'w-32')}
                        alt="share"
                        onClick={handleFullscreen}
                    />
                    <div className={cx('menu')}>
                        <img
                            src="https://app.lofi.co/icons/new/menu.svg"
                            className={cx('menu-icon', 'w-32')}
                            alt="menu"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
