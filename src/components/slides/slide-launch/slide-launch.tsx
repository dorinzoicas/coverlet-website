import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'rsuite/lib/Button';
import { getNetworkData, setNetwork } from '../../../redux/app';
import './slide-launch.scss';

export const SlideLaunch = (): ReactElement => {
  const dispatch = useDispatch();
  const regenData = useSelector(getNetworkData('Regen'));
  return (
    <div className="slide slide-launch">
      <div className="slide-top">
        <img src={'content/regen.svg'} alt="Regen" />
      </div>
      <div className="content" style={{ flex: '1', height: 'auto', width: '100%' }}>
        <div className="top-text">
          Mainnet Launch
          <br />
          April 15, 2021
        </div>
        <div className="more-info">
          Blockchain for regenerative agriculture
          <br />
          <a href="https://www.regen.network/">More info</a>
        </div>
      </div>
      <div className="slide-bottom">
        <Button
          appearance="ghost"
          className="slide-cta button-large"
          onClick={() => {
            const url = location.href;
            location.href = '#networks';
            history.replaceState(null, null, url);
            dispatch(setNetwork(regenData));
          }}
        >
          STAKE REGEN
        </Button>
      </div>
    </div>
  );
};
