let patches = {}

function DomDiff(oldVDom, newVDom) {
  let index = 0
  vNodeWalk(oldVDom, newVDom, index)
  return patches
}

function vNodeWalk(oldVDom, newVDom, index) {
  console.log(oldVDom, newVDom, index)

  // let vNodePatch = []
  // if (!newNode) {
  //   vNodePatch.push({
  //     type: REMOVE,
  //     index
  //   })
  // } else if (typeof oldNode = 'string' && typeof newNode === 'object') {
  //   if (oldNode !== newNode) {
  //     vNodePatch.push({
  //       type: Text,
  //       text: newNode
  //     })
  //   }
  // }
}

export default DomDiff
