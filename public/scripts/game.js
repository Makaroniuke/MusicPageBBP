const knobWheel = document.querySelector('.knobWheel')
const knobWheel2 = document.querySelector('.knobWheel2')
const knobWheel3 = document.querySelector('.knobWheel3')
const knobWheel4 = document.querySelector('.knobWheel4')
const knobWheel5 = document.querySelector('.knobWheel5')
const knobWheel6 = document.querySelector('.knobWheel6')

const values = {
  '-120': 0, 
  '-60': 0.25, 
  '0': 0.5, 
  '60': 0.75, 
  '120': 1, 
}

const valuesPanning = {
  '-120': -1, 
  '-60': -0.5, 
  '0': 0, 
  '60': 0.5, 
  '120': 1, 
}

const valuesFilter = {
  '-120': 0, 
  '-60': 1000, 
  '0': 5000, 
  '60': 10000, 
  '120': 15000, 
}

const valuesPitch = {
  '-120': -12, 
  '-60': -7, 
  '0': 0, 
  '60': 7, 
  '120': 12, 
}

const valuesSemitones = {
  '-12': 220, 
  '-7': 329, 
  '0': 440, 
  '7':  659, 
  '12': 880, 
}

let angle = 0  
const angles = [120, 60, 0, -60, -120];

const knob4 = document.getElementById("knob4");
const knobValue = document.getElementById("knob-value");
const knobValue2 = document.getElementById("knob-value2");
const knobValue3 = document.getElementById("knob-value3");
const knobValue4 = document.getElementById("knob-value4");
const knobValue5 = document.getElementById("knob-value5");
const knobValue6 = document.getElementById("knob-value6");

const oscc1 = document.getElementById("waves")
const oscc2 = document.getElementById("waves2")

knobValue.textContent = values[angle.toString()];
knobValue2.textContent = values[angle.toString()];
knobValue3.textContent = valuesFilter[angle.toString()];
knobValue4.textContent = valuesPanning[angle.toString()];
knobValue5.textContent = valuesPitch[angle.toString()];
knobValue6.textContent = valuesPitch[angle.toString()];

let soundWave1, soundWave2, volume1, volume2,pitch1, pitch2, filterType, filterFrequency,panning, attack = 0

const waves = ['sine', 'saw', 'square']
const filters = ['bypass', 'lowpass', 'highpass']
const frequencies = [0,1000,5000,10000,15000]
const pitch = [-12,-7,0,7,12]
const pan = [-1,-0.5,0,0.5,1]

function generateNumber() {
  var randomInteger = Math.floor(Math.random() * 5); 
  var number = randomInteger * 0.25;
  return number;
}

function easyLevel(){
  soundWave1 = waves[(Math.floor(Math.random() * waves.length))]
  soundWave2 = waves[(Math.floor(Math.random() * waves.length))]
  volume1 = generateNumber()
  volume2 = generateNumber()
  pitch1 = 0
  pitch2 = 0
  filterType = filters[(Math.floor(Math.random() * filters.length))]
  filterFrequency = frequencies[(Math.floor(Math.random() * frequencies.length))]
  panning = 0
  attack = 0

  //console.log(soundWave1, soundWave2, volume1, volume2, filterType, filterFrequency,panning, attack)
  return [soundWave1, soundWave2, volume1, volume2,pitch1, pitch2, filterType, filterFrequency, panning, attack]
}

function hardLevel(){
  soundWave1 = waves[(Math.floor(Math.random() * waves.length))]
  soundWave2 = waves[(Math.floor(Math.random() * waves.length))]
  volume1 = generateNumber()
  volume2 = generateNumber()
  pitch1 = pitch[(Math.floor(Math.random() * pitch.length))]
  pitch2 = pitch[(Math.floor(Math.random() * pitch.length))]
  filterType = filters[(Math.floor(Math.random() * filters.length))]
  filterFrequency = frequencies[(Math.floor(Math.random() * frequencies.length))]
  panning = pan[(Math.floor(Math.random() * pan.length))]
  attack = 0

  //console.log(soundWave1, soundWave2, volume1, volume2, pitch1, pitch2, filterType, filterFrequency,panning, attack)
  return [soundWave1, soundWave2, volume1, volume2,pitch1, pitch2, filterType, filterFrequency, panning, attack]
}

