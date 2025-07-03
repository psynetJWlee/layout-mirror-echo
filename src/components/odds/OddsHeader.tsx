import React from 'react';

interface OddsHeaderProps {
  title: string;
}

export const OddsHeader: React.FC<OddsHeaderProps> = ({ title }) => {
  return (
    <header className="bg-[rgba(1,40,64,1)] z-10 flex w-full gap-5 justify-between pl-4">
      <div className="bg-[rgba(1,40,64,1)] flex min-h-[68px] flex-col items-center justify-center w-[68px] h-[68px] mt-4 rounded-[34px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/725447125f10dc423a3490b8bbbd5376a5a6a865?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[60px]"
          alt="Logo"
        />
      </div>
      <h1 className="text-white text-[28px] font-bold text-center flex items-center">
        {title}
      </h1>
      <div className="flex items-stretch">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b17d6c73e7c492bccafe8e247a17186583fea22b?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[50px] shrink-0"
          alt="Menu"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9b002b4ae70d16a94b010e98a59854f2227cf63?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-[50px] shrink-0"
          alt="Settings"
        />
      </div>
    </header>
  );
};
