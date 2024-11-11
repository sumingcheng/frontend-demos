import { useDOM, useReactive } from '../index'

function App() {
  const state = useReactive({
    count: 0,
    name: 'HHHHHHHHHHHHH'
  })

  const add = (num) => {
    state.count += num
  }
  const minus = (num) => {
    state.count -= num
  }

  const changeName = (name) => {
    state.name = name
  }

  return {
    template: `
    <h1>{{ count }}</h1>
    <h2>{{ name }}</h2>
    <button onClick="add(2)">+</button>
    <button onClick="minus(1)">-</button>
    <button onClick="changeName('字符串进入')">ChangeName</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName
    }
  }
}

useDOM(
    App(),
    document.querySelector('#app')
)



