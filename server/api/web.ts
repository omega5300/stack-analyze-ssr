import { load } from "cheerio"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const { website } = query

  console.info(query)

  if(website === ''){
    return 'the website is required'
  }

  try {
    const res = await fetch(website as string)

    const data = await res.text()

    const $ = load(data)

    console.info($)

    return data
  } catch (err) {
    return (err as Error).message
  }
  
})
