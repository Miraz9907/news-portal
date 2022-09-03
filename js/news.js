const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
};

const displayCategories = (category) => {
  //  console.log(category);
  const catagoriesContainer = document.getElementById("catagories-container");
  let count = 0;

  category.forEach(categories => {
    count = count + 1;

    const categoryText = document.createElement("button");
    categoryText.setAttribute('onclick',`displayNewsCategory(${categories.category_id},'${categories.category_name}')`);

    categoryText.classList.add("btn");
    // console.log(categories.category_name);
    categoryText.innerHTML = `
        ${categories.category_name}
        `;
    catagoriesContainer.appendChild(categoryText);
  });
};

loadCategories();


const displayNewsCategory = async(category_id,category_name) =>{
  toggleSpinner(true);
  console.log(category_id);
  const url=  `https://openapi.programming-hero.com/api/news/category/${'0'+category_id}`
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
  const messageField = document.getElementById('message-feild');
  const messageFieldValue = `${data.data.length} items found for this category ${category_name}` ;
  messageField.value = messageFieldValue;

  
}
const displayNews = (data) =>{
  
  // sort by view
  data.sort((a, b) => b.total_view- a.total_view);


  console.log(data);
  const messageFieldContainer = document.getElementById('news-container');
  messageFieldContainer.textContent= '';

  data.forEach(news =>{
    // console.log(news);
      const newsSection = document.createElement('div');
      newsSection.classList.add('row');
      newsSection.classList.add('mb-4');
      newsSection.classList.add('bg-light');
     
      newsSection.innerHTML=`
      <div class="col-lg-4">
          <img src="${news.image_url}" alt="" class="img-fluid h-100 p-3 rounded ">
      </div>
      <div class="col-md-8 p-5 ">
          <h3>${news.title}</h3>
          <p>${news.details.length > 506 ? news.details.slice(0,506) +'...' : news.details }</p>

              <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center ">
                      <img src="${news.author.img}" alt="" height="30" class="rounded-circle">
                      <div >
                          <p>${news.author.name} </p>
                          <p>${news.author.published_date}</p>
                      </div>
                  </div>

                  <div>
                      <span><i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view}M</span>

                  </div>

                  <div>
                      <i class="fa-solid fa-star-half-stroke"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                  </div>

                  <div>
                      <i class="fa-solid fa-arrow-right btn" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"></i>
                  </div>
              </div>
              
      </div>
  
      `;
      messageFieldContainer.appendChild(newsSection);

  });
  toggleSpinner(false);

}

const toggleSpinner = isSpinning =>{
  const spinnersdiv = document.getElementById('spiners');
  if(isSpinning){
      spinnersdiv.classList.remove('d-none');
  }
  else{
      spinnersdiv.classList.add('d-none');
  }
}

displayNewsCategory('8')






























































































// const displayNewsCategory = async(id,name) =>{
//   // console.log(id,name);
//   // toggleSpinner(true);
//   const url = `https://openapi.programming-hero.com/api/news/category/${'0'+id}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   displayNews(data.data);
//   const messageField = document.getElementById('message-feild');
//   const messageFieldValue = `${data.data.length} items found for this category ${name}`;
//   messageField.value = messageFieldValue;



// }

// const displayNews = (news) =>{
//   // console.log(news);

//   news.sort((x, y) => y.total_view - x.total_view);
//   const messageFieldContainer = document.getElementById('news-container');
//   messageFieldContainer.textContent = ' ';
  
//   news.forEach(newses =>{
//     // console.log(newses);
//     const newsSection = document.createElement('div');
//     newsSection.classList.add('row');
//     newsSection.innerHTML = `
//     <div class="col-lg-4">
//             <img src="${news.image_url}" alt="" class="img-fluid h-100 ">
//         </div>

//         <div class="col-md-8 p-5 ">
//             <h3>${news.title}</h3>
//             <p>${news.details.length > 506 ? news.details.slice(0,506) +'...' : news.details }</p>

//                 <div class="d-flex align-items-center justify-content-between">
//                     <div class="d-flex align-items-center ">
//                         <img src="${news.author.img}" alt="" height="30" class="rounded-circle">
//                         <div >
//                             <p>${news.author.name} </p>
//                             <p>${news.author.published_date}</p>
//                         </div>
//                     </div>

//                     <div>
//                         <span><i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view}M</span>

//                     </div>

//                     <div>
//                         <i class="fa-solid fa-star-half-stroke"></i>
//                         <i class="fa-regular fa-star"></i>
//                         <i class="fa-regular fa-star"></i>
//                         <i class="fa-regular fa-star"></i>
//                         <i class="fa-regular fa-star"></i>
//                     </div>

//                     <div>
//                         <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#phoneDetailModal"></i>
//                     </div>
//                 </div>
                
//         </div>
//     `;
//     messageFieldContainer.appendChild(newsSection);

//   });

// }


