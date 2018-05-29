document.addEventListener('DOMContentLoaded', () =>{
    //Starting state
    let draw = false

    //Elements
    let points = [];
    let lines = [];
    let svg= null;

    function render(){
        //Creates the selection area.
        svg = d3.select('#draw')
                .attr('height', window.innerHeight)
                .attr('width', window.innerWidth);

        //Allows you to draw when mouse is pressed.
        svg.on('mousedown', function(){
            draw = true;
            const coords = d3.mouse(this);
            draw_point(coords[0], coords[1], false);
        });

        //Causes not to draw when moused is not pressed.
        svg.on('mouseup', () => {
            draw = false;
        });

        //Stops mouse from drawing when it moves over the drawing board.
        svg.on('mousemove', function(){
            if (draw === false)
            return;
            const coords = d3.mouse(this);
            draw_point(coords[0], coords[1], true);
        });

        //This event happens when the erase button is clicked.
        document.querySelector('#erase').onclick = () => {
            for (let i = 0; i <points.length; i++)
                points[i].remove();
            for (let i = 0; i <lines.length; i++)
                lines[i].remove();
            points = [];
            lines = [];
        }
    }

    //Following function allows the points to connect to form consecutive points thus making a smooth line.
    function draw_point(x, y, connect){
        const color = document.querySelector('#color-picker').value;
        const thickness = document.querySelector('#thickness-picker').value;

        if(connect) {
            //most recent point.
            const last_point = points[points.length -1];
            const line = svg.append('line')
                            .attr('x1', last_point.attr('cx'))
                            .attr('y1', last_point.attr('cy'))
                            .attr('x2', x)
                            .attr('y2', y)
                            .attr('stroke-width', thickness *2)
                            .style('stroke', color);
            lines.push(line);
        }
        //Adds point.
        const point = svg.append('circle')
                         .attr('cx', x)
                         .attr('cy', y)
                         .attr('r', thickness)
                         .style('fill', color);
        points.push(point);
    }
    render();
})