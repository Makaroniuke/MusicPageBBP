var waveformsData = JSON.parse(document.getElementById('waveform-data').getAttribute('data-waveforms'));
  var play = [];
  for (let i = 0; i < waveformsData.length; i++){ 
    const str = 'play' + i;
    play[str]  = document.getElementById('play'+i)

    const wavesurfer = WaveSurfer.create({
        container: '#waveform'+i,
        waveColor: '#bebebe',
        progressColor: '#478ac9',
        barWidth: 4,
        responsive: true,
        height: 50,
        width: 200,
        barRadius: 4,
        interact: true,
        url: waveformsData[i].sampleUrl
    })

    play[str].onclick = function () {
      wavesurfer.playPause()
      if (play[str].src.includes('play.png')) {
        play[str].src = '/images/pause.png'
      }
      else {
        play[str].src = '/images/play.png'
      }
    }
    wavesurfer.on('finish', function () {
      play[str].src = '/images/play.png'});

  }
  