<template>
	<div>
		<div class="bg pt-12 pt-xl-16 pt-lg-16">
			<div class="headline text-center py-16 grey--text text--lighten-3 rounded-0 my-auto">
				<v-row class="ma-0 pa-0 pt-12 pt-xl-10 pt-lg-10"
					justify="center"
					align="center"
					no-gutters
				>
					<v-icon class="top-radio"
						:class="
							['Confirm Payment', 'Confirm Order', 'Review Order'].includes($route.name)
								? 'active-radio'
								: ''
						"
					>
						radio_button_checked
					</v-icon>
					<div class="hr"
						:class="
							['Confirm Payment', 'Confirm Order', 'Review Order'].includes($route.name)
								? 'active-hr'
								: ''
						"
					/>
					<v-icon class="top-radio slight-left"
						:class="
							['Confirm Payment', 'Review Order'].includes($route.name)
								? 'active-radio'
								: ''
						"
					>
						radio_button_checked
					</v-icon>
					<div class="hr"
						:class="
							['Confirm Payment', 'Review Order'].includes($route.name)
								? 'active-hr'
								: ''
						"
					/>
					<v-icon class="top-radio slight-left"
						:class="
							['Review Order'].includes($route.name)
								? 'active-radio'
								: ''
						"
					>
						radio_button_checked
					</v-icon>
					<div class="hr"
						:class="
							['Review Order'].includes($route.name)
								? 'active-hr'
								: ''
						"
					/>
					<v-icon class="top-radio slight-left"
						:class="
							['Review Order'].includes($route.name)
								? 'active-radio'
								: ''
						"
					>
						radio_button_checked
					</v-icon>
				</v-row>
				<span class="top-text"
					@click="routeToOrderShipping()"
				>Shipping</span>
				<span class="mid-padding top-text"
					@click="routeToOrderPayment()"
				>Payment</span>
				<span class="top-text"
					@click="routeToOrderReview()"
				>Review</span>
			</div>
			<div class="custom-shape-divider-bottom-1607775812">
				<svg data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
						opacity=".25" class="shape-fill"
					/>
					<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
						opacity=".5" class="shape-fill"
					/>
					<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
						class="shape-fill"
					/>
				</svg>
			</div>
		</div>
		<router-view />
	</div>
</template>
<script>
import router from "@/router"

export default {
	name: "OrderConfirmation",
	data: () =>  ({
		// do something
	}),
	methods: {
		routeToOrderShipping() {
			// router.push({name: "Confirm Order"})
		},
		routeToOrderPayment() {
			// router.push({name: "Confirm Payment"})
		},
		routeToOrderReview() {
			// router.push({name: "Review Order"})
		}
	}
}
</script>
<style lang="scss" scoped>
.active-radio {
	color: #2769ed !important;
}
.active-hr {
	background-color: #2769ed !important;
}
.top-radio {
	color: #474747;
}
.mid-padding {
	transition: all .3s ease;
	padding: 0 70px;
	@media only screen and (max-width: 475px) {
		padding: 0 20px;
	}
	@media only screen and (max-width: 475px) {
		padding: 0 5px;
	}
}
.hr {
	transition: all .3s ease;
	background-color: #4d4d4f;
	height: 2px;
	width: 125px;
	margin-left: -4px;
	@media only screen and (max-width: 475px) {
		width: 50px;
	}
	@media only screen and (max-width: 245px) {
		width: 25px;
	}
}
.bg {
	transition: all .3s ease;
	background: #cba125;
	position: relative;
	min-height: 45vh;
	@media only screen and (max-width: 528px) {
		min-height: 50vh;
	}
}
.slight-left {
	margin-left: -2px;
}
.active-text {
	color: #2769ed
}
.top-text {
	font-size: 1.2rem;
	@media only screen and (max-width: 475px) {
		font-size: .875rem;
	}
	&:hover {
		color: #3479e2;
	}
}
.custom-shape-divider-bottom-1607775812 {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
}

.custom-shape-divider-bottom-1607775812 svg {
	position: relative;
	display: block;
	width: calc(100% + 1.3px);
	height: 155px;
}

.custom-shape-divider-bottom-1607775812 .shape-fill {
	fill: #FFFFFF;
}

/** For mobile devices **/
@media (max-width: 767px) {
	.custom-shape-divider-bottom-1607775812 svg {
		width: calc(100% + 1.3px);
		height: 55px;
	}
}
.delivery-detils-card {
	margin: -180px 0 20px 0;
	background-color: #ffc1072b;
}
</style>
