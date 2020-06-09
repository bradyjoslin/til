<script>
	let array = [
		{id:1, val:"hello"},
		{id:2, val:"world"},
		{id:3, val:"sorted"},
		{id:4, val:"table"},
	];
	
	// Holds table sort state.  Initialized to reflect table sorted by id column ascending.
	let sortBy = {col: "id", ascending: true};
	
	$: sort = (column) => {
		
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending
		} else {
			sortBy.col = column
			sortBy.ascending = true
		}
		
		// Modifier to sorting function for ascending or descending
		let sortModifier = (sortBy.ascending) ? 1 : -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
		
		array = array.sort(sort);
	}
</script>

<style>
	table, th, td {
		border: 1px solid black;
		border-collapse: collapse;
	}
	table {
		background: #eee;
		width: 50%;
		text-align: center;
	}
</style>

<table>
	<thead>
		<tr>
			<th on:click={sort("id")}>id</th>
			<th on:click={sort("val")}>val</th>
		</tr>
	</thead>
	<tbody>
		{#each array as row}
			<tr>
				<td>{row.id}</td>
				<td>{row.val}</td>
			</tr>
		{/each}
	</tbody>
</table>