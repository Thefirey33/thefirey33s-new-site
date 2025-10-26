<script lang="ts">
	import WebsiteIco from '$lib/assets/favicon.ico';
	import Info from '$lib/assets/toolbar/about.png';
</script>

<div class="grid gap-2 bg-black md:m-3 mt rounded-xl ring-2 p-5 items-center select-none">
	<div class="flex flex-row ml-auto mr-auto items-center">
		<img src={Info} alt="Info" />
		<h1 class="text-center text-2xl ml-5">About</h1>
	</div>
	<hr class="mt-5 mb-5" />
	<p>
		Hello. I am a Turkish Programmer currently residing in Izmir, Türkiye. I generally like indie
		games like OneShot, deltarune, Undertale.
	</p>
	<p>I generally use C#, C++, Python and TypeScript. But there's tons of other languages i know.</p>
	<hr class="mt-5 mb-5" />
	<h1 class="text-center">Copyright Info</h1>
	<hr class="mt-5 mb-5" />
	<ul class="list-decimal ml-10">
		<li>
			Undertale / deltarune is owned by Toby Fox. All assets belonging to Toby Fox or Materia Music
			Publishing, belong to their respective owners.
		</li>
		<li class="mt-5">
			OneShot is owned / developed by FutureCat LLC. All assets belonging to FutureCat LLC or
			Nightmargin, belong to their respective owners.
		</li>
	</ul>
	<hr class="mt-5 mb-5" />
	<div class="flex flex-row items-center">
		<img src={WebsiteIco} alt="Icon" />
		<p class="ml-5 md:text-xl text-xs">
			<i>Thefirey33 / Wer333 / totallyralsei</i> 2018 - {new Date().getFullYear()}
		</p>
	</div>
</div>
