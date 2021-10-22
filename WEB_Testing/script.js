function  PostTheData(){
  url = document.getElementById('theUrl').value;
  axios.post('http://127.0.0.1:8888', {
    uri: url,
  })
  .then((response) => handleRes(response.data))
  .catch(function (error) {
    console.log(error);
  });
}

// For Testing Data
  // axios({
  //   url : 'response.json',
  //   method : 'GET',
  // })
  // .then((request) => handleRes(request.data))


var root = document.getElementById('root')

const handleRes = (data) =>{

    console.log(data)

    const YOUTUBE = Boolean(data.extractor == "youtube")
    const FACEBOOK = Boolean(data.extractor == "facebook")

    if(YOUTUBE){ // This was for Youtube (It has 4 thumbnails)
    document.getElementById("thumb").setAttribute("src",data.thumbnails[1].url) // Enough For Mobiles size => (168x94)
    }
    else if(FACEBOOK){ // This was for Facebook (It has 1 thumbnail)
    document.getElementById("thumb").setAttribute("src",data.thumbnails[0].url) // Enough For Mobiles size => (168x94)
    }
    document.getElementById("title").innerHTML=data.title
    document.getElementById("duration").innerHTML=data.duration + " s"

    comp_video = document.getElementById("comp-video")
    video_only = document.getElementById("video-only")
    audio_only = document.getElementById("audio-only")
    req = document.getElementById("requested-link")

   // Video link sent by YT considering user's network speed
    for (let i = 0; i < Object.keys(data.requested_formats).length; i++){
      var li = document.createElement("li");
      li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")
      li.innerHTML = `
      
      <a class="my-1 px-2 py-2" href="${data.requested_formats[i].url}" target="_blank">${data.requested_formats[i].format_note}  ${data.requested_formats[i].format} </a>
      <span class="badge bg-primary rounded-pill">${data.requested_formats[i].ext}</span>
      `
      req.appendChild(li);
    }
    // Video With Audio
    for (let i = 0; i < Object.keys(data.formats).length; i++) {
      if (data.formats[i].asr && data.formats[i].fps) {
          var li = document.createElement("li");
          li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")
          li.innerHTML = `
          <a class="my-1 px-2 py-2" href="${data.formats[i].url}"  target="_blank">${data.formats[i].format_note}  <!--${data.formats[i].format}--> </a>
          <span class="badge bg-primary rounded-pill">${data.formats[i].format_note}</span>
          <span class="badge bg-success rounded-pill">${data.formats[i].ext}</span>
          `
          comp_video.appendChild(li);
      }
    }
    // Video Only
    for (let i = 0; i < Object.keys(data.formats).length; i++) {
      if (!data.formats[i].asr) {
          var li = document.createElement("li");
          li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")

          strFormat = data.formats[i].format
          x = strFormat.search("-")
          realFormat = strFormat.slice(x+2,strFormat.length)

          li.innerHTML = `
          <a class="my-1 px-2 py-2" href="${data.formats[i].url}"  target="_blank">
            ${realFormat}
          </a>
          <span class="badge bg-primary rounded-pill">${data.formats[i].format_note}</span>
          <span class="badge bg-success rounded-pill">${data.formats[i].ext}</span>
          `
          video_only.appendChild(li);
      }
    }
    // Audio Only
    for (let i = 0; i < Object.keys(data.formats).length; i++) {
      if (!data.formats[i].height) {
          var li = document.createElement("li");
          li.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")
          li.innerHTML = `
          <a class="my-1 px-2 py-2" href="${data.formats[i].url}" target="_blank">${data.formats[i].format_note}  <!--${data.formats[i].format}--> </a>
          <span class="badge bg-primary rounded-pill">${data.formats[i].format_note}</span>
          <span class="badge bg-success rounded-pill">${data.formats[i].ext}</span>
          `
          audio_only.appendChild(li);
      }
    }

}
