<template>
    <div>
      <form>
        <label for="email">Email</label>
        <input v-model="form.mail" type="email" id="email" placeholder="Entrez votre email">
        <label for="password">Mot de passe</label>
        <input v-model="form.password" type="password" id="password" placeholder="Entrez votre mot de passe">
        <button @click.prevent="submitForm" type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    name:'MyRegister',
    data() {
      return {
        form: {
          mail: '',
          password: '',
        },
      };
    },
    methods: {
      async submitForm() {
        const url = 'http://localhost:3000/api/user/register';
        try {
          await axios.post(url, {
            mail: this.form.mail,
            password: this.form.password
          });
        } catch (error) {
          console.log(error);
          alert('Une erreur est survenue lors de l\'inscription');
        }
      },
    },
  };
  </script>
  <style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  label {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  input {
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 14px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
  }
  </style>
  