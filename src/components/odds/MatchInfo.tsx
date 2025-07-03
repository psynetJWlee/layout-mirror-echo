import React from 'react';

interface Team {
  name: string;
  logo: string;
  color: string;
}

interface MatchInfoProps {
  homeTeam: Team;
  awayTeam: Team;
}

export const MatchInfo: React.FC<MatchInfoProps> = ({ homeTeam, awayTeam }) => {
  return (
    <section className="bg-white flex items-center text-xl font-bold whitespace-nowrap text-center justify-center">
      <div className="self-stretch flex flex-col items-stretch text-[rgba(187,40,40,1)] justify-center flex-1 shrink basis-[0%] my-auto">
        <img
          src={homeTeam.logo}
          className="aspect-[1] object-contain w-[60px] self-center"
          alt={homeTeam.name}
        />
        <div className="flex w-full items-stretch gap-[5px] justify-center mt-2.5">
          <div
            className="flex w-1.5 shrink-0 h-6"
            style={{ backgroundColor: homeTeam.color }}
          />
          <div className="my-auto">{homeTeam.name}</div>
        </div>
      </div>
      <div className="self-stretch text-2xl text-[rgba(118,117,117,1)] w-[33px] my-auto">
        <div>VS</div>
      </div>
      <div className="self-stretch flex flex-col items-stretch text-[rgba(30,51,132,1)] flex-1 shrink basis-[0%] my-auto">
        <img
          src={awayTeam.logo}
          className="aspect-[1] object-contain w-[60px] self-center"
          alt={awayTeam.name}
        />
        <div className="flex w-full items-stretch gap-[5px] justify-center mt-2.5">
          <div
            className="flex w-1.5 shrink-0 h-6"
            style={{ backgroundColor: awayTeam.color }}
          />
          <div className="my-auto">{awayTeam.name}</div>
        </div>
      </div>
    </section>
  );
};
