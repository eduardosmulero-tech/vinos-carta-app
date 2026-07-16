export interface Wine {
  id: string;
  name: string;
  winery: string;
  type: string;
  grape: string;
  region: string;
  alcohol: number;
  volume: string;
  description: string;
  image?: string;
}

export type WineryName = 'Bodegas Andrade' | 'Bodegas Sauci';

export interface WineGroup {
  winery: WineryName;
  wines: Wine[];
}
