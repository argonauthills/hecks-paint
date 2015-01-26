// Primary color:

   primary0 = "#F67107" //= rgb(246,113,  7) = rgba(246,113,  7,1) = rgb0(0.965,0.443,0.027)
   primary1 = "#FFAA67" //= rgb(255,170,103) = rgba(255,170,103,1) = rgb0(1,0.667,0.404)
   primary2 = "#FE933D" //= rgb(254,147, 61) = rgba(254,147, 61,1) = rgb0(0.996,0.576,0.239)
   primary3 = "#C05500" //= rgb(192, 85,  0) = rgba(192, 85,  0,1) = rgb0(0.753,0.333,0)
   primary4 = "#964300" //= rgb(150, 67,  0) = rgba(150, 67,  0,1) = rgb0(0.588,0.263,0)

// Secondary color (1):

   secondary0 = "#F6C507" //= rgb(246,197,  7) = rgba(246,197,  7,1) = rgb0(0.965,0.773,0.027)
   secondary1 = "#FFE067" //= rgb(255,224,103) = rgba(255,224,103,1) = rgb0(1,0.878,0.404)
   secondary2 = "#FED73D" //= rgb(254,215, 61) = rgba(254,215, 61,1) = rgb0(0.996,0.843,0.239)
   secondary3 = "#C09900" //= rgb(192,153,  0) = rgba(192,153,  0,1) = rgb0(0.753,0.6,0)
   secondary4 = "#967800" //= rgb(150,120,  0) = rgba(150,120,  0,1) = rgb0(0.588,0.471,0)

// Secondary color (2):

   tertiary0 = "#CC0567" //= rgb(204,  5,103) = rgba(204,  5,103,1) = rgb0(0.8,0.02,0.404)
   tertiary1 = "#DC5999" //= rgb(220, 89,153) = rgba(220, 89,153,1) = rgb0(0.863,0.349,0.6)
   tertiary2 = "#D33381" //= rgb(211, 51,129) = rgba(211, 51,129,1) = rgb0(0.827,0.2,0.506)
   tertiary3 = "#9F004E" //= rgb(159,  0, 78) = rgba(159,  0, 78,1) = rgb0(0.624,0,0.306)
   tertiary4 = "#7D003D" //= rgb(125,  0, 61) = rgba(125,  0, 61,1) = rgb0(0.49,0,0.239)

// Complement color:

   quaternary0 = "#049590" //= rgb(  4,149,144) = rgba(  4,149,144,1) = rgb0(0.016,0.584,0.565)
   quaternary1 = "#47B0AC" //= rgb( 71,176,172) = rgba( 71,176,172,1) = rgb0(0.278,0.69,0.675)
   quaternary2 = "#259B96" //= rgb( 37,155,150) = rgba( 37,155,150,1) = rgb0(0.145,0.608,0.588)
   quaternary3 = "#007470" //= rgb(  0,116,112) = rgba(  0,116,112,1) = rgb0(0,0.455,0.439)
   quaternary4 = "#005B58" //= rgb(  0, 91, 88) = rgba(  0, 91, 88,1) = rgb0(0,0.357,0.345)


var colors = [
   primary0,
   primary1,
   primary2,
   primary3,
   primary4,

   secondary0,
   secondary1,
   secondary2,
   secondary3,
   secondary4,

   tertiary0,
   tertiary1,
   tertiary2,
   tertiary3,
   tertiary4,

   quaternary0,
   quaternary1,
   quaternary2,
   quaternary3,
   quaternary4,
]

var palette = colors.map(function(c) {return color(c)})

function color(hexValue, alias) {
    return {hexValue: hexValue, alias: alias}
}


function randomColor() {
   var index = Math.floor(Math.random() * colors.length)
   console.log("index", index)
   console.log("colors.index", colors[index])
   console.log("colors", colors)
   return colors[index]
}

module.exports = {
   palette: palette,
   randomColor: randomColor
}