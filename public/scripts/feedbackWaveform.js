var waveformsData = JSON.parse(document.getElementById('waveform-data').getAttribute('data-waveforms'));
var play= document.getElementById('play')

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#bebebe',
    progressColor: '#478ac9',
    barWidth: 4,
    responsive: true,
    height: 100,
    width: 1000,
    barRadius: 4,
    interact: true,
    url: waveformsData.url
})

play.onclick = function () {
  wavesurfer.playPause()
  if (play.src.includes('play.png')) {
    play.src = '/images/pause.png'
  }
  else {
    play.src = '/images/play.png'
  }
}
wavesurfer.on('finish', function () {
  play.src = '/images/play.png'});
