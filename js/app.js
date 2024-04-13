let cardsContent = document.querySelector(".cards_content")

document.addEventListener("DOMContentLoaded",()=>{
    getApi()
})


async function getApi(){
    const URL = "https://api.spacexdata.com/v3/launches";
    const answer = await fetch(URL)
    const missions = await answer.json()

    paintMissions(missions)

    cardsContent.addEventListener("click",(event)=>{
   
        if(event.target.getAttribute("rocket-id")){
            const id = event.target.getAttribute("rocket-id")
            paintModalById(missions, id)

        }
        
    })
}

function paintMissions(missions){
    cleanHTML()
    
    missions.forEach(mission => {
        cardsContent.innerHTML += `
        <div class="card" style="width: 18rem">
            <img
              src=${mission.links.mission_patch}
              class="card-img-top"
              alt="..."
            />
            <div
              class="card-body d-flex justify-content-center align-items-center flex-column"
            >
              <h5 class="card-title mission_name">${mission.mission_name}</h5>
              <p class="card-text age_mission">${mission.launch_year}</p>
              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                rocket-id="${mission.flight_number}"
              >
                Ver Info-Misión
              </button>
    
              <!-- Modal -->
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
    });
}

function paintModalById(missions, id){
    const modal = document.querySelector(".modal-content")

    missions.forEach(mission =>{
        if(mission.flight_number == id){
            modal.innerHTML = `<div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              SPACEX
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center align-items-center flex-column gap-3">
            <p class="text-secondary">Space Explortion Tecnologies</p>
            <h2 class="text-primary">Misión ${mission.mission_name}</h2>
            <iframe
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed//${mission.links.youtube_id}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>

            <!-- Table -->
            <table class="table table-striped">
              
              <tbody>
                <tr>
                  <th scope="row">Cohete:</th>
                  <td>${mission.rocket.rocket_name}</td>
                  
                </tr>
                <tr>
                  <th scope="row">Tipo Cohete:</th>
                  <td>${mission.rocket.rocket_type}</td>

                </tr>
                <tr>
                  <th scope="row">Exito Lanzamiento</th>
                  <td>${mission.launch_success}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>`
        }
    })
}



function cleanHTML(){
    while(cardsContent.firstChild){
        cardsContent.removeChild(cardsContent.firstChild)
    }
}






