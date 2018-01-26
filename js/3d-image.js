var img = new Image();
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var myChart = echarts.init(document.getElementById("graph"));
img.onload = function () {
    var width = canvas.width = img.width;
    var height = canvas.height = img.height;
    ctx.drawImage(img, 0, 0, width, height);
    var imgData = ctx.getImageData(0, 0, width, height);

    var data = [];
    for (var i = 0; i < imgData.data.length / 4; i++) {
        var r = imgData.data[i * 4];
        var g = imgData.data[i * 4 + 1];
        var b = imgData.data[i * 4 + 2];

        var lum = 255 - (0.2125 * r + 0.7154 * g + 0.0721 * b);
        lum = (lum - 125) / 20 + 50;
        data.push([i % width, height - Math.floor(i / width), lum]);
    }


    myChart.setOption(option = {
        tooltip: {},
        backgroundColor: '#fff',
        xAxis3D: {
            type: 'value'
        },
        yAxis3D: {
            type: 'value'
        },
        zAxis3D: {
            type: 'value',
            min: 0,
            max: 100
        },
        grid3D: {
            viewControl: {
                alpha: 70,
                beta: 0
            },
            postEffect: {
                enable: true,
                SSAO: {
                    enable: true
                }
            },
            boxDepth: 120,
            light: {
                main: {
                    shadow: true,
                    intensity: 2
                },
                ambientCubemap: {
                   // texture: 'data-gl/asset/canyon.hdr',
                    exposure: 2,
                    diffuseIntensity: 0.2,
                    specularIntensity: 1
                }
            }
        },
        series: [{
            type: 'bar3D',
            shading: 'realistic',
            barSize: 1,
            wireframe: {
                show: false
            },
            itemStyle: {
                color: function (params) {
                    var i = params.dataIndex;
                    var r = imgData.data[i * 4];
                    var g = imgData.data[i * 4 + 1];
                    var b = imgData.data[i * 4 + 2];
                    return 'rgb(' + [r, g, b].join(',') + ')';
                }
            },
            data: data
        }]
    });
}

img.src = '../data/ali.jpg';