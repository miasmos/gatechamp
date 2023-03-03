import { AppRoute } from "./enum";

type NavigationIntention = {
  to: AppRoute | string;
};

type EveSolarSystem = {
  regionID: number;
  constellationID: number;
  solarSystemID: number;
  solarSystemName: string;
  x: number;
  y: number;
  z: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
  luminosity: number;
  border: boolean;
  fringe: boolean;
  corridor: boolean;
  hub: boolean;
  international: boolean;
  regional: boolean;
  constellation: boolean;
  security: number;
  factionID: number;
  radius: number;
  sunTypeID: number;
  securityClass: string;
};

type EveShip = {
  typeID: number;
  typeName: string;
  capacity: number;
  graphicID: number;
};

export type { NavigationIntention, EveSolarSystem, EveShip };
