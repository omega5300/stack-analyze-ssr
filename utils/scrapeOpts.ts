import { HashFunctions, WebScraping } from './interfaces/scrapingInterface'

export const scrapeOpts = (html: string, opt: string) => {
  const parser = new DOMParser();

  const page = parser.parseFromString(html, "text/html");

  const result: HashFunctions = {
    title() {
      return page.title
    },
    images(): string | WebScraping[] {
      const imageList = Array.from(page.querySelectorAll("img")).map((item) => {
        const imageURL = item.src.replace(location.origin, '')
        return {
          imageURL,
          imageTitle: item.alt
        }
      })

      return imageList.length === 0
        ? 'no found images'
        : imageList
    },
    metadata(): string | WebScraping[] {
      const metadataList = Array.from(page.querySelectorAll('meta')).filter(({ name }) => name !== '')
        .map(item => ({
          metaType: item.name,
          metaValue: item.content
        }))

      return metadataList
    },
    headings(): string | WebScraping[] {
      const HeadingList = Array.from(page.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .map(item => ({
          headingTag: item.tagName,
          headingtext: item.textContent
        }))

      return HeadingList.length === 0
        ? "no found heading tags"
        : HeadingList
    },
    tableHead(): string | WebScraping[] {
      const tableHeadingList = Array.from(page.querySelectorAll("th"))
        .map((item) => ({
          thCol: item.cellIndex,
          thData: item.textContent
        }))

      return tableHeadingList.length === 0
        ? "no found th tags"
        : tableHeadingList
    },
    tableData(): string | WebScraping[] {
      const tableDataList = Array.from(page.querySelectorAll("td"))
        .map((item) => {
          const parentItem = <HTMLTableRowElement>item.parentElement
          return {
            rowID: parentItem.rowIndex,
            colID: item.cellIndex,
            colData: item.textContent
          };
        });

      return tableDataList.length === 0
        ? "no found table data"
        : tableDataList;
    },
    links(): string | WebScraping[] {
      const linkList = Array.from(page.querySelectorAll("a"))
        .filter(({ href }) => !href)
        .map(item => ({
          linkPath: item.href.replaceAll(location.origin, ''),
          linkText: item.textContent
        }));

      return linkList.length === 0
        ? "no found links"
        : linkList;
    },
    cites(): string | WebScraping[] {
      const citesElements: NodeListOf<HTMLQuoteElement> = page.querySelectorAll('q, blockquote')
      
      const citeList = Array.from(citesElements)
        .map(item => ({
          citeTag: item.tagName,
          citeLink: item.cite,
          citeText: item.textContent
        }));

      return citeList.length === 0
        ? "no found q and/or blockquote tags"
        : citeList;
    }
  }

  return result[opt]()
}
