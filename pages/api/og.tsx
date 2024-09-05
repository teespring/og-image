import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import PoweredByAmaze from '../../components/PoweredByAmaze';

function lightOrDark(color: string) {
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (!match) return 'light'; // Default to light if parsing fails
    r = parseInt(match[1], 10);
    g = parseInt(match[2], 10);
    b = parseInt(match[3], 10);
  } else {
    // If hex --> Convert it to RGB
    const hex = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    r = hex >> 16;
    g = (hex >> 8) & 255;
    b = hex & 255;
  }

  // HSP equation to determine if the color is light or dark
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  return hsp > 127.5 ? 'light' : 'dark';
}

export const config = {
  runtime: 'edge',
};

export default function (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Defaults if no query parameters are provided
    const defaultColor = '#FFFFFF'; // White text
    const defaultBackgroundColor = '#000000'; // Black background

    const title = searchParams.get('title')?.slice(0, 100) || 'My Store';

    // Get the color from the search params or use a default
    const color = searchParams.get('color') || defaultColor;

    // Determine the background color: If not set, compute based on the text color
    const backgroundColor = searchParams.get('backgroundColor') ||
      (lightOrDark(`#${color}`) === 'light' ? defaultColor : defaultBackgroundColor);

    const logoSrc = searchParams.get('logo');

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: backgroundColor,
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
                src={logoSrc!}
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
