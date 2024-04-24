import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import Image from 'next/image';

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
    const testUrl = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My Store';
    const hasColor = searchParams.get('color')!;
    const color = hasColor ? hasColor : '000000';
    const foreground =
      lightOrDark(`#${color}`) == 'light' ? '000000' : 'FFFFFF';
    const logo = searchParams.get('logo');

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: `#${color}`,
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
          {logo ? (
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
                src={logo!}
                style={{ margin: '0 30px', width: '100%', maxWidth: '300px' }}
              />
            </div>
          ) : (
            <div
              style={{
                fontSize: 60,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                color: `#${foreground}`,
                padding: '0 120px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
              }}
            >
              {title}
            </div>
          )}
          <div
            style={{
              fontSize: 16,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: `#${foreground}`,
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
            <svg
              fill={`#${foreground}`}
              viewBox="0 0 156 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#a)">
                <path d="M9.273 31.533c-2.425 0-5.85-.705-9.273-3.77l2.686-2.972c4.798 4.3 9.797 2.601 11.343 1.165.11-.1.213-.2.311-.304-5.053-.49-8.747-4.054-9.002-4.305C1.468 17.554.591 12.4 3.344 9.615c2.75-2.783 7.935-2 11.806 1.785.338.323 4.111 4.004 4.856 8.675a8.895 8.895 0 0 0 3.6-7.128c0-2.414-.936-4.65-2.634-6.293-1.767-1.713-4.254-2.655-7.004-2.655V0c3.8 0 7.282 1.344 9.805 3.787 2.482 2.404 3.849 5.658 3.849 9.16 0 5.307-3.28 10-8.07 11.938-.546 1.445-1.473 2.78-2.778 3.994-1.28 1.188-3.781 2.507-6.968 2.64a8.33 8.33 0 0 1-.533.014zM7.582 11.93c-.56 0-1.042.15-1.378.493-.989 1.001-.364 3.815 1.952 6.082l.011.011c.034.03 3.658 3.533 7.946 3.174v-.009c.02-3.775-3.705-7.353-3.745-7.39-.008-.008-.02-.016-.025-.025-1.372-1.347-3.324-2.336-4.761-2.336zM54.364 11.3c-.224-1.214-1.23-3.107-4.044-3.099-2.096.009-3.465 1.35-3.46 2.814.006 1.213.79 2.175 2.418 2.482l3.097.58c4.036.764 6.201 3.368 6.212 6.48.012 3.391-2.82 6.827-7.976 6.844-5.876.022-8.484-3.734-8.84-6.877l3.997-1.074c.196 2.178 1.734 4.133 4.86 4.122 2.313-.008 3.59-1.166 3.585-2.722-.006-1.274-.978-2.267-2.697-2.604l-3.098-.611c-3.535-.703-5.826-2.967-5.837-6.297-.014-3.92 3.506-6.92 7.694-6.938 5.375-.02 7.45 3.21 7.96 5.697L54.364 11.3zM67.018 18.566l.03 8.31-4.313.017-.08-22.063 8.281-.03c4.375-.018 7.294 2.866 7.308 6.85.014 4.016-2.882 6.888-7.257 6.905l-3.969.011zm3.425-3.717c2.157-.008 3.465-1.257 3.46-3.156-.009-1.96-1.325-3.171-3.482-3.163l-3.406.011.023 6.317 3.405-.009zM88.614 18.371l-2.249.009.031 8.496h-4.344L81.97 4.83l8.657-.03c4.313-.018 7.075 2.93 7.089 6.759.011 3.081-1.793 5.42-4.697 6.271l4.784 9.007-4.815.017-4.375-8.483zm1.238-3.709c2.188-.008 3.465-1.257 3.46-3.062-.006-1.868-1.295-3.075-3.482-3.067l-3.501.014.022 6.13 3.501-.015zM125.533 26.837l-10.122-15.616.056 15.653-4.314.016-.081-22.063 5.375-.02 9.273 14.563-.053-14.596 4.314-.017.081 22.064-4.529.016zM106.369 26.874l-4.313.017-.081-22.064 4.335-.02.059 22.067zM152.163 26.598l-.291-2.521c-.995 1.497-3.177 2.997-6.521 3.011-5.968.023-11.08-4.316-11.108-11.441-.025-7.128 5.302-11.534 11.304-11.556 5.815-.022 9.047 3.36 10.153 6.748l-4.12 1.478c-.568-1.957-2.422-4.225-6.016-4.21-3.344.01-6.963 2.297-6.943 7.526.019 4.98 3.31 7.551 7.03 7.537 4.095-.014 5.68-2.76 5.924-4.316l-7.002.025-.014-3.734 11.063-.04.042 11.484-3.501.009z"></path>
                <g filter="url(#b)">
                  <path d="M122.009 43.866v-1.052c-.035.11-.138.261-.309.454a2.388 2.388 0 0 1-.69.526c-.289.154-.631.23-1.026.23-.499 0-.953-.118-1.361-.355a2.63 2.63 0 0 1-.966-.993c-.237-.43-.355-.931-.355-1.505 0-.575.118-1.074.355-1.5.241-.429.563-.762.966-.999a2.626 2.626 0 0 1 1.361-.361c.39 0 .728.07 1.013.21a2.3 2.3 0 0 1 .69.486c.176.185.279.342.309.474v-1.013h1.131v5.398h-1.118zm-3.576-2.695c0 .39.085.727.256 1.012.171.285.392.507.664.664.276.154.57.23.881.23.333 0 .631-.078.894-.236.263-.158.472-.38.625-.664.153-.29.23-.625.23-1.006 0-.382-.077-.715-.23-1a1.678 1.678 0 0 0-1.519-.914c-.311 0-.605.08-.881.237-.272.158-.493.38-.664.664-.171.285-.256.623-.256 1.013zM132.053 38.31c.399 0 .74.088 1.025.264.285.17.502.434.651.788.154.356.23.81.23 1.362v3.142h-1.13v-2.912c0-.583-.082-1.022-.244-1.315-.162-.294-.458-.44-.887-.44-.228 0-.447.063-.658.19a1.4 1.4 0 0 0-.513.572c-.131.258-.197.59-.197.993v2.912h-1.065v-2.912c0-.583-.101-1.022-.303-1.315a.97.97 0 0 0-.848-.44c-.232 0-.451.06-.657.183-.202.119-.366.307-.493.566-.127.258-.191.594-.191 1.006v2.912h-1.137v-5.398h1.137v.829c.048-.136.151-.28.309-.434.162-.154.368-.283.618-.388a2.12 2.12 0 0 1 .848-.165c.325 0 .596.066.816.198.219.131.392.293.519.486.127.189.215.37.263.546a1.55 1.55 0 0 1 .355-.565c.175-.193.397-.351.664-.474a2.04 2.04 0 0 1 .888-.19zM140.801 43.866v-1.052c-.035.11-.138.261-.309.454a2.388 2.388 0 0 1-.69.526c-.289.154-.631.23-1.026.23-.499 0-.953-.118-1.361-.355a2.63 2.63 0 0 1-.966-.993c-.237-.43-.355-.931-.355-1.505 0-.575.118-1.074.355-1.5.241-.429.563-.762.966-.999a2.626 2.626 0 0 1 1.361-.361c.39 0 .728.07 1.013.21a2.3 2.3 0 0 1 .69.486c.176.185.279.342.309.474v-1.013h1.131v5.398h-1.118zm-3.576-2.695c0 .39.085.727.256 1.012.171.285.392.507.664.664.276.154.57.23.881.23.333 0 .631-.078.894-.236.263-.158.472-.38.625-.664.153-.29.23-.625.23-1.006 0-.382-.077-.715-.23-1a1.678 1.678 0 0 0-1.519-.914c-.311 0-.605.08-.881.237-.272.158-.493.38-.664.664-.171.285-.256.623-.256 1.013zM144.158 38.468h4.708l-3.229 4.53h3.097v.868h-4.944l3.228-4.536h-2.86v-.862zM151.54 41.4c.005.325.075.621.211.888.136.268.337.48.605.638.271.158.604.237.999.237.333 0 .616-.048.848-.145a1.877 1.877 0 0 0 .901-.73l.559.69c-.145.211-.322.395-.533.553a2.205 2.205 0 0 1-.756.362 3.915 3.915 0 0 1-1.091.131c-.579 0-1.081-.123-1.506-.368a2.538 2.538 0 0 1-.973-1.032c-.228-.443-.342-.95-.342-1.52 0-.525.107-.998.322-1.42.215-.424.526-.76.934-1.005.412-.246.907-.369 1.486-.369.53 0 .99.112 1.381.336.394.219.699.53.913.934.22.403.329.885.329 1.446a5.225 5.225 0 0 1-.02.375h-4.267zm3.196-.86a1.502 1.502 0 0 0-.158-.592 1.353 1.353 0 0 0-.473-.553c-.22-.153-.516-.23-.888-.23-.386 0-.697.075-.934.224a1.42 1.42 0 0 0-.513.546c-.109.21-.173.412-.19.604h3.156zM111.138 42.126h.004l-.886-1.539a1.078 1.078 0 0 0-.689-.482l-.026-.004c-.314-.058-.597.044-.807.325l-.016.02-.035.051-.03.044-.044.065-.048.074-.067.103-.088.141-.12.194h.002l1.117 2.014a.998.998 0 0 0 1.368.364 1 1 0 0 0 .378-1.347l-.011-.02-.002-.003z"></path>
                  <path d="M109.571 39.445l.027.005-.773-1.34c-.223-.383-.509-.575-.927-.582h-.028c-.392 0-.726.201-.939.559l-.013.023-2.319 4.016a.997.997 0 0 0 .367 1.368.999.999 0 0 0 1.356-.343l.245-.42.201-.344.145-.247.143-.242.141-.238.168-.281.111-.185.164-.27.131-.212.069-.11.097-.153.06-.092.028-.044.053-.079.048-.071.033-.048.02-.03.037-.051c.346-.457.84-.653 1.359-.586l-.004-.003z"></path>
                  <path d="M107.868 34.158a6.921 6.921 0 1 0 0 13.842 6.921 6.921 0 0 0 0-13.842zm3.228 9.9a1.651 1.651 0 0 1-2.247-.584l-.014-.024-.941-1.698-.023.04-.192.32-.071.12-.215.365-.143.247-.256.44-.102.178a1.652 1.652 0 0 1-2.872-1.631l.014-.023 2.321-4.021c.323-.568.877-.907 1.518-.907s1.16.311 1.499.877l.017.03 2.318 4.016h-.004l.011.023a1.65 1.65 0 0 1-.616 2.233l-.002-.002z"></path>
                </g>
                <path d="M87.326 42.89c-.358 0-.675-.07-.953-.212a1.644 1.644 0 0 1-.648-.601l-.101.703h-.88v-6.661h.981v2.784c.149-.215.352-.407.611-.573.26-.167.592-.25 1-.25.443 0 .835.105 1.174.315.34.21.605.496.796.86.197.364.296.777.296 1.24 0 .462-.099.876-.296 1.24a2.202 2.202 0 0 1-.796.85c-.339.204-.734.306-1.184.306zm-.166-.85c.419 0 .764-.142 1.036-.426.271-.29.407-.666.407-1.129 0-.302-.062-.57-.185-.804a1.359 1.359 0 0 0-.51-.546 1.378 1.378 0 0 0-.749-.204c-.419 0-.764.145-1.036.435-.265.29-.398.663-.398 1.12 0 .462.133.838.398 1.128.272.284.617.426 1.036.426zm3.466 2.775l1.1-2.414h-.268l-1.813-4.21h1.064l1.406 3.395 1.471-3.395h1.036l-2.96 6.624h-1.036z"></path>
              </g>
              <defs>
                <filter
                  id="b"
                  x="97.488"
                  y="31.053"
                  width="61.798"
                  height="20.761"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood
                    flood-opacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dy=".355"></feOffset>
                  <feGaussianBlur stdDeviation="1.73"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_202_3188"
                  ></feBlend>
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_202_3188"
                    result="shape"
                  ></feBlend>
                </filter>
                <clipPath id="a">
                  <path d="M0 0h155.827v48H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>
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
