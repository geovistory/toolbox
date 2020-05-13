/**
* Inspired by: https:// www.geeksforgeeks.org/implementation-graph-javascript/
*/

//  create a directed graph class 
class DirectedGraph {

	get noOfVertices() { return this.AdjList.size }

	constructor() {
		this.AdjList = new Map();
	}

	//  add vertex to the graph 
	addVertex(v) {
		//  initialize the adjacent list with a 
		//  null array 
		this.AdjList.set(v, []);
	}

	//  add edge to the graph 
	addDirectedEdge(v, w) {

		if(!this.AdjList.has(v)) console.error('vertex "' + v + '" is missing.')
		//  get the list for vertex v and put the 
		//  vertex w denoting edge betweeen v and w 
		this.AdjList.get(v).push(w);

		// For undirected graph, simply add the other direction here.
	}


	//  Prints the vertex and adjacency list 
	printGraph() {
		//  get all the vertices 
		var get_keys = this.AdjList.keys();

		//  iterate over the vertices 
		for (var i of get_keys) {
			//  great the corresponding adjacency list 
			//  for the vertex 
			var get_values = this.AdjList.get(i);
			var conc = "";

			//  iterate over the adjacency list 
			//  concatenate the values into a string 
			for (var j of get_values)
				conc += j + " ";

			//  print the vertex and its adjacency list 
			console.log(i + " -> " + conc);
		}
	}

	topologicalSorting() {
		// G ← Copy of Graph
		const G = new Map(this.AdjList);

		// L ← Empty list that will contain the sorted elements
		const L = [];

		// S ← Set of all nodes with no incoming edge
		const S = Array.from(G)
			.filter(item => item[1].length === 0)
			.map(item => item[0]);


		// while S is non-empty do
		const buildL = () => {
			// remove a node n from S
			const n = S.shift();
			// add n to tail of L
			L.push(n)
			// console.log('n', n)

			// for each node m with an edge from n to m do
			for (var m of G.keys()) {
				//  get edges me of node m
				const me = G.get(m);
				// console.log(m, me)
				const indexOfEdge = me.indexOf(n)
				if (indexOfEdge > -1) {
					// console.log(n + ' is dependency of',m)

					// remove edge from the graph
					G.get(m).splice(indexOfEdge, 1);

					// if m has no other incoming edges then
					if (G.get(m).length === 0) {
						// console.log('empty',m)
						//  insert m into S
						S.push(m)
					}


				}


			}

			// if S is non-empty repreat
			if (S.length) buildL();
		}
		buildL()

		const remainingEdges = Array.from(G).filter(item => item[1].length > 0);
		//  if graph has edges then
		if (remainingEdges.length > 0) {
			//  return error
			console.error('Error: graph has at least one cycle. remaining edges:', remainingEdges )

		} else {

			//  return L   (a topologically sorted order)
			return L;
		}


	}

}

module.exports = DirectedGraph;



