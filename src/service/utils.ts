
type LinkRet = {
  prev?: string
  next?: string
  hasMore: boolean
}

export function parseLink(link: string): LinkRet {
  const links = link.split(',').map(x => x.split(';'))

  if (links.length !== 2) {
    return { prev: undefined, next: undefined, hasMore: false }
  }

  const cursorRegex = /cursor="(\d+:\d+:\d+)"/

  const prevCursorString = links[0][links[0].length - 1]
  const nextCursorString = links[1][links[1].length - 1]

  const prevRegExpResult = cursorRegex.exec(prevCursorString)
  const nextRegExpResult = cursorRegex.exec(nextCursorString)

  if (!prevRegExpResult || !nextRegExpResult) {
    return { prev: undefined, next: undefined, hasMore: false }
  }

  const nextHasMoreStr = links[1][links[1].length - 2]

  const nextHasResultsRegExpResult = /results="(\w+)"/.exec(nextHasMoreStr)

  if (!nextHasResultsRegExpResult) {
    return { prev: undefined, next: undefined, hasMore: false }
  }

  const hasMoreNext = nextHasResultsRegExpResult[1] === 'true'

  return {
    prev: prevRegExpResult[1],
    next: nextRegExpResult[1],
    hasMore: hasMoreNext
  }
}
