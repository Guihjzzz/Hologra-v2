
import { LinkItem } from "@/hooks/useLinks";
import { medievalHousesData } from "./houses/medievalHouses";
import { japaneseHousesData } from "./houses/japaneseHouses";
import { fantasyHousesData } from "./houses/fantasyHouses";
import { castlesData } from "./houses/castles";
import { specialHousesData } from "./houses/specialHouses";
import { coloredHousesData } from "./houses/coloredHouses";
import { basicHousesData } from "./houses/basicHouses";

export const housesData: LinkItem[] = [
  ...medievalHousesData,
  ...japaneseHousesData,
  ...fantasyHousesData,
  ...castlesData,
  ...specialHousesData,
  ...coloredHousesData,
  ...basicHousesData
];
