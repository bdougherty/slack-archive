<script lang="ts">
	export let timestamp: string;

	const formatter = new Intl.DateTimeFormat('default', {
		dateStyle: 'medium'
	});

	$: date = new Date(Number.parseFloat(timestamp) * 1000);
</script>

<div class="divider">
	<div class="button">{formatter.format(date)}</div>
</div>

<style>
	.divider {
		width: 100%;
		position: relative;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.divider::before {
		content: '';
		position: absolute;
		inset-block-start: 50%;
		height: 0;
		width: 100%;
		border-block-start: 1px #ddd solid;
	}

	.button {
		font-size: 13px;
		font-weight: 700;
		background-color: #fff;
		z-index: 1;
		height: 28px;
		line-height: 27px;
		padding: 0 16px;
		border-radius: 24px;
		box-shadow: 0 0 0 1px rgba(29, 28, 29, 0.13), 0 1px 3px 0 #00000014;
	}
</style>
