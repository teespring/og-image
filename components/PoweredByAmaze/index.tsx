import React from 'react';
import SpringByAmaze from '../Icons/SpringByAmazeLogo';

export type Props = {
  textColor: string;
};

const PoweredByAmaze: React.FC<Props> = ({ textColor }) => {
  return (
    <div
      style={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          color: textColor,
          marginTop: 30,
          padding: '0 120px',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
        }}
      >
        Powered By
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
          padding: '5px 0 0 0',
        }}
      >
        <SpringByAmaze fill={textColor} />
      </div>
    </div>
  );
};

export default PoweredByAmaze;
