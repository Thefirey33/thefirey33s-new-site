<script lang="ts">
	import { birthdayTime, tooltip } from '$lib';
	import UnfortunateBirthday from '$lib/assets/sounds/unfortunatebirthday.mp3';
	import WebsiteGuy from '$lib/assets/imgs/website_guy.gif';
	let isPressed = $state(false);
</script>

<div
	class="m-auto w-fit h-fit bg-black border-2 rounded-xl text-center p-5 md:left-0 absolute left-(--max-titlebar) right-0 top-0 bottom-0"
>
	<h1>birthday :o</h1>
	<button
		onmousedown={() => {
			isPressed = true;
		}}
		onmouseup={() => {
			isPressed = false;
		}}
	>
		<img
			src={WebsiteGuy}
			alt="pat the thefirey33."
			width="100"
			onmouseenter={() => {
				$tooltip = 'click to pat.';
			}}
			onmouseleave={() => {
				$tooltip = '';
			}}
			draggable="false"
			class="ml-auto mr-auto image-rendering-pixelated {isPressed
				? 'cursor-grabbing'
				: 'cursor-grab'}"
		/>
	</button>
</div>
<audio src={UnfortunateBirthday} autoplay loop></audio>
