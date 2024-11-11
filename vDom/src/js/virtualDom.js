import Element from './element'

function createElement(type, prop, children) {
  return new Element(type, prop, children)
}

function setAttrs(node, prop, value) {
  switch (prop) {
    case 'value':
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.value = value
      } else {
        node.setAttribute(prop, value)
      }
      break
    case 'style':
      node.style.cssText = value
      break
    default:
      node.setAttribute(prop, value)
      break
  }
}

function render(vDom) {
  const { type, props, children } = vDom
  const el = document.createElement(type)

  for (let key in props) {
    setAttrs(el, key, props[key])
  }

  children.map((c) => {
    let elem = c instanceof Element
        ? render(c)
        : document.createTextNode(c)

    el.appendChild(elem)
  })

  return el
}

function renderDom(el, rootEl) {
  rootEl.appendChild(el)
}

export {
  render,
  createElement,
  setAttrs,
  renderDom
}
