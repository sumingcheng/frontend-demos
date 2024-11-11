import { createElement, render, renderDom } from './virtualDom'
import domDiff from './domDiff'

const vDom = createElement('ul', {
  class: 'list',
  style: `width:300px; height:300px; background-color:orange`
}, [
  createElement('li', {
    class: 'item',
    'data-index': 0
  }, [
    createElement('p', { class: 'text' }, ['第一个列表项'])
  ]),
  createElement('li', {
    class: 'item',
    'data-index': 1
  }, [
    createElement('p', {
      classL: 'text',
    }, [
      createElement('span', {
        class: 'title'
      }, ['第二个列表项'])
    ])
  ]),
  createElement('li',
      { class: 'item', 'data-index': 2, },
      ['第三个列表项']
  )
])
const rDom = render(vDom)
renderDom(rDom, document.getElementById('app'))

// const patches = domDiff(vDom1, vDom2)

// console.log(patches)
