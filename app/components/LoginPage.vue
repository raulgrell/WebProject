<template>
  <div class="login-page">
    <div class="login-header">
      <img src="logo.png" height="48" width="72.25">
      <p class="is-size-2 has-text-centered">Discover the world, one card at a time</p>
    </div>

    <div class="columns">
      <div class="column">
        <h2 class="is-size-3 ">Find new people</h2>
        <p class="is-size-5">Meet people with the same interests as you and make new friends!</p>
        <h2 class="is-size-3">Visit unknown locations with friends</h2>
        <p class="is-size-5">Get to know new locations and places alone, or better, with a group of friends!</p>
        <h2 class="is-size-3">Collect cards to make your deck even bigger</h2>
        <p class="is-size-5">Get cards by doing activities and by discovering new places!</p>
        <h2 class="is-size-3">Share your interests and favourite places</h2>
        <p class="is-size-5">Show everyone you loved a certain place or activity</p>
      </div>

      <div class="RegForm">
        <div class="box">
          <p class="is-size-5 has-text-centered">Join us now!</p>
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input id="NameReg" class="input" type="text" placeholder="User Name" required>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input id="EmailReg" class="input" type="email" placeholder="E-mail" required>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input id="PassReg" name="Password" class="input" type="password" placeholder="password" required>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Repeat Password</label>
            <div class="control has-icons-left has-icons-right">
              <input id="checkPass" name="CheckPassword" class="input" type="password" placeholder="Repeat Password" required>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox"> I agree to the
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button @click="register()" class="button is-link">Submit</button>
            </div>

            <div class="control">
              <button class="button">already have an account?</button>
            </div>
          </div>
        </div>
      </div>

      <div class="LoginForm">
        <div class="box">
          <p class="is-size-5 has-text-centered">Login
            <p>

              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input id="NameLog" class="input" type="text" placeholder="User Name" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left has-icons-right">
                  <input id="PassLog" name="Password" class="input" type="password" placeholder="password" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button @click="login()" class="button is-link">Login</button>
                </div>
              </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    register: function () {
      var player = {
        name: document.getElementById("NameReg").value,
        email: document.getElementById("EmailReg").value,
        pass: document.getElementById("PassReg").value
      };
      var checkPass = document.getElementById("checkPass").value;
      if (checkPass == pass) {
        axios.post("/register", player).then(response => {
          window.location.href = "/";
        });
      }
    },
    login: function () {
      var namelog = document.getElementById("NameLog").value;
      var passlog = document.getElementById("PassLog").value;
      axios.post("/login", { name, pass });
    }
  }
};
</script>

<style>
</style>
