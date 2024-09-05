import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import PoweredByAmaze from '../../components/PoweredByAmaze';

function lightOrDark(color: any) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return 'light';
  } else {
    return 'dark';
  }
}

export const config = {
  runtime: 'edge',
};

export default function (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title')?.slice(0, 100) || 'My Store';
    const color = searchParams.get('color') || '000000';
    const foreground = searchParams.get('backgroundColor') || (lightOrDark(`#${color}`) === 'light' ? '000000' : 'FFFFFF');
    const logoSrc = searchParams.get('logo');

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: foreground,
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          {logoSrc ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
                padding: '0 120px',
              }}
            >
              <img
                alt={title}
                src={logoSrc}
                style={{ margin: '0 30px', width: '100%', maxWidth: '300px' }}
              />
            </div>
          ) : (
            <div
              style={{
                fontSize: 60,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                color: color,
                padding: '0 120px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
              }}
            >
              {title}
            </div>
          )}
          <PoweredByAmaze textColor={color} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'netlify-vary': 'query'
        }
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
