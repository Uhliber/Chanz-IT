<template>
  <div
    id="colleagues-list"
    class="container"
  >
    <div class="row">
      <div class="col s6">
        <div class="card">
          <div class="card-image">
            <img src="/src/img/original_card_img.jpg">
            <span class="card-title black-text h3">Original List of Colleagues</span>
          </div>
          <div class="card-content">
            <transition-group
              tag="ul"
              name="list-complete"
              class="collection"
            >
              <li
                v-for="person in originalColleagues"
                :key="person.name"
                :class="{hide: person.isInNewList}"
                class="collection-item avatar valign-wrapper list-complete-item"
              >
                <i class="material-icons circle">person</i>
                <span class="title">{{ person.name }}, <i class="blue-text accent-4">{{ person.age }}</i></span>
              </li>
            </transition-group>
          </div>
        </div>
      </div>
      <div class="col s6">
        <div class="card">
          <div class="card-image">
            <img src="/src/img/new_card_img.jpg">
            <span class="card-title black-text h3">New List of Colleagues</span>
            <a
              v-if="state === 'default'"
              id="add-icon"
              class="btn-floating halfway-fab waves-effect waves-light red"
              @click="changeState('add')"
            ><i class="material-icons">add</i></a>
            <a
              v-else
              class="btn-floating halfway-fab waves-effect waves-light grey"
              @click="changeState('animate'); newName = newAge = '';"
            ><i class="material-icons">close</i></a>
          </div>
          <div class="card-content">
            <p
              v-if="newList.length === 0 && state === 'default'"
              class="red-text"
            >
              You don't have a list of new colleagues! Click the <span style="font-weight: bold;">+</span> button to start adding.
            </p>
            <transition
              name="slide-fade"
              @after-leave="changeState('default')"
            >
              <div
                v-if="state === 'add'"
                class="row"
              >
                <div class="input-field col s6">
                  <i class="material-icons prefix">account_circle</i>
                  <input
                    id="icon_prefix"
                    v-model="newName"
                    type="text"
                    @input="handleNewNameInput"
                    @keyup.enter="addColleague"
                  >
                  <label for="icon_prefix">Name</label>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix">refresh</i>
                  <input
                    id="icon_age"
                    v-model="newAge"
                    placeholder="0"
                    type="number"
                    @keyup.enter="addColleague"
                    :disabled="disableAgeInput"
                  >
                  <label
                    for="icon_age"
                    class="active"
                  >Age</label>
                </div>
                <div class="col s12 right-align">
                  <button
                    class="btn btn-primary"
                    :disabled="!newName || !newAge"
                    @click="addColleague"
                  >
                    Save Item
                  </button>
                </div>
              </div>
            </transition>
            <transition-group
              tag="ul"
              name="list-complete"
              class="collection"
            >
              <li
                v-for="person in newColleagues"
                :key="person.name"
                class="collection-item avatar valign-wrapper list-complete-item"
              >
                <i class="material-icons circle">person</i>
                <div>
                  <p class="title">{{ person.name }}, <i class="red-text accent-4">{{ person.age }}</i></p>
                  <span v-if="person.isOriginal" style="font-size: 10px; text-transform: uppercase;margin: 0;">from original</span>
                </div>
              </li>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let timeoutInstance;

export default {
  data() {
    return {
      state: 'default',
      newName: null,
      newAge: null,
      originalList: [
        { name: "Joseph", age: 26 },
        { name: "Daniel", age: 38 },
        { name: "Joshua", age: 50 },
        { name: "Yuri", age: 42 },
        { name: "Rose", age: 25 },
        { name: "Maria", age: 29 },
        { name: "Mark", age: 40 },
        { name: "Pauline", age: 38 },
        { name: "Jasmine", age: 38 },
        { name: "Angel", age: 39 }
      ],
      newList: [],
      disableAgeInput: false,
    }
  },
  computed: {
    //Displaying in reverse so that new list is added in the top.
    originalColleagues() {
      return this.originalList.slice(0).reverse();
    },
    newColleagues() {
      return this.newList.slice(0).reverse();
    }

  },
  methods: {
    toCapitalizeString(string) {
      // Split the input string into an array of words
        const words = string.split(' ');

      // Capitalize the first letter of each word
      const capitalizedWords = words.map(word => {
        if (word.length === 0) {
          return word; // Handle empty strings
        }
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      });

      // Join the words back into a single string
      const capitalizedString = capitalizedWords.join(' ');

      return capitalizedString;
    },
    hidePerson(person) {
      //This will remove the item.
      //this.originalList.splice(index, 1);

      //While this will tell that the person is added in the new list 
      //and will be hidden from the original list.
      const personIndex = this.originalList.map((e) => e.name.toLowerCase()).indexOf(person.toLowerCase());

      this.originalList.splice(personIndex, 1, {
        name: this.toCapitalizeString(this.newName),
        age: this.newAge,
        isInNewList: true
      })
    },
    checkIfExist(name) {
      return this.originalList.some((person) => {
        return person.name.toLowerCase() === name.toLowerCase()
      })
    },
    addColleague() {
      if (!this.newName || !this.newAge) {
        return;
      }

      if (this.checkIfExist(this.newName))
        this.hidePerson(this.newName);

      this.newList.push({
        name: this.toCapitalizeString(this.newName),
        age: this.newAge,
        isOriginal: this.checkIfExist(this.newName),
      });
      this.newName = null;
      this.newAge = null;
    },
    changeState(newState) {
      //Change states: 'Default', 'Animate', and 'Add'
      this.state = newState;
      this.newItem = '';
    },
    handleNewNameInput(e) {
      if(timeoutInstance) {
        clearTimeout(timeoutInstance);
      }

      timeoutInstance = setTimeout(() => {
        const inputValue = e.target.value;

        if (inputValue && this.checkIfExist(inputValue)) {
          this.disableAgeInput = true;
          const person = this.originalList.find(person => person.name.toLowerCase() === inputValue.toLowerCase());
          this.newAge = person.age;
        } else {
          this.disableAgeInput = false;
          this.newAge = null;
        }
      }, 500);
    }
  }
}
</script>