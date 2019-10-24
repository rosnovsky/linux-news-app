<script>
	export let name;
	import moment from 'moment';

	import { onMount } from 'svelte';
	let error = {};
	const apiKey = `API_KEY`;
	const today = moment();
	const date = moment(today).subtract(1, 'weeks').toISOString();
	const excludedDomains = 'sourceforge.net,github.com,askubuntu.com,stackoverflow.com,pypi.org,digitalocean.com,linuxsecurity.com,linuxgizmos.com,img.tfd.com'
	const URL = `https://newsapi.org/v2/everything?q=Linux&from=${date}&language=en&sortBy=publishedAt&excludeDomains=${excludedDomains}&apiKey=${apiKey}`; 
	let articles = [];

	onMount(async function(){
		const response = await fetch(URL);
		const json = await response.json();
		if(json.status !== "ok"){
			error = `Oops, something's wrong. ${json.message}`;
		}else{
		articles = json["articles"];
		}
	});
</script>

<style>
	h1 {
    color: darkred;
	margin: 0 auto;
}

	.container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));
		grid-gap: 15px;
	}

	.container > .card img {
		max-width: 100%;
	}

	img {
		width: 381px;
		height: 223px;
	}
</style>

<h1>All Linux News</h1>
<p><strong>for the past {moment(date).fromNow(true)}</strong>.</p>
<div class="container">
		{#each articles as article}
			<div class="card">
				<img src="{article.urlToImage ? article.urlToImage : 'https://www.placehold.it/381x228?text=No+Image+Available'}" alt={article.title}>
				<div class="card-body">
					<h3>{article.title}</h3>
					<h6>{moment(article.publishedAt).fromNow()}</h6>
					<p> {article.description} </p>
					<a href="{article.url}">Read story</a>
				</div>
			</div>
		{:else}
		<p>{error}</p>
	{/each}
</div>	

