var app = angular.module('d3BubbleGraph', ['myCongress.services']);

app.directive('bubbleGraph', function(Politicians, $stateParams) {

	Politicians.getRep($stateParams.id).then(function(data){

		(function link(scope, element) {

			var height = 200;
			var width = 700;
			var x = 0
			var format = d3.format(',d');
			var color = d3.scale.category20c();

			var bubble = d3.layout.pack()
			    .sort(null)
			    .size([height, width])
			    .padding(1.5);

			var svg = d3.select('bubble-graph').append('svg')
			    .attr('width', width)
			    .attr('height', height)
			    .attr('class', 'bubble');

		  var node = svg.selectAll('.node')
		      .data(data.data.top_Contributing_Industries)
		    .enter().append('g')
		      .attr('class', 'node')
		      .attr('transform', function(d) {
		      	x += (2 * d.total_amount / 5000 + 10); 
		      	return 'translate(' + (x - d.total_amount / 5000) + ',' + height / 2 + ')'; 
		      });
			  
		  node.append('title')
		      .text(function(d) { return d.name + '\nTotal Contribution: ' + format(d.total_amount) + '\nNumber of Contributions: ' + format(d.number_contributions); });
		  
		  node.append('circle')
		      .attr('r', function(d) { return d.total_amount / 5000; })
		      .style('fill', function(d) { return color(d.packageName); });
		})();
		
	});
})