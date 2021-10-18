const input = document.getElementById("filter-jobs");
const findJob = document.querySelector(".button-container");

async function getJobs() {

    const resp = await fetch("data.json");
    const respData = await resp.json();

    showJobs(respData)

    return respData;
}


function showJobs(jobs) {

    // show the no of jobs available
    document.querySelector(".jobs-list h1").innerHTML = `Showing ${jobs.length} job(s)`;

    const jobContainer = document.querySelector(".jobs-container");

    jobContainer.innerHTML = "";

    jobs.forEach((job) => {
        
        // console.log(job);
        const jobTile = document.createElement("div");
        jobTile.classList.add("job-tile");
        jobTile.innerHTML = `
        <div class="message">
            <h3>Skills Required:</h3><br>
            <p>${job.requirements.items}</p>
        </div>
        <div class="top">
            <img src="${job.logo}" alt="">
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="role-name">
            <span>${job.roleName}</span>
        </div>
        <div class="description">
            <span>${job.requirements.content}</span>
        </div>
        <div class="buttons">
            <div class="button apply-now"><a href="${job.applicationLink}" target="_blank_">Apply Now</a></div>
            <div class="button message-btn">More Info...</div>
        </div>
        `;
        jobContainer.appendChild(jobTile);

    })
    
    const messageBtn = document.querySelectorAll(".buttons .message-btn");

    messageBtn.forEach((message) => {
        
        message.addEventListener('click',(e) =>{

            e.target.parentElement.parentElement.firstElementChild.classList.add("active");

            setTimeout(() => {
                e.target.parentElement.parentElement.firstElementChild.classList.remove("active");
            },3000);
        });

    });
    
}

findJob.addEventListener('click',() => {

    const value = input.value;
    getJobs().then(jobs => {
        let searchedJobs = filterJobs(jobs,value);
        // console.log(searchedJobs);
        showJobs(searchedJobs);
    })
});

function filterJobs(jobs,searchText){

    if(searchText){

        let filteredJobs = jobs.filter(job => {
            
            if(job.roleName.toLowerCase().includes(searchText)|| job.type.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)) {
                return true;
            }else{
                return false;
            }
        })
        return filteredJobs;
    }else{
        return jobs;
    }
}


getJobs();