const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try{

  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
  }
  catch(error){
    alert(error)

  }
};



const displayCategories = (category) => {
  //  console.log(category);
  const catagoriesContainer = document.getElementById("catagories-container");
  

  category.forEach(categories => {
    

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


const displayNewsCategory = async(id,category_name) =>{
  toggleSpinner(true);
  // console.log(category_id);
  const url=  `https://openapi.programming-hero.com/api/news/category/${'0'+id}`
  try{

  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
  const messageField = document.getElementById('message-feild');
  const messageFieldValue = `${data.data.length} items found for this category ${category_name}` ;
  messageField.innerText = messageFieldValue;
  }
  catch(error){
    alert(error);
  }
  
}
const displayNews = (data) =>{
  
  // sort by view
  data.sort((a, b) => b.total_view- a.total_view);

  // console.log(data);
  const messageFieldContainer = document.getElementById('news-container');
  messageFieldContainer.textContent= '';

  data.forEach(news =>{
    // console.log(news._id);
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
          <p>${news.details.length > 460 ? news.details.slice(0,460) +'...' : news.details }</p>

              <div class="d-flex align-items-center justify-content-between flex-sm-row flex-column p-3">
                  <div class="d-flex align-items-center ">
                      <img src="${news.author.img}" alt="" height="30" class="rounded-circle">
                      <div >
                          <p>${news.author.name}\n </p>
                          <p>${news.author.published_date}</p>
                      </div>
                  </div>

                  <div >
                      <span><i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view}M</span>

                  </div>

                  <div class="">
                      <i class="fa-solid fa-star-half-stroke"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                  </div>

                  <div>
                      <i class="fa-solid fa-arrow-right btn " onclick ="modal('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"></i>
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


const modal = async(news_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  try{
    const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data[0]);
  }
  
  catch(error){
    alert(error);
  }
  
}
const displayNewsDetails = news =>{
  console.log(news);
  console.log(news.author.name);
  const modalTitle = document.getElementById('newsDetailModalLabel');
  modalTitle.innerText = news.title;

  const newsDetails = document.getElementById('news-details');
  
  newsDetails.innerHTML = `
      
      <p>Catagory No: ${news.category_id ? news.category_id : 'Category id not Found'}</p>
      <p>Author Name: ${news.author.name? news.author.name : 'Name not Found'}</p>
      <p>ID: ${news._id ? news._id: 'ID not Found'}</p>
      <p>Rating: ${news.rating.number ? news.rating.number : 'Rating does not exist'}</p>
      <p>Badge: ${news.rating.badge ? news.rating.badge : 'Badge not Found'}</p>
      <img src="${news.thumbnail_url}" alt="" >
      <p>Total Veiw: ${news.total_view ? news.total_view : 'Veiw not Found'}</p>
      <p>Details Information: ${news.details ? news.details : 'details is not Found'}</p>
      <p>Published Date: ${news.author.published_date? news.author.published_date : 'No published date Found'}</p>


  `;

}


displayNewsCategory('8')



const goToBlogContent = () =>{
  window.location.href = 'blog.html';
  window.location.href = 'index.html';
  
}
const goToNewsContent = () =>{
  window.location.href = 'index.html';
  window.location.href = 'blog.html';
}

