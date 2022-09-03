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

  category.forEach((categories) => {
    count = count + 1;

    const categoryText = document.createElement("button");
    categoryText.setAttribute("id", `para-${count}`);

    categoryText.classList.add("btn");
    // console.log(categories.category_name);
    categoryText.innerHTML = `
        ${categories.category_name}
        `;
    catagoriesContainer.appendChild(categoryText);
  });
};

loadCategories();
