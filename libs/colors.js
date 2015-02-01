
// *** Primary color:

   primary0 = "#FF7100"// = rgb(255,113,  0) = rgba(255,113,  0,1) = rgb0(1,0.443,0)
   primary1 = "#FFCCA3"// = rgb(255,204,163) = rgba(255,204,163,1) = rgb0(1,0.8,0.639)
   primary2 = "#FF9745"// = rgb(255,151, 69) = rgba(255,151, 69,1) = rgb0(1,0.592,0.271)
   primary3 = "#EE6900"// = rgb(238,105,  0) = rgba(238,105,  0,1) = rgb0(0.933,0.412,0)
   primary4 = "#7E3800"// = rgb(126, 56,  0) = rgba(126, 56,  0,1) = rgb0(0.494,0.22,0)

// *** Secondary color (1):

   secondary0 = "#FFCB00"// = rgb(255,203,  0) = rgba(255,203,  0,1) = rgb0(1,0.796,0)
   secondary1 = "#FFECA3"// = rgb(255,236,163) = rgba(255,236,163,1) = rgb0(1,0.925,0.639)
   secondary2 = "#FFD945"// = rgb(255,217, 69) = rgba(255,217, 69,1) = rgb0(1,0.851,0.271)
   secondary3 = "#EEBD00"// = rgb(238,189,  0) = rgba(238,189,  0,1) = rgb0(0.933,0.741,0)
   secondary4 = "#7E6400"// = rgb(126,100,  0) = rgba(126,100,  0,1) = rgb0(0.494,0.392,0)

// *** Secondary color (2):

   tertiary0 = "#F10076"// = rgb(241,  0,118) = rgba(241,  0,118,1) = rgb0(0.945,0,0.463)
   tertiary1 = "#F99FCB"// = rgb(249,159,203) = rgba(249,159,203,1) = rgb0(0.976,0.624,0.796)
   tertiary2 = "#F44299"// = rgb(244, 66,153) = rgba(244, 66,153,1) = rgb0(0.957,0.259,0.6)
   tertiary3 = "#C50061"// = rgb(197,  0, 97) = rgba(197,  0, 97,1) = rgb0(0.773,0,0.38)
   tertiary4 = "#680033"// = rgb(104,  0, 51) = rgba(104,  0, 51,1) = rgb0(0.408,0,0.2)

// *** Complement color:

   quaternary0 = "#00DFD7"// = rgb(  0,223,215) = rgba(  0,223,215,1) = rgb0(0,0.875,0.843)
   quaternary1 = "#9BF2EF"// = rgb(155,242,239) = rgba(155,242,239,1) = rgb0(0.608,0.949,0.937)
   quaternary2 = "#3EE5DF"// = rgb( 62,229,223) = rgba( 62,229,223,1) = rgb0(0.243,0.898,0.875)
   quaternary3 = "#00908B"// = rgb(  0,144,139) = rgba(  0,144,139,1) = rgb0(0,0.565,0.545)
   quaternary4 = "#004D4A"// = rgb(  0, 77, 74) = rgba(  0, 77, 74,1) = rgb0(0,0.302,0.29)



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
   return colors[index]
}

module.exports = {
   palette: palette,
   randomColor: randomColor
}