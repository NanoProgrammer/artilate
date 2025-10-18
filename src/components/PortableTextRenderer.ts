import { toHTML } from '@portabletext/to-html'
import { urlFor } from '../lib/sanity'

export const renderPortableText = (body: any[]) => {
  return toHTML(body, {
    components: {
      types: {
        image: ({ value }) => {
          const src = value?.asset?._ref ? urlFor(value).width(1400).fit('max').auto('format').url() : ''
          if (!src) return ''
          const alt = value?.alt || ''
          const caption = value?.caption || ''
          return `
            <figure class="my-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60">
              <img src="${src}" alt="${alt}" loading="lazy" class="w-full h-auto object-cover" />
              ${caption ? `<figcaption class="px-4 py-2 text-center text-sm text-stone-400 border-t border-neutral-800">${caption}</figcaption>` : ''}
            </figure>
          `
        },
      },
      marks: {
        link: ({ value, children }) => {
          const href = value?.href || '#'
          const external = !href.startsWith('/')
          return `<a href="${href}" target="${external ? '_blank' : '_self'}" rel="noopener noreferrer">${children}</a>`
        },
      },
    },
  })
}