function playWave() {
  const osc1 = document.getElementById("waves").value
  const osc2 = document.getElementById("waves2").value
  const filter = document.getElementById("filter").value

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const channels = 2;
  const sampleRate = audioContext.sampleRate;
  const duration = 1;
  const frameCount = sampleRate * duration;

  const attackTime = 0; 
  const audioBuffer = audioContext.createBuffer(channels, frameCount, sampleRate);
  for (let channel = 0; channel < channels; channel++) {
    const nowBuffering = audioBuffer.getChannelData(channel);
    console.log('loop 1')
    for (let i = 0; i < frameCount; i++) {
      const value1 = createWave(i, osc1, knobValue.textContent,attackTime, sampleRate, valuesSemitones[knobValue5.textContent])
      const value2 = createWave(i, osc2, knobValue2.textContent,attackTime, sampleRate, valuesSemitones[knobValue6.textContent])
  
      nowBuffering[i] = (value1 + value2) / 2  ;
    }
  }
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  const panner = audioContext.createStereoPanner();
  panner.pan.value = knobValue4.textContent
  
  if(filter !== 'bypass'){  
    const lowpassFilter = audioContext.createBiquadFilter();
    lowpassFilter.type = filter;
    lowpassFilter.frequency.value = knobValue3.textContent
    source.connect(lowpassFilter);
    lowpassFilter.connect(panner);
    panner.connect(audioContext.destination);
  }else{
    source.connect(panner);
  
    panner.connect(audioContext.destination);
  }
  source.start(); 
}

document.getElementById('generateWaves').addEventListener('click', ()=>{
  generateWaves(soundWave1, soundWave2, volume1, volume2,pitch1, pitch2, filterType, filterFrequency, panning, attack)
})

function generateWaves(soundWave1, soundWave2, volume1, volume2,pitch1, pitch2, filterType, filterFrequency, panning, attack) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const channels = 2; 
  const sampleRate = audioContext.sampleRate;
  const duration = 1; 
  const frameCount = sampleRate * duration;

  const audioBuffer = audioContext.createBuffer(channels, frameCount, sampleRate);
  for (let channel = 0; channel < channels; channel++) {
    const nowBuffering = audioBuffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      const value1 = createWave(i, soundWave1, volume1, attack, sampleRate, valuesSemitones[pitch1])
      const value2 = createWave(i, soundWave2, volume2, attack, sampleRate, valuesSemitones[pitch2])
  
      nowBuffering[i] = (value1 + value2) / 2  ;
    }
  }

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  const panner = audioContext.createStereoPanner();
  panner.pan.value = panning // example panning to right
  
  if(filterType !== 'bypass'){  
    const lowpassFilter = audioContext.createBiquadFilter();
    lowpassFilter.type = filterType;
    lowpassFilter.frequency.value = filterFrequency
    source.connect(lowpassFilter);
    lowpassFilter.connect(panner);
    panner.connect(audioContext.destination);
  }else{
    source.connect(panner);
    panner.connect(audioContext.destination);
  }
  source.start();   
}

function createWave(i, osc1, volume, attack, sampleRate, pitch){
  let value1 = 0
  const attackSamples = attack * sampleRate; 
  switch(osc1){
    case 'sine':{
      if (i < attackSamples) {
        value1 = (i/attackSamples) * Math.sin((i / sampleRate) * 2 * Math.PI * pitch) * volume // Sine wave  
      }else{
        value1 = Math.sin((i / sampleRate) * 2 * Math.PI * pitch) * volume // Sine wave  
      }
      break;     
    }   
    case 'square':{
      if (i < attackSamples) {
        value1 = (i/attackSamples) * Math.sign(Math.sin((i / sampleRate) * 2 * Math.PI * pitch)) * volume // Sine wave  
      }else{
        value1 = Math.sign(Math.sin((i / sampleRate) * 2 * Math.PI * pitch)) * volume // Square wave   
      }
      break;     
    }
    case 'saw':{
      const period = sampleRate / pitch;
      if (i < attackSamples) {
        value1 = (i/attackSamples) * (((i % period) / period) * 2 - 1) * volume // Sine wave  
      }else{
        value1 = (((i % period) / period) * 2 - 1) * volume             
      }
      break;             
    }
  }
  return value1
}

