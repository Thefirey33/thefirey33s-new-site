<script lang="ts">
	import Dialtone from '$lib/assets/sounds/dialtone.ogg';
	import Spamtong from '$lib/assets/imgs/walpapers/spamtong.png';
	import Refuge from '$lib/assets/imgs/walpapers/barrens.png';

	import { onMount } from 'svelte';
	import { BACKGROUND_CSS_VAL } from '$lib';

	let urlValue: string = $state('https://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUJcmlja3JvbGxs');
	onMount(() => {
		document.title = "SPAMTON's HOT DEALZZ!!";
		document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${Spamtong})`);
		return () => {
			document.title = 'thefirey33';
			document.documentElement.style.setProperty(BACKGROUND_CSS_VAL, `url(${Refuge})`);
		};
	});
</script>

<div class="bg-black/50 binary-background w-full h-full font-[Cool_Font]">
	<div class="bg-black/50 w-full h-full flex flex-col">
		<h1 class="text-2xl spamton-text">SPAMTON'S HOT DEALZZZ!!!</h1>
		<audio src={Dialtone} autoplay loop></audio>
		<p class="text-white">
			HEY [[LITTLE SPONGE!!!]] ARE YOU TIRED OF [[shameless corporations]] BLOATING YOUR [[little
			gamer PC %50 off]] WITH ADS NOT RELATED TO THE [[BEST SALESMAN1997]]?!
		</p>
		<input
			bind:value={urlValue}
			name="link"
			type="url"
			class="bg-yellow-500 text-purple-800 placeholder-purple-500 rotate-3"
		/>
		<button
			onclick={() => {
				alert('You feel your kromer being whisked away...');
				window.location.href = 'about:blank';
			}}
			class="lg:text-[200px] text-[50px] cursor-crosshair overflow-hidden hover:text-pink-600"
			>TRANSFER</button
		>
	</div>
</div>
