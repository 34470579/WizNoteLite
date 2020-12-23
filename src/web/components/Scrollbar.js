/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Scrollbars } from 'react-custom-scrollbars';
import { getScrollbarWidthHorizontal } from '../utils/utils';

const Scrollbar = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    autoHide,
    autoHideTimeout,
    hideTracksWhenNotNeeded,
    hideThumb,
    themeType,
    ...others
  } = props;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const _ref = React.useRef();

  let isDark;
  if (themeType === 'auto') {
    isDark = prefersDarkMode;
  } else if (themeType === 'dark') {
    isDark = true;
  } else {
    isDark = false;
  }

  const renderThumbVertical = (options) => {
    const { style, ...otherProps } = options;
    const customStyle = {
      backgroundColor: `#999999`,
      borderRadius: 4,
    };
    if (hideThumb) {
      customStyle.display = 'none';
    }
    return (
      <div {...otherProps} style={{ ...style, ...customStyle }} />
    );
  };
  //
  const thumbRenderer = (isDark || hideThumb) ? renderThumbVertical : undefined;
  //
  React.useEffect(() => {
    // fix: Scrollbars 两条轨道的宽度有可能不一样
    const getRef = ref || _ref;
    if (getRef && getRef.current) {
      const container = getRef.current.container;
      const inner = container.firstChild;
      inner.style['margin-bottom'] = `-${getScrollbarWidthHorizontal()}px`;
    }
  }, [ref]);
  //
  return (
    <Scrollbars
      hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}
      autoHide={autoHide}
      autoHideTimeout={autoHideTimeout}
      renderThumbVertical={thumbRenderer}
      renderThumbHorizontal={renderThumbVertical}
      {...others}
      ref={ref || _ref}
    >
      {children}
    </Scrollbars>
  );
});

Scrollbar.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
  hideTracksWhenNotNeeded: PropTypes.bool,
  hideThumb: PropTypes.bool,
  autoHide: PropTypes.bool,
  autoHideTimeout: PropTypes.number,
  themeType: PropTypes.string,
};

Scrollbar.defaultProps = {
  classes: {},
  hideTracksWhenNotNeeded: true,
  hideThumb: false,
  autoHide: true,
  autoHideTimeout: 1000,
  themeType: 'auto',
};

export default Scrollbar;
