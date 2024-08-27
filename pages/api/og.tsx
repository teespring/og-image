import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import PoweredByAmaze from '../../components/PoweredByAmaze';

export const config = {
  runtime: 'edge',
};

export default function (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My Store';
    const hasColor = searchParams.get('color')!;
    const color = hasColor ? hasColor : '000000';
    const hasForeground = searchParams.get('backgroundColor')!;
    const foreground = hasForeground;
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
