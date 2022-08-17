import { useState } from 'react';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import Header from '../../components/Header';
import ThemeVideo from '../../components/ThemeVideo';
import ControlSongs from '../../components/ControlSongs';

const cx = classNames.bind(styles);

const tooltip1 = <Tooltip id="tooltip-circle-btn">Summer storm</Tooltip>;
const tooltip2 = <Tooltip id="tooltip-circle-btn">Keyboard</Tooltip>;

function Home() {
    const [themeDefault, setThemeDefault] = useState(true);

    const [storm, setStorm] = useState(false);
    const [keyboard, setKeyBoard] = useState(false);

    const handleTheme = () => {
        setThemeDefault(!themeDefault);
    };

    const handleThemeStorm = () => {
        setStorm(!storm);
    };

    const handleKeyBoard = () => {
        setKeyBoard(!keyboard);
    };

    return (
        <div className={cx('wrapper')}>
            {/* themevideo */}
            <ThemeVideo themeDefault={themeDefault} isStorm={storm} />

            <Header handleTheme={handleTheme} />

            <OverlayTrigger placement="bottom" overlay={tooltip1} rootClose>
                <div className={cx('circle-btn')} onClick={handleThemeStorm}></div>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={tooltip2} rootClose>
                <div className={cx('circle-btn')} onClick={handleKeyBoard} style={{ left: '70%', top: '73%' }}></div>
            </OverlayTrigger>

            {/* control songs */}
            <ControlSongs isStorm={storm} isKeyboard={keyboard} />
        </div>
    );
}

export default Home;
