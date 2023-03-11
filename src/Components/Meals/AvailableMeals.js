import React, { useCallback, useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailabeMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealData, setMealData] = useState([]);
  
  const fetchMealsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://food-order-app-266fd-default-rtdb.firebaseio.com/meals.json"
      );
      const responnseData = await response.json();

      const loadedMeals = [];

      for (const key in responnseData) {
        loadedMeals.push({
          id: key,
          name: responnseData[key].name,
          description: responnseData[key].description,
          price: responnseData[key].price,
        });
      }

      setMealData(loadedMeals);
    } catch (error) {
      alert("errorr");
    }
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  const mealsList = mealData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
