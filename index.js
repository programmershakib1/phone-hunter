const loadAllPhone = async (status,searchText) => {
    document.getElementById('spinner').style.display = 'none';

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`) 
    // .then(res => res.json())
    // .then(data => console.log(data.data))

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:'iphone'}`);
    const data = await response.json();

    // if(status){
    //     displayAllPhone(data.data);
    // }
    // else{
    //     displayAllPhone(data.data.slice(0,6));
    // }

    status?displayAllPhone(data.data):displayAllPhone(data.data.slice(0,6));
}

const displayAllPhone = (phones) => {
    document.getElementById('phones-container').innerHTML = "";
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone =>{
        const {brand, image, slug} = phone;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card m-2 bg-base-100 w-96 shadow-xl">
                <figure class="px-10 pt-10">
                    <img
                        src="${image}"
                        alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${brand}</h2>
                    <p>${slug}</p>
                    <div class="card-actions">
                        <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
                    </div>
                </div>
            </div>
        `
        phoneContainer.appendChild(div);
    })
}

const handleShowAll = () => {
    loadAllPhone(true)
}

const handleSearch = () => {
    document.getElementById('spinner').style.display = 'block';
    const searchText = document.getElementById('search-box').value;
    setTimeout(function () {
        loadAllPhone(false,searchText)
    },3000);
}

const phoneDetails = async (slugs) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();
    console.log(data.data);
    const {brand, image, slug} = data.data;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box text-center">
                <h3 class="text-lg font-bold">${brand}</h3>
                <div class="flex justify-center">
                    <img class="py-4" src="${image}"/>
                </div>
                <div class="modal-action flex justify-center">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    `
    my_modal_1.showModal();
}

loadAllPhone(false,'iphone')