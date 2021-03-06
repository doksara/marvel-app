export interface ProgressBarStepProps {
  index: number
  currentStep: number
  title: string
}

export interface NotificationItemProps {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface ComicDataWrapper {
  code?: number
  status?: string
  copyright?: string
  attributionText?: string
  attributionHTML?: string
  data?: ComicDataContainer
  etag?: string
}

export interface ComicDataContainer {
  offset?: number
  limit?: number
  total?: number
  count?: number
  results?: Array<Comic>
}

export interface Order {
  id: number
  items: Array<Comic>
  totalPrice: number
  status: OrderStatus
  createdAt: string
  contactInformation: ContactInformation
  deliveryInformation: DeliveryInformation
}

export interface ContactInformation {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
}

export interface DeliveryInformation {
  address: string
  zipCode: number
  city: string
  country: string
}

export enum OrderStatus {
  PENDING = 'Pending',
  DELIVERED = 'Delivered'
}

export interface Comic {
  id: number
  digitalId?: number
  title?: string
  issuenumber?: number
  variantDescription?: string
  description?: string
  modified?: string
  isbn?: string
  upc?: string
  diamondCode?: string
  ean?: string
  issn?: string
  format?: string
  pageCount?: number
  textObjects?: Array<TextObject>
  resourceURI?: string
  urls?: Array<Url>
  series?: SeriesSummary
  variants?: Array<ComicSummary>
  collections?: Array<ComicSummary>
  collectedIssues?: Array<ComicSummary>
  dates?: Array<ComicDate>
  prices?: Array<ComicPrice>
  thumbnail?: Image
  images?: Array<Image>
  creators?: CreatorList
  characters?: CharacterList
  stories?: StoryList
  events?: EventList
}

export interface TextObject {
  type?: string
  language?: string
  text?: string
}

export interface Url {
  type?: string
  url?: string
}

export interface SeriesSummary {
  resourceURI?: string
  name?: string
}

export interface ComicSummary {
  resourceURI?: string
  name?: string
}

export interface ComicDate {
  type?: string
  date?: string
}

export interface ComicPrice {
  type?: string
  price?: string
}

export interface Image {
  path: string
  extension: string
}

export interface CreatorList {
  available?: number
  returned?: number
  collectionURI?: string
  items?: Array<CreatorSummary>
}

export interface CreatorSummary {
  resourceURI?: string
  name?: string
  role?: string
}

export interface CharacterList {
  available?: number
  returned?: number
  collectionURI?: string
  items?: Array<CharacterSummary>
}

export interface CharacterSummary {
  resourceURI?: string
  name?: string
  role?: string
}

export interface StoryList {
  available?: number
  returned?: number
  collectionURI?: string
  items?: Array<StorySummary>
}

export interface StorySummary {
  resourceURI?: string
  name?: string
  type?: string
}

export interface EventList {
  available?: number
  returned?: number
  collectionURI?: string
  items?: Array<EventSummary>
}

export interface EventSummary {
  resourceURI?: string
  name?: string
}

export interface CharacterDataWrapper {
  code?: number
  status?: string
  copyright?: string
  attributionText?: string
  attributionHTML?: string
  data?: CharacterDataContainer
  etag?: string
}

export interface CharacterDataContainer {
  offset?: number
  limit?: number
  total?: number
  count?: number
  results?: Array<Character>
}

export interface Character {
    id: number
    name?: string
    description?: string
    modified?: string
    resourceURI?: string
    urls?: Array<Url>
    thumbnail?: Image
    comics?: ComicList
    stories?: StoryList
    events?: EventList
    series?: SeriesList
}

export interface ComicList {
  available?: number
  returned?: number
  collectionURI?: string
  items: Array<ComicSummary>
}

export interface SeriesList {
  available?: number
  returned?: number
  collectionURI?: string
  items: Array<SeriesSummary>
}