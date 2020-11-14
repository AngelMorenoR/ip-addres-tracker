const btn = document.querySelector('.arrow');
const map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5nZWwwMDAxIiwiYSI6ImNraGhqcThlZzAwdWYydG1ucmk3ZWpuZHQifQ.TTeIGJhEWY-bFh8wldUgjA', {
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,  
}).addTo(map)

let err = document.querySelector('.err');
let IPOutput = document.querySelector('.IP');
let locationOutput = document.querySelector('.location');
let timezoneOutput = document.querySelector('.timezone');
let ISPOutput = document.querySelector('.ISP');

document.querySelector('.inp').addEventListener('keyup', handInputIp)

function handInputIp() {
    const IP = this.value;
    if(isValidIP(IP)) {
        btn.addEventListener('click', function () {
            fetch(`https://geo.ipify.org/api/v1?apiKey=at_W5UqqaP2YNMdaLInkjHuwH92fkq2J&ipAddress=${IP}`)
                .then(msg => msg.json())
                .then(msg => changeThings(msg))  
        })

    }else {
        
        btn.addEventListener('click', function () {
            fetch(`https://geo.ipify.org/api/v1?apiKey=at_W5UqqaP2YNMdaLInkjHuwH92fkq2J`)
            .then(msg => msg.json())
            .then(msg => changeThings(msg))
        }) 

    }
}

function changeThings(msg) {

    IPOutput.innerHTML = msg.ip
    locationOutput.innerHTML = '<p>' +msg.location.region + ', </p>' +  '<p>' + msg.location.country+ '<p>'+  msg.location.postalCode
    timezoneOutput.innerHTML = msg.location.timezone
    ISPOutput.innerHTML = msg.isp
    map.flyTo([msg.location.lat, msg.location.lng], 8)
    L.marker([msg.location.lat, msg.location.lng]).addTo(map)
    .bindPopup(`<b>${msg.location.lat}, ${msg.location.lng}</b>`).openPopup();
    L.circle([msg.location.lat, msg.location.lng], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
    }).addTo(map).bindPopup();
}


function isValidIP(str) {
    const reg = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

    return reg.test(str)
}


