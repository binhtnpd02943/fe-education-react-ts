/**
 * Generate a default string number with length given via parameter.
 * length must less than 8.
 * @param length
 * @returns
 */
export function randomStrGenerator(length?: number) {
  return Math.random().toFixed(length || 8)
}
/**
 * Get list of row keys, recursively in a tree.
 * @param dataset
 * @returns
 */
export function getAllRowKeys(dataset: any[]) {
  const rowKeys: string[] = []
  function getKeys(dataset, rowKeys: string[]) {
    for (const row of dataset) {
      rowKeys = [...rowKeys, row.key]
      if (row.children) {
        rowKeys = getKeys(row.children, rowKeys)
      }
    }
    return rowKeys
  }
  return getKeys(dataset, rowKeys)
}

/**
 *
 * @param list
 * @param parentKey
 * @param id Id which is the inde
 * @returns
 */
export function buildDataTree(list: any[], parentKey: string, id: string) {
  const rootList = list.filter((item) => !item[parentKey])

  const addChildData = (data: any, list: any) => {
    const listChildrentData = list.filter((item) => item[parentKey] === data[id])

    if (listChildrentData && listChildrentData.length) {
      data.children = listChildrentData
      listChildrentData.forEach((element) => {
        addChildData(element, list)
      })
    }
    // Make Ant Table understands that it should build a tree.
    data['key'] = data[id]
    return data
  }

  rootList.forEach((element) => addChildData(element, list))
  return rootList
}

export function accessObjectByArrayStringPath(o: any, s: string) {
  s = s.replace(/\[(\w+)]/g, '.$1')
  s = s.replace(/^\./, '')
  const a = s.split('.')

  for (let i = 0, n = a.length; i < n; i++) {
    const k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return
    }
  }
  return o
}