function checkHardLevel(){
  let a
  const osc1 = document.getElementById("waves").value
  const osc2 = document.getElementById("waves2").value
  const filter = document.getElementById("filter")
  if((osc1 === soundWave1 && osc2 === soundWave2) || (osc2 === soundWave1 && osc1 === soundWave2)){
    if((knobValue === volume1 && knobValue2 === volume2) || (knobValue === volume2 && knobValue2 === volume1)){
     a = knobWheel.classList.toggle("correctWheel")
     a = knobWheel2.classList.toggle("correctWheel")
    }else{
      a =(knobValue.textContent === volume1.toString()) ? knobWheel.classList.toggle("correctWheel") : knobWheel.classList.toggle("incorrectWheel")
      a =(knobValue2.textContent === volume2.toString()) ? knobWheel2.classList.toggle("correctWheel") : knobWheel2.classList.toggle("incorrectWheel")
    }
    a =oscc1.classList.toggle("correct")
    a =oscc2.classList.toggle("correct")
  }else{
    a = (osc1 === soundWave1) ? oscc1.classList.toggle("correct") : oscc1.classList.toggle("incorrect")
    a = (osc2 === soundWave2) ? oscc2.classList.toggle("correct") : oscc2.classList.toggle("incorrect")
    a =(knobValue.textContent === volume1.toString()) ? knobWheel.classList.toggle("correctWheel") : knobWheel.classList.toggle("incorrectWheel")
    a =(knobValue2.textContent === volume2.toString()) ? knobWheel2.classList.toggle("correctWheel") : knobWheel2.classList.toggle("incorrectWheel")
  }
  a = (filterType === filter.value)? filter.classList.toggle("correct") :filter.classList.toggle("incorrect")
  a = (filterFrequency.toString() === knobValue3.textContent)? knobWheel3.classList.toggle("correctWheel") : knobWheel3.classList.toggle("incorrectWheel")
  a = (pitch1.toString() === knobValue5.textContent)? knobWheel5.classList.toggle("correctWheel") : knobWheel5.classList.toggle("incorrectWheel")
  a = (pitch2.toString() === knobValue6.textContent)? knobWheel6.classList.toggle("correctWheel") : knobWheel6.classList.toggle("incorrectWheel")
  a = ( panning.toString()=== knobValue4.textContent)? knobWheel4.classList.toggle("correctWheel") : knobWheel4.classList.toggle("incorrectWheel")
}

function checkEasyLevel(){
  let a
  const osc1 = document.getElementById("waves").value
  const osc2 = document.getElementById("waves2").value
  const filter = document.getElementById("filter")
  if((osc1 === soundWave1 && osc2 === soundWave2) || (osc2 === soundWave1 && osc1 === soundWave2)){
    if((knobValue === volume1 && knobValue2 === volume2) || (knobValue === volume2 && knobValue2 === volume1)){
     a = knobWheel.classList.toggle("correctWheel")
     a = knobWheel2.classList.toggle("correctWheel")
    }else{
      a =(knobValue.textContent === volume1.toString()) ? knobWheel.classList.toggle("correctWheel") : knobWheel.classList.toggle("incorrectWheel")
      a =(knobValue2.textContent === volume2.toString()) ? knobWheel2.classList.toggle("correctWheel") : knobWheel2.classList.toggle("incorrectWheel")
    }
    a =oscc1.classList.toggle("correct")
    a =oscc2.classList.toggle("correct")
  }else{
    a = (osc1 === soundWave1) ? oscc1.classList.toggle("correct") : oscc1.classList.toggle("incorrect")
    a = (osc2 === soundWave2) ? oscc2.classList.toggle("correct") : oscc2.classList.toggle("incorrect")
    a =(knobValue.textContent === volume1.toString()) ? knobWheel.classList.toggle("correctWheel") : knobWheel.classList.toggle("incorrectWheel")
    a =(knobValue2.textContent === volume2.toString()) ? knobWheel2.classList.toggle("correctWheel") : knobWheel2.classList.toggle("incorrectWheel")
  }
  a = (filterType === filter.value)? filter.classList.toggle("correct") :filter.classList.toggle("incorrect")
  a = (filterFrequency.toString() === knobValue3.textContent)? knobWheel3.classList.toggle("correctWheel") : knobWheel3.classList.toggle("incorrectWheel")
}

