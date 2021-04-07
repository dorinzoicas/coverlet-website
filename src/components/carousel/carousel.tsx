import React, { PureComponent, ReactElement, useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Button from 'rsuite/lib/Button';
import { Slide } from '../slide/slide';

import './carousel.scss';

const slides = [
  {
    subtitle: '0% commision until the end of March',
    title: 'Solana',
  },
  {
    subtitle: '230k million usd staked',
    title: 'Trusted and secure validator',
  },
  {
    subtitle: 'Latest technology',
    title: 'AMD Epyc 7538',
  },
];

const data = [
  { date: '2021-03-25', val: 13.5 },
  { date: '2021-03-26', val: 14.19 },
  { date: '2021-03-27', val: 15.8 },
  { date: '2021-03-28', val: 17.08 },
  { date: '2021-03-29', val: 18.76 },
  { date: '2021-03-30', val: 20.41 },
  { date: '2021-03-31', val: 19.02 },
  { date: '2021-04-01', val: 19.07 },
  { date: '2021-04-02', val: 19.55 },
  { date: '2021-04-03', val: 22.3 },
  { date: '2021-04-04', val: 24.8 },
  { date: '2021-04-05', val: 23.6 },
];

export const Carousel = (): ReactElement => {
  const [browser, setBrowser] = useState(false);
  const [tooltip, showTooltip] = useState(false);

  useEffect(() => {
    setBrowser(true);
  }, []);

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div className="carousel full-container">
        <div className="slide-top">
          <div className="title">{slides[0].title}</div>
          <div className="subtitle">{slides[0].subtitle}</div>
        </div>
        <div className="content" style={{ height: '300px', width: '100%' }}>
          {browser && (
            <ResponsiveContainer>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 40, left: 40, bottom: 5 }}
              >
                <YAxis width={0} domain={['auto', 'auto']} />
                <Tooltip
                  cursor={false}
                  animationDuration={100}
                  content={(props) => {
                    if (!tooltip || !props.payload[0]?.payload?.date || !props.active) {
                      return null;
                    }
                    return (
                      <div
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#00000033',
                          padding: '2px 4px',
                        }}
                      >
                        ${props.payload[0]?.payload?.val}
                      </div>
                    );
                  }}
                />
                <Line
                  animationDuration={2000}
                  type="monotone"
                  dataKey="val"
                  stroke="#fdd03b"
                  offset={20}
                  yAxisId={0}
                  dot={{
                    r: 2,
                  }}
                  activeDot={{
                    r: 4,
                    onMouseOver: () => {
                      showTooltip(true);
                    },
                    onMouseLeave: () => {
                      showTooltip(false);
                    },
                  }}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  label={(props) => {
                    const { x, y, stroke, value, index } = props;
                    if (index < data.length - 1) {
                      return null;
                    }
                    return (
                      <g>
                        <rect x={x - 24} y={y - 28} width="48" height="22" fill="#fdd03b" />
                        <text
                          x={x}
                          y={y}
                          dy={-12}
                          fill="#000"
                          fontWeight="bold"
                          fontSize={16}
                          textAnchor="middle"
                        >
                          ${value}
                        </text>
                      </g>
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="slide-bottom">
          <Button appearance="ghost">Stake with us</Button>
        </div>
      </div>
    </div>
  );
};
