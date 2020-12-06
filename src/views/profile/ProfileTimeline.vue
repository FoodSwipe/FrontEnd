<template>
	<v-card max-width="1200"
		class="mx-2 mx-auto"
		flat
	>
		<v-timeline class="px-4">
			<v-timeline-item
				v-for="(data, i) in timelineData"
				:key="i"
				:color="data.color"
				small
			>
				<template #opposite>
					<span
						:class="`headline font-weight-bold ${data.color}--text`"
						v-text="data.timestamp"
					/>
				</template>
				<div class="py-4">
					<h2 :class="`headline font-weight-light mb-4 ${data.color}--text`">
						Lorem ipsum
					</h2>
					<div>
						Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
					</div>
				</div>
			</v-timeline-item>
		</v-timeline>
	</v-card>
</template>
<script>
export default {
	data: () => ({
		timelineData: [
			{
				color: "cyan",
				timestamp: "May 2, 1960",
			},
			{
				color: "green",
				timestamp: "June 9, 1970",
			},
			{
				color: "pink",
				timestamp: "April 1, 1980",
			},
			{
				color: "amber",
				timestamp: "Dec 25, 1990",
			},
			{
				color: "orange",
				timestamp: "Jan 5, 2000",
			},
		],
	}),
}
</script>
