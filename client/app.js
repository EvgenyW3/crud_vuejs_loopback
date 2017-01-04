new Vue({
  el: '#api',

  data: {
    person: {firstname: '', lastname: ''},
    people: [],
    index: ''
  },

  ready : function() {
    this.fetchData();
  },

  methods: {
    fetchData: function() {
      //Fetching all data from api
      this.$http.get('/api/people').then(function(response){
        this.$set('people', response.body);
      });
    },
    addPerson: function(){
      //If both input fields aren't empty create a person
      if(this.person.firstname && this.person.lastname) {
        this.$http.post('api/people', this.person).then(function(response){
          //Adding just created person to people array
          this.people.push(this.person);
          //Cleaning input fields
          this.person = {firstname: '', lastname: ''};
        });
      }
    },
    removePerson: function(index) {
      //Deleting a particular person from db and people array
      this.$http.delete('api/people/'+this.people[index].id).then(function(response){
        this.people.splice(index, 1);
      });
    },
    modifyPerson: function(index) {
      //Moving particular person's data to input fields
      let modify = this.people[index];
      this.person = {firstname: modify.firstname, lastname: modify.lastname};
      //Passing index to hidden input
      document.getElementById("index").value = index;
      //Playing with dom
      document.getElementById("add").style.display = "none";
      document.getElementById("modify").style.display = "block";
    },
    doModify: function() {
      var index = document.getElementById("index").value;
      //Calling api to modify existing object
      if(this.person.firstname && this.person.lastname) {
        this.$http.put('api/people/'+this.people[index].id, this.person).then(function(response){
          this.people[index].firstname = this.person.firstname;
          this.people[index].lastname = this.person.lastname;
          this.person = {firstname: '', lastname: ''};
          document.getElementById("add").style.display = "block";
          document.getElementById("modify").style.display = "none";
        });
      }
    }
  }
});