const easy = document.getElementById('easyLevel')
const hard = document.getElementById('hardLevel')
const currentLevel = document.getElementById('currentLevel')
const nextGeneration = document.getElementById('nextGeneration')
const playWaves = document.getElementById('playWaves')
let isEasyLevel = true

easy.addEventListener('click', ()=>{
  isEasyLevel = true
  easyLevel()  
  currentLevel.textContent = ' Easy'
  easy.classList.toggle('current')
})

hard.addEventListener('click', ()=>{
  isEasyLevel = false
  hardLevel()
  currentLevel.textContent = ' Hard'
  easy.classList.toggle('current')
})

function restoreColor(){
  let a;
  a = knobWheel.classList = 'knobWheel'
  a = knobWheel2.classList = 'knobWheel'
  a = knobWheel3.classList = 'knobWheel'
  a = knobWheel4.classList = 'knobWheel'
  a = knobWheel5.classList = 'knobWheel'
  a = knobWheel6.classList = 'knobWheel'
  a = oscc1.classList = 'selectOption'
  a = oscc2.classList = 'selectOption'
  a = filter.classList = 'selectOption'
}

nextGeneration.addEventListener('click', ()=>{   
  if(isEasyLevel){
    easyLevel()  
  }else{
    hardLevel()
  }
  restoreColor()
})

playWaves.addEventListener('click', ()=>{
  playWave()
  restoreColor()
})

document.getElementById('checkAnswer').addEventListener('click', ()=>{
  if(isEasyLevel){
    checkEasyLevel()
  }
  else{
    checkHardLevel()
  } 
})

function rotateByWheel(event) {
    event.preventDefault();
  
      // Tikrinama pelės ratuko kryptis
      const delta = Math.sign(event.deltaY);
      // Randamas dabartinis mygtuko sukimo kampas
      const currentAngleIndex = angles.indexOf(Number(event.target.style.transform.replace(/[^0-9\-]/g,'')));  
      // Atnaujinamas mygtuko sukimo kampas
      let newAngleIndex = currentAngleIndex + delta;
      if (newAngleIndex < 0) {
          newAngleIndex = 0;
      } else if (newAngleIndex >= angles.length) {
          newAngleIndex = angles.length - 1;
      }  
      // Nustatomas naujas mygtuko sukimo kampas
      angle = angles[newAngleIndex];
      event.target.style.transform = `rotate(${angles[newAngleIndex]}deg)`;
  }
  
  // Priskiriame sukilimo funkciją pelės ratukui
  knobWheel.addEventListener('wheel', rotateByWheel);
  knobWheel.addEventListener('wheel', ()=>{ knobValue.textContent = values[angle.toString()]});
  
  knobWheel2.addEventListener('wheel', rotateByWheel);
  knobWheel2.addEventListener('wheel', ()=>{ knobValue2.textContent = values[angle.toString()]});
  
  knobWheel3.addEventListener('wheel', rotateByWheel);
  knobWheel3.addEventListener('wheel', ()=>{ knobValue3.textContent = valuesFilter[angle.toString()]});
  
  knobWheel4.addEventListener('wheel', rotateByWheel);
  knobWheel4.addEventListener('wheel', ()=>{ knobValue4.textContent = valuesPanning[angle.toString()]});
  
  knobWheel5.addEventListener('wheel', rotateByWheel);
  knobWheel5.addEventListener('wheel', ()=>{ knobValue5.textContent = valuesPitch[angle.toString()]});
  
  knobWheel6.addEventListener('wheel', rotateByWheel);
  knobWheel6.addEventListener('wheel', ()=>{ knobValue6.textContent = valuesPitch[angle.toString()]});
  