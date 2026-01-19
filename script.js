const grid = document.getElementById("devicesGrid");
const onCountEl = document.getElementById("onCount");
const totalPowerEl = document.getElementById("totalPower");

const devicePresets = {
  light:{icon:"fa-lightbulb",power:12},
  fan:{icon:"fa-fan",power:70},
  ac:{icon:"fa-snowflake",power:900},
  tv:{icon:"fa-tv",power:120},
  wifi:{icon:"fa-wifi",power:18},
  geyser:{icon:"fa-fire",power:2000},
  fridge:{icon:"fa-ice-cream",power:150}
};

let devices = JSON.parse(localStorage.getItem("devices")) || [];

function save(){
  localStorage.setItem("devices",JSON.stringify(devices));
}

function updateSummary(){
  let on=0,power=0;
  devices.forEach(d=>{
    if(d.on){on++;power+=d.power;}
  });
  onCountEl.textContent=on;
  totalPowerEl.textContent=power+" W";
}

function render(){
  grid.innerHTML="";
  devices.forEach((d,i)=>{
    grid.innerHTML+=`
    <div class="device ${d.on?"on":""}">
      <div class="device-header">
        <div><i class="fa-solid ${d.icon}"></i> ${d.name}</div>
        <span class="status ${d.on?"on":""}">${d.on?"On":"Off"}</span>
      </div>
      <button onclick="toggle(${i})">Toggle</button>
      <button class="delete-btn" onclick="removeDevice(${i})">Delete</button>
    </div>`;
  });
  updateSummary();
}

function toggle(i){
  devices[i].on=!devices[i].on;
  save();render();
}

function removeDevice(i){
  devices.splice(i,1);
  save();render();
}

document.getElementById("addDeviceBtn").onclick=()=>{
  const type=document.getElementById("deviceType").value;
  const name=document.getElementById("deviceName").value || type;
  devices.push({
    name,
    power:devicePresets[type].power,
    icon:devicePresets[type].icon,
    on:false
  });
  save();render();
};

render();
