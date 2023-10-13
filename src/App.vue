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
                  >
                  <label
                    for="icon_age"
                    class="active"
                  >Age</label>
                </div>
                <div class="col s12 right-align">
                  <button
                    class="btn btn-primary"
                    :disabled="newName.length === 0 || newAge.length === 0"
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
                <span class="title">{{ person.name }}, <i class="red-text accent-4">{{ person.age }}</i></span>
              </li>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'default',
      newName: '',
      newAge: '',
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
      exists: null
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
    hidePerson: function(person) {
      //This will remove the item.
      //this.originalList.splice(index, 1);

      //While this will tell that the person is added in the new list 
      //and will be hidden from the original list.
      this.originalList.splice(this.originalList.map(function(e) {
        return e.name;
      }).indexOf(person), 1, {
        name: this.newName,
        age: this.newAge,
        isInNewList: true
      })
    },
    checkIfExist: function(name) {
      this.exists = this.originalList.some((person) => {
        return person.name === name
      })
    },
    addColleague: function() {
      if (!this.newName || !this.newAge) {
        return;
      }
      
      this.checkIfExist(this.newName)
      if (this.exists)
        this.hidePerson(this.newName);

      this.newList.push({
        name: this.newName,
        age: this.newAge,
      });
      this.newName = '';
      this.newAge = '';
    },
    changeState: function(newState) {
      //Change states: 'Default', 'Animate', and 'Add'
      this.state = newState;
      this.newItem = '';
    }
  }
}
</script>