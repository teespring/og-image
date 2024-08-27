// TODO: WILL DELETE IF STILL NOT USED


import React from 'react';
import Image from 'next/image';
import SpringLogo from '../Icons/SpringLogo';
import PoweredByAmaze from '../PoweredByAmaze';


type Props = {
  title: string;
  aboutContent?: string;
  logoSrc: string;
  textColor: string;
  backgroundColor: string;
  storeSlug: string;
  storeLogoMaxHeight?: string;
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const InfoCard: React.FC<Props> = ({
  title,
  aboutContent,
  logoSrc,
  storeSlug,
  textColor,
  backgroundColor,
  storeLogoMaxHeight
}) => {
  const normalizedLogoSrc = logoSrc;

  return (
    // <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
    //   <div style={{ display: 'flex' }} className="p-4 md:p-5">
    //     <SpringLogo />
    //     <h3 style={{ color: textColor }} className="text-lg font-bold dark:text-white">
    //       {title}
    //     </h3>
    //     <p style={{ color: textColor }} className="mt-1 dark:text-neutral-400">
    //       {aboutContent}
    //     </p>
    //     <p style={{ color: textColor }} className="mt-5 text-xs dark:text-neutral-500">
    //       Last updated 5 mins ago
    //     </p>
    //   </div>
    //   <div style={{ display: 'flex', backgroundColor }} className="flex justify-center items-center w-full h-full rounded-xl">
    //     {logoSrc ? (
    //       <div style={{ maxHeight: storeLogoMaxHeight || '', display: 'flex' }}>
    //         <Image
    //           src={normalizeAssetPathUrl(logoSrc, storeSlug)}
    //           alt={title}
    //           fill
    //           className="object-contain self-center w-full object-left"
    //           data-testid="store-logo"
    //         />
    //       </div>
    //     ) : (
    //       <div style={{ color: textColor, display: 'flex' }}>
    //         {title}
    //       </div>
    //     )}
    //     <PoweredByAmaze textColor={`#${textColor}`} />
    //   </div>
    // </div>
    <div style={{ backgroundColor, display: 'flex' }} className="flex flex-col justify-center items-center p-8 rounded-lg" className="dark:bg-neutral-900" >
    <div style={{ display: 'flex' }} className="text-center">
      <div style={{ display: 'flex' }} className="mb-6">
        <Image
          src={normalizedLogoSrc}
          alt={title}
          width={300}
          height={200}
          className="object-contain mx-auto"
          style={{ maxHeight: storeLogoMaxHeight }}
        />
      </div>
      <h1 style={{ color: textColor, display: 'flex'  }} className="text-4xl font-bold">
        {title}
      </h1>
      {aboutContent && (
        <p style={{ color: textColor }} className="mt-4 text-lg">
          {truncateText(aboutContent, 100)}
        </p>
      )}
    </div>
    <div style={{ display: 'flex' }} className="flex justify-center items-center mt-10">
      <PoweredByAmaze textColor={textColor} />
    </div>
  </div>
  );
};

export default InfoCard;
