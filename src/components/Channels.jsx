import React from 'react';
import cn from 'classnames';

import gon from 'gon';

const renderChannels = () => {
  const { channels, currentChannelId } = gon;
  if (channels.length === 0) {
    return null;
  }

  const items = channels.map(({ id, name }) => {
    const buttonClasses = cn({
      'nav-link btn-block mb-2 text-left btn': true,
      'btn-light': currentChannelId !== id,
      'btn-primary': currentChannelId === id,
    });

    return (
      <li key={id} className="nav-item">
        <button
          type="button"
          className={buttonClasses}
        >
          {name}
        </button>
      </li>
    );
  });

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {items}
    </ul>
  );
};

const Channels = () => {
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button
          type="button"
          className="ml-auto p-0 btn btn-link"
        >
          +
        </button>
      </div>
      {renderChannels()}
    </div>
  );
};

export default Channels;