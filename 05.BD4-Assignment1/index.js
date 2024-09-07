const express = require('express');
const { abort } = require('process');
const app = express();
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
let db;
(async () => {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/",(req ,res)=>{
     res.send("Server run sucessfully");
})



//Exercise 1: Get All Restaurants
async function fetchRestaurantsData(){
  let query = "SELECT * FROM restaurants";
  let response = await db.all(query,[]);
  return {restaurants:response};
}
app.get('/restaurants', async (req, res) =>{
  try{
    let restaurantsData = await fetchRestaurantsData();
    res.status(200).json(restaurantsData);
  } catch(error){
    res.status(500).json({error:error.message});
  }
})
//Exercise 2: Get Restaurant by ID
async function fetchRestaurantById(id){
  let query = "SELECT * FROM restaurants WHERE id = ?";
  let response = await db.all(query,[id]);
  return {restaurants:response};
}
app.get('/restaurants/details/:id', async(req ,res)=>{
  let id = Number(req.params.id);
  try{
    let dataById = await fetchRestaurantById(id);
    if(dataById.restaurants.length === 0){
      return res.status(404).json({message:"No Data Present Here"});
    }
  return res.status(200).json(dataById);
  }catch(error){
    res.status(500).json({error:error.message});
  }
});
//Exercise 3: Get Restaurants by Cuisine
async function fetchRestaurantByCuisine(curisine){
  let query = "SELECT * FROM restaurants WHERE cuisine = ?";
  let response = await db.all(query,[curisine]);
  return {restaurants:response};
}
app.get('/restaurants/cuisine/:cuisine', async(req ,res)=>{
  let cuisine = req.params.cuisine;
  try{
    let dataByCuisine = await fetchRestaurantByCuisine(cuisine);
    if(dataByCuisine.restaurants.length === 0){
      return res.status(404).json({message:"No Data Present Here"});
    }
  return res.status(200).json(dataByCuisine);
  }catch(error){
    res.status(500).json({error:error.message});
  }
})
//Exercise 4: Get Restaurants by Filter
async function fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query = "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}
app.get('/restaurants/filter', async (req, res) => {
  let { isVeg, hasOutdoorSeating, isLuxury } = req.query;
  try {
    let result = await fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: "No Data Present Here" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Exercise 5: Get Restaurants Sorted by Rating
async function fetchRestaurantsByRating(){
  let query = "SELECT * FROM restaurants ORDER BY rating DESC";
  let response = await db.all(query,[]);
  return {restaurants:response};
}
app.get('/restaurants/sort-by-rating', async (req, res) =>{
  try{
    let dataByRating = await fetchRestaurantsByRating();
    if(dataByRating.restaurants === 0){
      return res.status(404).json({message:"No Data Found By Rating"});
    }
  return res.status(200).json({dataByRating});
  } catch(error){
    res.status(500).json({error:error.message});
  }
});
//Exercise 6: Get All Dishes
async function fetchAllDishes(){
  let query = "SELECT * FROM dishes";
  let response = await db.all(query,[]);
  return {dish:response};
}
app.get('/dishes', async (req ,res)=>{
  try{
    let dishesData = await fetchAllDishes();
    if(dishesData.dish.length === 0){
      return res.status(404).json({message:"No Data Present Here"});
    }
    return res.status(200).json(dishesData);
  }catch(error){
  res.status(500).json({error:error.message});
  }
})
//Exercise 7: Get Dish by ID
async function fetcheDishById(id){
  let query = "SELECT * FROM dishes WHERE id = ?";
  let response = await db.all(query, [id]);
  return {dish:response};
}
app.get('/dishes/details/:id', async (req ,res)=>{
   let id = Number(req.params.id);
  try{
    let dataById = await fetcheDishById(id);
    if(dataById.length === 0){
      return res.status(404).json({message:"No Dish Found"});
    }
    return res.status(200).json(dataById);
  } catch(error){
    res.status(500).json({error:error.message});
  }
});
//Exercise 8: Get Dishes by Filter
async function fetchDishesByFilter(isVeg) {
  let query = "SELECT * FROM dishes WHERE isVeg = ?";
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}
app.get("/dishes/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
      let filterByDishes = await fetchDishesByFilter(isVeg);
      if (filterByDishes.dishes.length === 0) {
          return res.status(404).json({ message: "No dishes found" });
      }
      return res.status(200).json(filterByDishes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
//Exercise 9: Get Dishes Sorted by Price
async function fetchDishesByPrice(){
  let query = "SELECT * FROM dishes ORDER BY price ASC";
  let response = await db.all(query,[]);
  return {dishes:response};
}
app.get('/dishes/sort-by-price', async (req ,res)=>{
  try{
    let dataByPrice = await fetchDishesByPrice();
    if(dataByPrice.dishes.length === 0){
      return res.status(404).json({message:"No Data Found By Price"});
    }
    return res.status(200).json(dataByPrice);
  } catch(error){
    res.status(500).json({error:error.message});
  }
});
const port = 5050
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
});
