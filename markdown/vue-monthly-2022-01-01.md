Welcome to the first issue of 2022, which is also the very first issue of Vue Monthly. 

Each month, I do my best to summarize the state of Vue.js and the surrounding ecosystem. Since this is the first issue of 2022, we will look back over the last year, and see what's changed, as well as my current recommendations for Vue.js applications.

## Vue Core Ecosystem

At the time of writing, the current version of Vue 3 is 3.2.26. The "trinity" of Vue, Vue Router and Vuex, which are used in almost every Vue application, are all stable. The core ecosystem is in a good place, and I have no hesitation recommending it for new applications. 

One consideration you will want to make before starting a new application is which third party libraries you need, which we will talk about in the next section.

## RFCs (Request for Comments)

Vue now follows as RFC or "request for comments" process when making significant changes. Here's a list of the most important RFCs of the last year or so, that represent the biggest shifts in Vue.

### The Composition API (Evan You)

[This RFC](https://github.com/vuejs/rfcs/pull/78) was actually from 2019, but worth noting, since it is the single biggest change to Vue since it's inception. There are now two ways to write Vue components; the "Options" API and "Composition" API. There's no plan to deprecate the Options API, but I personally expect the Composition API to be the way to write Vue code moving forward, and it's my recommendation moving forward. The primary benefit is seamless TypeScript support, but I also really enjoy the fact I can author logic outside of Vue files; it just feels more flexible and composable in general.

### Script Setup (Evan You)

[This RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md) introduces a more concise way to author Composition API components. It doesn't work with the Options API; another reason I recommend the Composition API moving forward. You can now author Composition API components without the  introduced a more concise syntax for authoring Composition API components. 

It does not work with the Options API; another reason I recommend the Composition API moving forward - this is where the ecosystem is heading, in my opinion. Using script setup, you can write a component without the `export default defineComponent` and `setup` boilerplate:

```vue
<script setup lang="ts">
  import Foo from './Foo.vue'
  import { ref } from 'vue'

  const count = ref(0)

  const inc = () => {
    count.value++
  }
</script>

<template>
  <Foo :count="count" @click="inc" />
</template>
```

Comparing an Options API component to a Script Setup component, it's not clear you are looking at the same framework. While this might be offputting for some (it certainly was for me), after working with the new Script Setup API for a while, I *really* like it. Change is always uncomfortable, but as we all know, this industry moves fast and sometimes you need to get comfortable been uncomfortable, even if it's just for a bit. I recommend using Script Setup alongside TpeScript moving forward for the best developer experience.

### CSS Variable Injection (Evan You)

[A less controversial RFC](https://github.com/vuejs/rfcs/pull/231) which makes it easier to bind CSS to JavaScript values. Simple but effective. This example shows how Vue's SFCs give us great integration across HTML, JavaScript and CSS.

```vue
<template>
  <div class="text">Hello</div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const color = ref('blue')
const font = reactive({
  size: '2em'
})
</script>

<style>
  .text {
    color: v-bind(color);
    font-size: v-bind('font.size');
  }
</style>
```

### Reactivity Tranform (Evan You)

[This RFC](https://github.com/vuejs/rfcs/pull/420) proposes a shorthand for Vue's reactivity APIs, making SFCs even more concise. Another RFC aimed primaily at Composition API and Script Setup users. It introduces slightly better ergonomics around `ref`, so you don't need to mess with `.value`. A little magic for my liking at first, but I will hold judgement until I've given it a really good try.

```ts
import { watchEffect } from 'vue'

let count = $ref(0)

watchEffect(() => {
  // access value (track)
  // compiles to `console.log(count.value)`
  console.log(count)
})

// mutate value (trigger)
// compiles to `count.value = 1`
count = 1
```

The main difference is instead of importing `ref`, assigning to and reading from `.value`, you will declare a variable using `let` and the `$ref` marco, and omit `.value` when you'd normally use it before. It definitely looks concise once you know what you are looking at. I also like the usage of `let`; it makes it clear the *variable is intended to be mutated*.

This takes inspiration from Svelte; I like that the popular frameworks are looking to each other for innovation and inspiration.


### [Class Composition API and Typed Slots] (Carlos Rodrigues)

The [Class Composition API](https://github.com/vuejs/rfcs/pull/310) and [Types Slots](https://github.com/vuejs/rfcs/pull/192) RFCs are notable; both aim to bring better type safety to Vue. I'll be keeping an eye on these moving forward. I don't want the class API to come back; not because I dislike classes, but because I think we already have enough ways to author components, something I'll touch on later.

### Vuex 5 (Kia Ishi)

The [Vuex 5](https://github.com/vuejs/rfcs/pull/271) RFC proposed a new, Composition API and Type Safe alternative to the current Vuex API. This ended up getting implemented as [Pinia](https://github.com/vuejs/pinia) by [Eduardo San Martin Morote](https://github.com/posva). A typical store looks like this:

```js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {

  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),

  getters: {

    doubleCount: (state) => state.counter * 2,

    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1
    },
  },

  actions: {
    reset() {
      this.counter = 0
    },
  },
})
```

I like Pinia and I'd recommend it going forward. For older apps, I think it's fine to stay on Vuex 4 - no need to fix what isn't broken. The main benefit of Pinia is a simplified API (no mutations, just actions) and better type safety.

## Tooling

For the longest time, the only area I felt Vue lagged behind frameworks like React and Angular was TypeScript support. With Vue 3's TypeScript rewrite, along with a large chunk of the core ecosystem and many of the major third party libraries, TypeScript support has improved dramatically.

### Vite

Evan's latest project, [Vite](https://vitejs.dev/), is a lightning fast ES modules based dev server. It's not Vue specific, and has grown rapidly during 2021. I'd definitely consider this for a new project! Existing projects created using Vue CLI might be challenging, depending how coupled they are to webpack. Again; don't fix what isn't broken, but definitely consider Vite for your new projects!

### Volar

One particular individual deserves a special mention: [Johnson Chu](https://github.com/johnsoncodehk) and his [Volar](https://github.com/johnsoncodehk/volar) extension. It contains a number of packages, letting any editor that supports the [language server protocol](https://microsoft.github.io/language-server-protocol/) provide a better Vue and TypeScript development experience.

I've personally had a great experience; I feel strongly about leverage TypeScript as much as possible in my applications, and as I'll describe later, VS Code + Volar + Composition API is working really well for me.

On the editor front, VS Code still is the editor of choice for Vue development, but I've heard WebStorm is pretty solid, and with a bit (or a lot) of effort Vim and Emacs can be made to work with Volar (although I haven't had much luck replicating the VS Code experience in a terminal based editor yet.

## Component Libraries

A lot of applications will live and die by their component library of choice. Here's a few notable ones, their current status, and some thoughts about each.

### Vuetify

[Vuetify](https://vuetifyjs.com/en/) is Vue's premier material design library. [Their roadmap is here](https://vuetifyjs.com/en/introduction/roadmap/#v3-0-titan); it looks like they are aiming for completion around February 2022. Vuetify has opted for a full rewrite using TypeScript, leveraging the Composition API heavily under the hood. It's currently in alpha.

While it's been a while (the primary author, John, announced the rewrite way back in late 2019, if I recall correctly) I think it will be well worth the wait; the alpha feels pretty good and looks to be upholding the high standards Vuetify has set in the past.

Vuetify have traditionally been good with providing migration guides; if you have an existing Vue 2 app on Vuetify, I'd definitely expect you will be able to upgrade comfortably. 

Finally, Vuetify full time developers working on it - this is pretty important for an open source library's sustainability, so I'd say Vuetify is one of your best bets if you are starting a new Vue application that needs to be maintained for years to come.

### Quasar

[Quasar](https://quasar.dev/) is a probably more of a "meta framework" than a component library. It also implements Material Guidelines, and provides a toolchain for building applications using Vue 3 (include iOS and Android via Cordova or Capacitor.

The creator, [Razvan Stoenescu](https://github.com/rstoenescu) , works on it full time, so I'd expect Quasar to continue to be a sustainable option moving forward. There is a [Vue 2 -> Vue 3 migration guide](https://quasar.dev/start/upgrade-guide#vue-3). A solid migration guide is a clear sign the authors care about the long term sustainability of their project; definitely a good sign for the future of Quasar.

### Element UI

[Element UI](https://element-plus.org/en-US/) has been around for a long time, and has, like many component libraries, been rewritten using TypeScript for Vue 3. I tried it out and feels pretty good to use. The default styles are very simple (which I like). I haven't tried customizing it, but if you are looking for a simple UI kit, Element UI seems like a solid choice.

### PrimeVue

[PrimeVue](https://primefaces.org/primevue/showcase/#/setup) was one of the earliest component libraries to support Vue 3. It feels similar to Element UI; simple, sane defaults. It ships a bunch of themes and has a good customization guide, so if you want something a bit more flexible and don't want to wait, PrimeVue is another good candidate. I have not tried it personally, but heard generally good things.

### Buefy and BootstrapVue

[Buefy](https://buefy.org/) and [BootstrapVue](https://bootstrap-vue.org/) are examples of two popular Vue 2 component libraries that are not making the transition to Vue 3, at least not in the same fashion as the other libraries mentioned here. Both have something in common that the others do not; no full time developer. Instead, they are projects of passion!

Open source is great for this exact reason; even if the original author(s) are busy with other projects, the community can fork a project and move it forward. 

The author of Buefy, [Walter Tommasi](https://github.com/jtommy) is working on a new library: Oruga UI. If you bet on Buefy and are looking to upgrade, you may need to help out - there's not clear migration guide, from what I can see.

[BootstrapVue](https://bootstrap-vue.org/) is in a bit of flux; the current maintainers aren't looking to upgrade to Vue 3, but [Illya Klymov](https://github.com/xanf) is actively working on [porting the code base to Vue 3](https://github.com/bootstrap-vue/bootstrap-vue/issues/5196#issuecomment-990793210). It looks like GitLab have a dependency on this, and  it's grat to see they are giving back and helping with the upgrade! Keep an eye on this if you like Bootstrap, or are looking to upgrade from Vue 2 and BootstrapVue.

These are both good examples of how libraries without full time developers can take longer to upgrade, and have a less stable future when compared to some of the biggest, well funded projects. They are also good examples of why OSS is great; the community can easily fork the code and carry on.

## Other Libraries

### VueUse

A fun library I've been enjoying is [VueUse](https://vueuse.org/). Lots of composables, for anything and everything you can imagine! It's also a nice code base to study and learn how to create strongly typed composables - definitely worth exploring.

### Forms

All the major form libraries upgraded to Vue 3 long and and work great! These include [Vuelidate](https://vuelidate-next.netlify.app/), model based validation, [VeeValidate](https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio), template based validation, and [Vue Formulate](https://vueformulate.com/), another template based validation library.

I personally don't often use form libraries; if I find myself reaching for a complex form valiation library, it usually means I have a complex use case and just use my own snippets, or write my own validations, but these are good options if you want an opinionated, consistent way to do things across a large code base.

## Testing

There are lots of great options for testing, all of which work great with Vue 3.

### Test Utils and Testing Library

[Test Utils](https://next.vue-test-utils.vuejs.org/guide/) and [Testing Library](https://testing-library.com/docs/vue-testing-library/intro/) are the libraries I maintain, alongside a number of awesome collaborators such as [Cedtric Exbrayat](https://github.com/cexbrayat), [Adrià Fontcuberta](https://github.com/afontcu), [Illya Klymov
](https://github.com/xanf), [Jess Sachs](https://github.com/jessicasachs) and many others.

### Cypress Component Testing

If you like to test in a real browser, Cypress has first class support for Vue 3. More about [Cypress Component Testing here](https://www.cypress.io/blog/2021/04/06/introducing-the-cypress-component-test-runner/). I also made some content on my [YouTube channel](https://www.youtube.com/watch?v=qZKEbfHY_t0&ab_channel=LachlanMiller). This is the product I work on full time and I love working on it **and** using it. It uses Test Utils internally to mount your components, so it's fairly easily to add it to an existing code base using Test Utils.

### Storybook

Storybook has great support for Vue 3, among many other frameworks. Traditionally a product for designing and iterating on components visually, Storybook has also introduced some [interaction testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing) (uses via Testing Library).

My recommendation, of course, would be to use Cypress Component Testing for testing and interacting with your components. Cypress approaches component development from an interaction point of view: *does it work like it is supposed to?*. Storybook comes from the visual angle; *does it look how it is supposed to?*