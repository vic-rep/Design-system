import bmwSrc from './bmw.svg'

export const MAKE_LOGOS: Record<string, string> = {
  BMW: bmwSrc,
}

export function getLogoSrc(make: string): string | undefined {
  return MAKE_LOGOS[make.toUpperCase()]
}
