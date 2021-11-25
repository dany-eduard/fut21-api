export interface ResEASportsAPI {
  page: number
  totalPages: number
  totalResults: number
  type: string
  count: number
  items: ItemsEntity[]
}
export interface ItemsEntity {
  commonName: string
  firstName: string
  lastName: string
  league: League
  nation: Nation
  club: Club
  headshot: Headshot
  position: string
  composure: number
  playStyle: string
  playStyleId?: null
  height: number
  weight: number
  birthdate: string
  age: number
  acceleration: number
  aggression: number
  agility: number
  balance: number
  ballcontrol: number
  foot: string
  skillMoves: number
  crossing: number
  curve: number
  dribbling: number
  finishing: number
  freekickaccuracy: number
  gkdiving: number
  gkhandling: number
  gkkicking: number
  gkpositioning: number
  gkreflexes: number
  headingaccuracy: number
  interceptions: number
  jumping: number
  longpassing: number
  longshots: number
  marking: number
  penalties: number
  positioning: number
  potential: number
  reactions: number
  shortpassing: number
  shotpower: number
  slidingtackle: number
  sprintspeed: number
  standingtackle: number
  stamina: number
  strength: number
  vision: number
  volleys: number
  weakFoot: number
  traits?: string[] | null
  specialities?: string[] | null
  atkWorkRate: string
  defWorkRate: string
  playerType?: null
  attributes?: AttributesEntity[] | null
  name: string
  rarityId: number
  isIcon: boolean
  quality: string
  isGK: boolean
  positionFull: string
  isSpecialType: boolean
  contracts?: null
  fitness?: null
  rawAttributeChemistryBonus?: null
  isLoan?: null
  squadPosition?: null
  iconAttributes?: null
  itemType: string
  discardValue?: null
  id: string
  modelName: string
  baseId: number
  rating: number
}
export interface League {
  imageUrls: ImageUrls
  abbrName: string
  id: number
  imgUrl?: null
  name: string
}
export interface ImageUrls {
  dark: string
  light: string
}
export interface Nation {
  imageUrls: ImageUrlsOrDarkOrLight
  abbrName: string
  id: number
  imgUrl?: null
  name: string
}
export interface ImageUrlsOrDarkOrLight {
  small: string
  medium: string
  large: string
}
export interface Club {
  imageUrls: ImageUrls1
  abbrName: string
  id: number
  imgUrl?: null
  name: string
}
export interface ImageUrls1 {
  dark: ImageUrlsOrDarkOrLight
  light: ImageUrlsOrDarkOrLight
}
export interface Headshot {
  imgUrl: string
  isDynamicPortrait: boolean
}
export interface AttributesEntity {
  name: string
  value: number
  chemistryBonus?: number[] | null
}


// Custom interfaces
export interface ItemsResponse {
  page: number
  totalPages: number
  items: Player[]
}
export interface Player {
  id: number
  name: string
  nation: string
  club: string
  position: string
}
