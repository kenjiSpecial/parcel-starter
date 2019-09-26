<template>
	<div id="app">
		Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
	</div>
</template>

<script lang='ts'>
import { mapGetters, mapActions } from 'vuex';
import firebase from './firebase/firebase';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
	created() {
		// 何か処理
		firebase.initDatabase();
	}
	increment() {
		this.$store.dispatch('increment');
	}
	decrement() {
		this.$store.dispatch('decrement');
	}
	get evenOrOdd() {
		return this.$store.getters.evenOrOdd;
	}
}

</script>
