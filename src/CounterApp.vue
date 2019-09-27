<template>
	<div id="app">
		Clicked: {{ incrementCounter }} times.
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
	</div>
</template>

<script lang='ts'>
import { mapGetters, mapActions } from 'vuex';
import { Firebase } from './firebase/firebase';
import { Component, Vue } from 'vue-property-decorator';
import { counterModule } from './store/modules/couter';

@Component
export default class App extends Vue {
	created() {
		// 何か処理
		const firebase = Firebase.GET_INSTANCE();
		firebase.initDatabase();
	}
	increment() {
		counterModule.increment()
	}
	decrement() {
		counterModule.decrement()
	}
	get incrementCounter() {
		return counterModule.counter;
	}
}
</script>
