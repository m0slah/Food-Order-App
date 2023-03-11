import React, { useCallback, useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailabeMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealData, setMealData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
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
      setError(error.message);
    }
    setIsLoading(false);
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

  let content = <p>Found no Meal</p>;

  if (mealData.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <section>{content}</section>
      </Card>
    </section>
  );
};

export default AvailableMeals;
