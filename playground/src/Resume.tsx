import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import clsx from 'clsx'
import { meta, table } from './plugins'

function Resume() {
  const [markdown] = useState<string>(() => {
    const globResult = import.meta.globEager('../../README.md', {
      as: 'raw',
    })

    return (Object.values(globResult)[0]) as unknown as string
  })

  const [animated, setAnimated] = useState(true)

  useEffect(() => {
    // setAnimated(true)
    setTimeout(() => {
      setAnimated(false)
    }, 100)
  }, [])

  return (
    <div className="Resume font-sans text-base">
      <div className="container md:w-768px sm:w-full text-dark mx-auto p-y-4 p-x-2">
        <div className={`w-full    ${animated ? '-translate-x-100vw' : 'transition-transform translate-x-0 transition-delay-100 ease-in-out translate-x-0'} `}>
          <ReactMarkdown
            components={{
              'h1': ({ ...props }) => <h1 className="text-xl2 text-dark font-semibold" {...props}></h1>,
              'h2': ({ ...props }) => {
                return <div className="text-xl text-dark font-semibold p-y-1 b-b">
                    <h2 {...props}></h2>
                  </div>
              },
              'h3': ({ ...props }) => <h3 className="p-y-1 text-lg text-dark font-semibold" {...props}></h3>,
              'ul': ({ ...props }) => <ul className="text-dark list-disc list-inside p-y-1" {...props}></ul>,
              'ol': ({ ...props }) => <ol className="text-dark list-decimal list-inside p-y-1" {...props}></ol>,
              'li': ({ ...props }) => <li className="p-y-0.25 text-dark-300" {...props}></li>,
              'a': ({ ...props }) => <a className="text-blue underline" {...props}></a>,
              'p': ({ ...props }) => <p className="text-dark-700 font-medium p-y-1" {...props}></p>,
              'strong': ({ ...props }) => <strong className="text-dark font-semibold" {...props}></strong>,
              'card': ({ ...props }) => {
                return <div className="p-y-0.5 grid grid-cols-2 gap-y-0.5" {...props} />
              },
              'card-item': ({ index, ...props }) => {
                return <div {...props} className={clsx('text-sm', { 'justify-self-end': index % 2 === 1 })} />
              },
              'card-item-label': ({ ...props }) => {
                return <span {...props} className="text-sm font-medium" />
              },
              'card-item-value': ({ ...props }) => {
                return <span className="text-blue-gray-500" {...props} />
              },
            }}
              remarkPlugins={[
                remarkFrontmatter,
                meta,
                remarkGfm,
              ]}
              rehypePlugins={[
                table,
              ]}
              >
              {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Resume

