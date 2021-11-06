export interface Slide {
  type : string,
  title?: string,
  text?: string,
  visible: boolean,
  notes?: string,
  image?: string,
  items?:Array<string>
  }
