var PRNG = function( exports )
{
    function setSeed( seed )
    {
        // Create a length 624 array to store the state of the generator
        exports.MT = new Uint32Array( 324 );
        exports.index = 0;
        exports.MT[ 0 ] = seed;
        for( var i = 1 ; i < 324; i++ )
        {
            exports.MT[ i ] = ( 1812433253 * ( exports.MT[i-1] ^ ( exports.MT[ i-1 ] >> 30  ) + i ) );
        }
    }
    function extractNumber()
    {
        if( exports.index == 0 ) { exports.generateNumbers() }

        var y = exports.MT[ exports.index ];
        y = y ^ ( y >> 11 );
        y = y ^ ( ( y << 7 ) & 2636928640 );
        y = y ^ ( ( y << 15 ) & 4022730752 );
        y = y ^ ( y >> 18 );

        exports.index = ( exports.index + 1 ) % 324;
        return y;
    }

    function generateNumbers()
    {
        for( var i = 0; i < 324; i++ )
        {
            var y = ( exports.MT[ i ] & 0x80000000 ) + ( exports.MT[( i + 1 ) % 324 ] & 0x7fffffff );
            exports.MT[ i ] = exports.MT[ ( i + 397 ) % 324] ^ ( y >> 1 );
            if ( y % 2 != 0 )
            {
                exports.MT[ i ] = exports.MT[ i ] ^ 2567483615;
            }
        }
    }
    exports.generateNumbers = generateNumbers;
    exports.extractNumber = extractNumber;
    function random() { return ( exports.extractNumber() / 0x7FFFFFFF ); }
    exports.setSeed = setSeed;
    exports.random = random;
    setSeed(0);
    return exports;
}({});
function squareDistance(v1, v2){
    var dx = (v2[0]-v1[0]);
    var dy = (v2[1]-v1[1]);
    return dx*dx + dy*dy;
}
function norm( t, a, b ){return ( t - a ) / ( b - a );}


function yolo( vertices, size, _w, _h ){

    var sides = 3;
    var l = 2 * Math.sin( Math.PI / sides );
    var a = l / ( 2 * Math.tan( Math.PI / sides ) );
    var h = ( 1 + a );

    size = size || 1;
    l *= size;
    h *= size;

    var mx = 2 * Math.ceil( _w / l );
    var my = Math.ceil( _h / h );

    ctx.beginPath();
    vertices.forEach( function( v ){

        var cell_x = Math.round( norm( v[0], 0, _w ) * mx + .5 );
        var cell_y = Math.round( norm( v[1], 0, _h ) * my + .5 );

        var md = Number.POSITIVE_INFINITY, d, x, y, ix, iy;
        for( var i = cell_x - 1; i < cell_x + 1; i++ ){

            for( var j = cell_y - 1; j < cell_y + 1; j++ ){

                if( Math.abs( i ) % 4 == 0 && Math.abs( j ) % 4 == 0 )continue;

                if( ( Math.abs( i ) % 2 == 1 && Math.abs( j ) % 2 == 0 )
                ||  ( Math.abs( i ) % 2 == 0 && Math.abs( j ) % 2 == 1 ) ){

                    ix = ( i ) * l/2;
                    iy = ( j ) * h;

                    d = squareDistance( [ix,iy], v );
                    if( d < md ){
                        md = d;
                        x = ( i ) * l/2;
                        y = ( j ) * h;
                    }
                }
            }
        }
        ctx.moveTo( v[0], v[1] );
        ctx.lineTo( x, y );
    } );
    ctx.stroke();
}




var size = 1024;
var canvas = document.createElement('canvas');
canvas.style.position ="absolute";
canvas.style.top ="0";
canvas.style.left ="0";
canvas.width = canvas.height = size;
ctx = canvas.getContext('2d');
document.body.appendChild( canvas );

//drawGrid(vertices);
var vertices;
function update(){

    PRNG.setSeed(3);

    var r, a, v, o;
    var count   = 20;
    var spawn   = 40;
    var offset  = 100;
    vertices = [];
    for( var i = 0; i< count; i++ ){

        r = ( PRNG.random() - .5 ) * size / 2;
        a = (i%2==0?-1:1) * Date.now() * 0.0001 + PRNG.random() * Math.PI * 2;
        v = [
            Math.cos( a ) * r,
            Math.sin( a ) * r
        ];
        vertices.unshift( v );

        for( var j = 0; j < spawn * ( .5 + PRNG.random() ); j++ ){

            r = PRNG.random() * offset;
            a = (j%2==0?-1:1) * Date.now() * 0.0002 + PRNG.random() * Math.PI * 2;
            o = vertices[ 0 ];
            v = [
                o[0] + Math.cos( a % r ) * r,
                o[1] + Math.sin( a % r * 2 ) * r
            ];
            vertices.push( v );
        }
    }

    ctx.restore();
    ctx.save();

    canvas.width = document.body.scrollWidth//window.innerWidth;
    canvas.height = document.body.scrollHeight//window.innerHeight;

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#000";
    ctx.fillRect( 0,0, canvas.width, canvas.height );
    ctx.translate( canvas.width/2,canvas.height/2 );

    ctx.strokeStyle = "#FFF";

    var m = size/2;
    for( i = 8; i <= m; i *= 2 ){

        ctx.globalAlpha = (1 - i/m) * .1;
        yolo(  vertices, i, size, size );

    }
    requestAnimationFrame( update );
}
update();