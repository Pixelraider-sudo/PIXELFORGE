interface SEOMeta { title: string; description: string; keywords?: string; ogImage?: string }
const BASE = 'Pixel Raider'
export function setPageMeta({ title, description, keywords, ogImage }: SEOMeta): void {
  document.title = title === BASE ? title : title + ' — ' + BASE
  setMeta('description', description)
  setMeta('og:description', description)
  if (keywords) setMeta('keywords', keywords)
  setMeta('og:title', document.title)
  if (ogImage) setMeta('og:image', ogImage)
}
function setMeta(name: string, content: string): void {
  const isP = name.startsWith('og:') || name.startsWith('twitter:')
  const attr = isP ? 'property' : 'name'
  let el = document.querySelector<HTMLMetaElement>('meta[' + attr + '="' + name + '"]')
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.content = content
}
